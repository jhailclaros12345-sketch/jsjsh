const productos = [
    {
        nombre: "Magistral Ultra",
        precio: 3000,
        imagen: "images/magistral-ultra.jpg",
categoria:"limpieza",
stock: true
    },
    {
        nombre: "Magistral Repuesto 450 ml",
        precio: 2500,
        destacado: true,
        imagen: "images/magistral-repuesto-450ml.jpg",
categoria: "limpieza",
stock: true
    },
    {
        nombre: "Colgate Triple Acción",
        precio: 3000,
        destacado: true,
        imagen: "images/colgate-triple-accion.jpg",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Colgate Original 180g",
        precio: 3000,
        imagen: "images/colgate-original-180g.jpg",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Dove Original",
        precio: 1500,
        imagen: "images/dove-original.jpg",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Axe Desodorante Apolo",
        precio: 4000,
        imagen: "images/axe-desodorante-apolo.jpg",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Axe Desodorante Black",
        precio: 4000,
        imagen: "images/axe-desodorante-black.jpg",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Babysec Toallitas 50",
        precio: 2000,
        imagen: "images/babysec-toallitas-50.jpg",
categoria:"papeles",
stock: true
    },
    {
        nombre: "Fideos Molto Largos",
        precio: 850,
        destacado: true,
        promo: "3×$2500",
        imagen: "images/fideos-molto-largos.jpg",
categoria: "almacen",
stock: true
    },
    {
        nombre: "Morenita Saquitos",
        precio: 4000,
        imagen: "images/Caffe-morenita-saquitos.jpg",
categoria: "almacen",
stock: true
    },
    {
        nombre: "Rexona Odorono 60g",
        precio: 2000,
        imagen: "images/rexona-odorono-60gr.jpg",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Pitusas Black",
        precio: 1000,
        imagen: "images/ Pitusas-black.webp",
categoria: "almacen",
stock: true
    },
    {
        nombre: "Alcohol Duplex",
        precio: 2000,
        imagen: "images/Alcohol-duplex.jpeg",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Arroz Molto Largo Fino",
        precio: 1300,
        imagen: "images/Arroz-molto-largo-fino.jpg",
categoria: "almacen",
stock: true
    },
    {
        nombre: "Cif 500 ml",
        precio: 2500,
        imagen: "images/Cif-500-ml.jpeg",
categoria: "limpieza",
stock: true
    },
    {
        nombre: "Dove Invisible Care",
        precio: 4000,
        imagen: "images/Dave-invicible-care.webp",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Esponjas Virulana",
        precio: 1000,
        imagen: "images/Espojas-virulana.jpg",
categoria: "limpieza",
stock: true
    },
    {
        nombre: "Jabón en Polvo 800g",
        precio: 2800,
        imagen: "images/Jabon-en-polvo-800g.webp",
categoria: "limpieza",
stock: true

    },
    {
        nombre: "Jabón Qué Linda",
        precio: 1500,
        imagen: "images/Jabon-que-linda.webp",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Mini Coronitas",
        precio: 1000,
        imagen: "images/Mini-coronitas-.webp",
categoria: "almacen",
stock: true
    },
    {
        nombre: "Mini Pitusas Frutilla",
        precio: 1000,
        imagen: "images/Mini-pitusas-frutilla.webp",
categoria: "almacen",
stock: true
    },
    {
        nombre: "Neosol Dulces Pack de 3",
        precio: 1500,
        imagen: "images/Neosol-dulces-pack-de-3.jpeg",
categoria: "almacen",
stock: true
    },
    {
        nombre: "Nocturna Suave 16",
        precio: 4500,
        imagen: "images/Nocturna-suave-16.jpg",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Plusbelle Frescura",
        precio: 3500,
        imagen: "images/Plusbelle-frescura.jpg",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Rexona Antibac Dama",
        precio: 3000,
        imagen: "images/Reaxona-antibac-dama.webp",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Rexona Control Inteligente",
        precio: 3000,
        imagen: "images/Reaxona-control-inteligente.webp",
categoria:"higiene",
stock: true
    },
    {
        nombre: "Surtido Bagley",
        precio: 2500,
        imagen: "images/Surtido-bagley.jpeg",
categoria: "almacen",
stock: true
    },
    {
        nombre: "esponjas de acero",
        precio: 1000,
        imagen: "images/Virulana.webp",
categoria: "limpieza",
stock: true
    },
    {
        nombre: "Yerba Canarias 1kg",
        precio: 12000,
        imagen: "images/Yerba-canarias-1kg.jpg",
categoria: "almacen",
stock: true
    },
    {
        nombre: "Yerba Mañanita 500ml",
        precio: 1800,
        imagen: "images/Yerba-mañanita-500ml.jpg",
categoria: "almacen",
stock: true
    },
    {
        nombre: "Esencial Limón",
        precio: 1000,
        imagen: "images/esencial-limon.png",
categoria: "limpieza",
stock: true
    },
    {
        nombre: "Jabón de Tocador Plusbelle Frescura 90g",
        precio: 1000,
        imagen: "images/jabon-de-toc-plusbelle-frescura.jpg",
categoria:"higiene",
stock: true
    }
];

