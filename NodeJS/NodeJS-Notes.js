/*
*   Чтобы запустить файл для node.js 
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





/******************************************************
*   Подключение одного файла к другому (count.js -> app.js)
*
*******************************************************/
//-----count.js
counter = function(arr){ return 'There are ' + arr.length; };
function counter1(a,b){  return `There is ${a+b}`;  };
var pi = 3.4;

 // 1 Case of Exports
 module.exports = {
   counter: counter,
   counter1: counter1,
   pi: pi
 };

 // 2 Case of Exports
module.exports.counter = counter;
module.exports.counter1 = counter1;
module.exports.pi = pi;

//------app.js
stuff = require('./stuff')

console.log(stuff.counter(['shit', 'crystal']))
console.log(stuff.counter1(1,2))
