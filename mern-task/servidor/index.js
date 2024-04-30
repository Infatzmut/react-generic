const express = require('express');
const conectarDb = require('./config/db');
const cors = require('cors');

// Crear el servidor 
const app = express();
conectarDb();
const PORT = process.env.PORT || 4000;

// habilitar cors
app.use(cors());
// Habilitar express.json
app.use(express.json());
app.use(express.urlencoded({extended: false}))
// Importar rutas
app.use('/api/usuarios',require('./routes/usuarios') );
app.use('/api/auth',require('./routes/auth') );
app.use('/api/proyectos',require('./routes/proyectos') );
app.use('/api/tareas',require('./routes/tarea') );


// arrancar la app 
app.listen(PORT, () => {
    console.log(`Server running on port : ${PORT}`);
})