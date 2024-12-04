let carrito = [];

function agregarAlCarrito(nombre, precio) {
  // Verificar si el producto ya está en el carrito
  let producto = carrito.find(item => item.nombre === nombre);
  
  if (producto) {
    producto.cantidad++;
  } else {
    carrito.push({ nombre, precio, cantidad: 1 });
  }

  actualizarCarrito();
}

function eliminarDelCarrito(nombre) {
  carrito = carrito.filter(item => item.nombre !== nombre);
  actualizarCarrito();
}

function actualizarCarrito() {
  const tablaCarrito = document.getElementById('tablaCarrito').getElementsByTagName('tbody')[0];
  tablaCarrito.innerHTML = ''; // Limpiar tabla

  let total = 0;

  carrito.forEach(item => {
    const fila = document.createElement('tr');
    
    fila.innerHTML = `
      <td>${item.nombre}</td>
      <td>${item.cantidad}</td>
      <td>$${item.precio}</td>
      <td>$${item.precio * item.cantidad}</td>
      <td><button onclick="eliminarDelCarrito('${item.nombre}')">Eliminar</button></td>
    `;
    
    tablaCarrito.appendChild(fila);
    total += item.precio * item.cantidad;
  });

  // Actualizar el total
  document.getElementById('total').textContent = total;
}

function vaciarCarrito() {
  carrito = [];
  actualizarCarrito();
}

function finalizarCompra() {
  if (carrito.length > 0) {
    // Mostrar el mensaje de compra
    document.getElementById('mensajeCompra').style.display = 'block';

    // Vaciar el carrito
    vaciarCarrito();

    // Opcional: Después de unos segundos, ocultar el mensaje de compra
    setTimeout(() => {
      document.getElementById('mensajeCompra').style.display = 'none';
    }, 3000); // El mensaje desaparecerá después de 3 segundos
  } else {
    alert("Tu carrito está vacío. Agrega productos para comprar.");
  }
}

