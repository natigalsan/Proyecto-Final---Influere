"""
This module takes care of starting the API Server, Loading the DB and Adding the endpoints
"""
from flask import Flask, request, jsonify, url_for, Blueprint
from api.models import db, Influencers, Empresas, Favoritos
from api.utils import generate_sitemap, APIException
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity
import datetime
import instaloader

api = Blueprint('api', __name__)

@api.route('/instagram/<string:username>', methods=["GET"])
def datos_instagram(username):
    bot = instaloader.Instaloader()
    profile = instaloader.Profile.from_username(bot.context, username)
    result = {}
    result["followers"] = profile.followers
    result["profilepic"] = profile.profile_pic_url
    result["seguidos"] = profile.followees
    result["publicaciones"] = profile.mediacount
    return jsonify(result)

@api.route('/influencers/<string:ig_user>', methods=['GET'])
def conseguir_influencers(ig_user):
    influencer = Influencers.query.filter_by(ig_user=ig_user).first()
    if influencer:
        return influencer.serialize()
    else:
        return jsonify({"mensaje":"influencer no existente"})




@api.route('/influencers', methods=['GET'])
def all_influencers():
         
    allinfluencer = Influencers.query.all()
    if allinfluencer:
        allinfluencer = list(map(lambda x: x.serialize(), allinfluencer))
        return jsonify(allinfluencer)
    else:
        return jsonify({"mensaje":"no se encontraron influencers"})

@api.route('/influencers/filter', methods=['POST'])
def influencers_filter():
    print("aqui")
    request_body = request.get_json()
    categoria = request_body['categoria']
    seguidores = request_body['seguidores']
    ubicacion = request_body['ubicacion']
    precioPubli = request_body['precioPubli']
    print(ubicacion)
    filters = []
    if (categoria != ""):
        filters.append(getattr(Influencers, 'categoria') == categoria)
    if (seguidores != ""):
        if (seguidores == "1"):
            filters.append(getattr(Influencers, 'seguidores') < 100000)
        if (seguidores == "2"):
            filters.append(getattr(Influencers, 'seguidores') >= 100000)
            filters.append(getattr(Influencers, 'seguidores') < 500000)
        if (seguidores == "3"):
            filters.append(getattr(Influencers, 'seguidores') >= 500000)
            filters.append(getattr(Influencers, 'seguidores') < 1000000)
        if (seguidores == "4"):
            filters.append(getattr(Influencers, 'seguidores')>= 1000000)
    if (ubicacion != ""):
        filters.append(getattr(Influencers, 'autonomia') == ubicacion)
    if (precioPubli != ""):
        if (precioPubli == "1"):
            filters.append(getattr(Influencers, 'precio_post') < 100)
        if (precioPubli == "2"):
            filters.append(getattr(Influencers, 'precio_post') >= 100)
            filters.append(getattr(Influencers, 'precio_post') < 300)
        if (precioPubli == "3"):
            filters.append(getattr(Influencers, 'precio_post') >= 300)
            filters.append(getattr(Influencers, 'precio_post') < 500)
        if (precioPubli == "4"):
            filters.append(getattr(Influencers, 'precio_post') >= 500)

    allinfluencer = Influencers.query.filter(*filters)
    if allinfluencer:
        allinfluencer = list(map(lambda x: x.serialize(), allinfluencer))
        return jsonify(allinfluencer)
    else:
        return jsonify({"mensaje":"no se encontraron influencers"})

@api.route('/influencers/<string:ig_user>', methods=['PUT'])
def modificar_influencers(ig_user):
    influencer = Influencers.query.filter_by(ig_user=ig_user).first()
    body = request.get_json()
    influencer.nombre = body["nombre"]
    influencer.email = body["email"]
    influencer.password = body["password"]
    influencer.apellidos = body["apellidos"]
    influencer.ig_user = body["ig_user"]
    influencer.categoria = body["categoria"]
    influencer.autonomia = body["autonomia"]
    influencer.ciudad = body["ciudad"]
    influencer.bio = body["bio"]
    influencer.precio_post = body["precio_post"]
    influencer.precio_story = body["precio_story"]
    
    if "seguidores" in body:
        influencer.seguidores = body["seguidores"]

    if "post1" in body:
        influencer.post1 = body["post1"]
    if "post2" in body:
        influencer.post2 = body["post2"]
    if "post3" in body:
        influencer.post3 = body["post3"]
    if "post4" in body:
        influencer.post4 = body["post4"]
    if "post5" in body:
        influencer.post5 = body["post5"]
    if "post6" in body:
        influencer.post6 = body["post6"]
    db.session.commit()
    return jsonify({"message":"Informacion actualizada"})

