
window.addEventListener("load", inicio);
let sistema = new Sistema();
let cantidadPersonas = ["1 persona", "2 personas", "Más de 2 personas"]
let experienciaSeleccionada = {};
let contenedorExperienciaSeleccionada = {};

function inicio() {
    actualizarCategorias();
    actualizarExperiencias();
    document.getElementById("idBotonAgregarCategoria").addEventListener("click", agregarCategoria);
    document.getElementById("idBotonBajaCategoria").addEventListener("click", eliminarCategoria);
    document.getElementById("idBotonAltaExperiencia").addEventListener("click", agregarExperiencia);
    document.getElementById("idBotonBajaExperiencia").addEventListener("click", eliminarExperiencia);
}

// Manejo de categorías

function agregarCategoria() {
    if(document.getElementById("idFormCategoria").reportValidity()){
        let nombre = document.getElementById("idNombreCategoria").value;
        let detalles = document.getElementById("idDetallesCategoria").value;
        let categoria = new Categoria(nombre, detalles);
        sistema.cargarCategoria(categoria);
        actualizarCategorias();
    }
}

function eliminarCategoria(){
    sistema.removerCategoria(document.getElementById("idComboCategoriasAbajo").selectedIndex);
    actualizarCategorias();
}

function actualizarCategorias() {
    let seleccionarCategorias = document.getElementById("idComboCategoriasIzquierda");
    let borrarCategorias = document.getElementById("idComboCategoriasAbajo");
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
    let cantidad = document.getElementById("idCantidadPersonasExperiencia").selectedIndex;
    let categoria = document.getElementById("idCategoriaExperiencia").selectedIndex;

    let experiencia = new Experiencia(titulo, descripcion, precio, cantidadPersonas[cantidad], categoria);
    sistema.cargarExperiencia(experiencia);
    actualizarExperiencias();
}

function eliminarExperiencia() {
    sistema.removerExperiencia(document.getElementById("idComboBajaExperiencia").selectedIndex);
    actualizarExperiencias();
}

function actualizarExperiencias(){
    let listaExperiencias = document.getElementById("idTabla");
    let experienciaABorrar = document.getElementById("idComboBajaExperiencia");
    
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



// Iterate through sistema.experiencias
for (let i = 0; i < sistema.experiencias.length; i += 2) {
    let nuevaFila = document.createElement("tr");

    let experienciaContenedor1 = crearElementoExperiencia(sistema.experiencias[i]);
    experienciaContenedor1.addEventListener("click", function() {
        seleccionarExperiencia(experienciaContenedor1, sistema.experiencias[i]);
    });
    nuevaFila.appendChild(experienciaContenedor1);
    if (i + 1 < sistema.experiencias.length) {
        let experienciaContenedor2 = crearElementoExperiencia(sistema.experiencias[i + 1]);
        experienciaContenedor2.addEventListener("click", function() {
            seleccionarExperiencia(experienciaContenedor2, sistema.experiencias[i + 1]);
        });
        nuevaFila.appendChild(experienciaContenedor2);
    }
    let elementoExperiencia = document.createElement("option");
    elementoExperiencia.innerHTML = sistema.experiencias[i].titulo;
    experienciaABorrar.appendChild(elementoExperiencia);
    
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
    precio.innerHTML = `$${experiencia.precio}`;
    precio.className = "experienciaPrecio";

    nuevoElemento.appendChild(titulo);
    nuevoElemento.appendChild(descripcion);
    nuevoElemento.appendChild(precio);
    nuevoElemento.appendChild(icono);
    
    return nuevoElemento;
}

function seleccionarExperiencia(experienciaContenedor, experiencia){
    if(experienciaContenedor.classList.contains("selected")){
        experienciaContenedor.classList.remove("selected");
        contenedorExperienciaSeleccionada = {};
        experienciaSeleccionada = {};
    } else {
        if(experienciaContenedor !== contenedorExperienciaSeleccionada){
            console.log("es diferente!")
            console.log(Object.keys(contenedorExperienciaSeleccionada).length > 0)
            if(Object.keys(contenedorExperienciaSeleccionada).length > 0){
                contenedorExperienciaSeleccionada.classList.remove("selected");
                console.log(contenedorExperienciaSeleccionada);
            }
        }
        experienciaContenedor.classList.add("selected"); 
        experienciaSeleccionada = experiencia;
        contenedorExperienciaSeleccionada = experienciaContenedor;
    }
    actualizarExperienciaSeleccionada();
}

function actualizarExperienciaSeleccionada(){
    let experienciaInfo = document.getElementById("idCualExperiencia");
    
    if(Object.keys(experienciaInfo).length > 0){
        experienciaInfo.innerHTML += ` ${experienciaSeleccionada.titulo}`;
    } else {
        experienciaInfo.innerHTML = "Experiencias:";
    }
}