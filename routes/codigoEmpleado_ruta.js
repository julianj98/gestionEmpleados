const express = require('express');
const router = express.Router();
const codigoModel = require('../models/ModelCodigoPersonal');

router.get('/', async (req, res) => {
  resultado = await codigoModel.obtenerListadoDeCodigos();
  resultado.success == false
    ? res.status(500).json({error: resultado.mensaje})
    : res.status(200).json({
        codigo: resultado.rows,
        cant_reg: resultado.rows.length,
        success: true,
        mensaje: 'OK',
      });
});

router.get('/obtener/:id', async (req, res) => {
  resultado = await codigoModel.obtenerCodigoEmpleadoPorId(req.params.id);
  if (resultado.success == false || resultado.rows.length == 0) {
    res.status(500).json({
      error: resultado.mensaje,
      success: false,
      mensaje: 'ERROR',
    });
  } else {
    res.status(200).json({
      codigo: resultado.rows[0],
      success: true,
      mensaje: 'OK',
    });
  }
});

router.delete('/eliminar/:id', async (req, res) => {
  resultado = await codigoModel.eliminarCodigoEmpleado(req.params.id);
  if (resultado.success == false) {
    res.status(500).json({
      error: resultado.mensaje,
      success: false,
      mensaje: 'ERROR',
    });
  } else {
    res.status(200).json({
      success: true,
      mensaje: 'OK, eliminado con exito',
    });
  }
});

router.put('/actualizar/:id', async (req, res) => {
  const id = req.params.id;
  const {codigo, descripcion, habilitado} = req.body;

  console.log(id, codigo, descripcion, habilitado);
  resultado = await codigoModel.actualizarCodigoEmpleado(
    codigo,
    descripcion,
    habilitado,
    id
  );
  console.log(resultado);
  if (
    !codigo ||
    !descripcion ||
    !habilitado ||
    !id ||
    resultado.success == false
  ) {
    return res.status(500).json({
      error: resultado.mensaje,
      success: false,
      mensaje: 'ERROR',
    });
  } else {
    res.status(200).json({
      success: true,
      mensaje: 'OK, modificado con exito',
    });
  }
});
module.exports = router;
