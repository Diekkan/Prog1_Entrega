// Trabajo realizado por Diego Merentiel (239689)

window.addEventListener("load", inicio);
let sistema = new Sistema();
let experienciasAMostrar = [];
let experienciasMasCompradas = [];
let comprasAMostrar = [];
let experienciaSeleccionada = {};
let contenedorExperienciaSeleccionada = {};

function inicio() {
	document.getElementById("idComboCategoriasIzquierda").addEventListener("change", function () {
		filtrar();
		filtrarCompras();
		actualizarCompras();
	});
	document.getElementById("idSummary").addEventListener("click", function () {
		filtrarCompras();
		actualizarCompras();
	});
	document.getElementById("idCantidadPersonasCategoria").addEventListener("change", filtrar);
	document.getElementById("idOrdenPrecio").addEventListener("change", filtrar);
	document.getElementById("idBotonAgregarCategoria").addEventListener("click", agregarCategoria);
	document.getElementById("idBotonBajaCategoria").addEventListener("click", eliminarCategoria);
	document.getElementById("idBotonAltaExperiencia").addEventListener("click", agregarExperiencia);
	document.getElementById("idBotonBajaExperiencia").addEventListener("click", eliminarExperiencia);
	document.getElementById("idBotonComprar").addEventListener("click", comprarExperiencia);
}

// Manejo de categorías
function filtrar() {

	experienciasAMostrar = [];

	let categoriaSeleccionada = document.getElementById("idComboCategoriasIzquierda").value;
	let cantidadPersonas = document.getElementById("idCantidadPersonasCategoria").value;
	let orden = document.getElementById("idOrdenPrecio").value;

	if (categoriaSeleccionada == "Todos") {

	} else {
		for (let experiencia of sistema.experiencias) {
			if (experiencia.categoria.nombre === categoriaSeleccionada) {
				if (cantidadPersonas === "todos") {
					experienciasAMostrar.push(experiencia);
				}
				else {
					if (cantidadPersonas === "uno") {
						if (experiencia.cantidad === "uno") {
							experienciasAMostrar.push(experiencia);
						}
					}
					if (cantidadPersonas === "dos") {
						if (experiencia.cantidad === "dos") {
							experienciasAMostrar.push(experiencia);
						}
					}
					if (cantidadPersonas === "varios") {
						if (experiencia.cantidad === "varios") {
							experienciasAMostrar.push(experiencia);
						}
					}
				}
			}
		}
		if (orden == "1") {
			experienciasAMostrar.sort((a, b) => a.precio - b.precio);
		} else {
			experienciasAMostrar.sort((a, b) => b.precio - a.precio);

		}
	}
	actualizarExperiencias()
}

function agregarCategoria() {
	if (document.getElementById("idFormCategoria").reportValidity()) {
		let nombre = document.getElementById("idNombreCategoria").value;
		let flag = false;
		for (let categoria of sistema.categorias) {
			if (categoria.nombre === nombre) {
				flag = true;
			}
		}
		if (flag) {
			return alert("Ya existe una categoría con ese título.")
		}
		let detalles = document.getElementById("idDetallesCategoria").value;
		let categoria = new Categoria(nombre, detalles);
		sistema.cargarCategoria(categoria);
		actualizarCategorias();
	}
}

function eliminarCategoria() {
	let categoria = sistema.categorias[document.getElementById("idComboCategoriasAbajo").selectedIndex];
	let flag = false;
	for (let experiencia of sistema.experiencias) {
		if (experiencia.categoria.nombre === categoria.nombre) {
			flag = true;
		}
	}
	if (flag) {
		return alert("No se puede eliminar la categoría debido a que tiene experiencias registradas.");
	}
	sistema.removerCategoria(
		document.getElementById("idComboCategoriasAbajo").selectedIndex
	);
	actualizarCategorias();
}

function actualizarCategorias() {
	let seleccionarCategorias = document.getElementById(
		"idComboCategoriasIzquierda"
	);
	let borrarCategorias = document.getElementById("idComboCategoriasAbajo");
	let categoriasDeExperiencias = document.getElementById(
		"idCategoriaExperiencia"
	);

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
	if (document.getElementById("idFormExperiencia").reportValidity()) {
		let titulo = document.getElementById("idTituloExperiencia").value;
		let flag = false;
		for (let experiencia of sistema.experiencias) {
			if (experiencia.titulo === titulo) {
				flag = true;
			}
		}
		if (flag) {
			return alert("Ya existe una experiencia con ese título.")
		}
		let descripcion = document.getElementById("idDescripcionExperiencia").value;
		let precio = document.getElementById("idPrecioExperiencia").value;
		let cantidad = document.getElementById("idCantidadPersonasExperiencia").value;
		let categoria = document.getElementById("idCategoriaExperiencia").value;

		categoria = { nombre: categoria };
		let experiencia = new Experiencia(
			titulo,
			descripcion,
			precio,
			cantidad,
			categoria
		);
		sistema.cargarExperiencia(experiencia);

		filtrar();
		actualizarExperiencias();
	}
}

