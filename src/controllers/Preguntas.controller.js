const pool = require('../lib/database');

class IndexController {
    async List(req, res) {
      try{
        const Respuestas = await pool.query('select p.* from problemas p where p.FkIdUser =?',[req.user.IdUser]);
        res.render("Preguntas/list",{Respuestas});
      }catch(error){
        console.log(error);
        res.render("Preguntas/list");
      }
      
    }

    FrmAdd(req,res){
      try{
        res.render("Preguntas/add");
      }catch(error){
        console.log(error);
        res.render("Preguntas/add");
      }
    }

    async Add(req,res){
      try{
        const {Titulo, Descripcion, Categorias} = req.body;

        //const Imagen = req.file.filename;
        const NewProblema ={
          Titulo,
          Descripcion,
          Imagen:req.file.filename,
          Categorias,
          FkIdUser: req.user.IdUser
        }
        //console.log(NewProblema);
        await pool.query('Insert into Problemas set ?',[NewProblema]);
        req.flash('success','Problema publicado correctamente');
        res.redirect('/MisPreguntas')

      }catch(error){
        console.log(error);
        req.flash('message','Hubo un error contacte al servidor');
        res.redirect('/MisPreguntas')
      }
    }

    async FrmEdit(req,res){
      try{
        const {IdProblema} = req.params;
        const Problemas = await pool.query('select * from Problemas where IdProblema =?',[IdProblema]);
        res.render('Preguntas/edit',{Problema:Problemas[0]})
      }catch(error){
        console.log(error);
        res.render('Preguntas/edit')
      }
    }

    async Edit(req,res){
      try{
        const{IdProblema} = req.params;
        const {Titulo, Descripcion,Categorias} = req.body;
        const newProblema ={
          Titulo,
          Descripcion,
          Categorias
        }
        //console.log(newProblema);
        await pool.query('Update Problemas set ? where IdProblema = ?',[newProblema,IdProblema]);
        req.flash('success','Problema actualizado correctamente');
        res.redirect('/MisPreguntas');
      }catch(error){
        console.log(error);
        req.flash('message','Hubo un error contacte al servidor');
        res.redirect('/MisPreguntas')
      }
    }

    async Delete(req,res){
      try{
        const {IdProblema} = req.params;
        console.log(IdProblema);
        await pool.query('Delete from Comentarios where fkIdProblema = ?',[IdProblema])
        await pool.query('Delete from Problemas where IdProblema = ?',[IdProblema]);
        req.flash('success','Problema eliminado correctamente');
        res.redirect('/MisPreguntas');
      }catch(error){
        console.log(error);
        req.flash('message','Hubo un error contacte con el servidor');
        res.redirect('/MisPreguntas');
      }
    }
    
    async search(req,res){
      try{
        const {Buscar} = req.body;
        const Respuestas = await pool.query(`select * from Problemas where Titulo like '%${Buscar.toLowerCase()}%'`);
        res.render('Preguntas/list',{Respuestas});
      }catch(error){
        console.log(error);
        res.render('Preguntas/list');
      }
    }

  }
  
  module.exports = IndexController;