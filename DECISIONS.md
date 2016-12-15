# SOLVES                                            

* Все файли должны быть .php
* "ЕСЛИ ЧТО ТО НЕ РАБОТАЕТ ЗНАЧИТ ЕСТЬ ОШИБКА , И ОНА СКОРО ПОКАЖЕТ СЕБЯ , НАДО ИСКАТЬ И ЖДАТЬ"
*  ОСОБЕННО ЭТО ПРАВИЛО КАСАЕТЬСЯ ПРИ ПЕРЕНОСЕ С ЛОКАЛЬНОГО СЕРВА НА УДАЛЕННЫЙ.
```
     КАКИЕ ОШЫБКИ ВСТРЕТИЛ Я :

        1. Создал новое поле на локальной БД , а потом переместил проект на удалленый серв и там перестала работать страница ,
           оказалось надо было ДОБАВИТЬ ПОЛЕ В УДАЛЕННУЮ БД !!

        2. Использовал функцию стандартную - PHP для проверок : if(!empty(var)) и из-за неё не работало ,
           заменил на: if(var != "") - все заработало
```	   




### Для работы с AJAX нужно :
```
1.Чтобы функции из подключаемого файла работали и значит Ajax оттуда будет работать
2.в движке который на php надо писать: setcookie("id",$a,time()+8600*30,"/");
3.Удаление кук так :  document.cookie = "id = ; expires = Thu, 01 Jan 1970 00:00:01 GMT; path = /;";
4.Надо ставить на клик вызов AJAX и вставлять поле с типом HIDDEn для того чтобы ловить переменную isset... или по методу MVC
```



###  Запомнить(Javascript and AJAX) :
```
вот здесь # не нужна -> document.getElementById("msg_success").innerHTML = ....  - Javascript
а тут нужна -> $("#msg_success").show('blind',600,funct.....  - JQuery
```


### Функция для странички message как пример с обновой через каждые 3 сек.
```javascript
setInterval('AjaxOut(\'tasks\')',3000);

DivOut('msges_div', $towho_id, '$towho_nick');
setInterval(DivOut,60000,'msges_div', $towho_id, '$towho_nick');
```


### По нажатию кнопка ЕНТЕР выполнить функцию
```html
<body onkeydown="if ( event.which == 13 ){myFunction();}">
```

### Очистка поля
```javascript
$('#textarea_msg').val('');
```

### Разница между таблицами MYIsam and InnoDB:
```
1. InnoDb - лучше для транзакций
2.MyIsam - быстрее
```

### Финт для НОВОСТНЫХ ПОРТАЛОВ
```php
//чтобы вывести название статьи в <title>
//просто поставь в цикл вывод её
//вот так:

			while($data = ...)
			 {
			  <title>$data['article']</title>
			 }

//а вообще надо юзать шаблонизатор
```
---







#   "Xampp" и инфа по настройки серва и т.д.                              


* Все файлы должны быть .php
* Нельзя ставить в phpMyAdmin пароли на root потом не заходит
* Дата вбиваеться в запросах так : 2012-04-14
* Настроить рута можно файлом в phpMyAdmin : config.inc.php
* Для того что бы сделать войти в phpMyAdmin и увидеть форму для пропуска к базе данных
```
   надо : в "config.inc.php"

           $cfg['Servers'][$i]['auth_type'] = 'config';

            config -> cookie   ;
                   -> http
                   -> signon
```		   

* .HTACCESS (ЧПУ)   (структура папок: nameproject/config,library....., index.php, .htaccess)
```
	      При переносе на сервер удостоверится в правильности путей к стилям:
        !!! например:  файл называеться "w3.css", а в путях(src) - "W3.css",
				   на системах Windows будет работать, но не на сервере где система Unix
```				   
```
               Настройка .HTACCESS для ЧПУ
		AddDefaultCharset utf-8

		RewriteEngine On
		Options +FollowSymLinks
		RewriteCond %{REQUEST_FILENAME} !-d
		RewriteCond %{REQUEST_FILENAME} !-f

		RewriteRule ^([a-z]+)/([0-9]+)$ index.php?con=$1&id=$2&%{QUERY_STRING} [NS,L]
		RewriteRule ^index$ index.php [QSA,L]
```

---









# SQL - REQUESTS                                             
.............................................................................-> СОЗДАНИЕ ПРОЦЕДУР
/************************************************************
*   Вызов процедуры в php
*
***********************************************************/
 CALL ins_EMP('$pass');




/************************************************************
*  Выполнение 1 комманд в процедуре
*
***********************************************************/
CREATE PROCEDURE ins_del(vall varchar(200))
insert into kod(kod) values (vall)




/************************************************************
*  Выполнение 2 комманд в процедуре (После каждой комманды - ;)
*
***********************************************************/
DELIMITER //
CREATE PROCEDURE insert_emp(var1 varchar(50),var2 varchar(50),var3 varchar(50),var4 varchar(50),var5 varchar(50))
BEGIN
INSERT INTO employees(surname, name, posada, kraina) VALUES(var1, var2, var3, var4);
INSERT INTO kod(kod) VALUES(var5);
END //




