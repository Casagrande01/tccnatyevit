const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const expressLayouts = require('express-ejs-layouts');


const app = express();
const PORT = process.env.PORT || 3000;



app.use(expressLayouts);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

app.use('/', express.static('views'));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
