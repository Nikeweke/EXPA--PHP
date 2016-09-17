<?php
// МАссив
$arr = [
         'email' => 'Driver3@meta.ua',
         'password' => '12345'
       ];
// Делаем строку
$rez = serialize($arr);
// Вывод строки полученной
var_dump($rez);
// SET 
setcookie("nabor",$rez,time()+8600*30,"/");
 ?>

<a href="page.php">See cooka</a>
<a href="off.php">DElete cooka</a>
