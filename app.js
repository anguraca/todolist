require('./config/config')

//librerias del proyecto
const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('cookie-session');
const port = process.env.PORT;
const app = express();

//middleware
app.use(morgan('dev')); //Información detallada en el terminal
app.use(bodyParser.urlencoded({
    extended: true
})); //Obtener los datos de las peticiones poste en el atributo "body" del request
app.use(session({
    secret: 'node'
})); //Configuración cookie-session (persistencia en sesión)

app.set('view engine', 'ejs'); //Configuración de template engine EJS

app.use('/public',express.static('public'));
let tareas = ['uno','dos'];

app.get('/', function (request, response) {
    response.render('formulario.ejs', {
tareas
    });
});

app.post('/adicionar',function(request,response){
    let tarea = request.body.nuevaTarea;
    tareas.push(tarea);
    response.redirect('/');
})
app.get('/borrar/:id',function(request,response){
    //let tarea = request.body.nuevaTarea;
    let id = +request.params.id;
    console.log(params);
    tareas.splice(id, 1);
    response.redirect('/');
})
//verificar en qué puerto se está trabajando
app.listen(port, function () {
    console.log('Escuchando en el puerto ', port);
})