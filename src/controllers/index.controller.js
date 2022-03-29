const pool = require("../lib/database");
const helpers = require('../lib/helpers')

class IndexController {
    async List(req, res) {
      try{
        const Preguntas = await pool.query('select p.*, u.UserName from problemas p, users u where p.FkIdUser = u.IdUser');
        res.render("Principal/index",{Preguntas});
      }catch(error){
        console.log(error);
        res.render("Principal/index");
      }
    }

    async search(req,res){
      try{
        const {Buscar, Categoria} = req.body;
        console.log(Buscar);
        console.log(Categoria);
        const Preguntas = await pool.query(`select p.*, u.UserName from problemas p, users u where p.FkIdUser = u.IdUser and p.Titulo like '%${Buscar.toLowerCase()}%' and p.Categorias like '%${Categoria.toLowerCase()}%'`);
        res.render("Principal/index",{Preguntas});
      }catch(error){
        console.log(error);
        res.render("Principal/index");
      }
    }

    async FrmRespuestas(req,res){
      try{
        const {IdProblema} = req.params;
        const Preguntas = await pool.query('select p.*, u.UserName from problemas p, users u where p.FkIdUser = u.IdUser and p.IdProblema = ?',[IdProblema]);
        //const Respuestas = await pool.query('select p.*, u.UserName from Comentarios p, users u where p.FkIdUser = u.IdUser and p.FkIdProblema = ?',[IdProblema]);
        //const Calificaciones = await pool.query('select * from Calificaciones');
        const Respuestas = await pool.query('select p.*, u.UserName,(select c.calificacion from Calificaciones c where c.FkIdUser = ? and c.FkIdComentario  = p.IdComentario) AS calificacion from Comentarios p, users u where p.FkIdUser = u.IdUser and  p.FkIdProblema = ?',[req.user.IdUser,IdProblema])
        
        console.log(Respuestas)
        
        res.render('Principal/Respuestas',{Pregunta:Preguntas[0],Respuestas});
      }catch(error){
        console.log(error);
        res.render('Principal/Respuestas')
      }
    }

    async FrmRespuestasPublic(req,res){
      try{
        const {IdProblema} = req.params;
        const Preguntas = await pool.query('select p.*, u.UserName from problemas p, users u where p.FkIdUser = u.IdUser and p.IdProblema = ?',[IdProblema]);
        //const Respuestas = await pool.query('select p.*, u.UserName from Comentarios p, users u where p.FkIdUser = u.IdUser and p.FkIdProblema = ?',[IdProblema]);
        //const Calificaciones = await pool.query('select * from Calificaciones');
        const Respuestas = await pool.query('select p.*, u.UserName from Comentarios p, users u where p.FkIdUser = u.IdUser and  p.FkIdProblema = ?',[IdProblema])
        
        console.log(Respuestas)
        
        res.render('Principal/Respuestas',{Pregunta:Preguntas[0],Respuestas});
      }catch(error){
        console.log(error);
        res.render('Principal/Respuestas')
      }
    }

    async AddComentario(req,res){
      try{
        const {IdProblema} = req.params;
        const {Comentario} = req.body;
        const newComentario ={
          Comentario,
          FkIdProblema:IdProblema,
          FkIdUser:req.user.IdUser
        }
        console.log(newComentario);
        await pool.query('insert into comentarios set ?',[newComentario]);
        req.flash('success','Comentario publicado correctamente');
        res.redirect('/Respuestas/',IdProblema);

      }catch(error){
        const {IdProblema} = req.params;
        console.log(error);
        req.flash('message','Hubo un error contacte al servidor');
        res.redirect('/Respuestas/'+IdProblema);
      }

    }

    async Calificar(req,res){
      try{
        const{IdComentario} = req.params;
        const{rateR} = req.body;
        const newCalificacion = {
          FkIdUser: req.user.IdUser,
          FkIdComentario: IdComentario,
          Calificacion: rateR,
        }
        
        const Validar = await helpers.ValidarCalificacion(req.user.IdUser,IdComentario);
        const Comentario = await pool.query('select * from comentarios where IdComentario = ?',[IdComentario]);
        console.log(Comentario[0].FkIdProblema)
        if(Validar){
          await pool.query('update Calificaciones set calificacion = ? where FkIdUser = ? and FkIdComentario = ?',[rateR,req.user.IdUser,IdComentario]);
          res.redirect('/Respuestas/'+Comentario[0].FkIdProblema)
          
        }
        else{
          await pool.query('Insert into Calificaciones set ?',[newCalificacion]);
          res.redirect('/Respuestas/'+Comentario[0].FkIdProblema)
          
        }


      }catch(error){
        console.log(error)
      }
    }

  }
  
  module.exports = IndexController;