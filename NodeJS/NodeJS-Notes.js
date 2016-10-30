/*
*   Чтобы запустить файл для node.js 
*   надо перейти в ту директорию где лежит файл app.js и тогда написать в cmd или Git bash - node app.js
*/



/******************************************************
*   Созданеи сервера
*
*******************************************************/
var http = require('http');

// создать сервер
var server = http.createServer(function(req, res)
             {
                // пишем Headers для нормальонго отображения текста
                res.writeHead(200, {'Content-Type': 'text/plain'})

                // вывести какой запрос был
                console.log('request was made: ' + req.url);

                // отсылаем ответ
                res.end('Shit');
             });
             
// запуск сервера
server.listen(3000, '127.0.0.1');

console.log('Server is Launched');






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
stuff = require('./count')

console.log(stuff.counter(['shit', 'crystal']))
console.log(stuff.counter1(1,2))




/******************************************************
*   Вызов событий (event Emitter)
*
*******************************************************/
events = require('events'); // подключение событий
util   = require('util'); // подключение Ютиля, для унаследования

// создаем функцию
var Person = function(name){
  this.name = name;
};

// говорим что функция "Person" имеет свойство ловить события когда они происходят и выводит соответствуещие функции
util.inherits(Person, events.EventEmitter);

// создаем пару обектов функции  "Person"
var james = new Person('james');
var mary = new Person('mary');

// набиваем обьектами массив
var people = [james, mary];

// прокручаем массив при этом подставляя каждый обьект
people.forEach(function(person)
 {
   person.on('speak', function(msg) // если случаеться собитие 'speak' выдаеться сообщение
    {
        console.log(person.name + ' said: ' + msg);
    })
})

// запуск событий
james.emit('speak', 'Shit man');
mary.emit('speak', 'For Faken sake');





/******************************************************
*   Запись и чтения из файла(txt)
*
*******************************************************/
var fs = require('fs'); // подключаем библиотеку для чтения и записи файла

//------------------------ ....FileSync - указывает на то что пока не прочитаю файл до конца не пойду дальше - Синхронно
var shitTxt = fs.readFileSync('shit.txt', 'utf8'); // читаем файла
console.log(shitTxt); // выводим

fs.writeFileSync('writeMe.txt', shitTxt); // создает и пишет в него то что есть в файле "shit.html"
//------------------------

//------------------------ ....File - указывает на то что код пойдет выполянться дальше - Асинхрон
fs.readFile('shit.txt', 'utf8', function(err, data)
{
  fs.writeFile('writeMe.txt', data);
})
//------------------------





/******************************************************
*   Создание и удаление файлов, папок
*
*******************************************************/
var fs = require('fs'); // подключаем библиотеку для чтения и записи файла

// удлалить файл в папке "" и удалить саму папку. Удалить папку если она не пуста не выйдет
fs.unlink('./stuff/writeMe.txt', function()
 {
    fs.rmdir('stuff');
  })

// ------------------------- Sync
// создать директорию
fs.mkdirSync('stuff');

// удалить директорию
fs.rmdirSync('stuff');
// ------------------------- Sync

// ------------------------- ASync
fs.mkdir('stuff', function()
 {
     fs.readFile('readMe.txt', 'utf8', function(err, data)
      {
        fs.writeFile('./stuff/writeMe.txt', data);
      });
 })
// ------------------------- ASync




// * ###  Пишущие и читающие потоки и Буферы ###
//  Разница между этим способом и fs.writeFile & fs.ReadFile
//  - с потоками вроде как быстрее из-за разбивание на кусочки инфы

/******************************************************
*  Читаем файл через поток (прикол в чем: в том что если файл большой то он передаеться частями)
*
*******************************************************/
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/shit.txt', 'utf8');

myReadStream.on('data', function(chunk)
 {
    console.log('chunk:');
    console.log(chunk);
 });



/******************************************************
*  Читаем файл через поток и записываем в другой файл через пишущий поток
*
*******************************************************/
var fs = require('fs');

var myReadStream = fs.createReadStream(__dirname + '/shit.txt', 'utf8'); // создание потока который читает
var WStream = fs.createWriteStream(__dirname + '/Wshit.txt'); // создание потока который пишет

myReadStream.on('data', function(chunk)
 {
    // вывод того что прочитали
    console.log('chunk:');
    console.log(chunk);

    // пишем в наш поток из файла данные
    WStream.write(chunk);
 });
