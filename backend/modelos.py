from datetime import datetime
from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

id = db.Column(db.Integer, primary_key=True,  autoincrement=True)

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
    opiniones = db.relationship('opiniones')


class opiniones(db.Model):
    __tablename__ = 'opiniones'
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_pelicula = db.Column(db.Integer, db.ForeignKey('catalogo.id'), nullable=False)
    opinion = db.Column(db.Text, nullable=False)
    puntaje = db.Column(db.Numeric(3, 1), nullable=False)
    fecha_opinion = db.Column(db.DateTime, default=datetime.now)