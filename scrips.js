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
  const resto = CATEGORIAS.filter(function (c) { return c.id !== "promocio