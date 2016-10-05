/*  Чтобы запустить файл для node.js 
*   надо перейти в ту директорию где лежит файл app.js и тогда написать в cmd или Git bash - node app.js
*/



/******************************************************
*   Созданеи сервера
*
*******************************************************/
// подключение в переменную http - модуля "http"
var http = require('http');

// делаем серевер
var server = http.createServer(function (request, response)
{
    response.writeHead(200, {"Content-Type": "text/plain"});
    response.end("HEllow World\n");
})

// запускаем
server.listen(7000);
