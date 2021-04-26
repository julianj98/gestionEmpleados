const express = require('express');
const empleadoModel = require('../models/ModelEmpleado');
const router = express.Router();

router.get('/obtenerEmpleados', async (req, res) => {
  resultado = await empleadoModel.obtenerEmpleados();
  resultado.success == false
    ? res.status(500).json({
        error: resultado.mensaje,
        success: resultado.success,
      })
    : res.status(200).json({
        empleado: resultado.rows,
        cant_reg: resultado.rows.length,
        success: true,
        mensaje: 'OK',
      });
});

router.get('/obtenerEmpleadoPorID/id=:id', async (req, res) => {
  resultado = await empleadoModel.obtenerEmpleadoPorId(req.params.id);
  resultado.success == false || resultado.rows.length == 0
    ? res.status(500).json({
        error: resultado.mensaje,
        success: false,
        mensaje: 'ERROR',
      })
    : res.status(200).json({
        empleado: resultado.rows[0],
        success: true,
        mensaje: 'OK',
      });
});

router.delete('/eliminarEmpleado/id=:id', async (req, res) => {
  resultado = await empleadoModel.eliminarEmpleado(req.params.id);
  resultado.success == false
    ? res.status(500).json({
        error: resultado.mensaje,
        success: resultado.success,
        mensaje: 'ERROR',
      })
    : res.status(200).json({
        success: true,
        mensaje: 'OK, empleado eliminado con exito',
      });
});

router.put('/actualizarEmpleado/id=:id', async (req, res) => {
  const id_usuario = req.params.id;
  const {
    nro_afiliado,
    apellido,
    nombre,
    sucursal,
    dcto_exp,
    observacion,
    horario_laboral_desde,
    horario_laboral_hasta,
    fecha_ingreso,
    fecha_salida,
    id_codigo_personal,
    id_grupo,
  } = req.body;

  if (
    id_usuario &&
    nro_afiliado &&
    apellido &&
    nombre &&
    sucursal &&
    fecha_ingreso
  ) {
    resultado = await empleadoModel.actualizarEmpleado(
      id_usuario,
      nro_afiliado,
      apellido,
      nombre,
      sucursal,
      dcto_exp,
      observacion,
      horario_laboral_desde,
      horario_laboral_hasta,
      fecha_ingreso,
      fecha_salida,
      id_codigo_personal,
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
          mensaje: 'OK, empleado modificado con exito',
        });
  } else {
    return res.json({
      success: false,
      mensaje: 'ERROR',
    });
  }
});

router.post('/insertarEmpleado', async (req, res) => {
  const {
    nro_afiliado,
    apellido,
    nombre,
    sucursal,
    dcto_exp,
    observacion,
    horario_laboral_desde,
    horario_laboral_hasta,
    fecha_ingreso,
    fecha_salida,
    id_codigo_personal,
    id_grupo,} = req.body;
    if (
      nro_afiliado &&
      apellido &&
      nombre &&
      sucursal &&
      fecha_ingreso
    )  {
    resultado = await empleadoModel.insertarEmpleado(
      nro_afiliado,
      apellido,
      nombre,
      sucursal,
      dcto_exp,
      observacion,
      horario_laboral_desde,
      horario_laboral_hasta,
      fecha_ingreso,
      fecha_salida,
      id_codigo_personal,
      id_grupo,
    );
    if (resultado.success == true) {
      return res.status(200).json({
        success: true,
        mensaje: 'OK, insertado con exito',
      });
    }
  } else {
    return res.status(500).json({
//      error: resultado.mensaje,
      success: false,
      mensaje: 'ERROR',
    });
  }
});



module.exports = router;

// INSERTAR UN EMPLEADO