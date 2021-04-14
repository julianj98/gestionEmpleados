const client = require('../data/ConexionDB');

module.exports = {
  async insertar(
    nroAfiliado,
    apellido,
    nombre,
    sucursal,
    dcto_exp,
    observacion,
    horarioLaboralDesde,
    horarioLaboralHasta,
    fechaIngreso,
    fechaSalida,
    idCodigoPersonal,
    idGrupo
  ) {
    const resultado = await client.query(
      `
      INSERT INTO empleados(nro_afiliado, apellido, nombre, sucursal, dcto_exp, observacion, horario_laboral_desde, horario_laboral_hasta, 
      fecha_ingreso, fecha_salida, id_codigo_personal, id_grupo) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12)
      `,
      [
        nroAfiliado,
        apellido,
        nombre,
        sucursal,
        dcto_exp,
        observacion,
        horarioLaboralDesde,
        horarioLaboralHasta,
        fechaIngreso,
        fechaSalida,
        idCodigoPersonal,
        idGrupo,
      ]
    );
    return resultado;
  },
  async obtener() {
    const resultado = await client.query('select * from empleados');
    return resultado.rows;
  },
  async obtenerPorId(id) {
    const resultado = await client.query(
      `select * from empleados where id_usuario = $1`,
      [id]
    );
    return resultado;
  },
  async actualizar(
    nroAfiliado,
    apellido,
    nombre,
    sucursal,
    dcto_exp,
    observacion,
    horarioLaboralDesde,
    horarioLaboralHasta,
    fechaIngreso,
    fechaSalida,
    idCodigoPersonal,
    idGrupo
  ) {
    const resultado = client.query(
      `update empleados
       set nro_afiliado = $1, 
       apellido = $2, 
       nombre= $3,
       sucursal= $4, 
       dcto_exp= $5, 
       observacion= $6, 
       horario_laboral_desde= $7, 
       horario_laboral_hasta= $8, 
       fecha_ingreso= $9,
       fecha_salida= $10,
       id_codigo_personal= $11,
       id_grupo= $12
       where id_usuario=$13`,
      [
        nroAfiliado,
        apellido,
        nombre,
        sucursal,
        dcto_exp,
        observacion,
        horarioLaboralDesde,
        horarioLaboralHasta,
        fechaIngreso,
        fechaSalida,
        idCodigoPersonal,
        idGrupo,
        id_usuario,
      ]
    );
    return resultado;
  },
  async eliminar(id) {
    const resultado = client.query(
      `delete from empleados where id_usuario = $1`,
      [id]
    );
    return resultado;
  },
};
