from flask import Flask,jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
port = 5000

app.config['SQLALCHEMY_DATABASE_URI']= 'postgresql+psycopg2://joacoeze:joaquinm@localhost:5432/catalogo'
# Si quiere, pueden agregar aca lo mismo q puse yo pero con sus DB, asi prueban las cosas. Pero deberiamos comentar la de los otros al hacer push a las ramas.
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
    es_tendencia = db.Column(db.Boolean)


@app.route("/index.html", methods=['GET']) #que quilombo fue encontrar q la solucion era hacer dos querys idenpendientes pero que compartan endpoint, xq si haces una sola query, el JS se apendeja y no filtra bien o no funciona qsy.
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


if __name__ == '__main__':
    db.init_app(app)
    with app.app_context():
        db.create_all()
    app.run(host='0.0.0.0', debug=True, port=port)