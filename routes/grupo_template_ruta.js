const express = require("express");
const grupoTemplateModel = require("../models/ModelGrupoTemplate");
const router = express.Router();

router.get("/obtenerGruposTemplate", async (req, res) => {
  resultado = await grupoTemplateModel.obtenerGruposTemplates();
  resultado.success == false
    ? res.status(500).json({
        error: resultado.mensaje,
        success: resultado.success,
      })
    : res.status(200).json({
        grupoTemplate: resultado.rows,
        cant_reg: resultado.rows.length,
        success: true,
        mensaje: "OK",
      });
});

router.get("/obtenerGrupoTemplatePorID/id=:id", async (req, res) => {
  resultado = await grupoTemplateModel.obtenerGrupoTemplatePorID(req.params.id);
  resultado.success == false || resultado.rows.length == 0
    ? res.status(500).json({
        error: resultado.mensaje,
        success: false,
        mensaje: "ERROR",
      })
    : res.status(200).json({
        empleado: resultado.rows[0],
        success: true,
        mensaje: "OK",
      });
});

router.delete("/eliminarGrupoTemplate/id=:id", async (req, res) => {
  resultado = await grupoTemplateModel.eliminarGrupoTemplate(req.params.id);
  resultado.success == false
    ? res.status(500).json({
        error: resultado.mensaje,
        success: false,
        mensaje: "ERROR",
      })
    : res.status(200).json({
        success: true,
        mensaje: "OK, eliminado con exito",
      });
});


router.put('/actualizarGrupoTemplate/id=:id', async (req, res) => {
  const id_grupo_template = req.params.id;
  const {nombre} = req.body;
  console.log(req.body)
  if (  nombre  ) {
    resultado = await grupoTemplateModel.actualizarGrupoTemplate(
      id_grupo_template,
      nombre
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


router.post("/insertarGrupoTemplate", async (req, res) => {
  const { nombre } = req.body;
  console.log(req.body);
  if (nombre) {
    resultado = await grupoTemplateModel.insertarGrupoTemplate(nombre);
    if (resultado.success == true) {
      return res.status(200).json({
        success: true,
        mensaje: "OK, insertado con exito",
      });
    }
  } else {
    return res.status(500).json({
      // error: resultado.mensaje,
      success: false,
      mensaje: "ERROR",
    });
  }
});

module.exports = router;
