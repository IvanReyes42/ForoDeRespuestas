const bcryptjs = require('bcryptjs')
const pool = require('./database');
const helpers = {};

helpers.encryptPassword = async(password)=>{
   const salt = await bcryptjs.genSalt(10);
   const hash = await bcryptjs.hash(password,salt);
   return hash;
};

helpers.matchPassword = async(password,savedPassword)=>{
    try{
        return await bcryptjs.compare(password,savedPassword);
    }catch(e){
        console.log(e);
    }
};

helpers.ValidarCalificacion = async(IdUser, IdComentario)=>{
    try{
        const Calificacion = await pool.query('select * from Calificaciones where FkIdUser = ? and FkIdComentario = ?',[IdUser,IdComentario]);
        //console.log(Calificacion.length)
        if(Calificacion.length > 0)
            return true
        else
            return false 
    }catch(e){
        console.log(e)
        return false;
    }
};

module.exports = helpers;