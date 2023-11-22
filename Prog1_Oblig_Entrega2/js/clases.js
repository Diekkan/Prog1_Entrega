// Trabajo realizado por Diego Merentiel (239689)

class Sistema {

    categorias = [];
    experiencias = [];
    compras = [];

    // categorias
    obtenerCategorias(){
        return this.categorias;
    }
    cargarCategoria(categoria) {
        this.categorias.push(categoria);
    }
    removerCategoria(indice) {
        this.categorias.splice(indice, 1);
    }

    //experiencias
    obtenerExperiencias(){
        return this.experiencias;
    }
    cargarExperiencia(experiencia) {
        this.experiencias.push(experiencia);
    }

    removerExperiencia(indice) {
        this.experiencias.splice(indice, 1);
    }

    //compras
    obtenerCompras(){
        return this.compras;
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

    toString(){
        return `Experiencia: ${this.titulo}`;
    }

    obtenerCategoria(){
        return this.categoria;
    }

}

class Compra {

    nombreComprador = "";
    mail = "";
    experiencia = {};
    fecha;
    hora;

    constructor(nombreComprador, mail, experiencia) {
        let fechaCreado = new Date();

        this.nombreComprador = nombreComprador;
        this.mail = mail;
        this.experiencia = experiencia;
        this.fecha = `${fechaCreado.getDate()}/${fechaCreado.getMonth() + 1}/${fechaCreado.getFullYear()}`;
        this.hora = `${fechaCreado.getHours()}:${fechaCreado.getMinutes()}`;
    }

    toString(){
        return `Nombre:${this.nombreComprador} Mail:${this.mail} Fecha:${this.fecha} Hora:${this.hora}`;
    }

    obtenerExperiencia(){
        return this.experiencia;
    }

}