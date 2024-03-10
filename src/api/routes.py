from flask import Flask, jsonify, Blueprint
from flask_cors import CORS
from flask_socketio import SocketIO, emit
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from datetime import datetime

from .models import db, User, Threads, Category, FavoriteThreads, ThreadLikes, ThreadComments
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

# 🟡 USER REGISTER 🟡
# Endpoint para manejar la solicitud POST en '/register'
@api.route('/register', methods=['POST'])
def register():
    # Obtener los datos JSON de la solicitud
    data = request.get_json()
    # Verificar si se proporcionaron todos los campos necesarios
    if "email" not in data or "password" not in data or "username" not in data or "confirm_password" not in data:
        return jsonify({"[routes.py/register] message": "Missing required fields"}), 400
    
    if "username" in data and len(data["username"]) < 3:
        return jsonify({"[routes.py/register] message": "Username must be at least 3 characters"}), 400
    
    if "email" in data and len(data["email"]) < 4:
        return jsonify({"[routes.py/register] message": "Email must be at least 3 characters"}), 400
    
    if "email" in data and "@" not in data["email"]:
        return jsonify({"[routes.py/register] message": "Invalid email"}), 400
    
    if "email" in data and "." not in data["email"]:
        return jsonify({"[routes.py/register] message": "Invalid email"}), 400
    
    if "password" in data and len(data["password"]) < 6:
        return jsonify({"[routes.py/register] message": "Password must be at least 6 characters"}), 400
    
    if "confirm_password" in data and data["password"] != data["confirm_password"]:
        return jsonify({"[routes.py/register] message": "Passwords do not match"}), 400

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

    # Crear un token de acceso para el nuevo usuario
    access_token = create_access_token(identity=new_user.id)

    # Crear el cuerpo de la respuesta
    response_body = {
        "message": "User Created",
        "token": access_token,
        "user_id": new_user.id
    }
    # Devolver una respuesta con un código de estado 201 (Created)
    return jsonify(response_body), 201

# 🟢 USER LOGIN 🟢
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
    access_token = create_access_token(identity=user.email)
    # Devolver el token de acceso y el ID del usuario como JSON
    return jsonify({ "token": access_token, "user_id": user.id })

# Endpoint para manejar la solicitud GET en '/userinfo'
@api.route('/userinfo', methods=['GET'])
@jwt_required()
def userinfo():
    try:
        # Obtener el ID del usuario autenticado del token JWT
        userId = get_jwt_identity()
        # Buscar al usuario en la base de datos por su ID
        user = User.query.filter(User.email == userId).first()
        print(user)
        if user:
            # Crear el cuerpo de la respuesta con un mensaje de saludo que incluye el correo electrónico del usuario
            response_body = user.serialize()
            # Puedes sacar esto con serialize ej: <p>{user.description}</p>
            # "user_name": self.user_name,
            # "email": self.email,
            # "profile_picture": self.profile_picture,
            # "description": self.description,
            # "admin": self.admin

            # Devolver el mensaje de saludo como JSON con un código de estado 200 (OK)
            return jsonify(response_body), 200
        else:
            # Manejar el caso en el que el usuario no existe
            print("error else")
            return jsonify({"error": "User not found"}), 404

    except Exception as e:
        # Manejar cualquier otro error que pueda ocurrir
        return jsonify({"error": str(e)}), 500

# 🔵 THREADS ENDPOINTS 🔵
# Endpoint para manejar la solicitud POST en '/create-thread'
@api.route('/create-thread', methods=['POST'])
@jwt_required()
def create_thread():
    current_user = get_jwt_identity()

    thread_data = request.get_json()
    print(thread_data)
    title = thread_data.get("title")
    content = thread_data.get("content")
    category = thread_data.get("category")

    # Check if title or content are missing
    if title is None or content is None:
        return jsonify({"[create_thread/routes.py] message": "Missing required fields"}), 400
    
    # Create a new thread
    new_thread = Threads(
        user_id=current_user,
        title=title,
        content=content,
        category_id=category,
        )

    db.session.add(new_thread)
    db.session.commit()

    serialized_thread = {
        "id": new_thread.id,
        "title": new_thread.title,
        "content": new_thread.content,
        "user_id": new_thread.user_id,
        "date": new_thread.date
    }

    return jsonify(serialized_thread), 201

# Endpoint para manejar la solicitud GET en '/threads'
@api.route('/threads', methods=['GET'])
def get_threads():
    threads = Threads.query.all()
    # Serialize the list of threads
    serialized_threads = list(map(lambda thread: thread.serialize(), threads))
    return jsonify(serialized_threads), 200

# Endpoint para manejar la solicitud GET en '/categories'
@api.route('/threads/<string:category>', methods=['GET'])
def get_threads_by_category(category):
    category = Category.query.filter_by(name=category).first()
    if category is None:
        return jsonify({"message": "Category not found"}), 404
    threads = Threads.query.filter_by(category_id=category.id).all()
    serialized_threads = list(map(lambda thread: thread.serialize(), threads))
    return jsonify(serialized_threads), 200

# 🔴 CATEGORIAS ENDPOINTS 🔴
# Endpoint para manejar la solicitud GET de categorías en '/categories'
@api.route('/categories', methods=['GET'])
def get_categories():
    categories = Category.query.all()
    serialized_categories = list(map(lambda category: category.serialize(), categories))
    return jsonify(serialized_categories), 200

#Endpoints para manejar la solicitud POST en '/categories'
@api.route('/create-category', methods=['POST'])
def create_category():
    data = request.get_json()
    title = data.get("title")
    icon = data.get("icon")

    if title is None or icon is None:
        return jsonify({"[routes.py/create_category] message": "Missing required fields"}), 400

    new_category = Category(
        title=title,
        icon=icon
    )

    db.session.add(new_category)
    db.session.commit()

    serialized_category = {
        "id": new_category.id,
        "title": new_category.title,
        "icon": new_category.icon
    }

    return jsonify(serialized_category), 201

# 🟣 FAVORITE THREADS ENDPOINTS 🟣
# Endpoint para manejar la solicitud POST en '/favorite-thread'