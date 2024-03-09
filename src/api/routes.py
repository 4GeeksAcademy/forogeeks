from flask import Flask, jsonify, Blueprint
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity

from .models import db, User
# Crear un blueprint llamado 'api'
api = Blueprint('api', __name__)

# Inicializar la aplicación Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
CORS(app, resources={r"/api/*": {"origins": ["https://ominous-guide-665q7xv5pjhr94g-3000.app.github.dev"]}})

# Inicializar el servidor SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# Agregar los endpoints de la API Flask

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

from flask import request

# Endpoint para manejar la solicitud POST en '/register'
@api.route('/register', methods=['POST'])
def register():
    # Obtener los datos JSON de la solicitud
    data = request.get_json()
    # Verificar si se proporcionaron todos los campos necesarios
    if "email" not in data or "password" not in data or "username" not in data:
        return jsonify({"message": "Missing required fields"}), 400

    # Verificar si el usuario ya existe en la base de datos
    existing_user = User.query.filter_by(email=data["email"]).first()
    if existing_user:
        return jsonify({"message": "User already exists"}), 409

    # Crear un nuevo usuario con los datos proporcionados
    new_user = User(
        email=data["email"],
        password=data["password"],
        user_name=data["username"]
    )

    # Agregar el usuario a la base de datos
    db.session.add(new_user)
    # Confirmar los cambios en la base de datos
    db.session.commit()

    # Crear el cuerpo de la respuesta
    response_body = {
        "message": "User Created"
    }
    # Devolver una respuesta con un código de estado 201 (Created)
    return jsonify(response_body), 201


# Endpoint para manejar la solicitud POST en '/login'
@api.route('/login', methods=['POST'])
def login():
    # Obtener los datos JSON de la solicitud
    data = request.get_json()
    # Buscar al usuario en la base de datos por su dirección de correo electrónico
    user = User.query.filter(User.email == data["email"]).first()
    # Verificar si el usuario no existe
    if user is None:
        # Devolver un mensaje de error con un código de estado 403 (Forbidden)
        return jsonify({"message": "Invalid user"}), 403
    
    # Verificar la contraseña proporcionada
    if user.password != data["password"]: 
        # Devolver un mensaje de error con un código de estado 403 (Forbidden)
        return jsonify({"message": "Invalid password"}), 403
        
    # Crear un token de acceso para el usuario autenticado
    access_token = create_access_token(identity=user.id, additional_claims={"email": user.email})
    # Devolver el token de acceso y el ID del usuario como JSON
    return jsonify({ "token": access_token, "user_id": user.id })

# Endpoint para manejar la solicitud GET en '/userinfo'
@api.route('/userinfo', methods=['GET'])
# Proteger el endpoint con JWT (el usuario debe estar autenticado para acceder)
@jwt_required()
def userinfo():
    # Obtener el ID del usuario autenticado del token JWT
    userId = get_jwt_identity()
    # Buscar al usuario en la base de datos por su ID
    user = User.query.filter(User.id == userId).first()
    # Crear el cuerpo de la respuesta con un mensaje de saludo que incluye el correo electrónico del usuario
    response_body = {
        "message": f"Hello {user.email}"
    }
    # Devolver el mensaje de saludo como JSON con un código de estado 200 (OK)
    return jsonify(response_body), 200