// ===== Configuración =====
const WA = "5491126162963";
const CATS = {limpieza:["🧴","Limpieza"],higiene:["🪥","Higiene"],papeles:["🧻","Papeles"],almacen:["🍪","Almacén"],bebidas:["🥤","Bebidas"]};
const OFERTAS = [
  {e:"🧦",n:"Balerinas",p:"3 x $1000"},
  {e:"🧽",n:"Trapos de piso",p:"2 x $1500"},
  {e:"🍝",n:"Fideos Molto",p:"3 x $2500"}
];

productos.forEach((p, i) => {
  p.id = i;
  p.categoria = (p.categoria || "").trim();
  p.imagen = (p.imagen || "").trim();
  p.nombre = p.nombre.charAt(0).toUpperCase() + p.nombre.slice(1);
});

const $ = s => document.querySelector(s);
const money = n => "$" + n.toLocaleString("es-AR");
const esc = t => String(t).replace(/[&<>"]/g, c => ({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));
let cart = {};
try { cart = JSON.parse(localStorage.getItem("carrito_v2")) || {}; } catch (e) { cart = {}; }
let cat = "todos", q = "", toastT;

const norm = t => t.toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "");

// ===== Categorías (solo las que tienen productos) =====
function renderChips() {
  const counts = {};
  productos.forEach(p => counts[p.categoria] = (counts[p.categoria] || 0) + 1);
  let h = `<button class="chip ${cat==="todos"?"on":""}" data-c="todos">Todos</button>`;
  Object.keys(CATS).filter(c => counts[c]).forEach(c => {
    h += `<button class="chip ${cat===c?"on":""}" data-c="${c}">${CATS[c][0]} ${CATS[c][1]}</button>`;
  });
  $("#chips").innerHTML = h;
}

// ===== Productos =====
function actHTML(p) {
  if (!p.stock) return `<span class="out">Agotado</span>`;
  const n = cart[p.id] || 0;
  return n
    ? `<div class="step"><button data-a="dec" aria-label="Quitar uno">−</button><b>${n}</b><button data-a="inc" aria-label="Agregar uno">+</button></div>`
    : `<button class="add" data-a="inc">Agregar</button>`;
}

function renderProducts() {
  const list = productos.filter(p =>
    (cat === "todos" || p.categoria === cat) && norm(p.nombre).includes(norm(q)));
  $("#count").textContent = `${list.length} productos`;
  $("#grid").innerHTML = list.length ? list.map(p => `
    <article class="card" data-id="${p.id}">
      <div class="img">
        ${p.promo ? `<span class="tag p">${esc(p.promo)}</span>` : ""}
        ${p.destacado ? `<span class="tag s">⭐ Más vendido</span>` : ""}
        <img loading="lazy" src="${encodeURI(p.imagen)}" alt="${esc(p.nombre)}">
      </div>
      <div class="info">
        <h3>${esc(p.nombre)}</h3>
        <div class="price">${money(p.precio)}</div>
        <div class="act">${actHTML(p)}</div>
      </div>
    </article>`).join("") : `<p class="empty">No encontramos productos 😕<br>Probá con otra búsqueda.</p>`;
}

// Si una imagen no carga, se muestra un ícono
$("#grid").addEventListener("error", e => {
  if (e.target.tagName === "IMG") e.target.replaceWith(Object.assign(document.createElement("span"), {className:"ph", textContent:"🛍️"}));
}, true);

// ===== Carrito =====
const save = () => { try { localStorage.setItem("carrito_v2", JSON.stringify(cart)); } catch (e) {} };
const byId = id => productos[id];

function change(id, d) {
  const n = (cart[id] || 0) + d;
  if (n <= 0) delete cart[id]; else cart[id] = n;
  if (d > 0 && n === 1) toast("✓ Agregado al pedido");
  save(); refresh(id);
}

function totals() {
  let n = 0, t = 0;
  Object.keys(cart).forEach(id => { n += cart[id]; t += cart[id] * byId(id).precio; });
  return {n, t};
}

function refresh(id) {
  if (id !== undefined) {
    const card = document.querySelector(`.card[data-id="${id}"] .act`);
    if (card) card.innerHTML = actHTML(byId(id));
  }
  const {n, t} = totals();
  $("#badge").hidden = !n; $("#badge").textContent = n;
  $("#bar").hidden = !n; $("#bar-n").textContent = n; $("#bar-t").textContent = money(t);
  const ids = Object.keys(cart);
  $("#items").innerHTML = ids.length ? ids.map(i => {
    const p = byId(i);
    return `<div class="it" data-id="${i}">
      <div class="n">${esc(p.nombre)}<small>${money(p.precio)} c/u · ${money(p.precio * cart[i])}</small></div>
      <div class="step"><button data-a="dec">−</button><b>${cart[i]}</b><button data-a="inc">+</button></div>
    </div>`;
  }).join("") : `<p class="mt">Tu pedido está vacío 🛒<br>Agregá productos para empezar.</p>`;
  $("#foot").innerHTML = ids.length ? `
    <div class="tot"><span>Total</span><span>${money(t)}</span></div>
    <button class="wa" id="send">📲 Enviar pedido por WhatsApp</button>
    <button class="clr" id="clear">Vaciar pedido</button>` : "";
}

function send() {
  const lines = Object.keys(cart).map(i => `• ${cart[i]} x ${byId(i).nombre} — ${money(byId(i).precio * cart[i])}`);
  const msg = `Hola, quiero hacer este pedido:\n\n${lines.join("\n")}\n\nTotal: ${money(totals().t)}`;
  window.open(`https://wa.me/${WA}?text=${encodeURIComponent(msg)}`, "_blank");
}

function toast(t) {
  const el = $("#toast"); el.textContent = t; el.classList.add("on");
  clearTimeout(toastT); toastT = setTimeout(() => el.classList.remove("on"), 1400);
}

const openCart = v => document.body.classList.toggle("open", v);

// ===== Eventos =====
$("#chips").addEventListener("click", e => {
  const b = e.target.closest("[data-c]"); if (!b) return;
  cat = b.dataset.c; renderChips(); renderProducts();
});
$("#q").addEventListener("input", e => { q = e.target.value; renderProducts(); });
$("#grid").addEventListener("click", e => {
  const b = e.target.closest("[data-a]"); if (!b) return;
  change(+b.closest(".card").dataset.id, b.dataset.a === "inc" ? 1 : -1);
});
$("#items").addEventListener("click", e => {
  const b = e.target.closest("[data-a]"); if (!b) return;
  change(+b.closest(".it").dataset.id, b.dataset.a === "inc" ? 1 : -1);
});
$("#foot").addEventListener("click", e => {
  if (e.target.id === "send") send();
  if (e.target.id === "clear" && confirm("¿Vaciar el pedido?")) { cart = {}; save(); refresh(); renderProducts(); }
});
$("#open-cart").onclick = $("#bar-btn").onclick = () => openCart(true);
$("#close-cart").onclick = $("#back").onclick = () => openCart(false);

// ===== Inicio =====
$("#offers").innerHTML = OFERTAS.map(o =>
  `<a class="offer" target="_blank" href="https://wa.me/${WA}?text=${encodeURIComponent("Hola, quiero la oferta: " + o.n + " " + o.p)}">
    <b>${o.e} ${o.n}</b><strong>${o.p}</strong><span>Pedir por WhatsApp →</span></a>`).join("");
renderChips(); renderProducts(); refresh();
