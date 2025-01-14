const express = require('express');
const session = require('express-session');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');

const app = express();
const PORT = process.env.PORT || 3000;

// Configuração de sessão
app.use(session({
    secret: 'sdsadsd', 
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 3600000 }, 
}));

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// Outras rotas
const rotaUsuario = require('./routes/usuario');
const rotaProduto = require('./routes/produto');
const rotaCarrinho = require('./routes/carrinho');
const rotaIndex = require('./routes/index');

app.use('/', rotaIndex);
app.use('/usuarios', rotaUsuario);
app.use('/produtos', rotaProduto);
app.use('/carrinho', rotaCarrinho);

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});