@api.route('/empresas/<int:id>', methods=['GET'])
def conseguir_empresas(id):
    empresas = Empresas.query.get(id)
    if empresas:
        return empresas.serialize()
    else:
        return jsonify({"mensaje":"usuario no existente"})

@api.route('/empresas/<int:id>', methods=['PUT'])
def modificar_empresas(id):
    empresas = Empresas.query.get(id)
    body = request.get_json()
    empresas.nombre = body["nombre"]
    empresas.email = body["email"]
    empresas.password = body["password"]
    empresas.apellidos = body["apellidos"]
    empresas.razon_social = body["razon_social"]
    empresas.sector = body["sector"]
    empresas.autonomia = body["autonomia"]
    empresas.ciudad = body["ciudad"]
    empresas.bio = body["bio"]
    db.session.commit()

    return jsonify({"message":"Informacion actualizada"})

@api.route('/registro-empresas', methods=['POST'])
def registro_empresas():
    
    body = request.get_json()
    email_exists = Empresas.query.filter_by(email=body["email"]).first()

    if email_exists:
        print("This user already exists")
    else:
        empresas = Empresas(email=body["email"], password=body["password"], apellidos=body["apellidos"], nombre=body["nombre"], razon_social=body["razon_social"], sector=body["sector"], autonomia = body["autonomia"], ciudad = body["ciudad"], bio = body["bio"])    
        db.session.add(empresas)
        db.session.commit()
    
    print("POST recibido")
    response_body = {
        "message": "User created"
    }

    return jsonify(response_body), 200

@api.route('/registro-influencers', methods=['POST'])
def registro_influencers():
    
    body = request.get_json()
    email_exists = Influencers.query.filter_by(email=body["email"]).first()
    user_exists = Influencers.query.filter_by(ig_user=body["ig_user"]).first()

    if email_exists:
        return ("Este email ya ha sido registrado")
    elif user_exists:
        return ("Este usuario de Instagram ya ha sido registrado")
    else:
        influencers = Influencers(email=body["email"], password=body["password"], apellidos=body["apellidos"], nombre=body["nombre"], ig_user=body["ig_user"], categoria=body["categoria"], autonomia = body["autonomia"], ciudad = body["ciudad"], bio = body["bio"],post1=body["post1"], precio_post=body["precio_post"], precio_reel=body["precio_reel"], precio_story=body["precio_story"], seguidores=body["seguidores"], profilepic=body["profilepic"])
        if "post2" in body:
            influencers.post2 = body["post2"]
        if "post3" in body:
            influencers.post3 = body["post3"]
        if "post4" in body:
            influencers.post4 = body["post4"]
        if "post5" in body:
            influencers.post5 = body["post5"]
        if "post6" in body:
            influencers.post6 = body["post6"]
        db.session.add(influencers)
        db.session.commit()
    
    print("POST recibido")
    response_body = {
        "message": "User created"
    }

    return jsonify(response_body), 200

@api.route('/favoritos', methods=['POST'])
def addFavInfluencers():
    
    body = request.get_json()
    fav_exists = Favoritos.query.filter_by(empresa_id = body["empresa_id"], influencer_id = body["influencer_id"]).first()
    # fav_exists = Favoritos(empresa_id = body["empresa_id"], influencer_id = body["influencer_id"])
    if fav_exists:
        return ("Este usuario ya fue agregado a favoritos")
    else:
        fav_Influ = Favoritos(empresa_id = body["empresa_id"], influencer_id = body["influencer_id"])

        db.session.add(fav_Influ)
        db.session.commit()
    
    print("POST recibido")
    response_body = {
        "message": "Agregado a favoritos"
    }

    return jsonify(response_body), 200

@api.route('/favoritos/<int:id>', methods = ['GET'])
def conseguirFav(id): 
        fav = Favoritos.query.filter_by(empresa_id=id).all()
        fav = list(map(lambda x: x.serialize(),fav))
       
        datosInflu=[]
        for i in fav:
            influ =Influencers.query.filter_by(ig_user=i['influencer']).first()
            datosInflu.append(influ.serialize())
        if datosInflu:
            return jsonify({"datos": datosInflu})
        else:
            return jsonify({"mensaje":"usuario no fue agregado a favorito"})


@api.route('/favoritos/<int:id>/<string:ig_user>', methods = ['DELETE'])
def deleteFav(id, ig_user):
    fav = Favoritos.query.filter_by(empresa_id=id).filter_by(influencer_id= ig_user).first()
    if fav: 
        db.session.delete(fav)
    # for i in fav:
    #     influ= Influencers.query.filter_by(ig_user=i['influencer']).first()
    # if influ: 
    #     db.session.delete(inlfu)
        db.session.commit()
        return jsonify(({'mensaje': 'El influencer se ha eliminado con éxito'}))
    else:
        return jsonify({'resultado': 'Este usuario no pudo eliminarse de la lista de favoritos'})








