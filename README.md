# Expirience from PHP



#### Содержание 
* [**Useful links**](#useful-links)
* [**Как запустить встроенный сервер PHP**](#Как-запустить-встроенный-сервер-php)
* [**Из массива в строку и ставим в Cookies**](#Из-массива-в-строку-и-ставим-в-cookies)
* [**Closure(Anonymys func) and Reference vars**](#closureanonymys-func-and-reference-vars)
* [**Traits**](#traits)
* [**Namespace and Use**](#namespace-and-use)

---


### Useful links
* Composer CheatSheet: http://composer.json.jolicode.com/

### Как запустить встроенный сервер PHP:
```
php -S localhost:8000
```

### Из массива в строку и ставим в Cookies

* **index.php** - из массива делает строку и записывает в куку
* **page.php** - из строки которая в куке делает массив
* **off.php** - удаляет массив

###### index.php
```php
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

```


###### page.php
```php
<?php

$nabor = $_COOKIE['nabor'];

//var_dump($nabor);

$rez = unserialize($nabor);


echo $rez['email'] . "<br>";
echo $rez['password'] . "<br>";

```


###### off.php
```php
<?php
setcookie('nabor', "", time() - 86400*100, "/");
//header("Location:page.php");

```

### Closure(Anonymys func) and Reference vars

###### index.php
```php
<?php
 
// reference by var 
 $var = 2;
 function foo(&$var)
 {
   $var++;
 }

 foo($var);
 echo $var;
 
 
 // Closure
$message = 'hello';
 
// No "use" out - NULL
$example = function () {
  echo "first -> ";
    var_dump($message);
};
$example();
 
// Inherit $message - out - hello
$example = function () use ($message) {
    echo "<br>second -> ";
    echo($message);
};
$example();
 
```


### Traits

Трейт (англ. trait) - это механизм обеспечения повторного использования кода в языках с поддержкой единого наследования, 
таких как PHP. Трейт очень похож на класс, но предназначен для групирования функционала хорошо структурированым и
последовательным образом. Невозможно создать самостоятельный экземпляр трейта. Это дополнение к обычному наследованию 
и позволяет сделать горизонтальную композицию поведения, то есть применение членов класса без необходимости наследования. 

###### Traits.php
```php
trait MyTrait
{
  public function Bye()
   { echo "Its method from trait - Bye()"; }

}
```


###### Index.php
```php
class A {
    
    // including Traits.php
    use MyTrait;

   function Hello(){ echo "Its A method - Hello()"; }
}

$some = new A;
$some->Hello();
$some->Bye();

```





### Namespace and Use
