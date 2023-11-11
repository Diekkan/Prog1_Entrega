
window.addEventListener("load", inicio);
let sistema = new Sistema();
let cantidadPersonas = ["1 persona", "2 personas", "Más de 2 personas"]

function inicio() {
    actualizarCategorias();
    document.getElementById("idBotonCrearCategoria").addEventListener("click", agregarCategoria);
    document.getElementById("idBotonEliminarCategoria").addEventListener("click", eliminarCategoria);
    document.getElementById("idAgregarExperiencia").addEventListener("click", agregarExperiencia);
}

// Manejo de categorías

function agregarCategoria() {
    if(document.getElementById("idCrearCategorias").reportValidity()){
        let nombre = document.getElementById("idNombreCategoria").value;
        let detalles = document.getElementById("idDetallesCategoria").value;
        let categoria = new Categoria(nombre, detalles);
        sistema.cargarCategoria(categoria);
        actualizarCategorias();
    }
}

function eliminarCategoria(){
    sistema.removerCategoria(document.getElementById("idCategoriaABorrar").selectedIndex);
    actualizarCategorias();
}

function actualizarCategorias() {
    let seleccionarCategorias = document.getElementById("idCategoria");
    let borrarCategorias = document.getElementById("idCategoriaABorrar");
    let categoriasDeExperiencias = document.getElementById("idCategoriaExperiencia");

    seleccionarCategorias.innerHTML = "";
    borrarCategorias.innerHTML = "";
    categoriasDeExperiencias.innerHTML = "";

    for (let categoria of sistema.categorias) {
        let elementoCategoria = document.createElement("option");
        elementoCategoria.innerHTML = categoria.nombre;

        borrarCategorias.appendChild(elementoCategoria.cloneNode(true));
        categoriasDeExperiencias.appendChild(elementoCategoria.cloneNode(true));
        seleccionarCategorias.appendChild(elementoCategoria);
    }
}

// Manejo de experiencias

function agregarExperiencia() {
    let titulo = document.getElementById("idTituloExperiencia").value;
    let descripcion = document.getElementById("idDescripcionExperiencia").value;
    let precio = document.getElementById("idPrecioExperiencia").value;
    let cantidad = document.getElementById("idCantidadExperiencia").selectedIndex;
    let categoria = document.getElementById("idCategoriaExperiencia").selectedIndex;

    let experiencia = new Experiencia(titulo, descripcion, precio, cantidadPersonas[cantidad], categoria);
    sistema.cargarExperiencia(experiencia);
    actualizarExperiencias();
}

function actualizarExperiencias(){
    let verExperiencias = document.getElementById("idExperiencias");
    let experienciaABorrar = document.getElementById("idExperienciaABorrar");

    verExperiencias.innerHTML = "";
    experienciaABorrar.innerHTML = "";

    for(let experiencia of sistema.experiencias) {
        let elementoExperiencia = document.createElement("option");
        elementoExperiencia.innerHTML = experiencia.titulo;
        experienciaABorrar.appendChild(elementoExperiencia);
    }
}

function crearElementoExperiencia(experiencia) {

    let verExperiencias = document.getElementById("idExperiencias");
    let experienciaContenedor = document.createElement("div");
    
    experienciaContenedor.className = "contenedorExperiencia";
    experienciaContenedor.innerHTML = experiencia.titulo;
    verExperiencias.appendChild(experienciaContenedor);
}
