const express = require('express');
const app = express();
var alumnos = require("./routes/alumnos")
var profesores = require("./routes/maestros")



// Settings
app.set('port', process.env.PORT || 8080);

// Middlewares
app.use(express.json());

// Routes
app.use('/alumnos',alumnos);
app.use('/profesores',profesores);


// Starting the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
