module.exports = function HomeHandler(req, res){
    if(!req.session.userid){
        return res.redirect('/login');
    }
    console.log("SESSION : ", req.session);
    res.setHeader('Content-Type', 'text/HTML');
    res.write(`
        <h1>Welcome back ${req.session.userid}</h1>
        <a href="/logout">Logout</a>    
    `);

    res.end();
}