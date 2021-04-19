const express = require('express');
const router = express.Router();
const codigoModel = require('../models/ModelCodigoPersonal');

router.get('/obtenerCodigosPersonal', async (req, res) => {
  resultado = await codigoModel.obtenerListadoDeCodigosPersonal();
  resultado.success == false
    ? res.status(500).json({error: resultado.mensaje})
    : res.status(200).json({
        codigo: resultado.rows,
        cant_reg: resultado.rows.length,
        success: true,
        mensaje: 'OK',
      });
});

router.get('/obtenerCodigoPersonalID/id=:id', async (req, res) => {
  resultado = await codigoModel.obtenerCodigoPersonalPorId(req.params.id);
  resultado.success == false || resultado.rows.length == 0
    ? res.status(500).json({
        error: resultado.mensaje,
        success: false,
        mensaje: 'ERROR',
      })
    : res.status(200).json({
        codigo: resultado.rows[0],
        success: true,
        mensaje: 'OK',
      });
});

router.delete('/eliminarCodigoPersonal/id=:id', async (req, res) => {
  resultado = await codigoModel.eliminarCodigoPersonal(req.params.id);
  resultado.success == false
    ? res.status(500).json({
        error: resultado.mensaje,
        success: false,
        mensaje: 'ERROR',
      })
    : res.status(200).json({
        success: true,
        mensaje: 'OK, eliminado con exito',
      });
});

router.put('/actualizarCodigoPersonal/id=:id', async (req, res) => {
  const id = req.params.id;
  const {codigo, descripcion, habilitado} = req.body;
  if (codigo && descripcion && habilitado && id) {
    resultado = await codigoModel.actualizarCodigoPersonal(
      codigo,
      descripcion,
      habilitado,
      id
    );
    resultado.success == false
      ? res.status(500).json({
          error: resultado.mensaje,
          success: false,
          mensaje: 'ERROR',
        })
      : res.status(200).json({
          success: true,
          mensaje: 'OK, modificado con exito',
        });
  } else {
    return res.status(500).json({
      success: false,
      mensaje: 'ERROR',
    });
  }
});

router.post('/insertarCodigoPersonal', async (req, res) => {
  const {codigo, descripcion, habilitado} = req.body;
  if (codigo && descripcion && habilitado) {
    resultado = await codigoModel.insertarCodigoPersonal(
      codigo,
      descripcion,
      habilitado
    );
    if (resultado.success == true) {
      return res.status(200).json({
        success: true,
        mensaje: 'OK, insertado con exito',
      });
    }
  } else {
    return res.status(500).json({
      error: resultado.mensaje,
      success: false,
      mensaje: 'ERROR',
    });
  }
});

module.exports = router;
