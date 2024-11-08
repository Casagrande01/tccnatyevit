const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');
const rotaUsuario = require('./routes/usuario');
const rotaProduto = require('./routes/produto');
const rotaIndex = require('./routes/index');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(expressLayouts);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); 
app.use(express.static(path.join(__dirname, 'public'))); 

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.use('/', rotaIndex);
app.use('/usuario', rotaUsuario);
app.use('/produto', rotaProduto)

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
