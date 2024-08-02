const modal = document.getElementById('modal');
const btn = document.getElementById('abrir-modal');
const span = document.getElementsByClassName('cerrar')[0];
const modalContenido = document.querySelector('.modal-contenido')
const comprar = document.getElementById('comprar')

btn.addEventListener('click', ()=>{
    modal.style.display = 'block';
});


span.addEventListener('click', ()=> {
    modal.style.display = 'none';
});

comprar.addEventListener('click', () => {
    modal.style.display = 'none';

    if (carrito.length === 0) {
        Toastify({
            text: "Agrega un producto!",
            style: {
                background: "white",
                color: "#d31616"
            },
            gravity: "top",
            position: "right",
            offset: {
                y: '90px'
            }
        }).showToast();
    } else {
        Swal.fire({
            title: 'Confirmar compra',
            text: "Estas por pasar a finalizar la compra",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d31616',
            cancelButtonColor: 'rgb(179, 179, 179)',
            confirmButtonText: 'Comprar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'Compra realizada',
                    text: 'Muchas gracias por elegirnos!',
                    icon: 'success',
                    confirmButtonColor: '#d31616',
                    confirmButtonText: 'Cerrar'
                });
                vaciarCarrito();
            }
        });
    }
});

window.addEventListener('click', (e)=>{
    if (e.target == modal) {
        modal.style.display = 'none';
    }
});

modalContenido.addEventListener('click', (e) => {
    if (e.target.classList.contains('fas') && e.target.parentElement.classList.contains('eliminar')) {
        eliminarProducto(e.target.id);
    }
});