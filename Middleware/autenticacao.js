module.exports = (req, res, next) => {
    if (req.session && req.session.usuarioId) {
        return next(); 
    }
    res.redirect('/login'); 
};
