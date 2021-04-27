const express = require('express');
const router = express.Router();
const grupoModel = require('../models/ModelGrupo');


router.get('/obtenerGrupos', async (req, res) => {
    resultado = await grupoModel.obtenerGrupos();
    resultado.success == false
      ? res.status(500).json({error: resultado.mensaje})
      : res.status(200).json({
          codigo: resultado.rows,
          cant_reg: resultado.rows.length,
          success: true,
          mensaje: 'OK',
        });
  });
  
  router.get('/obtenerGrupoPorID/id=:id', async (req, res) => {
    resultado = await grupoModel.obtenerGrupoPorId(req.params.id);
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
  
  router.delete('/eliminarGrupo/id=:id', async (req, res) => {
    resultado = await grupoModel.eliminarGrupo(req.params.id);
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

  
router.put('/actualizarGrupo/id=:id', async (req, res) => {
    const id_grupo = req.params.id;
    const {descripcion, descripcion_secundaria, id_grupo_template} = req.body;
    console.log(req.body)
    if (  descripcion && id_grupo_template  ) {
      resultado = await grupoModel.actualizarGrupo(
        descripcion,
        descripcion_secundaria,
        id_grupo_template,
        id_grupo
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
  
  router.post('/insertarGrupo', async (req, res) => {
    const {descripcion, descripcion_secundaria, id_grupo_template} = req.body;
    console.log(req.body)
    if (descripcion && id_grupo_template ) {
      resultado = await grupoModel.insertarGrupo(
        descripcion,
        descripcion_secundaria,
        id_grupo_template,
      );
      if (resultado.success == true) {
        return res.status(200).json({
          success: true,
          mensaje: 'OK, insertado con exito',
        });
      }
    } else {
      return res.status(500).json({
       // error: resultado.mensaje,
        success: false,
        mensaje: 'ERROR',
      });
    }
  });
  

module.exports = router;

