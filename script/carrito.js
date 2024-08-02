let carrito = [];

const contenedorProductos = document.getElementById('contenedor-productos');
const buscarProductoInput = document.getElementById('buscar-producto');

const guardarCarrito = (carrito) => {
    localStorage.setItem('carrito', JSON.stringify(carrito));
};

const actualizarCantidadCarrito = () => {
    const cantidadTotal = carrito.reduce((acc, producto) => acc + producto.cantidad, 0);
    const precioTotal = carrito.reduce((acc, producto) => acc + Number(producto.cantidad * producto.precio), 0);

    const cantidadCarritoElemento = document.getElementById('cantidad-carrito');
    const precioTotalElemento = document.getElementById('precio-total');

    precioTotalElemento.textContent = precioTotal;
    cantidadCarritoElemento.textContent = cantidadTotal;

    guardarCarrito(carrito);
};

const elementosEnCarrito = (producto) => {
    const carritoContenedor = document.getElementById('elementos-en-carrito');
    const div = document.createElement('div');
    
    div.innerHTML = `
        <div class="tarjeta">
            <img class="prenda" src=${producto.img} alt=${producto.producto}>
            <div class="columna">
                <p class="nombre">${producto.nombre}</p>
                <p class="marca">${producto.marca}</p>
                <p id="cantidad${producto.id}" class="cantidad">Cantidad: <b class="unidad">${producto.cantidad}</b></p>
                <p class="cantidad">Precio unitario:<b class="unidad">$${producto.precio}</b></p>
            </div>
            <button class="eliminar"><i id="${producto.id}" class="fas fa-trash-alt"></i></button>
        </div>
    `;
    carritoContenedor.appendChild(div);
};

const eliminarProducto = (productoId) => {
    const productoIndex = carrito.findIndex((producto) => producto.id == productoId);
    if (productoIndex !== -1) {
        if (carrito[productoIndex].cantidad == 1) {
            carrito.splice(productoIndex, 1);
        } else {
            carrito[productoIndex].cantidad--;
        }
        actualizarCarrito();
        actualizarCantidadCarrito();
    }
};

const actualizarCarrito = () => {
    const carritoContenedor = document.getElementById('elementos-en-carrito');
    carritoContenedor.innerHTML = '';
    carrito.forEach((producto) => {
        elementosEnCarrito(producto);
    });
};

const vaciarCarrito = () => {
    carrito.forEach((producto) => {
        const productoEnStock = stock.find((item) => item.id == producto.id);
        if (productoEnStock) {
            productoEnStock.cantidad = 0;
        }
    });
    carrito = [];
    actualizarCarrito();
    actualizarCantidadCarrito();
};

document.getElementById('vaciar-carrito').addEventListener('click', vaciarCarrito);

const productoEnCarrito = (idProducto) => {
    const existeEnCarrito = carrito.some((producto) => producto.id == idProducto);

    if (existeEnCarrito) {
        const producto = carrito.find((producto) => producto.id == idProducto);
        producto.cantidad++;
        const cantidad = document.getElementById(`cantidad${producto.id}`);
        cantidad.textContent = `Cantidad: ${producto.cantidad}`;
    } else {
        const productoOriginal = stock.find((producto) => producto.id == idProducto);
        const producto = {...productoOriginal, cantidad: 1};
        carrito.push(producto);
        elementosEnCarrito(producto);
    }
    actualizarCantidadCarrito();
};

contenedorProductos.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn')) {
        productoEnCarrito(e.target.id);
        Toastify({
            text: "Producto agregado!",
            style: {
              background: "rgb(175, 29, 29)",
            },
            gravity: "top",
            position: "right",
            offset: {
              y: '90px'
            }
          }).showToast();
    }
});

const carritoGuardado = JSON.parse(localStorage.getItem('carrito'));
if (carritoGuardado) {
    carrito = carritoGuardado;
    actualizarCarrito();
    actualizarCantidadCarrito();
}
