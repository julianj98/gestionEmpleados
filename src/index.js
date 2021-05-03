const express = require("express");
const morgan = require("morgan");
const client = require("../data/ConexionDB");
//crear una app de express
const app = express();
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");


// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
    swaggerDefinition: {
      info: {
        version: "1.0.0",
        title: "Sistema Gestion del personal",
        description: "API para llevar registro del personal",
        contact: {
          name: "Direccion Informatica",
          email: "email@ejemplo.com",
        },
        servers: ["http://localhost:3000"],
      },
    },
    apis: ["./src/doc.js"],
  };
  const swaggerDocs = swaggerJsDoc(swaggerOptions);
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));


app.set("port", process.env.PORT || 3000);

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// <- USO DE RUTAS ->
// ruta codigoPersonal
app.use("/personal/CodigoPersonal", require("../routes/codigoEmpleado_ruta"));
app.use("/empleado", require("../routes/empleado_ruta"));
app.use("/informeDiario", require("../routes/informeDiario_ruta"));
app.use("/grupo", require("../routes/grupo_ruta"));
app.use("/grupoTemplate", require("../routes/grupo_template_ruta"));

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

