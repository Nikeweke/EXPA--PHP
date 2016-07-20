
<?php
// ======================================================->
 class Animal
  {
    public $name;
     function __construct($var)
      {
        $this->name = $var;
      }
  }
  class Cat extends Animal
   {
     function getName()
      {
         echo $this->name;
      }
     function Meow()
      {
        echo "Cat $this->name is sayig meow";
      }
   }
// ======================================================->
$a = new Cat("Gerda");
echo "<br>";
$a->getName();
echo "<br>";
$a->Meow();
