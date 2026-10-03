"use strict";

/* =====================================================
   EL PUESTITO · script.js
   Secciones (buscalas por estos títulos):
   0 CONFIGURACIÓN · 1 PRODUCTOS · 2 UTILIDADES · 3 LOCALSTORAGE
   4 RENDERIZADO · 5 BÚSQUEDA · 6 CATEGORÍAS · 7 CAPAS (abrir/cerrar)
   8 MODAL · 9 CARRITO · 10 NOTIFICACIONES · 11 WHATSAPP
   12 ADMINISTRACIÓN · 13 EVENTOS E INICIO
   ===================================================== */


/* =====================================================
   0. CONFIGURACIÓN  (lo que vas a tocar más seguido)
   ===================================================== */

// Número de WhatsApp del negocio: formato internacional, solo números (sin +, espacios ni guiones).
// Es el mismo que ya tenías en tu script anterior. Cambialo acá y se actualiza en toda la página.
const numeroWhatsApp = "5491126162963";

const CLAVE_CARRITO = "carrito";        // nombre con el que se guarda el carrito en el navegador
const UMBRAL_POCO_STOCK = 5;            // con 5 unidades o menos se muestra "Últimas unidades"
const DURACION_NOTIFICACION = 2600;     // milisegundos que se ve cada aviso

// Categorías del menú. Para agregar una: sumá una línea { id, nombre }.
// "id" debe coincidir (sin tildes ni mayúsculas) con el campo "categoria" de tus productos.
// Si un producto usa una categoría que no está acá, el botón se crea solo.
const CATEGORIAS = [
  { id: "todos", nombre: "Todos" },
  { id: "limpieza", nombre: "Limpieza" },
  { id: "higiene", nombre: "Higiene" },
  { id: "almacen", nombre: "Almacén" },
  { id: "papeles", nombre: "Papeles" },
  { id: "promociones", nombre: "Promociones" }   // especial: muestra los productos con promo
];

// Imagen que se muestra si una foto no existe o no carga
const IMAGEN_RESPALDO = "data:image/svg+xml;utf8," + encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200"><rect width="200" height="200" fill="#eceff5"/>' +
  '<text x="100" y="108" font-family="Arial" font-size="16" fill="#5d6980" text-anchor="middle">Sin imagen</text></svg>'
);

// Si una foto falla, se reemplaza por la imagen de respaldo (una sola vez, para no entrar en bucle)
document.addEventListener("error", function (e) {
  const img = e.target;
  if (img && img.tagName === "IMG" && !img.dataset.respaldo) {
    img.dataset.respaldo = "1";
    img.src = IMAGEN_RESPALDO;
  }
}, true);


/* =====================================================
   1. PRODUCTOS
   -----------------------------------------------------
   Plantilla completa de un producto:
   {
     nombre: "Nombre",
     precio: 1000,
     imagen: "images/archivo.webp",
     categoria: "limpieza",
     stock: true,            // true = hay | false = agotado | número (ej. 12) = unidades
     destacado: false,       // true = aparece en "Productos destacados"
     promo: false,           // true = "Oferta" | "3×$2500" = texto propio de la etiqueta
     descripcion: "",        // texto que se ve en el detalle
     // Opcionales para el futuro (ya funcionan si los completás):
     precioPromo: 900,       // precio con descuento (reemplaza a "precio" en la venta)
     precioAnterior: 1200    // precio tachado; el % de descuento se calcula solo
   }
   Los campos que no uses podés dejarlos afuera. El "id" se genera solo a partir del nombre.
   ===================================================== */
