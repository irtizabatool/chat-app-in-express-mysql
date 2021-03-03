const express = require('express');
const path = require('path');
const app = express();
const db = require('./connection');
const routes = require('./routes/users');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.use(express.static(path.join(__dirname, 'public')));

app.use('/users', routes);

app.get('/', (req,res) => {
 res.send("<h1>Succesfull</h1>")
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));