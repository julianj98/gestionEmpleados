const express = require('express');
const {jsPDF} = require('jspdf');
const modelInformeDiario = require('../models/ModelInformeDiario');

const router = express.Router();

router.get('/generarInforme', async (req, res) => {
  resultado = await modelInformeDiario.imprimirInformeDiario();
  if (resultado.success == false) {
    res.status(500).json({
      error: resultado.mensaje,
      success: resultado.success,
    });
  } else {
    // crearInformeDiario(resultado.rows);
    console.log(resultado.rows);
    res.status(200).json({
      empleado: resultado.rows,
      cant_reg: resultado.rows.length,
      success: true,
      mensaje: 'OK',
    });
  }
});
module.exports = router;