const productos = [
  { nombre: "Magistral Ultra", precio: 3000, imagen: "images/magistral-ultra.jpg", categoria: "limpieza", stock: true },
  { nombre: "Magistral Repuesto 450 ml", precio: 2500, destacado: true, imagen: "images/magistral-repuesto-450ml.jpg", categoria: "limpieza", stock: true },
  { nombre: "Colgate Triple Acción", precio: 3000, destacado: true, imagen: "images/colgate-triple-accion.jpg", categoria: "higiene", stock: true },
  { nombre: "Colgate Original 180g", precio: 3000, imagen: "images/colgate-original-180g.jpg", categoria: "higiene", stock: true },
  { nombre: "Dove Original", precio: 1500, imagen: "images/dove-original.jpg", categoria: "higiene", stock: true },
  { nombre: "Axe Desodorante Apolo", precio: 4000, imagen: "images/axe-desodorante-apolo.jpg", categoria: "higiene", stock: true },
  { nombre: "Axe Desodorante Black", precio: 4000, imagen: "images/axe-desodorante-black.jpg", categoria: "higiene", stock: true },
  { nombre: "Babysec Toallitas 50", precio: 2000, imagen: "images/babysec-toallitas-50.jpg", categoria: "papeles", stock: true },
  { nombre: "Fideos Molto Largos", precio: 850, destacado: true, promo: "3×$2500", imagen: "images/fideos-molto-largos.jpg", categoria: "almacen", stock: true },
  { nombre: "Morenita Saquitos", precio: 4000, imagen: "images/Caffe-morenita-saquitos.jpg", categoria: "almacen", stock: true },
  { nombre: "Rexona Odorono 60g", precio: 2000, imagen: "images/rexona-odorono-60gr.jpg", categoria: "higiene", stock: true },
  { nombre: "Pitusas Black", precio: 1000, imagen: "images/ Pitusas-black.webp", categoria: "almacen", stock: true },
  { nombre: "Alcohol Duplex", precio: 2000, imagen: "images/Alcohol-duplex.jpeg", categoria: "higiene", stock: true },
  { nombre: "Arroz Molto Largo Fino", precio: 1300, imagen: "images/Arroz-molto-largo-fino.jpg", categoria: "almacen", stock: true },
  { nombre: "Cif 500 ml", precio: 2500, imagen: "images/Cif-500-ml.jpeg", categoria: "limpieza", stock: true },
  { nombre: "Dove Invisible Care", precio: 4000, imagen: "images/Dave-invicible-care.webp", categoria: "higiene", stock: true },
  { nombre: "Esponjas Virulana", precio: 1000, imagen: "images/Espojas-virulana.jpg", categoria: "limpieza", stock: true },
  { nombre: "Jabón en Polvo 800g", precio: 2800, imagen: "images/Jabon-en-polvo-800g.webp", categoria: "limpieza", stock: true },
  { nombre: "Jabón Qué Linda", precio: 1500, imagen: "images/Jabon-que-linda.webp", categoria: "higiene", stock: true },
  { nombre: "Mini Coronitas", precio: 1000, imagen: "images/Mini-coronitas-.webp", categoria: "almacen", stock: true },
  { nombre: "Mini Pitusas Frutilla", precio: 1000, imagen: "images/Mini-pitusas-frutilla.webp", categoria: "almacen", stock: true },
  { nombre: "Neosol Dulces Pack de 3", precio: 1500, imagen: "images/Neosol-dulces-pack-de-3.jpeg", categoria: "almacen", stock: true },
  { nombre: "Nocturna Suave 16", precio: 4500, imagen: "images/Nocturna-suave-16.jpg", categoria: "higiene", stock: true },
  { nombre: "Plusbelle Frescura", precio: 3500, imagen: "images/Plusbelle-frescura.jpg", categoria: "higiene", stock: true },
  { nombre: "Rexona Antibac Dama", precio: 3000, imagen: "images/Reaxona-antibac-dama.webp", categoria: "higiene", stock: true },
  { nombre: "Rexona Control Inteligente", precio: 3000, imagen: "images/Reaxona-control-inteligente.webp", categoria: "higiene", stock: true },
  { nombre: "Surtido Bagley", precio: 2500, imagen: "images/Surtido-bagley.jpeg", categoria: "almacen", stock: true },
  { nombre: "esponjas de acero", precio: 1000, imagen: "images/Virulana.webp", categoria: "limpieza", stock: true },
  { nombre: "Yerba Canarias 1kg", precio: 12000, imagen: "images/Yerba-canarias-1kg.jpg", categoria: "almacen", stock: true },
  { nombre: "Yerba Mañanita 500ml", precio: 1800, imagen: "images/Yerba-mañanita-500ml.jpg", categoria: "almacen", stock: true },
  { nombre: "Esencial Limón", precio: 1000, imagen: "images/esencial-limon.png", categoria: "limpieza", stock: true },
  { nombre: "Jabón de Tocador Plusbelle Frescura 90g", precio: 1000, imagen: "images/jabon-de-toc-plusbelle-frescura.jpg", categoria: "higiene", stock: true }
];


/* =====================================================
   ESTADO GLOBAL
   ===================================================== */
const estado = { categoria: "todos", busqueda: "" };
let carrito = [];              // [{ id, nombre, precio, cantidad }]
let categoriasActivas = [];    // lista final de categorías (config + las que aparezcan en productos)
let productoModalId = null;    // producto abierto en el modal
let cantidadModal = 1;         // cantidad elegida en el modal


/* =====================================================
   2. UTILIDADES
   ===================================================== */

// Busca un elemento por id. Si no existe devuelve null (y el resto del código lo controla).
function obtenerEl(id) { return document.getElementById(id); }

// Quita mayúsculas y tildes: "Jabón" → "jabon". Sirve para buscar sin errores.
function normalizarTexto(texto) {
  return String(texto == null ? "" : texto).toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "").trim();
}

