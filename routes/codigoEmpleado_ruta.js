const express = require("express");
const router = express.Router();
const codigoModel = require("../models/ModelCodigoPersonal");

router.get("/", async(req, res)  => {
  resultado = await codigoModel.obtenerListadoDeCodigos();
  (resultado.success == false) ? res.status(500).json({error:resultado.mensaje})
   : 
   res.status(200).json({
      codigo: resultado.rows,
      cant_reg:resultado.rows.length,
      success:true,
      mensaje:'OK'
    });
}); 

router.get("/obtener/:id", async(req, res) =>{
  resultado = await codigoModel.obtenerCodigoEmpleadoPorId(req.params.id);
  (resultado.success == false) ? res.status(500).json({
    error: resultado.mensaje,
    status: 500
  }) 
  :
  res.status(200).json({
    codigo: resultado.rows[0],
    success: true,
    mensaje: 'OK'
  })
})

module.exports = router;
