"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
import os
from flask import Flask, request, jsonify, url_for, send_from_directory
from flask_migrate import Migrate
from flask_swagger import swagger
from flask_cors import CORS
from api.utils import APIException, generate_sitemap
from api.models import db, Influencers, Empresas
from api.routes import api
from api.admin import setup_admin
from api.commands import setup_commands
import datetime
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity

#from models import Person

ENV = os.getenv("FLASK_ENV")
static_file_dir = os.path.join(os.path.dirname(os.path.realpath(__file__)), '../public/')
app = Flask(__name__)
app.url_map.strict_slashes = False

# database condiguration
db_url = os.getenv("DATABASE_URL")
if db_url is not None:
    app.config['SQLALCHEMY_DATABASE_URI'] = db_url.replace("postgres://", "postgresql://")
else:
    app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:////tmp/test.db"

app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
MIGRATE = Migrate(app, db, compare_type = True)
db.init_app(app)

# Allow CORS requests to this API
CORS(app)

# add the admin
setup_admin(app)

# add the admin
setup_commands(app)

#iniciar JWT
jwt = JWTManager(app)

# Add all endpoints form the API with a "api" prefix
app.register_blueprint(api, url_prefix='/api')

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

@app.route('/login', methods=['POST'])
def iniciar_sesion():
    request_body = request.get_json()
    user = Influencers.query.filter_by(email=request_body['email']).first()
    if user:
        if user.password == request_body['password']:
            tiempo = datetime.timedelta(days=365)
            access_token = create_access_token(identity = request_body['email'], expires_delta= tiempo)
            return jsonify({
                "mensaje": "inicio de sesion correcto",
                "duracion": tiempo.total_seconds(),
                "access_token": access_token,
                "userig": user.ig_user,
                "error": None
            }),200
        else:
            return jsonify({"error": "Clave Incorrecta"}), 400
    else:
        return jsonify({"error": "user no existe"}), 400

@app.route('/loginempresa', methods=['POST'])
def iniciar_sesionEmpresa():
    request_body = request.get_json()
    user = Empresas.query.filter_by(email=request_body['email']).first()
    if user:
        if user.password == request_body['password']:
            tiempo = datetime.timedelta(minutes=60)
            access_token = create_access_token(identity = request_body['email'], expires_delta= tiempo)
            return jsonify({
                "mensaje": "inicio de sesion correcto",
                "duracion": tiempo.total_seconds(),
                "access_token": access_token,
                "userid": user.id,
                "error": None
            })
        else:
            return jsonify({"error": "Clave Incorrecta"}), 400
    else:
        return jsonify({"error": "user no existe"}), 400
    

@app.route('/vistainflu/<string:ig_user>', methods=['GET'])
@jwt_required()
def privada(ig_user):
    identidad : get_jwt_identity()
    return jsonify({"mensaje":"permiso a espacio privado concedido", "permiso": True})

@app.route('/vistaemp/<int:id>', methods=['GET'])
@jwt_required()
def privadaEmpresa(id):
    identidad : get_jwt_identity()
    return jsonify({"mensaje":"permiso a espacio privado concedido", "permiso": True})

# any other endpoint will try to serve it like a static file
@app.route('/<path:path>', methods=['GET'])
def serve_any_other_file(path):
    if not os.path.isfile(os.path.join(static_file_dir, path)):
        path = 'index.html'
    response = send_from_directory(static_file_dir, path)
    response.cache_control.max_age = 0 # avoid cache memory
    return response

# this only runs if `$ python src/main.py` is executed
if __name__ == '__main__':
    PORT = int(os.environ.get('PORT', 3001))
    app.run(host='0.0.0.0', port=PORT, debug=True)
