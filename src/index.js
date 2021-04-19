const express = require('express');
const morgan = require('morgan');
const client = require('../data/ConexionDB');

//crear una app de express
const app = express();

app.set('port', process.env.PORT || 3000);

app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());

// <- USO DE RUTAS ->
// ruta codigoPersonal
app.use('/personal/CodigoPersonal', require('../routes/codigoEmpleado_ruta'));
app.use('/empleado', require('../routes/empleado_ruta'));

app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});
