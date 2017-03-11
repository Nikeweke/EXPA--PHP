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
