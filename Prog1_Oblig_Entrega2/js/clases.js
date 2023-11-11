class Sistema {

    categorias = [
        {nombre: "Gastronomía", detalles: "Cocina y demás"},
        {nombre: "Aire Libre", detalles: "Actividades afuera"},
        {nombre: "Fiestas", detalles: "Baile"},
    ];
    experiencias = [];
    compras = [];

    cargarCategoria(categoria) {
        this.categorias.push(categoria);
    }
    /*removerCategoria(nombreCategoria) {
        let indiceAEliminar = this.categorias.findIndex(categoria => categoria.nombre === nombreCategoria);
        if (indiceAEliminar !== -1) {
            this.categorias.splice(indiceAEliminar, 1);
        }
    }*/
    removerCategoria(indice) {
        this.categorias.splice(indice, 1);
    }

    cargarExperiencia(experiencia) {
        this.experiencias.push(experiencia);
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
    cantidad = 0;
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