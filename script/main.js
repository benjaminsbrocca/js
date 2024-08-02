let stock = [];

const getCards = () => {
  fetch('./stock.json')
    .then((response) => response.json())
    .then((products) => {
      stock = products;
      mostrarStock(products);
    })
    .catch(error => console.error('Error al cargar el stock:', error));
};




const mostrarStock = (productos) => {
  const contenedorProductos = document.getElementById('contenedor-productos');
  contenedorProductos.innerHTML = '';

  if (productos.length === 0) {
    const nuevoDiv = document.createElement('div');
    nuevoDiv.innerHTML = `<p>No hay coincidencias</p>`;
    contenedorProductos.appendChild(nuevoDiv);
  } else {
    productos.forEach(elemento => {
      const div = document.createElement('div');
      div.innerHTML = `<div class="card">
          <img class="imagen" src=${elemento.img} alt="">
          <p class="nombre">${elemento.marca} ${elemento.nombre}</p>
          <div class="barra">
              <p class="price">$${elemento.precio}</p>
              <button class="btn" id=${elemento.id}><i class="fas fa-cart-plus"></i>Agregar al carrito</button>
          </div>
      </div>`;
      contenedorProductos.appendChild(div);
    });
  }
};

const buscador = document.getElementById("buscar");


buscador.addEventListener("input", (event) => {
  let buscado = event.target.value.toLowerCase();
  let busqueda = stock.filter(
    (array) =>
      array.producto.toLowerCase().includes(buscado) ||
      array.marca.toLowerCase().includes(buscado)
  );

  contenedorProductos.innerHTML = '';

  if (busqueda.length == 0) {
    let nuevoDiv = document.createElement("div");
    nuevoDiv.innerHTML = `<p class="coincidencia">No hay coincidencias</p>`;
    contenedorProductos.appendChild(nuevoDiv);
  } else {
    mostrarStock(busqueda);
  }
});


document.addEventListener('DOMContentLoaded', getCards);