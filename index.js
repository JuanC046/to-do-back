// Entrada al servidor
const app = require('./src/app');

app.listen(app.get('port'), () => {
    console.log('Server on port', app.get('port'), '\nhttp://localhost:' + app.get('port') + '/api/toDoZen/');
});