/************************************************************
*  Выполнение 3 комманд в процедуре (После каждой комманды - ;)
*
***********************************************************/
DELIMITER //
CREATE TRIGGER `del_user_with_diaries_and_settings` BEFORE DELETE ON `foodcontrol`.`users`
FOR EACH ROW
BEGIN
INSERT INTO log(action, table_name, user) VALUES('user was deleted', 'Users', OLD.email);
DELETE FROM diaries WHERE diaries.user_id = OLD.id;
DELETE FROM user_settings WHERE user_settings.user_id = OLD.id;
END //



/************************************************************
*  Процедура вставки с параметрами 1 - 4 ШТ. (После каждой комманды - ;)
*
***********************************************************/
DELIMITER //
CREATE PROCEDURE inserter(choice int,

                          table_var varchar(400),

                          field_1 varchar(400),
                          field_2 varchar(400),
                          field_3 varchar(400),
                          field_4 varchar(400),

                          valu_1 varchar(400),
                          valu_2 varchar(400),
                          valu_3 varchar(400),
                          valu_4 varchar(400))

BEGIN

IF(choice = 1) THEN
INSERT INTO table_var(field_1) VALUES(valu_1) ;

ELSEIF(choice = 2) THEN
INSERT INTO table_var(field_1,field_2) VALUES(valu_1, valu_2) ;

ELSEIF(choice = 3) THEN
INSERT INTO table_var(field_1,field_2,field_3) VALUES(valu_1, valu_2, valu_3) ;

ELSEIF(choice = 4) THEN
INSERT INTO table_var(field_1, field_2, field_3, field_4) VALUES(valu_1, valu_2, valu_3, valu_4) ;

END IF;

END //



/************************************************************
*  Процедура вывода с параметром (После каждой комманды - ;)
*
***********************************************************/
DELIMITER //
CREATE PROCEDURE selecter(choice int, var1 varchar(50), var2 varchar(50))

-- var 1 - current user
-- var 2 - another member
-- choice - selector

BEGIN

-- TODOIST
IF(choice = 1) THEN
SELECT todoist_id, todoist_article, todoist_done, date_format(todoist_time,'%b. %e, %Y, %k:%i') as time FROM todoist WHERE todoist_visible = 1 AND todoist_user = var1 ORDER BY todoist_id DESC ;

-- MESSAGES
ELSEIF(choice = 2) THEN
SELECT messages.author, date_format(time,'%T (%e-%m-%y)') as time, messages.towho, messages.message FROM messages WHERE author = var1 AND towho = var2 OR author = var2 AND towho = var1 ORDER BY messages.id ;

-- FRIENDS (1 Request: All members)
ELSEIF(choice = 3) THEN
SELECT members.id, members.nickname, members.email, images.img_name FROM members,images WHERE members.id = images.id_user AND members.id != var1 ;


-- FRIENDS (2 Request: Friendships)
ELSEIF(choice = 4) THEN
(SELECT user, friend, status, notice FROM friends WHERE user = var1 AND friend = var2 ORDER BY id DESC LIMIT 2)
 UNION
 (SELECT user, friend, status, notice FROM friends WHERE user = var2 AND friend = var1 ORDER BY id DESC LIMIT 2);


-- MEMBERS (1 Request: All members)
ELSEIF(choice = 5) THEN
SELECT members.id, members.nickname, members.email, images.img_name FROM members,images WHERE members.id = images.id_user AND members.id != var1 ;