function eliminarExperiencia() {
	let experiencia = sistema.experiencias[document.getElementById("idComboBajaExperiencia").selectedIndex];
	let flag = false;
	for (let compra of sistema.compras) {
		if (compra.experiencia.titulo === experiencia.titulo) {
			flag = true;
		}
	}
	if (flag) {
		return alert("No se puede eliminar la experiencia debido a que ha sido comprada.");
	}
	sistema.removerExperiencia(document.getElementById("idComboBajaExperiencia").selectedIndex);
	filtrar();
	actualizarExperiencias();
}

function calcularExpMasCara() {
	let dato = document.getElementById("idExperienciaMasCara");
	if (sistema.experiencias.length > 0) {
		let valor = Number.MIN_SAFE_INTEGER;
		for (let experiencia of sistema.experiencias) {
			if (experiencia.precio > valor) {
				valor = experiencia.precio;
			}
		}
		dato.innerHTML = valor;
	} else {
		dato.innerHTML = "Sin datos.";
	}

}

function actualizarExperiencias() {

	let listaExperiencias = document.getElementById("idTabla");
	let experienciaABorrar = document.getElementById("idComboBajaExperiencia");

	listaExperiencias.innerHTML = "";
	experienciaABorrar.innerHTML = "";

	if (experienciasAMostrar.length === 0) {
		let fila = document.createElement("tr");
		let sinExperiencias = document.createElement("td");
		sinExperiencias.innerHTML = "Sin datos.";
		fila.appendChild(sinExperiencias);
		listaExperiencias.appendChild(fila);
	}

	let nuevaFila = document.createElement("tr");
	for (let i = 0; i < experienciasAMostrar.length; i += 2) {
		let nuevaFila = document.createElement("tr");

		let experienciaContenedor1 = crearElementoExperiencia(experienciasAMostrar[i]);
		experienciaContenedor1.addEventListener("click", function () {
			seleccionarExperiencia(experienciaContenedor1, experienciasAMostrar[i]);
		});
		nuevaFila.appendChild(experienciaContenedor1);
		if (i + 1 < experienciasAMostrar.length) {
			let experienciaContenedor2 = crearElementoExperiencia(experienciasAMostrar[i + 1]);
			experienciaContenedor2.addEventListener("click", function () {
				seleccionarExperiencia(experienciaContenedor2, experienciasAMostrar[i + 1]);
			});
			nuevaFila.appendChild(experienciaContenedor2);
		}

		listaExperiencias.appendChild(nuevaFila);
	}
	for (let experiencia of sistema.experiencias) {
		let elementoExperiencia = document.createElement("option");
		elementoExperiencia.innerHTML = experiencia.titulo;
		experienciaABorrar.appendChild(elementoExperiencia);
	}
	calcularExpMasCara();
}

function crearElementoExperiencia(experiencia) {
	let nuevoElemento = document.createElement("td");
	nuevoElemento.className = "contenedorExperiencia";

	let titulo = document.createElement("p");
	let descripcion = document.createElement("p");
	let precio = document.createElement("p");
	let icono = document.createElement("img");

	icono.className = "experienciaIcono";
	if (experiencia.cantidad === "uno") {
		icono.src = "./img/uno.png";
	} else {
		if (experiencia.cantidad === "dos") {
			icono.src = "./img/dos.png";
		} else {
			icono.src = "./img/muchos.png";
		}
	}

	titulo.innerHTML = experiencia.titulo;
	titulo.className = "experienciaTitulo";
	descripcion.innerHTML = experiencia.descripcion;
	descripcion.className = "experienciaDescripcion";
	precio.innerHTML = `$${experiencia.precio}`;
	precio.className = "experienciaPrecio";

	nuevoElemento.appendChild(titulo);
	nuevoElemento.appendChild(descripcion);
	nuevoElemento.appendChild(precio);
	nuevoElemento.appendChild(icono);

	return nuevoElemento;
}

