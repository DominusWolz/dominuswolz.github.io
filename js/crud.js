const formulario = document.getElementById('formulario-producto');
const btnGuardar = document.getElementById('btn-guardar');
const inputIndice = document.getElementById('indice-edicion');
const cuerpoTabla = document.getElementById('cuerpo-tabla');

let productos = [];

function cargarDatos() {
    const datosGuardados = localStorage.getItem('productosFutbol');
    if (datosGuardados) {
        productos = JSON.parse(datosGuardados);
    }
    renderizarTabla();
}

function renderizarTabla() {
    cuerpoTabla.innerHTML = ''; 

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

formulario.addEventListener('submit', function(e) {
    e.preventDefault(); 

    const id = document.getElementById('id-producto').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    const indice = inputIndice.value;

    const nuevoProducto = { id, nombre, precio, cantidad };

    if (indice === "-1") {
        productos.push(nuevoProducto);
    } else {
        productos[indice] = nuevoProducto;
        inputIndice.value = "-1"; 
        btnGuardar.textContent = "Agregar Producto";
    }

    localStorage.setItem('productosFutbol', JSON.stringify(productos));
    renderizarTabla();
    formulario.reset(); 
});

window.editarProducto = function(index) {
    const producto = productos[index];
    
    document.getElementById('id-producto').value = producto.id;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('cantidad').value = producto.cantidad;
    
    inputIndice.value = index; 
    btnGuardar.textContent = "Modificar Producto"; 
}

window.eliminarProducto = function(index) {
    if (confirm("¿Estás seguro de que deseas eliminar este producto?")) {
        productos.splice(index, 1); 
        localStorage.setItem('productosFutbol', JSON.stringify(productos));
        renderizarTabla();
    }
}

cargarDatos();