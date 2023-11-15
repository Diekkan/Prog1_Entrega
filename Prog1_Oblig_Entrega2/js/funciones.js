
window.addEventListener("load", inicio);
let sistema = new Sistema();
let cantidadPersonas = ["1 persona", "2 personas", "Más de 2 personas"]

function inicio() {
    actualizarCategorias();
    actualizarExperiencias();
    document.getElementById("idBotonCrearCategoria").addEventListener("click", agregarCategoria);
    document.getElementById("idBotonEliminarCategoria").addEventListener("click", eliminarCategoria);
    document.getElementById("idAgregarExperiencia").addEventListener("click", agregarExperiencia);
    document.getElementById("idBotonEliminarExperiencia").addEventListener("click", eliminarExperiencia);
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

function eliminarExperiencia() {
    sistema.removerExperiencia(document.getElementById("idExperienciaABorrar").selectedIndex);
    actualizarExperiencias();
}

function actualizarExperiencias(){
    console.log(sistema.experiencias);
    let listaExperiencias = document.getElementById("idListaExperiencias");
    let experienciaABorrar = document.getElementById("idExperienciaABorrar");
    
    listaExperiencias.innerHTML = "";

    experienciaABorrar.innerHTML = "";
    if(sistema.experiencias.length === 0){
        let fila = document.createElement("tr");
        let sinExperiencias = document.createElement("td");
        sinExperiencias.innerHTML = "Sin datos.";
        fila.appendChild(sinExperiencias);
        listaExperiencias.appendChild(fila);
    }
/*
    let nuevaFila = document.createElement("tr");
    let flag = false;
    for (let i = 0; i < sistema.experiencias.length; i++) {

        let elementoExperiencia = document.createElement("option");
        elementoExperiencia.innerHTML = sistema.experiencias[i].titulo;
        experienciaABorrar.appendChild(elementoExperiencia);

        let experienciaContenedor = crearElementoExperiencia(sistema.experiencias[i]);
        nuevaFila.appendChild(experienciaContenedor);

        if( i % 2 === 0){
            flag = true;
            listaExperiencias.appendChild(nuevaFila);
            nuevaFila = document.createElement("tr");
        }
    }
    if(!flag){
        console.log("Hola appendeame")
        listaExperiencias.appendChild(nuevaFila);
    }

    console.log(listaExperiencias);
    */
    let nuevaFila = document.createElement("tr");;

    for (let i = 1; i <= sistema.experiencias.length; i++) {
        let elementoExperiencia = document.createElement("option");
        elementoExperiencia.innerHTML = sistema.experiencias[i].titulo;
        experienciaABorrar.appendChild(elementoExperiencia);
    
        let experienciaContenedor = crearElementoExperiencia(sistema.experiencias[i]);
    
        if (i % 2 === 0) {
            nuevaFila = document.createElement("tr");
        }
    
        nuevaFila.appendChild(experienciaContenedor);
    
        if (i % 2 !== 0 || i === sistema.experiencias.length) {
            listaExperiencias.appendChild(nuevaFila);
        }
    }
    
    if (sistema.experiencias.length % 2 === 0) {
        listaExperiencias.appendChild(nuevaFila);
    }
    
}

function crearElementoExperiencia(experiencia) {

    let nuevoElemento = document.createElement("td");
    nuevoElemento.className = "contenedorExperiencia";

    let titulo = document.createElement("p");
    let descripcion = document.createElement("p");
    let precio = document.createElement("p");
    let icono = document.createElement("img");

    icono.className = "experienciaIcono";
    if(experiencia.cantidad === "1 persona"){
        icono.src = "./img/uno.png";
    }
    else{
        if(experiencia.cantidad === "2 personas"){
            icono.src = "./img/dos.png";
        }
        else{
            icono.src = "./img/muchos.png";
        }
    }

    titulo.innerHTML = experiencia.titulo;
    titulo.className = "experienciaTitulo";
    descripcion.innerHTML = experiencia.descripcion;
    descripcion.className = "experienciaDescripcion"
    precio.innerHTML = experiencia.precio;
    precio.className = "experienciaPrecio";

    nuevoElemento.appendChild(titulo);
    nuevoElemento.appendChild(descripcion);
    nuevoElemento.appendChild(precio);
    nuevoElemento.appendChild(icono);
    
    return nuevoElemento;
}
