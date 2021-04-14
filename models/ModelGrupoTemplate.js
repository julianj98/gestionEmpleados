const client = require("../data/ConexionDB");

module.exports = {
  async insertar(nombre) {
    const resultado = await client.query(
      "insert into grupo_template (nombre) VALUES ($1)",
      [nombre]
    );
    return resultado;
  },
  async obtener() {
    const resultados = await client.query("select * from grupo_template");
    return resultados.rows;
  },
  async obtenerPorId(id) {
    const resultado = await client.query(
      `select * from grupo_template where id_grupo_template = $1`,
      [id]
    );
    return resultado.rows[0];
  },
  async actualizar(id, nombre) {
    const resultado = client.query(
      `update grupo_template
    set nombre = $1 where id_grupo_template = $2`,
      [nombre, id]
    );
    return resultado;
  },
  async eliminar(id) {
    const resultado = client.query(
      `delete from grupo_template
    where id_grupo_template = $1`,
      [id]
    );
    return resultado;
  },
};

// ``
