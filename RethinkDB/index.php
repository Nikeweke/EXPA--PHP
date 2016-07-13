
<html><title>REthinkDB</title></html>

<?php
    // Load the driver
    require_once("RQL/rdb/rdb.php");

    $host = 'localhost';
    $port = 28015;
    $db = 'Shop';

    // Connect to localhost
    $conn = r\connect($host, $port, $db);


/*
$arr = array( 'name' => "Телефоны",
              'subcats' => [
                             '0' => "Apple",
                             '1' => "Samsung"
                           ]);

  $arr1 = array( 'name' => "Планшеты",
                 'subcats' => [
                              '0' => "Apple",
                              '1' => "Samsung",
                              '2' => "Acer"
                            ]);



$arr2 = array( 'category' => "Телефоны Samsung",
                'name' => "Samsung A3",
                'description' => "Takoe redkoe gavno",
                'price' => "3000",
                'status' => "1"
              );

  $arr3 = array( 'category' => "Телефоны Apple",
                  'name' => "Apple S6",
                  'description' => "Дерьмо редкосное",
                  'price' => '2050',
                  'status' => '1'
                );
*/


    // INSERT
//r\table("categories")->insert($arr)->run($conn);
//r\table("categories")->insert($arr1)->run($conn);
//r\table("products")->insert($arr2)->run($conn);
//r\table("products")->insert($arr3)->run($conn);




// SELECT
$query =  r\table('categories')->run($conn);
$query1 =  r\table('products')->run($conn);

/* // До обработки данные с RethinkDB
d($query,0);
d($query1,0);
echo "<br>";

$rsCats = CreateRsArray($query);
$rsProds = CreateRsArray($query1);

// После обработки данные с RethinkDB
d($rsCats,0);
d($rsProds,0);
echo "<br>";
*/

$rsCats = CreateRsArray($query);
$rsProds = CreateRsArray($query1);

foreach($rsCats as $data)
{
  echo "Name: " . $data['name'] . "<br>";
  foreach($data['subcats'] as $subcat){ echo "--------" . $subcat . "<br>"; }
  echo "<br><br>" ;
}

//d($query);


$rsCats = reset($rsCats);


foreach($rsCats as $data)
{
  echo "Name: " . $data['name'] . "<br>";
  foreach($data['subcats'] as $subcat){ echo "--------" . $subcat . "<br>"; }
  echo "<br><br>" ;
}




//====================================================================================

// Make Array from response RethinkDB
function CreateRsArray($query)
 {
    if(! $query){ die("Shit"); }

     $rs = array();
     foreach($query as $item)
     {
       $rs[] = $item;
     }

     return $rs;
 }



// DEBUG - FUNC
function d($value = null, $die = 1)
 {
  $empty = $value == "" ? "Yes" : "No";
  echo "=====================================-> Debug (Value is empty -> $empty): <br><pre>";
  print_r($value);
  echo "</pre>";

  if($die == 1) die;
 }

?>
