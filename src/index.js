const express = require("express");
const morgan = require("morgan");
const client = require("../data/ConexionDB");
const swaggerJsDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
//crear una app de express
const app = express();

app.set("port", process.env.PORT || 3000);

// Extended: https://swagger.io/specification/#infoObject
const swaggerOptions = {
  swaggerDefinition: {
    info: {
      version: "1.0.0",
      title: "Sistema Gestion del personal",
      description: "API para llevar registro del personal",
      contact: {
        name: "Direccion Informatica",
        email: "email@ejemplo.com",
      },
      servers: ["http://localhost:3000"],
    },
  },
  apis: ["./src/index.js"],
};
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// <- USO DE RUTAS ->
// ruta codigoPersonal
app.use("/personal/CodigoPersonal", require("../routes/codigoEmpleado_ruta"));
app.use("/empleado", require("../routes/empleado_ruta"));
app.use("/informeDiario", require("../routes/informeDiario_ruta"));

app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});

// DOCUMENTACION CON SWAGGER- //

/**
 * @swagger
 * tags:
 *   name: Codigos del personal
 *   description: CRUD de los codigos del personal de DIM
 */

/*
 * @swagger
 *  tags:
 *   name: Empleados.
 *   description: CRUD de los empleados
 */

/**
 *  @swagger
 *definitions:
 *  Codigos:
 *    type: object
 *    required:
 *      - id_codigo_personal
 *      - codigo
 *      - descripcion
 *      - habilitado
 *    properties:
 *      id_codigo_personal:
 *        type: integer
 *        description: id del codigo de personal
 *        example: 1
 *      codigo:
 *        type: string
 *        description: codigo del personal
 *        example: B2
 *      descripcion:
 *        type: string
 *        description: descripcion del codigo de personal
 *        example: codigo de verificacion B2
 *      habilitado:
 *        type: integer
 *        description: asignar 0 para codigo inhabilitado y 1 para un codigo habilitado
 *        example: 1
 *  Empleados:
 *    type: object
 *    required:
 *      - id_usuario
 *      - nro_afiliado
 *      - apellido
 *      - nombre
 *      - sucursal
 *      - id_grupo
 *    properties:
 *      id_usuario:
 *          type: integer
 *          description: id del empleado
 *          example: 14
 *      nro_afiliado:
 *          type: integer
 *          description: numero unico de empleado
 *          example: 17992
 *      apellido:
 *         type: string
 *         description: apellido del empleado
 *         example: Achavar
 *      nombre:
 *         type: string
 *         description: nombre del empleado
 *         example: Antonio Perez
 *      sucursal:
 *         type: integer
 *         description: sucursal donde se encuentra el empleado
 *         example: 1
 *      dcto_exp:
 *         type: string
 *         description: documento expediente del empleado
 *         example: 1255/SG
 *      observacion:
 *         type: string
 *         description: observaciones del empleado
 *         example: 1
 *      horario_laboral_desde:
 *         type: string
 *         description: horario de entrada del empleado
 *         example: "08:00:00"
 *      horario_laboral_hasta:
 *         type: string
 *         description: horario de salida del empleado
 *         example: "14:00:00"
 *      fecha_ingreso:
 *         type: string
 *         description: fecha que ingreso el empleado
 *         example: "2015-05-13"
 *      fecha_salida:
 *         type: string
 *         description: fecha que vence el contrato del empleado
 *         example: "2020-10-22"
 *      id_codigo_personal:
 *         type: integer
 *         description: id del codigo de personal que esta asociado al empleado
 *         example: 1
 *      id_grupo:
 *         type: integer
 *         description: id del grupo esta asociado al empleado
 *         example: 1
 *  grupos:
 *    type: object
 *    required:
 *      - id_grupo
 *      - descripcion
 *      - id_grupo_template
 *    properties:
 *      id_grupo:
 *          type: integer
 *          description: id del grupo
 *          example: 3
 *      descripcion:
 *          type: string
 *          description: descripcion del grupo
 *          example: fiscalizacion
 *      descripcion_secundaria:
 *          type: string
 *          description: descripcion secundaria del grupo
 *          example: oficina exencion C.I.S.I
 *      id_grupo_template:
 *          type: integer
 *          description: id del grupo template
 *          example: 1
 *  grupo_template:
 *    type: object
 *    required:
 *      - id_grupo_template
 *      - nombre
 *    properties:
 *      id_grupo_template:
 *          type: integer
 *          description: id del grupo template
 *          example: 1
 *      nombre:
 *          type: string
 *          description: nombre del grupo template
 *          example: Direccion de Ingresos Municipales
 */
  
 // CODIGO DEL PERSONAL //

/**
 * @swagger
 *  /personal/CodigoPersonal/obtenerCodigosPersonal:
 *  get:
 *    summary: Se reciben todos los codigos del personal
 *    description: se reciben todos los codigos del personal
 *    tags: [Codigos del personal]
 *    responses:
 *      '200':
 *        description: Todo Ok
 *      '500':
 *        description: Error interno al realizar la peticion al servidor
 *    items:
 *       $ref: '#/definitions/Codigos'
 */

