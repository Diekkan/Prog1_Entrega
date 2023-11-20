// Trabajo realizado por Diego Merentiel (239689)

class Sistema {

    categorias = [];
    experiencias = [];
    compras = [];

    cargarCategoria(categoria) {
        this.categorias.push(categoria);
    }
    removerCategoria(indice) {
        this.categorias.splice(indice, 1);
    }

    cargarExperiencia(experiencia) {
        this.experiencias.push(experiencia);
    }

    removerExperiencia(indice) {
        this.experiencias.splice(indice, 1);
    }
    cargarCompra(compra){
        this.compras.push(compra);
    }
}

class Categoria {

    nombre = "";
    detalles = "";

    constructor(nombre, detalles) {
        this.nombre = nombre;
        this.detalles = detalles;
    }

    toString() {
        return `${this.nombre}${this.detalles}`
    }

}

class Experiencia {

    titulo = "";
    descripcion = "";
    precio = 0;
    cantidad = "";
    categoria = {};

    constructor(titulo, descripcion, precio, cantidad, categoria) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.precio = precio;
        this.cantidad = cantidad;
        this.categoria = categoria;
    }

}

class Compra {

    nombreComprador = "";
    mail = "";
    experiencia = {};

    constructor(nombreComprador, mail, experiencia) {
        this.nombreComprador = nombreComprador;
        this.mail = mail;
        this.experiencia = experiencia;
    }

}