const passport = require('passport');
const Localstrategy = require('passport-local').Strategy

const pool = require("../lib/database")
const helpers = require("../lib/Helpers")

//Login y autenticacion
passport.use('local.signin',new Localstrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async(req, username,password,done)=>{
    
    const rows = await pool.query('Select * from users where UserName = ?',[username])
    if(rows.length>0){
        const user = rows[0];
         const validPassword = await helpers.matchPassword(password,user.Password)
         if(validPassword){
             done(null,user,req.flash('success','Welcome '+user.UserName));
         }
         else{
             done(null, false, req.flash('message','Incorrect Password'));
         }
    }
    else{
       return done(null,false,req.flash('message','The username does not exist')) 
    }
}
));

//Registro y cifrado
passport.use('local.Register', new Localstrategy({
    usernameField: 'username',
    passwordField: 'password',
    passReqToCallback: true
}, async (req,username,password,done)=>{
    const { fullname,email } = req.body;
    const newUser = {
        username,
        password,
        fullname,
        email
    };
    newUser.password = await helpers.encryptPassword(password);
   // console.log(newUser)
    const resul = await pool.query('Insert into Users set ?',[newUser])
    newUser.IdUser = resul.insertId;
    return done(null, newUser);
}));



passport.serializeUser((user,done)=>{
    done(null,user.IdUser);
});

passport.deserializeUser(async(id,done)=>{
    const rows= await pool.query('Select * from Users where IdUser=?',[id])
    done(null,rows[0]);
})