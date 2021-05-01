const client = require("../data/ConexionDB");

module.exports = {
  async insertarGrupoTemplate(nombre) {
    try {
      const resultado = await client.query(
        "insert into grupo_template (nombre) VALUES ($1)",
        [nombre]
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
  async obtenerGruposTemplates() {
    try {
      const resultados = await client.query("select * from grupo_template");
      return resultados;
    } catch (error) {
      return {
        success: false,
        mensaje: "Error interno al realizar la peticion al servidor",
        errors: error,
      };
    }
  },

  async obtenerGrupoTemplatePorID(id) {
    try {
      const resultado = await client.query(
        `select * from grupo_template where id_grupo_template = $1`,
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
  async actualizarGrupoTemplate(id, nombre) {
    try {
      const resultado = client.query(
        `update grupo_template
    set nombre = $1 where id_grupo_template = $2`,
        [nombre, id]
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

  async eliminarGrupoTemplate(id) {
    try {
      const resultado = client.query(
        `delete from grupo_template
    where id_grupo_template = $1`,
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
};

// ``
