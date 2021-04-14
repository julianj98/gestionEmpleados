const express = require("express");
const router = express.Router();

const codigoModel = require("../models/Codigo");

router.get("/", (req, res) => {
   res.json(codigoModel.obtener());
  // codigoModel
  //   .obtener()
  //   .then((codigo) => {
  //     res.send(codigo);
  //   })
  //   .catch((err) => {
  //     return res.status(500).send("Error obteniendo productos");
  //   });
});

module.exports = router;
