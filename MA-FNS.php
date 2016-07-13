<?php

// LOGO
$appname = "";

--------------------------------------------------
// Connection to DB
function Connect_db()
 {
	 include 'connect.php'; // Data of Connection
	 try{
	      $db = new PDO("mysql:host=$host;dbname=$db_name", $user, $password);
	      $db->setAttribute( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
        $db->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_ASSOC);
	      $db->exec("SET NAMES utf8");
        if($db == true){ return $db ; }
				else { die('Cant connect to DB'); }
	    }

	 catch(PDOException $e){ echo $e->getMessage();  }
 }
$db =  Connect_db();  // CONNECT VAR
--------------------------------------------------


--------------------------------------------------
// Генератор паролей

function Generator()
{
  // Символы, которые будут использоваться в пароле.
  $chars="qazxswedcvfrtgbnhyujmkiolp1234567890QAZXSWEDCVFRTGBNHYUJMKIOLP";
  // Количество символов в пароле.
  $max=20;
  // Определяем количество символов в $chars
  $size=StrLen($chars)-1;
  // Определяем пустую переменную, в которую и будем записывать символы.
  $password=null;
  // Создаём пароль.
  while($max--)
  $password.=$chars[rand(0,$size)];
  return $password;
}
--------------------------------------------------

--------------------------------------------------
// Delete Cookies
function DelCookie($cook)
 {
   setcookie($cook, "", time() - 86400*100, "/");
 }
--------------------------------------------------


--------------------------------------------------
// Действие : Меняет цвет в  зависимости от полученных данных
// Польза : не надо лишний раз лезть в БД
function ColorChg($name)
{
	if($name == 'Software') { $clr = "success";}
	if($name == 'Games')    { $clr = "danger";}
	if($name == 'Hardware') { $clr = "warning";}
	if($name == 'IT')       { $clr = "primary";}

	return $clr;
}
--------------------------------------------------


--------------------------------------------------
// Действие : Меняет глифы в  зависимости от полученных данных
// Польза : не надо лишний раз лезть в БД
function GlyphChg($name)
{
	if($name == 'Software') { $clr = "floppy-disk";}
	if($name == 'Games')    { $clr = "fire";}
	if($name == 'Hardware') { $clr = "hdd";}
	if($name == 'IT')       { $clr = "sunglasses";}

	return $clr;
}
--------------------------------------------------

--------------------------------------------------
// Действие : По числу которое приходит можно определить что за категория выбрана
// Польза : не надо лишний раз лезть в БД
function CategoryDef($numb)
 {
	if($numb == 1) { $clr = "Software";}
	if($numb == 2) { $clr = "Games";}
	if($numb == 3) { $clr = "Hardware";}
	if($numb == 4) { $clr = "IT";}
	if($numb == 5) { $clr = "Top News";}

  return $clr;
 }
--------------------------------------------------



--------------------------------------------------
//Действие : Добавляет запись про просмотр статьи
// Польза : вот так уот
function ViewedPage($page)
 {
    $db = Connect_db();

		// Ловим IP- человека который смотрел статью
		 $ip = $_SERVER["REMOTE_ADDR"];

		// Запрос на запись есть ли уже такая же запись
    $query_is_exist = $db->query("SELECT * FROM viewed_pages WHERE user = '$ip' AND page = $page");
		$kol_vo = $query_is_exist->rowCount();

    // Если нашло хоть 1 запись
	  if($kol_vo <= 0) { $db->query("INSERT INTO viewed_pages(user, page) VALUES( '$ip', $page )"); }
 }
--------------------------------------------------


--------------------------------------------------
 // Действие : Считает количество лайков на заданную страницу
 // Польза :
function CounterLikes($page)
 {
   $db = Connect_db();

   $query_likes = $db->query("SELECT * FROM likes WHERE likes_page = $page");
	 $likes =  $query_likes->rowCount() ;

	 return $likes;
  }
--------------------------------------------------




--------------------------------------------------
	// Действие : Считает количество просмотров на заданную страницу
	// Польза :
function CounterViews($page)
 {
   $db = Connect_db();

	 $query_viewes = $db->query("SELECT * FROM viewed_pages WHERE page = $page");
 	 $views = $query_viewes->rowCount();

 	 return $views;
 }
--------------------------------------------------



--------------------------------------------------
 // Действие : Считает количество комментариев на заданную страницу
// Польза :
function CounterCommentaries($page)
{
 $db = Connect_db();

 $query_comments = $db->query("SELECT id FROM coments  WHERE id_page = $page");
 $comments = $query_comments->rowCount();

 return $comments;
}
--------------------------------------------------


--------------------------------------------------
 // Действие : Считает кол-во статей по заданной сфере
 // Польза :
function CounterSfera($sfera)
 {
	 $db = Connect_db();

    $query = $db->query( "SELECT * FROM stati WHERE sfera = $sfera");
		$kol_vo = $query->rowCount();

		return $kol_vo;
 }
--------------------------------------------------

--------------------------------------------------
//Функция для получение рандомных имен для картинок
class DFileHelper
{
    public static function getRandomFileName($path, $extension='')
    {
        $extension = $extension ? '.' . $extension : '';
        $path = $path ? $path . '/' : '';

        do {
            $name = md5(microtime() . rand(0, 9999));
            $file = $path . $name . $extension;
        } while (file_exists($file));

        return $name;
    }
}
--------------------------------------------------


--------------------------------------------------
// Действие : Удаление опасного кода в переменных от пользователей и хакеристов
// Польза :
function StringCleaner($var)
 {
   $var = strip_tags($var);
   $var = htmlentities($var);
   $var = addslashes($var); // Против - апострофа '
   $var = trim($var);
   return $var;
}
--------------------------------------------------


--------------------------------------------------
// Действие : Проверяет заполнена ли форма
// Польза :
function filled_out($form_var)
 {
    if((!isset($form_var)) or ($form_var == ''))
       {
           return false;
       }
       return true;
 }
--------------------------------------------------



--------------------------------------------------
 // Действие : Проверяет почты на допустимость по знакам.
 // Польза : очень
function valid_email($adress)
 {
	  //Проверить допустимость адреса
    if(ereg('^[a-zA-Z0-9_\.\-]+@[a-zA-Z0-9\-]+\.[a-zA=z0-9\-\.]+$',$adress)){ return true; }
    else { return false; }
 }
--------------------------------------------------
?>
