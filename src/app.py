import os
from flask import Flask, jsonify, send_from_directory
from flask_migrate import Migrate
from api.utils import APIException, generate_sitemap
from api.models import db
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands

app = Flask(__name__)
app.url_map.strict_slashes = False

# Database configuration
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db_url = os.getenv("DATABASE_URL", "sqlite:////tmp/test.db")
if db_url.startswith("postgres://"):
    db_url = db_url.replace("postgres://", "postgresql://", 1)
app.config['SQLALCHEMY_DATABASE_URI'] = db_url

# Initialize database
db.init_app(app)
migrate = Migrate(app, db)

# Add the admin
setup_admin(app)

# Add the admin commands
setup_commands(app)

# Register API blueprints
app.register_blueprint(api, url_prefix='/api')

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    response = jsonify(error.to_dict())
    response.status_code = error.status_code
    return response

# Generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    return generate_sitemap(app)

# Serve any other endpoint as a static file
# @app.route('/<path:path>', methods=['GET'])
# def serve_any_other_file(path):
#     if not os.path.isfile(os.path.join(static_file_dir, path)):
#         path = 'index.html'
#     response = send_from_directory(static_file_dir, path)
#     response.cache_control.max_age = 0  # avoid cache memory
#     return response

if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