-- MEMBERS (2 Request: Current user's requests for frienship)
ELSEIF(choice = 6) THEN
SELECT user,friend FROM friends WHERE user = var1 AND friend = var2 ;


-- MEMBERS (3 Request: Friendships)
ELSEIF(choice = 7) THEN
(SELECT user, friend, status, notice FROM friends WHERE user = var1 AND friend = var2 ORDER BY id DESC LIMIT 2)
 UNION
(SELECT user, friend, status, notice FROM friends WHERE user = var2 AND friend = var1 ORDER BY id DESC LIMIT 2) ;

END IF;

END //


!!! USING : $query = $db->query("CALL selecter(1,$current_user,0)");
        бЕЗ КАВЫЧЕК

.............................................................................-> СОЗДАНИЕ ПРОЦЕДУР


.............................................................................-> СОЗДАНИЕ ТРИГЕРА
/************************************************************
*  Триггер с 1 коммандой
*
***********************************************************/
CREATE TRIGGER `ins_employees` AFTER INSERT ON `employees`
FOR EACH ROW
   INSERT INTO trigga Set text = 'insert in employees'



/************************************************************
*  Триггер с 2 коммандами (Связь между двумя таблами на удаление) (после каждой комманды ставить - ;)
*
***********************************************************/
DELIMITER //
CREATE TRIGGER `del_emp1`BEFORE DELETE ON `employees`
FOR EACH ROW
BEGIN
INSERT INTO log Set action = 'delete in employees';
DELETE FROM kod WHERE kod.id = OLD.id;
END //
.............................................................................-> СОЗДАНИЕ ТРИГЕРА


.............................................................................-> УДАЛЕНИЕ 1 записи из БД
/************************************************************
*  Удаление первой записи
*
***********************************************************/
DELETE FROM trigga LIMIT 1
.............................................................................-> УДАЛЕНИЕ 1 записи из БД



.............................................................................-> СОЗДАНИЕ ТАБЛИЦ
--------------------------------------------------
// Таблица "Просмотренные страницы"

CREATE TABLE viewed_pages(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
user VARCHAR( 255 ) ,
page int,
time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
) DEFAULT CHARACTER SET utf8 ENGINE = MYISAM
--------------------------------------------------

--------------------------------------------------
// Таблица "Список дел"

CREATE TABLE todoist (
todoist_id  INT NOT NULL AUTO_INCREMENT,
todoist_user INT NOT NULL ,
todoist_article varchar(70),

todoist_time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    todoist_done int DEFAULT 0,
todoist_visible INT DEFAULT 1,
PRIMARY KEY(todoist_id)
) DEFAULT CHARACTER SET utf8 ENGINE = MYISAM
--------------------------------------------------



--------------------------------------------------
// Таблица "Комментарии"

CREATE TABLE coments (
id  INT NOT NULL,
id_u INT NOT NULL ,
id_page INT NOT NULL,
text VARCHAR(255) NOT NULL,
time TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
publish INT DEFAULT 0,
PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 ENGINE = MYISAM
--------------------------------------------------


--------------------------------------------------
// Таблица "Картинки"(хранит пути к картинкам)

CREATE TABLE images (
id_user INT NOT NULL ,
img_name VARCHAR(100) NOT NULL,
type VARCHAR(30) NOT NULL,
size INT NOT NULL,
PRIMARY KEY(id_user)
) DEFAULT CHARACTER SET utf8 ENGINE = MYISAM
--------------------------------------------------


--------------------------------------------------
// Таблица "Картинки"(хранит картинки, а не пути к ним)

CREATE TABLE images (
id INT NOT NULL AUTO_INCREMENT,
name VARCHAR(30) NOT NULL,
type VARCHAR(30) NOT NULL,
size INT NOT NULL,
content MEDIUMBLOB NOT NULL,
PRIMARY KEY(id)
) DEFAULT CHARACTER SET utf8 ENGINE = MYISAM
--------------------------------------------------

--------------------------------------------------
// Таблица "Статьи"

CREATE TABLE stati(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
article VARCHAR( 255 ) ,
body LONGTEXT,
sfera INT NOT NULL,
ptime TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
s_img   VARCHAR( 255 )

) DEFAULT CHARACTER SET utf8 ENGINE = MYISAM
--------------------------------------------------

--------------------------------------------------
// Таблица "Пользователи"

CREATE TABLE users(
id INT NOT NULL AUTO_INCREMENT PRIMARY KEY ,
login VARCHAR( 50 ) ,
pass VARCHAR( 50 ),
time_reg TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP

) DEFAULT CHARACTER SET utf8 ENGINE = MYISAM
--------------------------------------------------
.............................................................................-> СОЗДАНИЕ ТАБЛИЦ





#  PHP - SOLUTIONS  


###  FROM MySQLi - TO PDO
```php
mysqli_query($db,"...") = $db->query("...")
mysqli_fetch_array($query) = $query->fetch(PDO::FETCH_ASSOC)
mysqli_real_string_escape = prepare($query); $query->execute();
mysqli_nums_row = $query->countRow()
```


###  Перехват ошибок
```php
<?php

try { throw new Exception ('Это ошибка епты'); }

catch(Exception $e)
 {
  echo "Исключение " . $e->getCode() . ": " . $e->getMessage() . "<br>" . " в " . $e->getFile() . ", строка "  . $e->getLine() . "<br>";
  }
?>
```



###   Передача переменных между PHP-файлами посредством сессии
####   Можно использовать сессии, которые в отличие от cookie, храняться на сервере, и стираються после закрития браузера
####  session_start() - на каждой странице где юзаеться сессия 
```php
 <?php
  session_start();
  $_SESSION['user'] = 'bonskii';
?>

//Обращаться к значению, сохранённому в сессии можно используя суперглобальный массив:

 <?php
  echo $_SESSION['user'];
?>
```


###  Функция ругалась что не видела переменных $user_data, $e_password, $e_login
####  и через global все работает
```php
<?php

function checkForPass()
 {
	global $user_data;
	global $e_password;  // or like that -> $GLOBALS['e_password'];
	global $e_login;


	  if($user_data['pass'] == $e_password)  // ** $e_password = $GLOBALS['e_password']
						  {
						   echo "<h2> You exist in database. </h2>";
							echo "<h3> Welcome $e_login. </h3>";
						  }

						else
						  {
						  echo "Wrong password";
                      }
	}
```
