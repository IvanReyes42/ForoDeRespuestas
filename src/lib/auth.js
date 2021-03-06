module.exports = {

    isLoggedIn(req,res,next){
        if(req.isAuthenticated()){
            return next();
        }
        return res.redirect('/Login');
    },

    isNotLoggedin(req,res,next){
        if(!req.isAuthenticated()){
            return next();
        }
        return res.redirect('/Perfil');
    }
}