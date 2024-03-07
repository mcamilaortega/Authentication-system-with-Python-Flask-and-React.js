"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
from api.models import db, User
from api.utils import generate_sitemap, APIException
from flask_cors import CORS


api = Blueprint('api', __name__)

# Allow CORS requests to this API
CORS(api)


@api.route('/hello', methods=['POST', 'GET'])
def handle_hello():

    response_body = {
        "message": "Hello! I'm a message that came from the backend, check the network tab on the google inspector and you will see the GET request"
    }

    return jsonify(response_body), 200

@api.route('/signup', methods=['POST'])
def signup():
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify(message='Email and password are required'), 400

    existing_user = User.query.filter_by(email=data['email']).first()
    if existing_user:
        return jsonify(message='Email is already taken'), 400
    user=User(email=data['email'], password=data["password"], is_active=True)
    db.session.add(user)
    db.session.commit()
    return jsonify({'message':" Account created successfully "}), 201


@api.route('/login', methods=['POST'])
def login():
    data = request.get_json()

    if 'email' not in data or 'password' not in data:
        return jsonify(message='Email and password are required'), 400
    user=User.query.filter_by(email=data['email'],password=data['password']).first()
    if user is None:
        return jsonify({"message": "Wrong email or password"}), 401 
    access_token = create_access_token(identity=user.id)
    return jsonify({ "token": access_token, "user_id": user.id })


@api.route('/private', methods=['GET'])
@jwt_required()
def private():
    current_user = get_jwt_identity()
    return jsonify(logged_in_as=current_user), 200

    