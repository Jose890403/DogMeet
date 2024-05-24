"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, User, Post, Comment, Like, Suggestion
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
#---- ENDPOINT PARA LOGEEAR UN USUARIO---

@api.route('/login', methods=['POST'])
def login():
    datos_login = request.json
    email = datos_login.get('email')
    password = datos_login.get('password')

   
    usuario = User.query.filter_by(email=email).first()

    if usuario and usuario.password == password:
         access_token = create_access_token(identity=usuario.id) 
         return jsonify({"token": access_token}), 200
    else:
        return jsonify({'mensaje': 'Usuario y Contraseña no encontrados'}), 401

#----ENDPOINT PARA  REGISTRAR UN USUARIO-------------

@api.route('/signup', methods=['POST'])
def register_User():
    data = request.get_json()
    print(data);
    name = data["name"]
    email = data["email"]
    password = data["password"]
    
    new_user = User(name =name, email=email, password=password)
    db.session.add(new_user)
    db.session.commit()

    response_body = {
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            
        },
        "msg": "El usuario se registró exitosamente"
    }
    return jsonify(response_body), 200 

#---------------CREACION DE UN POST --------------------
@api.route('/post', methods=['POST'])
def handle_create_post():
    data = request.json 
    if 'img' not in data or 'bodytext' not in data:
        return jsonify({"msg": "Missing data"}), 400 
    
    new_post = Post(img=data['img'], bodytext=data['bodytext'])
    db.session.add(new_post)
    db.session.commit()

    # Construir la respuesta JSON
    response_body = {
        "user": {
            "id": new_post.id,
            "img": new_post.img,
            "bodytext": new_post.bodytext,
        },
        "msg": "El segundo post fue creado por Maikel y Jose"
    }
    return jsonify(response_body), 200
#------------CREACION DE COMMENT---------------------

@api.route('/comment', methods=['POST'])
def handle_create_comment():
    data = request.json
    if 'comment' not in data:
        return jsonify({"msg": "Missing data"}), 400
    new_comment = Comment(comment=data['comment'])
    db.session.add(new_comment)
    db.session.commit()
    # Construir la respuesta JSON
    response_body = {
        "comments": {
            "id": new_comment.id,
            "comment": new_comment.comment,
             
        },
        "msg": "El segundo post fue creado por copilot"
    }
    return jsonify(response_body), 200

#------------CREACION DE UN LIKE -----------------------
@api.route('/like', methods=['POST'])
def handle_create_like():
    data = request.json
    if 'like' not in data:
        return jsonify({"msg": "Missing data"}), 400
    new_like = Like(like=data['like'])
    db.session.add(new_like)
    db.session.commit()
    response_body = {
        "user": {
            "id": new_like.id,
            "like": new_like.like,
        },
        "msg": "otra vez la mierda de copilot"
    }
    return jsonify(response_body), 200

#-------------CREACIONDE UNA SUGERANCIA-----------------

@api.route('/suggestion', methods=['POST'])
def handle_create_suggestion():
    data = request.json
  
    new_suggestion = Suggestion(suggestion=data['suggestion'])
    db.session.add(new_suggestion)
    db.session.commit()
    response_body = {
        "user": {
            "id": new_suggestion.id,
            "suggestion": new_suggestion.suggestion,
        },
        "msg": "otra vez la mierda de copilot"
    }
    return jsonify(response_body), 200

#-----------------CREACION DE API`S DE TIPO GET----------------------
#-------------TRAER TODAS LAS SUGERIAS --------------------------
@api.route('/suggestion', methods=['GET'])
def handle_get_suggestion():
    users = Suggestion.query.all()
    users_serialized = []
    for suggestion in users:
        users_serialized.append(suggestion.serialize())
    
    response_body = {
        "suggestion": users_serialized
    }

    return jsonify(response_body), 200
#-------------TRAER TODAS LAS PUBLICACIONES-----------

@api.route('/post', methods=['GET'])
def handle_get_post():
    users = Post.query.all()
    users_serialized = []
    for post in users:
        users_serialized.append(post.serialize())

    response_body = {
        "img": users_serialized,
        "bodytext":users_serialized
    }

    return jsonify(response_body), 200



#----------ACTUALIZAR UN POST-------------------------------
@api.route('/post/<int:post_id>', methods=['PUT'])
def handle_update_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"msg": "Post not found"}), 404
    
    data = request.json
    if 'img' in data:
        post.img = data['img']
    if 'bodytext' in data:
        post.bodytext = data['bodytext']
    
    db.session.commit()

    return jsonify({"msg": "Post updated successfully", "post": post.serialize()}), 200

#----------ELIMINAR UN POST---------------------------------
@api.route('/post/<int:post_id>', methods=['DELETE'])
def handle_delete_post(post_id):
    post = Post.query.get(post_id)
    if not post:
        return jsonify({"msg": "Post not found"}), 404
    
    db.session.delete(post)
    db.session.commit()

    return jsonify({"msg": "Post deleted"}), 200




#--------------------------------------------------------

@api.route('/wipeall', methods=['GET'])
def database_wipe():
    try:
        db.reflect()
        db.drop_all()
        db.session.commit()
    except Exception as e:
        return "mec", 500
    return "ok", 200
