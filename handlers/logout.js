module.exports = function LogoutHandler(req, res){
    req.session.destroy();
    console.log("Logged out!!");
    res.redirect('/');
}