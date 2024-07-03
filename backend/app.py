from flask import Flask,jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
port = 5000

app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://joacoeze:joaquinm@localhost:5432/catalogo'

app.config['SQLALCHEMY_TRACK_MODIFICATIONS']= False

db = SQLAlchemy(app)

CORS(app)

class catalogo(db.Model):
    __tablename__ = 'catalogo'
    id = db.Column(db.Integer, primary_key=True,  autoincrement=True)
    nombre_de_pelicula = db.Column(db.String(100), nullable=False)
    url_imagen = db.Column(db.String(400))
    año_de_estreno = db.Column(db.Integer)
    genero = db.Column(db.String(100))
    duracion = db.Column(db.Integer)
    sinopsis = db.Column(db.String(1000))
    director = db.Column(db.String(200))
    actores_principales = db.Column(db.String(300))
    productora = db.Column(db.String(100))
    pais_de_origen = db.Column(db.String(100))
    puntaje_segun_critica = db.Column(db.Integer)
    url_trailer = db.Column(db.Text)
    es_tendencia = db.Column(db.Boolean)


@app.route("/index.html", methods=['GET'])
def inicio():
    try:
        tendencias = catalogo.query.filter(catalogo.es_tendencia == True).order_by(catalogo.duracion.asc()).all()
        mas_aclamadas = catalogo.query.filter(catalogo.puntaje_segun_critica >= 8).order_by(catalogo.puntaje_segun_critica.desc()).all()

        tendencias_json = []
        for pelicula in tendencias:
            pelicula_dict = {
                'id': pelicula.id,
                'nombre_de_pelicula': pelicula.nombre_de_pelicula,
                'url_imagen': pelicula.url_imagen,
                'es_tendencia': pelicula.es_tendencia,
                'puntaje_segun_critica': pelicula.puntaje_segun_critica
            }
            tendencias_json.append(pelicula_dict)

        mas_aclamadas_json = []
        for pelicula in mas_aclamadas:
            pelicula_dict = {
                'id': pelicula.id,
                'nombre_de_pelicula': pelicula.nombre_de_pelicula,
                'url_imagen': pelicula.url_imagen,
                'es_tendencia': pelicula.es_tendencia,
                'puntaje_segun_critica': pelicula.puntaje_segun_critica
            }
            mas_aclamadas_json.append(pelicula_dict)

        return jsonify({'tendencias': tendencias_json, 'mas_aclamadas': mas_aclamadas_json})
    except Exception as error:
        print('Error', error)
        return jsonify({'message': 'Internal server error'}), 500


@app.route("/api.html", methods=['GET'])
def mostrar_peliculas():
    try:
        peliculas = catalogo.query.order_by(catalogo.nombre_de_pelicula).all()
        peliculas_json = []
        for pelicula in peliculas:
            pelicula_dict = {
                'id': pelicula.id,
                'nombre_de_pelicula': pelicula.nombre_de_pelicula,
                'url_imagen': pelicula.url_imagen,
                'año_de_estreno': pelicula.año_de_estreno,
            }
            peliculas_json.append(pelicula_dict)
        return jsonify({'peliculas': peliculas_json})
    except Exception as error:
        print('Error', error)
        return jsonify({'message': 'Internal server error'}), 500


