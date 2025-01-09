const requireAuth = (req, res, next) => {
    if (req.session && req.session.userId) {
      return next();
    }

    res.redirect('/');

    res.status(401).json({ message: 'Usuário não autenticado' })
    return;
  };
  
module.exports = requireAuth;