function seleccionarExperiencia(experienciaContenedor, experiencia) {
	let listaExperiencias = document.getElementById("idTabla").childNodes;
	if (experiencia === experienciaSeleccionada) {
		contenedorExperienciaSeleccionada = {};
		experienciaSeleccionada = {};
		experienciaContenedor.classList.remove("selected");
	} else {
		for (let experiencia of listaExperiencias) {
			experiencia.classList.remove("selected");
			for (let experienciaTd of experiencia.childNodes) {
				experienciaTd.classList.remove("selected");
			}
		}
		experienciaContenedor.classList.add("selected");
		experienciaSeleccionada = experiencia;
		contenedorExperienciaSeleccionada = experienciaContenedor;
	}
	actualizarExperienciaSeleccionada(experienciaSeleccionada);
}

function actualizarExperienciaSeleccionada(experienciaSeleccionada) {
	let experienciaInfo = document.getElementById("idCualExperiencia");
	if (Object.keys(experienciaSeleccionada).length > 0) {
		experienciaInfo.innerHTML = `Experiencia: ${experienciaSeleccionada.titulo}`;
	} else {
		experienciaInfo.innerHTML = "Experiencia:";
	}
}

// Manejo de compras

function calcularExpMasComprada() {
	let contadorExp = {};

	if (sistema.compras) {
		for (let compra of sistema.compras) {
			let nombreExp = compra.experiencia.titulo;
			if (!contadorExp[nombreExp]) {
				contadorExp[nombreExp] = 1;
			} else {
				contadorExp[nombreExp]++;
			}
		}

		let cantidadMax = Number.MIN_SAFE_INTEGER;

		for (let cantVeces in contadorExp) {
			if (contadorExp[cantVeces] > cantidadMax) {
				cantidadMax = contadorExp[cantVeces];
			}
		}

		for (let cantVeces in contadorExp) {
			if (contadorExp[cantVeces] === cantidadMax) {
				experienciasMasCompradas.push(cantVeces);
			}
		}
	} else {
		experienciasMasCompradas = [];
	}
}
function comprarExperiencia() {
	if (experienciaSeleccionada) {
		if (document.getElementById("idFormCompra").reportValidity()) {
			let nombreComprador = document.getElementById("idNombreComprador").value;
			let mail = document.getElementById("idMail").value;
			let compra = new Compra(nombreComprador, mail, experienciaSeleccionada);
			sistema.cargarCompra(compra);
			actualizarCompras();
			filtrarCompras();
		}
	}
}

function filtrarCompras() {
	comprasAMostrar = [];
	let categoriaSeleccionada = document.getElementById("idComboCategoriasIzquierda").value;
	if (categoriaSeleccionada) {
		for (let compra of sistema.compras) {
			if (compra.experiencia.categoria.nombre === categoriaSeleccionada) {
				comprasAMostrar.push(compra);
			}
		}
	}
}

function actualizarCompras() {
	experienciasMasCompradas = [];
	calcularExpMasComprada();

	let expMasCompradas = document.getElementById("idExperienciasMasCompradas");
	if (experienciasMasCompradas) {
		expMasCompradas.innerHTML = "";
		for (let experiencia of experienciasMasCompradas) {
			let bulletExp = document.createElement("li");
			bulletExp.innerHTML = experiencia;
			expMasCompradas.appendChild(bulletExp);
		}
	}
	let detallesCategoria = document.getElementById("idDetallesCualCategoria");
	let listaCompras = document.getElementById("idListaCompras");
	detallesCategoria.innerHTML = "";
	listaCompras.innerHTML = "";

	if (comprasAMostrar.length > 0) {
		let categoriaSeleccionada = document.getElementById("idComboCategoriasIzquierda").value;
		detallesCategoria.innerHTML = `Información detallada de la categoría ${categoriaSeleccionada}`;

		for (let compra of comprasAMostrar) {
			let fecha = new Date();
			let yyyy = fecha.getFullYear();
			let mm = fecha.getMonth() + 1;
			let dd = fecha.getDate();
			let compraInformacion = `Nombre: ${compra.nombreComprador} Mail: ${compra.mail}
									 Fecha: ${dd}/${mm}/${yyyy} Hora: ${fecha.getHours()}:${fecha.getMinutes()}`;
			let bulletCompra = document.createElement("li");
			bulletCompra.innerHTML = compraInformacion;
			listaCompras.appendChild(bulletCompra);
		}
	}
	else {

		let bulletNoInfo = document.createElement("li");
		bulletNoInfo.innerHTML = "Sin datos.";
		listaCompras.appendChild(bulletNoInfo);
	}

}