# dominuswolz.github.io
Proyecto Nube
# Sistema de Inventario Cloud - Futbol

Este es un sistema web de gestión de inventario (CRUD) desarrollado para la asignatura de Computación en la Nube del Instituto Profesional Santo Tomás. El proyecto demuestra la evolución del almacenamiento de datos, pasando de una arquitectura local offline a una arquitectura completamente en la nube

## Características Principales

El proyecto cuenta con un menú principal que bifurca en dos sistemas independientes:

1. Sistema Local (Offline):
   * Utiliza el LocalStorage del navegador
   * La información persiste solo en el dispositivo físico del usuario
   * Funciona sin conexión a Internet

2. Sistema en la Nube (Firebase):
   * Conectado a una base de datos NoSQL en la nube (Google Firebase Firestore)
   * La información se guarda, lee, actualiza y elimina en tiempo real desde los servidores de Google
   * Permite que múltiples dispositivos consulten el mismo inventario en sincronía

Ambos sistemas cuentan con:
* Interfaz de usuario (UI) moderna y responsiva
* Diseño en Modo Oscuro (Dark Theme)
* Retroalimentación visual al guardar y procesar datos

## Tecnologías Utilizadas

* HTML5: Estructura de las páginas
* CSS3: Estilos, Flexbox, Grid y animaciones
* JavaScript : Lógica del sistema
* Firebase : Base de datos Cloud 

## Estructura del Proyecto

El proyecto sigue una arquitectura ordenada separando las vistas de la lógica y los estilos:

/
├── index.html                  # Página principal (Menú de selección)
├── README.md                   # Documentación del proyecto
├── css/
│   └── Style.css               # Hoja de estilos global
├── js/
│   ├── crud.js                 # Lógica del sistema LocalStorage
│   └── crud-firebase.js        # Lógica y conexión a Firebase
└── html/
    ├── producto.html           # Vista del inventario local
    └── producto-firebase.html  # Vista del inventario Cloud

Instrucciones para ejecucion local
Si deseas probar el codigo fuente en tu propia computadora:

Clona o descarga este repositorio

Abre la carpeta del proyecto en tu editor de código (como Visual Studio Code)

Abre index.html para iniciar.

Desarrollado por Nicolas D. | Computación en la Nube