@app.route("/api.html", methods=['POST'])
def agregar_pelicula():
    try:
        data = request.json
        
        nueva_pelicula = catalogo(
            nombre_de_pelicula=data.get('nombre_de_pelicula'),
            url_imagen=data.get('url_imagen'),
            año_de_estreno=data.get('año_de_estreno'),
            genero=data.get('genero'),
            duracion=data.get('duracion'),
            sinopsis=data.get('sinopsis'),
            director=data.get('director'),
            actores_principales=data.get('actores_principales'),
            productora=data.get('productora'),
            pais_de_origen=data.get('pais_de_origen'),
            puntaje_segun_critica=data.get('puntaje_segun_critica'),
            url_trailer=data.get('url_trailer'),
            es_tendencia=data.get('es_tendencia', False)
        )
        db.session.add(nueva_pelicula)
        db.session.commit()

        return jsonify({'pelicula': {
            'id': nueva_pelicula.id,
            'nombre_de_pelicula': nueva_pelicula.nombre_de_pelicula,
            'url_imagen': nueva_pelicula.url_imagen,
            'año_de_estreno': nueva_pelicula.año_de_estreno,
            'genero': nueva_pelicula.genero,
            'duracion': nueva_pelicula.duracion,
            'sinopsis': nueva_pelicula.sinopsis,
            'director': nueva_pelicula.director,
            'actores_principales': nueva_pelicula.actores_principales,
            'productora': nueva_pelicula.productora,
            'pais_de_origen': nueva_pelicula.pais_de_origen,
            'puntaje_segun_critica': nueva_pelicula.puntaje_segun_critica,
            'url_trailer': nueva_pelicula.url_trailer,
            'es_tendencia': nueva_pelicula.es_tendencia
        }}), 201
    except Exception as error:
        print('Error', error)
        return jsonify({'message': 'Internal server error'}), 500


@app.route("/detalle/detalle.html<id>", methods=['GET'])
def obtener_pelicula(id):
    try:
        pelicula = catalogo.query.get(id)
        if pelicula:
            pelicula_dict = {
                'id': pelicula.id,
                'nombre_de_pelicula': pelicula.nombre_de_pelicula,
                'url_imagen': pelicula.url_imagen,
                'año_de_estreno': pelicula.año_de_estreno,
                'genero': pelicula.genero,
                'duracion': pelicula.duracion,
                'sinopsis': pelicula.sinopsis,
                'director': pelicula.director,
                'actores_principales': pelicula.actores_principales,
                'productora': pelicula.productora,
                'pais_de_origen': pelicula.pais_de_origen,
                'puntaje_segun_critica': pelicula.puntaje_segun_critica,
                'url_trailer': pelicula.url_trailer
            }
        return jsonify({'peliculas': pelicula_dict})
    except Exception as error:
        print('Error', error)
        return jsonify({'message': 'Internal server error'}), 500


@app.route("/detalle/detalle.html", methods=['PUT'])
def modificar_pelicula():
    try:
        id = request.args.get('id')
        data = request.json
        pelicula = catalogo.query.get(id)

        pelicula.nombre_de_pelicula = data.get('nombre_de_pelicula', pelicula.nombre_de_pelicula)
        pelicula.url_imagen = data.get('url_imagen', pelicula.url_imagen)
        pelicula.año_de_estreno = data.get('año_de_estreno', pelicula.año_de_estreno)
        pelicula.genero = data.get('genero', pelicula.genero)
        pelicula.duracion = data.get('duracion', pelicula.duracion)
        pelicula.sinopsis = data.get('sinopsis', pelicula.sinopsis)
        pelicula.director = data.get('director', pelicula.director)
        pelicula.actores_principales = data.get('actores_principales', pelicula.actores_principales)
        pelicula.productora = data.get('productora', pelicula.productora)
        pelicula.pais_de_origen = data.get('pais_de_origen', pelicula.pais_de_origen)
        pelicula.puntaje_segun_critica = data.get('puntaje_segun_critica', pelicula.puntaje_segun_critica)
        pelicula.url_trailer = data.get('url_trailer', pelicula.url_trailer)
        pelicula.es_tendencia = data.get('es_tendencia', pelicula.es_tendencia)

        db.session.commit()
        return jsonify({'pelicula': {
            'id': pelicula.id,
            'nombre_de_pelicula': pelicula.nombre_de_pelicula,
            'url_imagen': pelicula.url_imagen,
            'año_de_estreno': pelicula.año_de_estreno,
            'genero': pelicula.genero,
            'duracion': pelicula.duracion,
            'sinopsis': pelicula.sinopsis,
            'director': pelicula.director,
            'actores_principales': pelicula.actores_principales,
            'productora': pelicula.productora,
            'pais_de_origen': pelicula.pais_de_origen,
            'puntaje_segun_critica': pelicula.puntaje_segun_critica,
            'url_trailer': pelicula.url_trailer,
            'es_tendencia': pelicula.es_tendencia
        }}), 201
    except Exception as error:
        print('Error', error)
        return jsonify({'message': 'Internal server error'}), 500

if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)