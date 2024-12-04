// Obtener elementos del DOM
const cartItemsList = document.getElementById('cart-items');
const totalElement = document.getElementById('total');
const checkoutButton = document.getElementById('checkout');

// Array para almacenar los productos seleccionados
let cart = [];

// Función para agregar productos al carrito
document.querySelectorAll('.add-to-cart').forEach(button => {
  button.addEventListener('click', function() {
    const destination = this.getAttribute('data-destination');
    const price = parseInt(this.getAttribute('data-price'));
    
    // Agregar el destino al carrito
    cart.push({ destination, price });
    
    // Actualizar la interfaz del carrito
    updateCart();
  });
});

// Función para actualizar la vista del carrito
function updateCart() {
  // Limpiar la lista de elementos del carrito
  cartItemsList.innerHTML = '';

  // Añadir los productos seleccionados al carrito
  cart.forEach((item, index) => {
    const listItem = document.createElement('li');
    listItem.classList.add('list-group-item');
    listItem.innerHTML = `${item.destination} - $${item.price} <span class="remove-item" data-index="${index}">Eliminar</span>`;
    cartItemsList.appendChild(listItem);
  });

  // Actualizar el total
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  totalElement.textContent = total;

  // Agregar evento para eliminar productos del carrito
  document.querySelectorAll('.remove-item').forEach(button => {
    button.addEventListener('click', function() {
      const index = parseInt(this.getAttribute('data-index'));
      cart.splice(index, 1); // Eliminar el producto del carrito
      updateCart(); // Volver a actualizar el carrito
    });
  });
}

// Función para finalizar la compra (simulación)
checkoutButton.addEventListener('click', function() {
  if (cart.length > 0) {
    alert('¡Gracias por tu compra! Total: $' + totalElement.textContent);
    cart = []; // Limpiar el carrito
    updateCart(); // Actualizar la vista
  } else {
    alert('Tu carrito está vacío.');
  }
});
