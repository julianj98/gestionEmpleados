const client = require('../data/ConexionDB');
client.connect();

module.exports = {
  async imprimirInformeDiario() {
    try {
      const resultado = await client.query('select * from empleados');
      return resultado;
    } catch (error) {
      return {
        success: false,
        mensaje: 'Error interno al realizar la peticion al servidor',
        errors: error,
      };
    }
  },
};
