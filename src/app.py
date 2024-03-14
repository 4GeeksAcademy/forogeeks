"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory, redirect
from flask_migrate import Migrate
from flask_swagger import swagger
from api.utils import APIException, generate_sitemap
from api.models import db, User
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
from flask_cors import CORS
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity,decode_token
from flask_mail import Mail, Message
import urllib.parse

# from models import Person
ENV = "development" if os.getenv("FLASK_DEBUG") == "1" else "production"
static_file_dir = os.path.join(os.path.dirname(
    os.path.realpath(__file__)), '../public/')

app = Flask(__name__)

app.url_map.strict_slashes = False
CORS(app)

app.config["JWT_SECRET_KEY"] = os.environ.get('JWT_SECRET')
jwt = JWTManager(app)
# database condiguration
db_url = os.getenv("DATABASE_URL")

if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace(
        "postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

MIGRATE = Migrate(app, db, compare_type=True)

db.init_app(app)

# add the admin
setup_admin(app)
# add the admin
setup_commands(app)
# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

mail_settings = {
    "MAIL_SERVER": 'smtp.gmail.com',
    "MAIL_PORT": 465,
    "MAIL_USE_TLS": False,
    "MAIL_USE_SSL": True,
    "MAIL_USERNAME": 'teest4geeks12@gmail.com',
    "MAIL_PASSWORD": 'ahyz rgmy igtb yclg'
}

app.config.update(mail_settings)

mail = Mail(app)

# Handle/serialize errors like a JSON object
@app.errorhandler(APIException)
def handle_invalid_usage(error):
    return jsonify(error.to_dict()), error.status_code
# generate sitemap with all your endpoints
@app.route('/')
def sitemap():
    if ENV == "development":
        return generate_sitemap(app)
    return send_from_directory(static_file_dir, 'index.html')
# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0  # avoid cache memory
    return response
# @app.route("/restore-password/<token>", methods=["GET"])
# def restore_password(token):
#     try:
#         # Decodificar el token para obtener el email asociado
#         decoded_token = decode_token(token)
#         email = decoded_token['sub']
#         # Redirigir a la página RestorePassword con el email como parámetro en la URL
#         return redirect(url_for('restore_password_page', email=email))
#     except Exception as e:
#         return jsonify({"error": str(e)}), 500
@app.route("/sendemail", methods=["POST"])
def send_email():
    try:
        email = request.json.get("email", None)
        # Verificar si el correo electrónico está asociado con algún usuario en la base de datos
        user = User.query.filter_by(email=email).first()
        if not user:
            # Si el correo electrónico no coincide con ningún usuario en la base de datos
            response_data = { "msg": "error", "error": "Esta cuenta no existe" }
            return jsonify(response_data), 404
        # Generar el token único asociado con el correo electrónico
        token = create_access_token(identity=email, expires_delta=False)
        # Construir el enlace para restablecer la contraseña con el token como parámetro de consulta
        # restore_password_link = f"https://ominous-guide-665q7xv5pjhr94g-3000.app.github.dev/restore-password?token={token}"
        restore_password_link = os.getenv("FRONT_END_URL") + f"/restore-password?token={token}"
        # HTML del correo electrónico
        html_content = f"""
        <!DOCTYPE html>
        <html lang="en">
        <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Recuperación de contraseña</title>
        <style>
            body {{
                font-family: Arial, sans-serif;
                background-color: #F4F4F4;
                margin: 0;
                padding: 0;
            }}
            .container {{
                max-width: 600px;
                margin: auto;
                background-color: #fff;
                padding: 20px;
                border-radius: 5px;
                box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
                text-align: center;
                align-items: center;
                justify-content: center;
            }}
            h2 {{
                color: #333;
            }}
            p {{
                color: #666;
            }}
            .btn {{
                display: block;
                width: fit-content;
                margin: 20px auto;
                background-color: #007BFF;
                padding: 10px 20px;
                text-decoration: none;
                border-radius: 3px;
                text-align: center;
            }}
            .btn svg {{
                vertical-align: middle;
                margin-right: 10px;
            }}
        </style>
        </head>
        <body>
        <div class="container">
            <h2>Recuperación de contraseña</h2>
            <p>Has solicitado recuperar tu contraseña. Haz clic en el siguiente botón para restablecerla.</p>
            <a href="{restore_password_link}" class="btn" style="color: #FFFFFF;">
                Restablecer contraseña
            </a>
            <p>Si no has solicitado esta acción, por favor ignora este mensaje.</p>
            <img src="https://media.licdn.com/dms/image/D560BAQFmDm4C6hymwQ/company-logo_200_200/0/1693577833799/4geeksacademy_logo?e=2147483647&v=beta&t=DQS8WRITL9lws6l7tiUTKxx7W2gKqGNdV7Z_LE5LE1c" alt="forocode" width="50" height="50" />
        </div>
        </body>
        </html>
        """
        # Enviar el correo electrónico
        message = Message(
            subject="Recuperar contraseña",
            sender=app.config.get("MAIL_USERNAME"),
            recipients=[email],
            html=html_content
        )
        mail.send(message)
        response_data = { "msg": "success" }
        return jsonify(response_data), 200
    except Exception as e:
        response_data = { "msg": "error", "error": str(e) }
        return jsonify(response_data), 500
# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)