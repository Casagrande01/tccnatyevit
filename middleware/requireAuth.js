const requireAuth = (req, res, next) => {
    console.log(req.session.usuarioId);  // Corrigido para usar 'usuarioId'
    if (req.session && req.session.usuarioId) {
        return next();
    }
    res.redirect('/login');  // Corrigido para o caminho correto
    return;
};

module.exports = requireAuth;