/**
 * @swagger
 *  /personal/CodigoPersonal/obtenerCodigoPersonalID/id={id_codigo_personal}:
 *  get:
 *    summary: Permite obtener un codigo del personal
 *    description: se recibe un codigo del personal
 *    tags: [Codigos del personal]
 *    parameters:
 *    - in: path
 *      name: id_codigo_personal
 *      schema:
 *       type: integer
 *      required: true
 *      description: id del empleado
 *      example: 2
 *    responses:
 *      '200':
 *        description: Todo Ok
 *      '500':
 *        description: Error interno al realizar la peticion al servidor
 */

/**
 * @swagger
 *  /personal/CodigoPersonal/insertarCodigoPersonal:
 *  post:
 *    summary: Registrar un nuevo codigo de personal
 *    tags: [Codigos del personal]
 *    parameters:
 *     - in: body
 *       name: codigo Empleado
 *       required: true
 *       description: nuevo Codigo para empleados
 *       schema:
 *             $ref: '#/definitions/Codigos'
 *    requestBody:
 *     content:
 *      application/json:
 *       200:
 *        description: Todo Ok
 *       500:
 *        description: Error interno al realizar la peticion al servidor
 */

/**
 * @swagger
 *  /personal/CodigoPersonal/eliminarCodigoPersonal/id={id_codigo_personal}:
 *  delete:
 *   summary: Eliminar un codigo de personal
 *   tags: [Codigos del personal]
 *   description: elimnar codigo personal
 *   parameters:
 *    - in: path
 *      name: id_codigo_personal
 *      schema:
 *       type: integer
 *      required: true
 *      description:
 *      example: 2
 *   responses:
 *     200:
 *      description: Todo Ok
 *     500:
 *      description: Error interno al realizar la peticion al servidor
 */

/**
 * @swagger
 *  /personal/CodigoPersonal/actualizarCodigoPersonal/id={id_codigo_personal}:
 *  put:
 *   summary: Actualizar codigo del personal
 *   tags: [Codigos del personal]
 *   description: Actualizar codigo del personal
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id_codigo_personal
 *      schema:
 *       type: integer
 *      required: true
 *      description: id of the employee
 *      example: 2
 *    - in: body
 *      name: descripcion
 *      required: true
 *      description: descripcion del codigo
 *      schema:
 *       $ref: '#/definitions/Codigos'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Codigos'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *          $ref: '#/definitions/Codigos'
 */

// EMPLEADOS //

/**
 * @swagger
 *  /empleado/obtenerEmpleados:
 *  get:
 *    summary: Se reciben todos los empleados
 *    description: se reciben todos empleados
 *    tags: [Empleados]
 *    responses:
 *      '200':
 *        description: Todo Ok
 *      '500':
 *        description: Error interno al realizar la peticion al servidor
 *    items:
 *       $ref: '#/definitions/Empleados'
 */


/**
 * @swagger
 *  /empleado/obtenerEmpleadoPorID/id={id_usuario}:
 *  get:
 *    summary: Permite obtener un empleado
 *    description: se recibe un empleado
 *    tags: [Empleados]
 *    parameters:
 *    - in: path
 *      name: id_usuario
 *      schema:
 *       type: integer
 *      required: true
 *      example: 2
 *    responses:
 *      '200':
 *        description: Todo Ok
 *      '500':
 *        description: Error interno al realizar la peticion al servidor
 */



/**
 * @swagger
 *  /empleado/insertarEmpleado:
 *  post:
 *    summary: Registrar un nuevo codigo de personal
 *    tags: [Empleados]
 *    parameters:
 *     - in: body
 *       name: id_usuario
 *       required: true
 *       description: nuevo Empleado
 *       schema:
 *             $ref: '#/definitions/Empleados'
 *    requestBody:
 *     content:
 *      application/json:
 *         200:
 *          description: Todo Ok
 *         500:
 *          description: Error interno al realizar la peticion al servidor
 */

/**
 * @swagger
 *  /empleado/eliminarEmpleado/id={id_usuario}:
 *  delete:
 *   summary: Eliminar un empleado
 *   tags: [Empleados]
 *   description: elimnar un empleado
 *   parameters:
 *    - in: path
 *      name: id_usuario
 *      schema:
 *       type: integer
 *      required: true
 *      description:
 *      example: 2
 *   responses:
 *    200:
 *      description: Todo Ok
 *    500:
 *      description: Error interno al realizar la peticion al servidor
 */

/**
 * @swagger
 *  /empleado/actualizarEmpleado/id={id_usuario}:
 *  put:
 *   summary: Actualizar datos de un empleado
 *   tags: [Empleados]
 *   description: Actualizar datos de un empleado
 *   consumes:
 *    - application/json
 *   produces:
 *    - application/json
 *   parameters:
 *    - in: path
 *      name: id_usuario
 *      schema:
 *       type: integer
 *      required: true
 *      example: 2
 *    - in: body
 *      name: descripcion
 *      required: true
 *      description: descripcion del empleado
 *      schema:
 *       $ref: '#/definitions/Empleados'
 *   requestBody:
 *    content:
 *     application/json:
 *      schema:
 *       $ref: '#/definitions/Empleados'
 *   responses:
 *    200:
 *     description: success
 *     content:
 *      application/json:
 *       schema:
 *          $ref: '#/definitions/Empleados'
 */


