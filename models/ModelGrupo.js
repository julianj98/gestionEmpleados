const client = require("../data/ConexionDB");

module.exports = {
  async insertarGrupo(descripcion, descripcionSecundaria, idGrupoTemplate) {
    try {
      const resultado = await client.query(
        `insert into grupos (descripcion, descripcion_secundaria, id_grupo_template) values ($1,$2,$3)`,
        [descripcion, descripcionSecundaria, idGrupoTemplate]
      );
      return {
        resultado: resultado,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        mensaje: "Error interno al realizar la peticion al servidor",
        errors: error,
      };
    }
  },

  async obtenerGrupos() {
    try {
      const resultado = await client.query(`select * from grupos`);
      return resultado;
    } catch (error) {
      return {
        success: false,
        mensaje: "Error interno al realizar la peticion al servidor",
        errors: error,
      };
    }
  },

  async obtenerGrupoPorId(id) {
    try {
      const resultado = await client.query(
        `select * from grupos where id_grupo=$1`,
        [id]
      );
      return resultado;
    } catch (error) {
      return {
        success: false,
        mensaje: "Error interno al realizar la peticion al servidor",
        errors: error,
      };
    }
  },

  async actualizarGrupo(
    descripcion,
    descripcion_secundaria,
    id_grupo_template,
    id_grupo
  ) {
    try {
      const resultado = await client.query(
        `update grupos set
         descripcion = $1,
         descripcion_secundaria = $2,
         id_grupo_template = $3
         where id_grupo = $4`,
        [descripcion, descripcion_secundaria, id_grupo_template, id_grupo]
      );
      return {
        resultado: resultado,
        success: true,
      };
    } catch (error) {
      return {
        success: false,
        mensaje: "Error interno al realizar la peticion al servidor",
        errors: error,
      };
    }
  },

  async eliminarGrupo(id) {
    try {
      const resultado = client.query(`delete from grupos where id_grupo = $1`, [
        id,
      ]);
      return resultado;
    } catch (error) {
      return {
        success: false,
        mensaje: "Error interno al realizar la peticion al servidor",
        errors: error,
      };
    }
  },
};

// ``
