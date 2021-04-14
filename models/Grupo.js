const client = require("../data/Conexion");

module.exports = {
  async insertar(descripcion, descripcionSecundaria, idGrupoTemplate) {
    const resultado = await conexion.query(
      `insert into grupos (descripcion, descripcion_secundaria, id_grupo_template) values ($1,$2,$3)`,
      [descripcion, descripcionSecundaria, idGrupoTemplate]
    );
    return resultado;
  },
  async obtener() {
    const resultados = await conexion.query(`select * from grupos`);
    return resultados.rows;
  },
  async obtenerPorId(id) {
    const resultado = await conexion.query(`select * from grupos where id=$1`, [
      id,
    ]);
    return resultado.rows[0];
  },
  async actualizar(id, descripcion, descripcionSecundaria, idGrupoTemplate) {
    const resultado = conexion.query(
      `update grupos set
    descripcion =$1,
    descripcion_secundaria=$2,
    id_grupo_template=$3
    where id_grupo=$4`,
      [descripcion, descripcionSecundaria, idGrupoTemplate, id]
    );
    return resultado;
  },
  async eliminar(id) {
    const resultado = conexion.query(`delete from grupos where id_grupo = $1`, [
      id,
    ]);
    return resultado;
  },
};

// ``