// Evita que un texto con < > " rompa el HTML (protege el renderizado).
function escaparHTML(texto) {
  const mapa = { "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" };
  return String(texto == null ? "" : texto).replace(/[&<>"']/g, function (c) { return mapa[c]; });
}

function capitalizar(texto) {
  const t = String(texto || "").trim();
  return t.charAt(0).toUpperCase() + t.slice(1);
}

function esPrecioValido(n) { return typeof n === "number" && Number.isFinite(n) && n > 0; }
function formatearPrecio(n) { return "$" + Number(n).toLocaleString("es-AR"); }

// ¿El producto tiene los datos mínimos? (nombre de texto). Los inválidos se descartan al iniciar.
function productoValido(p) {
  return p && typeof p === "object" && typeof p.nombre === "string" && p.nombre.trim() !== "";
}

// Quita del array los productos inválidos y avisa por consola cuáles eran.
function limpiarProductos() {
  for (let i = productos.length - 1; i >= 0; i--) {
    if (!productoValido(productos[i])) {
      console.warn("Producto descartado por no tener nombre válido:", productos[i]);
      productos.splice(i, 1);
    }
  }
}

// Le da a cada producto un "id" único (a partir del nombre) para identificarlo en carrito y modal.
function generarIds() {
  const usados = new Set();
  productos.forEach(function (p, i) {
    let base = p.id ? String(p.id) : normalizarTexto(p.nombre).replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    if (!base) base = "producto-" + (i + 1);
    let id = base, n = 2;
    while (usados.has(id)) { id = base + "-" + n; n++; }
    usados.add(id);
    p.id = id;
  });
}

function obtenerProducto(id) {
  return productos.find(function (p) { return p.id === id; }) || null;
}

// --- Precios (preparado para precio anterior / promocional / % de descuento) ---
function obtenerPrecios(p) {
  const actual = esPrecioValido(p.precioPromo) ? p.precioPromo : p.precio;
  let anterior = null;
  if (esPrecioValido(p.precioAnterior) && p.precioAnterior > actual) anterior = p.precioAnterior;
  else if (esPrecioValido(p.precioPromo) && esPrecioValido(p.precio) && p.precioPromo < p.precio) anterior = p.precio;
  const descuento = anterior && esPrecioValido(actual) ? Math.round((1 - actual / anterior) * 100) : 0;
  return { actual: actual, anterior: anterior, descuento: descuento };
}

// --- Promociones ---
function esPromo(p) { return Boolean(p.promo); }
function textoPromo(p) {
  return typeof p.promo === "string" && p.promo.trim() ? p.promo.trim() : "Oferta";
}

// --- Stock ---
// Devuelve la cantidad si es un número, 0 si es false, y null si es true/indefinido ("hay, sin cantidad").
function obtenerCantidadStock(p) {
  if (typeof p.stock === "number" && Number.isFinite(p.stock)) return Math.max(0, Math.floor(p.stock));
  if (p.stock === false) return 0;
  return null;
}
function estadoStock(p) {
  const c = obtenerCantidadStock(p);
  if (c === 0) return "agotado";
  if (c !== null && c <= UMBRAL_POCO_STOCK) return "poco";
  return "disponible";
}
const ETIQUETAS_STOCK = { agotado: "Agotado", poco: "Últimas unidades", disponible: "Disponible" };

function maximoComprable(p) {
  const c = obtenerCantidadStock(p);
  return c === null ? Infinity : c;
}
function sePuedeComprar(p) {
  return estadoStock(p) !== "agotado" && esPrecioValido(obtenerPrecios(p).actual);
}


/* =====================================================
   3. LOCALSTORAGE
   ===================================================== */

// Guarda el carrito en el navegador. Se llama desde actualizarCarrito(), o sea en CADA cambio.
function guardarCarrito() {
  try {
    localStorage.setItem(CLAVE_CARRITO, JSON.stringify(carrito));
  } catch (error) {
    console.warn("No se pudo guardar el carrito (¿modo privado o sin espacio?).", error);
  }
}

// Lee el carrito guardado. Si está dañado, lo reinicia sin romper la página.
function cargarCarrito() {
  try {
    const crudo = localStorage.getItem(CLAVE_CARRITO);
    if (!crudo) return [];
    const datos = JSON.parse(crudo);
    if (!Array.isArray(datos)) throw new Error("El carrito guardado no tiene el formato esperado");
    return sanearCarrito(datos);
  } catch (error) {
    console.warn("Carrito guardado dañado: se reinicia.", error);
    try { localStorage.removeItem(CLAVE_CARRITO); } catch (e) { /* nada que hacer */ }
    return [];
  }
}

// Revisa cada ítem guardado contra el catálogo actual: descarta productos que ya no existen,
// actualiza nombre/precio, respeta el stock y junta duplicados. También entiende el formato viejo
// (ítems que solo tenían nombre y precio, sin id).
function sanearCarrito(datos) {
  const resultado = [];
  datos.forEach(function (d) {
    if (!d || typeof d !== "object") return;
    const p = obtenerProducto(d.id) ||
      productos.find(function (x) { return x.nombre === d.nombre; });
    if (!p || !sePuedeComprar(p)) return;
    let cantidad = Math.floor(Number(d.cantidad));
    if (!Number.isFinite(cantidad) || cantidad < 1) return;
    cantidad = Math.min(cantidad, maximoComprable(p));
    const existente = resultado.find(function (i) { return i.id === p.id; });
    if (existente) {
      existente.cantidad = Math.min(existente.cantidad + cantidad, maximoComprable(p));
    } else {
      resultado.push({ id: p.id, nombre: p.nombre, precio: obtenerPrecios(p).actual, cantidad: cantidad });
    }
  });
  return resultado;
}


/* =====================================================
   4. RENDERIZADO
   ===================================================== */

// Arma el HTML de UNA tarjeta de producto.
function crearTarjetaHTML(p) {
  const precios = obtenerPrecios(p);
  const stockEstado = estadoStock(p);
  const precioOk = esPrecioValido(precios.actual);
  const id = escaparHTML(p.id);
  const nombre = escaparHTML(p.nombre);
  const imagen = escaparHTML(p.imagen || IMAGEN_RESPALDO);
  const clases = ["tarjeta"];
  if (esPromo(p)) clases.push("es-promo");
  if (stockEstado === "agotado") clases.push("agotado");

  let etiquetas = "";
  if (esPromo(p)) etiquetas += '<span class="etiqueta etiqueta-promo">' + escaparHTML(textoPromo(p)) + "</span>";
  if (precios.descuento > 0) etiquetas += '<span class="etiqueta etiqueta-descuento">-' + precios.descuento + "%</span>";
  if (p.destacado) etiquetas += '<span class="etiqueta etiqueta-destacado">⭐ Destacado</span>';

  const precioHTML = precioOk
    ? '<span class="precio-actual">' + formatearPrecio(precios.actual) + "</span>" +
      (precios.anterior ? '<s class="precio-anterior">' + formatearPrecio(precios.anterior) + "</s>" : "")
    : '<span class="precio-consultar">Consultar precio</span>';

  const textoBoton = stockEstado === "agotado" ? "Agotado" : (precioOk ? "Agregar al carrito" : "Sin precio");
  const deshabilitado = sePuedeComprar(p) ? "" : " disabled";

  return '<article class="' + clases.join(" ") + '" data-id="' + id + '">' +
    '<div class="tarjeta-media">' +
      '<img src="' + imagen + '" alt="' + nombre + '" loading="lazy" decoding="async">' +
      (etiquetas ? '<div class="etiquetas">' + etiquetas + "</div>" : "") +
    "</div>" +
    '<div class="tarjeta-cuerpo">' +
      '<span class="tarjeta-categoria">' + escaparHTML(nombreCategoria(p.categoria)) + "</span>" +
      '<h3 class="tarjeta-nombre"><button type="button" class="enlace-detalle" aria-label="Ver detalle de ' + nombre + '">' + nombre + "</button></h3>" +
      '<div class="precio-bloque">' + precioHTML + "</div>" +
      '<span class="stock stock-' + stockEstado + '">' + ETIQUETAS_STOCK[stockEstado] + "</span>" +
      '<button type="button" class="btn btn-primario" data-accion="agregar" aria-label="' +
        (deshabilitado ? textoBoton + ": " : "Agregar ") + nombre + (deshabilitado ? "" : " al carrito") + '"' + deshabilitado + ">" +
        textoBoton + "</button>" +
    "</div>" +
  "</article>";
}

// Dibuja el catálogo principal. Sin argumentos usa la categoría y la búsqueda actuales.
function mostrarProductos(lista, animar) {
  const contenedor = obtenerEl("contenedor-productos");
  if (!contenedor) return;
  if (!Array.isArray(lista)) lista = filtrarProductos();

  const contador = obtenerEl("contador-productos");
  if (contador) contador.textContent = lista.length === 1 ? "1 producto" : lista.length + " productos";

  if (lista.length === 0) {
    const texto = estado.busqueda.trim()
      ? "No encontramos productos para “" + escaparHTML(estado.busqueda.trim()) + "”."
      : "Todavía no hay productos en esta categoría.";
    contenedor.innerHTML = '<div class="vacio"><span aria-hidden="true">🔎</span><strong>¿Qué estás buscando?</strong>' +
      "<p>" + texto + " Probá con otra palabra o mirá todo el catálogo.</p>" +
      '<button type="button" class="btn btn-secundario" data-accion="limpiar">Ver todos los productos</button></div>';
    return;
  }

  contenedor.innerHTML = lista.map(crearTarjetaHTML).join("");

  if (animar) {
    contenedor.classList.remove("animar");
    void contenedor.offsetWidth;        // reinicia la animación
    contenedor.classList.add("animar");
  }
}

// Dibuja una fila horizontal (destacados / promociones). Oculta la sección si no hay productos.
function mostrarCarril(idSeccion, idContenedor, lista) {
  const seccion = obtenerEl(idSeccion);
  const contenedor = obtenerEl(idContenedor);
  if (!seccion || !contenedor) return;
  seccion.hidden = lista.length === 0;
  contenedor.innerHTML = lista.map(crearTarjetaHTML).join("");
}

// ⭐ Muestra solo los productos con destacado: true. Se recalcula solo si cambiás la lista.
function mostrarDestacados() {
  mostrarCarril("destacados", "contenedor-destacados", productos.filter(function (p) { return Boolean(p.destacado); }));
}

// 🔥 Muestra solo los productos con promo (true o texto).
function mostrarPromociones() {
  mostrarCarril("promociones", "contenedor-promociones", productos.filter(esPromo));
}


/* =====================================================
   5. BÚSQUEDA
   ===================================================== */

// Devuelve los productos que cumplen la categoría activa Y el texto buscado.
function filtrarProductos() {
  const q = normalizarTexto(estado.busqueda);
  return productos.filter(function (p) {
    return productoEnCategoria(p, estado.categoria) && (!q || normalizarTexto(p.nombre).includes(q));
  });
}

// Se llama cada vez que escribís en el buscador: actualiza los resultados al instante.
function buscarProductos(texto) {
  estado.busqueda = String(texto || "");
  mostrarProductos();
}

// Vuelve a mostrar todo (borra búsqueda y categoría).
function limpiarFiltros() {
  estado.busqueda = "";
  const buscador = obtenerEl("buscador");
  if (buscador) buscador.value = "";
  filtrarCategoria("todos");
}

/* =====================================================
   6. CATEGORÍAS
   ===================================================== */

// Junta las categorías de CATEGORIAS más las que existan en los productos pero no estén listadas.
function listaCategorias() {
  const conocidas = new Set(CATEGORIAS.map(function (c) { return c.id; }));
  const extras = [];
  productos.forEach(function (p) {
    const id = normalizarTexto(p.categoria);
    if (id && !conocidas.has(id)) {
      conocidas.add(id);
      extras.push({ id: id, nombre: capitalizar(p.categoria) });
    }
  });
  const promo = CATEGORIAS.find(function (c) { return c.id === "promociones"; });
  const resto = CATEGORIAS.filter(function (c) { return c.id !== "promociones"; });
  return resto.concat(extras, promo ? [promo] : []);
}

function nombreCategoria(id) {
  const clave = normalizarTexto(id);
  const c = categoriasActivas.find(function (x) { return x.id === clave; });
  return c ? c.nombre : capitalizar(id || "Sin categoría");
}

function productoEnCategoria(p, categoria) {
  if (categoria === "todos") return true;
  if (categoria === "promociones") return esPromo(p);
  return normalizarTexto(p.categoria) === categoria;
}

// Íconos de cada categoría (mosaicos del menú). Para una categoría nueva, sumá una línea.
const ICONOS_CATEGORIA = { todos: "🛍️", limpieza: "🧴", higiene: "🧼", almacen: "🥫", papeles: "🧻", promociones: "🔥" };

// Dibuja los botones de categorías (una sola vez al iniciar).
function mostrarCategorias() {
  const nav = obtenerEl("categorias");
  if (!nav) return;
  nav.innerHTML = categoriasActivas.map(function (c) {
    const activa = c.id === estado.categoria;
    return '<button type="button" class="chip' + (c.id === "promociones" ? " chip-promo" : "") + (activa ? " activa" : "") +
      '" data-categoria="' + escaparHTML(c.id) + '" aria-pressed="' + activa + '">' +
      '<i aria-hidden="true">' + (ICONOS_CATEGORIA[c.id] || "📦") + "</i>" + escaparHTML(c.nombre) + "</button>";
  }).join("");
}

// Filtra por categoría y marca visualmente el botón activo.
function filtrarCategoria(categoria) {
  estado.categoria = normalizarTexto(categoria) || "todos";
  document.querySelectorAll("#categorias .chip").forEach(function (boton) {
    const activa = boton.dataset.categoria === estado.categoria;
    boton.classList.toggle("activa", activa);
    boton.setAttribute("aria-pressed", String(activa));
    if (activa && boton.scrollIntoView) boton.scrollIntoView({ inline: "center", block: "nearest" });
  });
  mostrarProductos(undefined, true);
}


/* =====================================================
   7. CAPAS: abrir y cerrar paneles (carrito, modal, admin)
   -----------------------------------------------------
   Todas usan la clase "abierto" + CSS (visibility/opacity/transform).
   No se mezcla display:none con opacity, así nada queda invisible por error.
   ===================================================== */
const capasAbiertas = [];
let focoPrevio = null;

function abrirCapa(el) {
  if (!el || el.classList.contains("abierto")) return;
  if (capasAbiertas.length === 0) focoPrevio = document.activeElement;
  capasAbiertas.push(el);
  el.classList.add("abierto");
  el.setAttribute("aria-hidden", "false");
  document.body.classList.add("sin-scroll");
  const foco = el.querySelector("[data-foco]");
  if (foco) foco.focus({ preventScroll: true });
}

function cerrarCapa(el) {
  if (!el) return;
  const i = capasAbiertas.indexOf(el);
  if (i === -1) return;
  capasAbiertas.splice(i, 1);
  el.classList.remove("abierto");
  el.setAttribute("aria-hidden", "true");
  if (capasAbiertas.length === 0) {
    document.body.classList.remove("sin-scroll");
    if (focoPrevio && focoPrevio.focus) focoPrevio.focus({ preventScroll: true });
    focoPrevio = null;
  }
}

// Cierra la capa que esté más arriba (lo usa la tecla ESC).
function cerrarCapaSuperior() {
  const cierres = { "modal-producto": cerrarModal, "admin-modal": cerrarAdmin, "panel-carrito": cerrarCarrito };
  const el = capasAbiertas[capasAbiertas.length - 1];
  if (el && cierres[el.id]) cierres[el.id]();
}


/* =====================================================
   8. MODAL DE PRODUCTO
   ===================================================== */

function crearDetalleHTML(p) {
  const precios = obtenerPrecios(p);
  const stockEstado = estadoStock(p);
  const comprable = sePuedeComprar(p);
  const nombre = escaparHTML(p.nombre);
  const cantidadStock = obtenerCantidadStock(p);

  const precioHTML = esPrecioValido(precios.actual)
    ? '<span class="precio-actual">' + formatearPrecio(precios.actual) + "</span>" +
      (precios.anterior ? '<s class="precio-anterior">' + formatearPrecio(precios.anterior) + "</s>" : "")
    : '<span class="precio-consultar">Consultar precio</span>';

  let etiquetas = "";
  if (esPromo(p)) etiquetas += '<span class="etiqueta etiqueta-promo">' + escaparHTML(textoPromo(p)) + "</span>";
  if (precios.descuento > 0) etiquetas += '<span class="etiqueta etiqueta-descuento">-' + precios.descuento + "%</span>";
  if (p.destacado) etiquetas += '<span class="etiqueta etiqueta-destacado">⭐ Destacado</span>';

  const stockTexto = ETIQUETAS_STOCK[stockEstado] +
    (cantidadStock !== null && cantidadStock > 0 ? " (" + cantidadStock + " en stock)" : "");
  const descripcion = p.descripcion && String(p.descripcion).trim()
    ? escaparHTML(p.descripcion) : "Este producto todavía no tiene descripción.";

  const acciones = comprable
    ? '<div class="fila-cantidad"><span id="modal-cantidad-etiqueta">Cantidad</span>' +
        '<div class="cantidad" role="group" aria-labelledby="modal-cantidad-etiqueta">' +
          '<button type="button" data-accion="menos" aria-label="Quitar una unidad">−</button>' +
          '<output id="modal-cantidad" aria-live="polite">1</output>' +
          '<button type="button" data-accion="mas" aria-label="Sumar una unidad">+</button>' +
        "</div></div>" +
      '<button type="button" class="btn btn-primario btn-block" data-accion="agregar">🛒 Agregar al carrito</button>' +
      '<button type="button" class="btn btn-secundario btn-block" data-accion="whatsapp">📲 Consultar este producto por WhatsApp</button>'
    : '<button type="button" class="btn btn-primario btn-block" disabled>' +
        (stockEstado === "agotado" ? "Agotado" : "Sin precio") + "</button>" +
      '<button type="button" class="btn btn-secundario btn-block" data-accion="whatsapp">📲 Consultar por WhatsApp</button>';

  return '<div class="detalle">' +
    '<div class="detalle-imagen"><img src="' + escaparHTML(p.imagen || IMAGEN_RESPALDO) + '" alt="' + nombre + '"></div>' +
    '<div class="detalle-info">' +
      '<div class="detalle-meta"><span class="detalle-categoria">' + escaparHTML(nombreCategoria(p.categoria)) + "</span>" + etiquetas + "</div>" +
      '<h2 id="modal-titulo">' + nombre + "</h2>" +
      '<div class="precio-bloque">' + precioHTML + "</div>" +
      '<span class="stock stock-' + stockEstado + '">' + escaparHTML(stockTexto) + "</span>" +
      '<p class="detalle-descripcion">' + descripcion + "</p>" +
      '<div class="detalle-acciones">' + acciones + "</div>" +
    "</div>" +
  "</div>";
}

// Abre el modal con la información del producto indicado.
function abrirModal(id) {
  const p = obtenerProducto(id);
  const modal = obtenerEl("modal-producto");
  const cuerpo = obtenerEl("modal-cuerpo");
  if (!p) { mostrarNotificacion("⚠️ Ese producto ya no está disponible"); return; }
  if (!modal || !cuerpo) return;
  productoModalId = p.id;
  cantidadModal = 1;
  cuerpo.innerHTML = crearDetalleHTML(p);
  cuerpo.scrollTop = 0;
  abrirCapa(modal);
}

function cerrarModal() {
  cerrarCapa(obtenerEl("modal-producto"));
  productoModalId = null;
}

// Botones − y + del modal.
function cambiarCantidadModal(delta) {
  const p = obtenerProducto(productoModalId);
  if (!p) return;
  const maximo = Math.min(maximoComprable(p), 99);
  cantidadModal = Math.min(maximo, Math.max(1, cantidadModal + delta));
  const salida = obtenerEl("modal-cantidad");
  if (salida) salida.textContent = cantidadModal;
}


/* =====================================================
   9. CARRITO
   ===================================================== */

function contarProductos() {
  return carrito.reduce(function (suma, i) { return suma + i.cantidad; }, 0);
}
function calcularTotal() {
  return carrito.reduce(function (suma, i) { return suma + i.precio * i.cantidad; }, 0);
}

// Agrega un producto (o varias unidades). Devuelve true si se agregó algo.
// Siempre avisa con mostrarNotificacion() y siempre pasa por actualizarCarrito() (que guarda).
function agregarAlCarrito(id, cantidad) {
  const p = obtenerProducto(id);
  if (!p) {
    console.warn("agregarAlCarrito: producto inexistente", id);
    mostrarNotificacion("⚠️ Ese producto ya no está disponible");
    return false;
  }
  if (!sePuedeComprar(p)) {
    mostrarNotificacion(estadoStock(p) === "agotado" ? "Producto agotado" : "Este producto no tiene precio cargado");
    return false;
  }

  cantidad = Math.max(1, Math.floor(Number(cantidad)) || 1);
  const item = carrito.find(function (i) { return i.id === p.id; });
  const enCarrito = item ? item.cantidad : 0;
  const posible = Math.min(cantidad, maximoComprable(p) - enCarrito);

  if (posible <= 0) {
    mostrarNotificacion("Ya tenés todo el stock disponible en el carrito");
    return false;
  }

  if (item) {
    item.cantidad += posible;
  } else {
    carrito.push({ id: p.id, nombre: p.nombre, precio: obtenerPrecios(p).actual, cantidad: posible });
  }

  actualizarCarrito();
  mostrarNotificacion(posible < cantidad
    ? "✓ Agregamos " + posible + " (máximo disponible)"
    : "✓ Producto agregado al carrito");
  animarBotonCarrito();
  return true;
}

// Suma o resta unidades de un producto del carrito. Si llega a 0, lo elimina.
function cambiarCantidad(id, cambio) {
  const item = carrito.find(function (i) { return i.id === id; });
  if (!item) return;
  const nueva = item.cantidad + cambio;
  if (nueva <= 0) { eliminarProducto(id); return; }
  const p = obtenerProducto(id);
  if (p && nueva > maximoComprable(p)) { mostrarNotificacion("Llegaste al stock máximo disponible"); return; }
  item.cantidad = nueva;
  actualizarCarrito();
}

function eliminarProducto(id) {
  const antes = carrito.length;
  carrito = carrito.filter(function (i) { return i.id !== id; });
  if (carrito.length !== antes) {
    actualizarCarrito();
    mostrarNotificacion("🗑 Producto eliminado del carrito");
  }
}

function vaciarCarrito() {
  if (carrito.length === 0) return;
  if (!window.confirm("¿Querés vaciar todo el carrito?")) return;
  carrito = [];
  actualizarCarrito();
}

// Función central: redibuja el carrito, actualiza contadores y total, y guarda en localStorage.
// Todo cambio del carrito termina acá, por eso nunca hay inconsistencias.
function actualizarCarrito() {
  const contenido = obtenerEl("contenido-carrito");
  const pie = obtenerEl("footer-carrito");
  const cantidadTotal = contarProductos();
  const total = calcularTotal();

  // Contadores (botón del header y barra inferior del celular)
  const contador = obtenerEl("contador-carrito");
  if (contador) { contador.textContent = cantidadTotal; contador.hidden = cantidadTotal === 0; }
  const barra = obtenerEl("barra-carrito");
  if (barra) barra.hidden = cantidadTotal === 0;
  const barraCantidad = obtenerEl("barra-cantidad");
  if (barraCantidad) barraCantidad.textContent = cantidadTotal;
  const barraTotal = obtenerEl("barra-total");
  if (barraTotal) barraTotal.textContent = formatearPrecio(total);

  if (contenido) {
    if (carrito.length === 0) {
      contenido.innerHTML = '<div class="carrito-vacio"><span aria-hidden="true">🛒</span><strong>Tu carrito está vacío</strong>' +
        "<p>Agregá productos desde el catálogo.</p></div>";
    } else {
      contenido.innerHTML = carrito.map(function (item) {
        const p = obtenerProducto(item.id);
        const nombre = escaparHTML(item.nombre);
        const imagen = escaparHTML((p && p.imagen) || IMAGEN_RESPALDO);
        return '<article class="item-carrito" data-id="' + escaparHTML(item.id) + '">' +
          '<div class="item-imagen"><img src="' + imagen + '" alt="' + nombre + '" loading="lazy"></div>' +
          '<div class="item-info"><h3>' + nombre + '</h3><p class="item-unitario">' + formatearPrecio(item.precio) + " c/u</p></div>" +
          '<div class="item-fila" style="grid-column:1 / -1">' +
            '<div class="cantidad" role="group" aria-label="Cantidad de ' + nombre + '">' +
              '<button type="button" data-accion="menos" aria-label="Quitar una unidad de ' + nombre + '">−</button>' +
              "<output>" + item.cantidad + "</output>" +
              '<button type="button" data-accion="mas" aria-label="Sumar una unidad de ' + nombre + '">+</button>' +
            "</div>" +
            '<strong class="item-subtotal">' + formatearPrecio(item.precio * item.cantidad) + "</strong>" +
            '<button type="button" class="item-eliminar" data-accion="eliminar" aria-label="Eliminar ' + nombre + ' del carrito">🗑</button>' +
          "</div></article>";
      }).join("");
    }
  }

  if (pie) {
    pie.innerHTML = carrito.length === 0 ? "" :
      '<div class="resumen"><span>Productos</span><strong>' + cantidadTotal + "</strong></div>" +
      '<div class="resumen resumen-total"><span>Total</span><strong>' + formatearPrecio(total) + "</strong></div>" +
      '<button type="button" class="btn btn-whatsapp btn-block" data-accion="finalizar">📲 Finalizar pedido por WhatsApp</button>' +
      '<div class="pie-acciones"><button type="button" class="btn btn-secundario" data-accion="seguir">Seguir comprando</button>' +
      '<button type="button" class="btn btn-texto" data-accion="vaciar">Vaciar carrito</button></div>';
  }

  guardarCarrito();
}

function verCarrito() {
  const fondo = obtenerEl("fondo");
  if (fondo) fondo.classList.add("abierto");
  abrirCapa(obtenerEl("panel-carrito"));
}

function cerrarCarrito() {
  const fondo = obtenerEl("fondo");
  if (fondo) fondo.classList.remove("abierto");
  cerrarCapa(obtenerEl("panel-carrito"));
}

// Pequeño "latido" del botón del carrito al agregar algo.
function animarBotonCarrito() {
  const boton = obtenerEl("btn-carrito");
  if (!boton) return;
  boton.classList.remove("pulso");
  void boton.offsetWidth;
  boton.classList.add("pulso");
}


/* =====================================================
   10. NOTIFICACIONES
   -----------------------------------------------------
   Lógica en 3 pasos: MOSTRAR (se crea el aviso) → ANIMAR (clase "visible")
   → OCULTAR (se saca la clase y, al terminar la animación, se elimina del HTML).
   Cada aviso es un elemento propio, así varios seguidos conviven sin pisarse.
   ===================================================== */
function mostrarNotificacion(mensaje) {
  const contenedor = obtenerEl("notificaciones");
  if (!contenedor || !mensaje) return;

  while (contenedor.children.length >= 3) contenedor.firstElementChild.remove();   // máximo 3 a la vez

  // 1) MOSTRAR
  const aviso = document.createElement("div");
  aviso.className = "notificacion";
  aviso.textContent = mensaje;
  contenedor.appendChild(aviso);

  // 2) ANIMAR (el reflow fuerza al navegador a partir del estado inicial)
  void aviso.offsetWidth;
  aviso.classList.add("visible");

  // 3) OCULTAR
  setTimeout(function () {
    aviso.classList.remove("visible");
    const quitar = function () { aviso.remove(); };
    aviso.addEventListener("transitionend", quitar, { once: true });
    setTimeout(quitar, 500);   // por si transitionend no se dispara
  }, DURACION_NOTIFICACION);
}


/* =====================================================
   11. WHATSAPP
   ===================================================== */

function numeroWhatsAppValido() {
  return String(numeroWhatsApp).replace(/\D/g, "").length >= 8;
}

function urlWhatsApp(texto) {
  const numero = String(numeroWhatsApp).replace(/\D/g, "");
  return "https://wa.me/" + numero + (texto ? "?text=" + encodeURIComponent(texto) : "");
}

function abrirWhatsApp(texto) {
  const url = urlWhatsApp(texto);
  const ventana = window.open(url, "_blank");
  if (!ventana) window.location.href = url;     // si el navegador bloquea la ventana, abre en la misma pestaña
}

// Arma el texto del pedido: "- Producto x2 — $5.000 ... Total: $8.000"
function construirMensajePedido() {
  const lineas = carrito.map(function (i) {
    return "- " + i.nombre + " x" + i.cantidad + " — " + formatearPrecio(i.precio * i.cantidad);
  });
  return "Hola, quiero realizar este pedido:\n\n" + lineas.join("\n") + "\n\nTotal: " + formatearPrecio(calcularTotal());
}

function finalizarCompra() {
  if (carrito.length === 0) { mostrarNotificacion("Tu carrito está vacío"); return; }
  if (!numeroWhatsAppValido()) { mostrarNotificacion("Falta configurar el número de WhatsApp en script.js"); return; }
  abrirWhatsApp(construirMensajePedido());
}

// Consulta/pedido de un solo producto (botón del modal).
function pedirProductoPorWhatsApp(id) {
  const p = obtenerProducto(id);
  if (!p) return;
  if (!numeroWhatsAppValido()) { mostrarNotificacion("Falta configurar el número de WhatsApp en script.js"); return; }
  abrirWhatsApp("Hola, quiero comprar " + p.nombre);
}

// Pone el enlace real de WhatsApp en los botones/links marcados con data-whatsapp.
function configurarEnlacesWhatsApp() {
  if (!numeroWhatsAppValido()) return;
  document.querySelectorAll("[data-whatsapp]").forEach(function (a) {
    a.href = urlWhatsApp("Hola, quiero hacer una consulta.");
    a.target = "_blank";
    a.rel = "noopener";
  });
}


/* =====================================================
   12. ADMINISTRACIÓN
   ===================================================== */

// Todas las estadísticas salen de la lista "productos": nada se escribe a mano.
function calcularEstadisticas() {
  return {
    total: productos.length,
    destacados: productos.filter(function (p) { return Boolean(p.destacado); }).length,
    promociones: productos.filter(esPromo).length,
    agotados: productos.filter(function (p) { return estadoStock(p) === "agotado"; }).length
  };
}

function asignarTexto(id, valor) {
  const el = obtenerEl(id);
  if (el) el.textContent = valor;
}

function mostrarEstadisticas() {
  const e = calcularEstadisticas();
  asignarTexto("total-productos", e.total);
  asignarTexto("total-destacados", e.destacados);
  asignarTexto("total-promos", e.promociones);
  asignarTexto("total-agotados", e.agotados);
}

// Cálculo de inventario. Ej: calcularInventario(50, 38) → { vendidas: 38, restantes: 12, porcentaje: 76 }
// Futuro: acá se pueden sumar "devueltas" u otros datos sin tocar el resto del sistema.
function calcularInventario(llevadas, vendidas) {
  llevadas = Number(llevadas);
  vendidas = Number(vendidas);
  if (!Number.isFinite(llevadas) || !Number.isFinite(vendidas) || llevadas <= 0 || vendidas < 0 || vendidas > llevadas) return null;
  return {
    vendidas: vendidas,
    restantes: llevadas - vendidas,
    porcentaje: Math.round((vendidas / llevadas) * 100)
  };
}

// Lee los dos campos de la calculadora y muestra el resultado.
function actualizarCalculadoraInventario() {
  const llevadas = obtenerEl("inv-llevadas");
  const vendidas = obtenerEl("inv-vendidas");
  const mensaje = obtenerEl("inv-mensaje");
  const barra = obtenerEl("inv-barra");
  if (!llevadas || !vendidas) return;

  const resultado = calcularInventario(llevadas.value, vendidas.value);
  asignarTexto("inv-res-vendidas", resultado ? resultado.vendidas : "–");
  asignarTexto("inv-res-restantes", resultado ? resultado.restantes : "–");
  asignarTexto("inv-res-porcentaje", resultado ? resultado.porcentaje + "%" : "–");
  if (barra) barra.style.width = resultado ? resultado.porcentaje + "%" : "0";

  if (mensaje) {
    if (resultado || (llevadas.value === "" && vendidas.value === "")) mensaje.textContent = "";
    else if (Number(vendidas.value) > Number(llevadas.value)) mensaje.textContent = "Las unidades vendidas no pueden superar a las llevadas.";
    else mensaje.textContent = "Completá los dos números con valores válidos.";
  }
}

function abrirAdmin() {
  const panel = obtenerEl("admin-modal");
  if (!panel) { console.warn("abrirAdmin: no existe #admin-modal en el HTML"); return; }
  mostrarEstadisticas();
  actualizarCalculadoraInventario();
  abrirCapa(panel);
}

function cerrarAdmin() {
  cerrarCapa(obtenerEl("admin-modal"));
}


/* =====================================================
   13. EVENTOS E INICIO
   ===================================================== */

// Clicks dentro de las tarjetas (catálogo, destacados y promociones).
function manejarClickProductos(e) {
  const accion = e.target.closest("[data-accion]");
  if (accion && accion.dataset.accion === "agregar") {
    e.stopPropagation();                         // el botón NO debe abrir también el modal
    const tarjeta = accion.closest(".tarjeta");
    if (tarjeta) agregarAlCarrito(tarjeta.dataset.id, 1);
    return;
  }
  if (accion && accion.dataset.accion === "limpiar") { limpiarFiltros(); return; }
  const tarjeta = e.target.closest(".tarjeta");
  if (tarjeta) abrirModal(tarjeta.dataset.id);
}

function manejarClickModal(e) {
  if (e.target === e.currentTarget) { cerrarModal(); return; }     // clic fuera de la caja
  const el = e.target.closest("[data-accion]");
  if (!el) return;
  switch (el.dataset.accion) {
    case "cerrar": cerrarModal(); break;
    case "menos": cambiarCantidadModal(-1); break;
    case "mas": cambiarCantidadModal(1); break;
    case "agregar": if (agregarAlCarrito(productoModalId, cantidadModal)) cerrarModal(); break;
    case "whatsapp": pedirProductoPorWhatsApp(productoModalId); break;
  }
}

function manejarClickCarrito(e) {
  const el = e.target.closest("[data-accion]");
  if (!el) return;
  const item = el.closest("[data-id]");
  const id = item ? item.dataset.id : null;
  switch (el.dataset.accion) {
    case "cerrar":
    case "seguir": cerrarCarrito(); break;
    case "mas": if (id) cambiarCantidad(id, 1); break;
    case "menos": if (id) cambiarCantidad(id, -1); break;
    case "eliminar": if (id) eliminarProducto(id); break;
    case "finalizar": finalizarCompra(); break;
    case "vaciar": vaciarCarrito(); break;
  }
}

// Conecta un elemento por id sin romperse si el elemento no existe.
function escuchar(id, evento, funcion) {
  const el = obtenerEl(id);
  if (el) el.addEventListener(evento, funcion);
  else console.warn("No se encontró #" + id + " en el HTML");
}

function iniciarEventos() {
  escuchar("buscador", "input", function (e) { buscarProductos(e.target.value); });
  escuchar("categorias", "click", function (e) {
    const boton = e.target.closest("[data-categoria]");
    if (boton) filtrarCategoria(boton.dataset.categoria);
  });

  ["contenedor-productos", "contenedor-destacados", "contenedor-promociones"].forEach(function (id) {
    escuchar(id, "click", manejarClickProductos);
  });

  escuchar("btn-carrito", "click", verCarrito);
  escuchar("barra-btn", "click", verCarrito);
  escuchar("fondo", "click", cerrarCarrito);
  escuchar("panel-carrito", "click", manejarClickCarrito);
  escuchar("modal-producto", "click", manejarClickModal);

  escuchar("btn-admin", "click", abrirAdmin);
  escuchar("admin-modal", "click", function (e) {
    if (e.target === e.currentTarget || e.target.closest("[data-accion='cerrar']")) cerrarAdmin();
  });
  escuchar("inv-llevadas", "input", actualizarCalculadoraInventario);
  escuchar("inv-vendidas", "input", actualizarCalculadoraInventario);

  // ESC cierra lo que esté abierto
  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") cerrarCapaSuperior();
  });

  // Enlaces de WhatsApp: si falta el número, avisa en vez de abrir un enlace roto
  document.addEventListener("click", function (e) {
    const enlace = e.target.closest("[data-whatsapp]");
    if (enlace && !numeroWhatsAppValido()) {
      e.preventDefault();
      mostrarNotificacion("Falta configurar el número de WhatsApp en script.js");
    }
  });
}

function iniciar() {
  try {
    limpiarProductos();
    generarIds();
    categoriasActivas = listaCategorias();
    carrito = cargarCarrito();

    mostrarCategorias();
    mostrarDestacados();
    mostrarPromociones();
    mostrarProductos(undefined, true);
    configurarEnlacesWhatsApp();
    iniciarEventos();
    actualizarCarrito();
    asignarTexto("anio", new Date().getFullYear());
  } catch (error) {
    console.error("Error al iniciar el catálogo:", error);
    const contenedor = obtenerEl("contenedor-productos");
    if (contenedor) {
      contenedor.innerHTML = '<div class="vacio"><strong>Ocurrió un problema al cargar el catálogo</strong>' +
        "<p>Probá recargar la página.</p></div>";
    }
  }
}

document.addEventListener("DOMContentLoaded", iniciar);
