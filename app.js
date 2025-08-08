// Paso 1: Importar Express
const express = require('express');

// Paso 2: Crear una instancia de la aplicación
const app = express();

// Paso 3: Definir el puerto de escucha
const port = 3000;

// Paso 4: Poner el servidor a "escuchar"
app.listen(port, () => {
  console.log(`Servidor corriendo en http://localhost:${port}`);
});
