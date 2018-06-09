const router = require('express').Router();

const authChecker = (req, res, next)=>{
  if(!req.user){
      //if user is not logged in
      res.redirect("/auth/login");
  }else{
    //if not logged in
    next();
  }
};

router.get('/', authChecker, (req, res)=>{
  res.render('profile', {user : req.user});
});


module.exports = router;
