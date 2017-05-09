# Expirience from PHP



#### Содержание 
* [**Useful links**](#useful-links)
* [**Как запустить встроенный сервер PHP**](#Как-запустить-встроенный-сервер-php)
* [**Из массива в строку и ставим в Cookies**](#Из-массива-в-строку-и-ставим-в-cookies)
* [**Closure(Anonymys func) and Reference vars**](#Closure(Anonymys func) and Reference vars)
* [**Traits**](#traits)
* [**Namespace and Use**](#namespace-and-use)

---


#### Useful links
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
// $var = 2;
// function foo(&$var)
// {
//     $var++;
// }
//
// foo($var);
//
// echo $var;
 
 
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
 
 
 
// Inherited variable's value is from when the function
// is defined, not when called
$message = 'world';
$example();
 
// Reset message
$message = 'hello';
 
// Inherit by-reference
$example = function () use (&$message) {
    echo "<br>third -> ";
    var_dump($message);
};
$example();
 
// The changed value in the parent scope
// is reflected inside the function call
$message = 'world';
$example();
 
// Closures can also accept regular arguments
$example = function ($arg) use ($message) {
  echo "<br>fourth -> ";
    var_dump($arg . ' ' . $message);
};
$example("hello");

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
