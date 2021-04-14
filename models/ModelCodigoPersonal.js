const client = require("../data/ConexionDB");
client.connect();

module.exports = {
  async insertar(codigo, descripcion, habilitado) {
    const resultado = await client
      .query(
        `insert into codigo_personal(codigo, descripcion, habilitado)
        values($1,$2,$3)`,
        [codigo, descripcion, habilitado]
      )
      .then((response) => {
        console.log(response.rows);
        client.end();
      })
      .catch((err) => {
        client.end();
      });
  },
  async obtener() {
      try {
        const resultado = await client.query(`select * from codigo_personal`);
        return resultado;  
      } catch (error) {
        return ({
          success: false,
          mensaje: 'Error interno al realizar la peticion al servidor',
          errors: error
        })
      }
      
  },
  async obtenerPorId(id) {
    const resultado = await client.query(
      `select * from codigo_personal where id_codigo_personal = $1`,
      [id]
    );
    return resultado.rows[0];
  },
  async actualizar(codigo, descripcion, habilitado, id) {
    const resultado = await client.query(
      `update codigo_personal
    set codigo = $1,
    descripcion = $2,
    habilitado = $3
    where id_codigo_personal = $4
    `,
      [codigo, descripcion, habilitado, id]
    );
    return resultado;
  },
  async eliminar(id) {
    const resultado = await client.query(
      `
    delete from codigo_personal where id_codigo_personal = $1`,
      [id]
    );
    return resultado;
  },
};

// ``
