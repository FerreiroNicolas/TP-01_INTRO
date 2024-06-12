import sys
from flask import Flask,jsonify
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
    id = db.Column(db.Integer, primary_key=True)
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


@app.route("/api.html", methods=['GET'])
def obtener_peliculas():
    try:
        peliculas = catalogo.query.order_by(catalogo.nombre_de_pelicula).all()
        peliculas_json = []
        for pelicula in peliculas:
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
            peliculas_json.append(pelicula_dict)
        return jsonify({'peliculas': peliculas_json})
    except Exception as error:
        print('Error', error)
        return jsonify({'message': 'Internal server error'}), 500


if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)