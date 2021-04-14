const express = require("express");
const morgan = require("morgan");
const client = require("../data/Conexion");

// client.connect();
// client
//   .query("SELECT * FROM codigo_personal")
  //  .then((response) => {
  //    console.log(response.rows);
  //    client.end();
  //  })
  //  .catch((err) => {
  //    client.end();
  //  });

// client
//   .query("insert into codigo_personal(codigo, descripcion, habilitado) values ('G1', 'CODIGO UNICO', 1);")
//   .then((response) => {
//     console.log("registro insertado");
//     client.end();
//   })
//   .catch((error) => {
//     console.log(error);
//     client.end();
//   });

//crear una app de express
const app = express();

app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//configurar rutas
// app.use('/', (req, res) => {
//     res.send("Home");
// })

app.use(require("../routes/index"));
app.use("/codigo", require("../routes/codigo"));

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
