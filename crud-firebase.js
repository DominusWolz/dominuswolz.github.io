import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs, doc, deleteDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.8.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBg1FTlCFCnJWMmhGxh8CiXVBmGHEXNy1U",
  authDomain: "inventarionube-76f44.firebaseapp.com",
  projectId: "inventarionube-76f44",
  storageBucket: "inventarionube-76f44.firebasestorage.app",
  messagingSenderId: "617039842232",
  appId: "1:617039842232:web:97c9c763c493a0798ddd4d"
};

// 3. Inicializar Firebase y la Base de Datos
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);


const formulario = document.getElementById('formulario-producto');
const btnGuardar = document.getElementById('btn-guardar');
const inputIndice = document.getElementById('indice-edicion');
const cuerpoTabla = document.getElementById('cuerpo-tabla');


const coleccionProductos = collection(db, "productos_futbol");

let listaProductos = [];
let idEdicion = "";

// ---  LEER DATOS DE LA NUBE ---
async function cargarDatos() {
    cuerpoTabla.innerHTML = "<tr><td colspan='5' style='text-align:center;'>Cargando datos desde Firebase...</td></tr>";
    
    try {
        const querySnapshot = await getDocs(coleccionProductos);
        listaProductos = []; 
        cuerpoTabla.innerHTML = ""; 
        
        querySnapshot.forEach((documento) => {
            let producto = documento.data();
            producto.firebaseId = documento.id; 
            listaProductos.push(producto);
            
            const fila = document.createElement('tr');
            fila.innerHTML = `
                <td>${producto.id}</td>
                <td>${producto.nombre}</td>
                <td>$${producto.precio}</td>
                <td>${producto.cantidad}</td>
                <td>
                    <button class="btn-editar" onclick="editarProducto('${producto.firebaseId}')">Editar</button>
                    <button class="btn-eliminar" onclick="eliminarProducto('${producto.firebaseId}')">Eliminar</button>
                </td>
            `;
            cuerpoTabla.appendChild(fila);
        });
    } catch (error) {
        console.error("Error al cargar datos:", error);
        cuerpoTabla.innerHTML = "<tr><td colspan='5'>Error al conectar con la nube. Revisa la consola.</td></tr>";
    }
}

// --- COMANDO 2: CREAR O ACTUALIZAR DATOS ---
formulario.addEventListener('submit', async function(e) {
    e.preventDefault(); 
    
    btnGuardar.textContent = "Guardando...";
    btnGuardar.disabled = true;

    const id = document.getElementById('id-producto').value;
    const nombre = document.getElementById('nombre').value;
    const precio = document.getElementById('precio').value;
    const cantidad = document.getElementById('cantidad').value;
    const modoEdicion = inputIndice.value;

    const datosGuardar = { id, nombre, precio, cantidad };

    try {
        if (modoEdicion === "-1") {
            // Guardar nuevo producto
            await addDoc(coleccionProductos, datosGuardar);
        } else {
            // Actualizar producto existente
            const documentoRef = doc(db, "productos_futbol", idEdicion);
            await updateDoc(documentoRef, datosGuardar);
            inputIndice.value = "-1";
        }
        
        formulario.reset();
        await cargarDatos(); 
    } catch (error) {
        console.error("Error guardando:", error);
        alert("Hubo un error al guardar. Revisa la consola (F12).");
    } finally {
        btnGuardar.textContent = "Agregar Producto";
        btnGuardar.disabled = false;
    }
});

// --- COMANDO 3: PREPARAR EDICIÓN ---
window.editarProducto = function(firebaseId) {
    const producto = listaProductos.find(p => p.firebaseId === firebaseId);
    
    document.getElementById('id-producto').value = producto.id;
    document.getElementById('nombre').value = producto.nombre;
    document.getElementById('precio').value = producto.precio;
    document.getElementById('cantidad').value = producto.cantidad;
    
    inputIndice.value = "1"; 
    idEdicion = firebaseId; 
    btnGuardar.textContent = "Modificar en la nube";
}

// --- COMANDO 4: ELIMINAR DATOS ---
window.eliminarProducto = async function(firebaseId) {
    if (confirm("¿Seguro que deseas borrar este producto de Firebase?")) {
        try {
            const documentoRef = doc(db, "productos_futbol", firebaseId);
            await deleteDoc(documentoRef);
            await cargarDatos(); 
        } catch (error) {
            console.error("Error eliminando:", error);
        }
    }
}

// Iniciar aplicación
cargarDatos();