const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/', function (req, res) {
    res.render('index')
})
app.get('/users', function (req, res) {
    res.render('users/index',{
        users: [
            { id: 1, name: 'hoang'},
            { id: 2, name: 'minh'},
        ]
    })
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`)
})