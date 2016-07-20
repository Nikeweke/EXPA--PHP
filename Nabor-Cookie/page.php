<?php

$nabor = $_COOKIE['nabor'];

//var_dump($nabor);

$rez = unserialize($nabor);


echo $rez['email'] . "<br>";
echo $rez['password'] . "<br>";


 ?>
