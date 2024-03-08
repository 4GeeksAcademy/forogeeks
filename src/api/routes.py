from flask import Flask, jsonify, Blueprint
from flask_cors import CORS
from flask_socketio import SocketIO, emit

api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api, resources={r"/*": {"origins": "http://localhost:3000"}})

# Inicializar la aplicación Flask
app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'

# Inicializar el servidor SocketIO
socketio = SocketIO(app, cors_allowed_origins="*")

# Agregar los endpoints de la API Flask

@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():
    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }
    return jsonify(response_body), 200

# Función para manejar los mensajes WebSocket
@socketio.on('message')
def handle_message(message):
    print('Received message:', message)
    # Aquí deberías enviar el mensaje recibido a todos los clientes conectados, excepto al que lo envió
    emit('message', message, broadcast=True, include_self=False)

if __name__ == '__main__':
    # Ejecutar la aplicación Flask con SocketIO
    socketio.run(app, port=3001, debug=True)
