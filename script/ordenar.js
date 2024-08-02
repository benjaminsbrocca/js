const selectOrden = document.getElementById('seleccionar-orden');

selectOrden.addEventListener('click', (event) => {
  const value = event.target.value;
  let productosOrdenados;

  switch (value) {
    case '1':
      productosOrdenados = [...stock].sort((a, b) => b.precio - a.precio);
      break;
    case '2':
      productosOrdenados = [...stock].sort((a, b) => a.precio - b.precio);
      break;
    case '3':
      productosOrdenados = [...stock].sort((a, b) => a.nombre.localeCompare(b.nombre));
      break;
    default:
      productosOrdenados = stock;
  }

  mostrarStock(productosOrdenados);
});

mostrarStock(stock);