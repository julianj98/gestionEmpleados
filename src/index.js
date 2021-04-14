const express = require("express");
const morgan = require("morgan");
const client = require("../data/ConexionDB");

//crear una app de express
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//uso de las rutas
app.use(require("../routes/index"));
app.use("/personal/obtenerCodigosPersonal", require("../routes/codigoEmpleado_ruta"));

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
