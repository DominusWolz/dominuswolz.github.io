// Referencias a los elementos del DOM
const formulario = document.getElementById('formulario-producto');
const btnGuardar = document.getElementById('btn-guardar');
const inputIndice = document.getElementById('indice-edicion');
const cuerpoTabla = document.getElementById('cuerpo-tabla');

// Array principal que guarda los datos
let productos = [];

// 1. LEER (Read) - Cargar datos iniciales
function cargarDatos() {
    // Busca en LocalStorage, si no hay nada, devuelve un array vacío
    const datosGuardados = localStorage.getItem('productosFutbol');
    if (datosGuardados) {
        productos = JSON.parse(datosGuardados);
    }
    renderizarTabla();
}

// Dibujar la tabla en el HTML
function renderizarTabla() {
    cuerpoTabla.innerHTML = ''; // Limpiar la tabla antes de dibujar

    productos.forEach((producto, index) => {
        const fila = document.createElement('tr');
        
        fila.innerHTML = `
            <td>${producto.id}</td>
            <td>${producto.nombre}</td>
            <td>$${producto.precio}</td>
            <td>${producto.cantidad}</td>
            <td>
                <button class="btn-editar" onclick="editarProducto(${index})">Editar</button>
                <button class="btn-eliminar" onclick="eliminarProducto(${index})">Eliminar</button>
            </td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

// 2. CREAR o ACTUALIZAR (Create / Update)
formulario.addEventListener('submit', function(e) {
    e.preventDefault(); // Evita que la página se recargue

    // Capturar los valores
    const id = document.getElementById('id-producto').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    const indice = inputIndice.value;

    const nuevoProducto = { id, nombre, precio, cantidad };

    if (indice === "-1") {
        // Modo Crear: Se agrega un producto nuevo
        productos.push(nuevoProducto);
    } else {
        // Modo Actualizar: Se modifica el producto existente
        productos[indice] = nuevoProducto;
        inputIndice.value = "-1"; // Volver al estado de creación
        btnGuardar.textContent = "Agregar Producto";
    }

    // Guardar en LocalStorage y redibujar
    localStorage.setItem('productosFutbol', JSON.stringify(productos));
    renderizarTabla();
    formulario.reset(); // Limpiar el formulario
});

// 3. EDITAR (Llevar los datos de vuelta al formulario)
window.editarProducto = function(index) {
    const producto = productos[index];
    
    document.getElementById('id-producto').value = producto.id;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('cantidad').value = producto.cantidad;
    
    inputIndice.value = index; // Guardamos qué posición estamos editando
    btnGuardar.textContent = "Modificar Producto"; // Cambiamos el texto del botón
}

// 4. ELIMINAR (Delete)
window.eliminarProducto = function(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        productos.splice(index, 1); // Quita 1 elemento en la posición "index"
        localStorage.setItem('productosFutbol', JSON.stringify(productos));
        renderizarTabla();
    }
}

// Iniciar la aplicación cargando los datos
cargarDatos();