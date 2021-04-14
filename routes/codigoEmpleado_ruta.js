const express = require("express");
const router = express.Router();

const codigoModel = require("../models/ModelCodigoPersonal");

router.get("/", async(req, res)  => {
  resultado = await codigoModel.obtener();
  console.log(resultado.rows);
  

  if(resultado.success == false){
    return res.status(500).json({error:resultado.mensaje})
  }else{
     res.status(200).json({
      codigo: resultado.rows,
      cant_reg:resultado.rows.length,
      success:true,
      mensaje:'OK'
    });
  }
  
 
}); 

module.exports = router;
