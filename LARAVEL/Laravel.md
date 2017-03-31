# Laravel

#### Создание проекта
``` 
 composer create-project --prefer-dist laravel/laravel my_app
```

#### Запуск проекта после скачки с репозитория:
1. в папке с проектом : `composer update` или `composer update --no-dev` (при условии что нет папки **vendor**)
2. файл для БД - **.env**
3. php artisan serve


####  Адреса курса и документации:
* [Дмитрий А.](https://www.youtube.com/watch?v=Iqvjb9bhocA&list=PLoonZ8wII66h7pF6CFPzK3pVhTWo3DL9G&index=12)
* [laravel.su](http://laravel.su/docs/5.2/quickstart#introduction)
* [Курс по Laravel](https://www.youtube.com/watch?v=c_uDG9_2iJA&list=PLBT2g0kDwD_a_MFg1N2ibEHodJwRiD8AT&index=1)

--- 

* [**Комманды Artisan**](#kомманды-artisan)
* [**SQL & Eloquent(Tricks)**](#sql--eloquenttricks)
* [**Localization**](#localization)
* [**Шаблонизатор(Blade)**](#Шаблонизаторblade)
* [**Middleware**](#middleware)
* [**Сессии**](#Сессии)
* [**Cookies**](#cookies)
* [**Composer**](#composer)
* [**PHPUnit**](#phpunit)
* [**Laravel Excel**](#laravel-excel)

--- 


##  Kомманды Artisan
###### *в папке с проектом GitBash и вперед...*
* **php artisan serve** - запуск сервера
* **php artisan make:controller NameController** - Создать контроллер
* **php artisan make:model task** - Создать модель
* **php artisan make:model Name -m** - Создать миграцию и модель
* **php artisan make:middleware MiddlwareName** - создать промежуточное ПО 
* **php artisan make:migration create_tasks_table --create=tasks** - Создать миграцию
* **php artisan migrate** - Запуск миграций (создание таблиц)
* **php artisan migrate:refresh** - Рефреш миграций (создание таблиц)
* **php artisan route:list** - Просмотра маршрутов (routes)
* **php artisan db:seed** - это тестовые записи в БД делаються
* **php artisan route:cache** - закешить маршруты
* **php artisan make:test UserTest** - создание теста

## SQL & Eloquent(Tricks)
###### Вызов процедуры из модели
```php
function GetSomething($itemId)
 {
   return DB::select("call product_with_cats_names('$itemId')");
 }
```
###### Сохранение и апдейт данных -  `$this->save()`, `$this->insert()`, `$this->create()`, `$user->fill()`, `self::find()`.
```php 
//$this->save() - просто создает запись в БД
$this->name = 'Alex';
$this->pass = '1234';
$this->save(); // вернет boolean

// $this->insert() - то же самое что и $this->save(), но как параметр нужен массив
$this->insert([ 'name' => 'Kaleb',   'pass' => 2344 ]); // вернет boolean

// $this->create() - для его работы нужен массив $fillable в Модели, иначе будет ошибка. 
// В $fillable должны быть поля которые заполняються, если не будет то в БД будет приходить пустота
$user = $this->create([ 'name' => 'Кракен',   'pass' => 2344 ]); // вернет объект Модели 

// $user->fill() - изменяет данные текущего обьекта Модели
$user->fill(['name' => 'Braker']); // изменит данные объекта Модели, но сделает апдейт в БД
$user->save();                     // после этого апдейт записи в БД будет, "Кракен" измениться на "Braker"

// userModel::find(id) - находит запись и возвращает обьект Модели с данными записи
$user = $userModel(1);
$user->name = 'Petro';
$user->save();   // апдейт имени 
``` 


## Localization
```php
// получение сообщения в соответствии с языком 
// resources/lang/(language)/validation.php  - 'alert' => 'внимание'
echo trans('validation.alert'); // выведет внимание
```

## Шаблонизатор(Blade)
{{-- коммент --}}
###### IndexController.php
```php
/// передача данных в шаблон
function Index(){
$data = 'hello dudes';
return view('index', ['title' => $data]);
}
```

## Middleware
* создаем middleware `php artisan make:middleware MiddlewareName`
* в **app\Http\Kernel.php** секция - `$routeMiddleware`: вниз дописать `"'myauth' => \App\Http\Middleware\MiddlewareName::class,"`
* в маршрутах(**routes/web**): `Route::group(['middleware' => 'myauth'], function(){...}`




## Сессии
С сессиями можно работать несколькими способами: 
* с помощью метода session() HTTP-запросов, 
* с помощью фасада Session (`use Session;`)
*  с помощью функции session(). При вызове функции session() без аргументов она возвратит весь объект сессии. 
```php
/*
*   someController.php
*/

use Session; // FACADE for using Session::....

// Create session key
Session::put('cart', $shit);

// Get session
Session::get('key', false); // if no 'key' found - return 'false'
Session::get('key');
Session::all();

// Del session
Session::forget($key);
Session::flush();

// Check for exist
if(Session::has('users'))

```

###### index.blade.php
```blade
<html>
{{-- Its commentary --}}
<title> {{ $title }} </title> {{-- Out our var --}}
...
</html>
```

## Cookies
```php
use Cookie;
...
// Get cookie
Cookie::get('name');
Cookie::get('name', 'default');

// Create cookie
$cookie  = cookie('name', value, 2880); // делаем куки
$cookie1 = cookie('name', value, 2880); // делаем куки
return  response($resData)->cookie($cookie)->cookie($cookie1); // возврат ответа + куки

// Del cookie
Cookie::forget('name');

```


## Composer
* **link_to_route()** - how to enable (HTML Laravel Collective)
  - в composer.js после - "laravel/framework": "5.2.", надо дописать :   `"laravelcollective/html": "~5.0"`    
  - написать в cmd(предварительно перейти в папку где лежит 'artisan') : `php composer.phar update`    
  - открыть config/app.php, там найти массив **providers**  в конец которого добавить :                    `'Collective\Html\HtmlServiceProvider'`   
  - в том же файле в массив **aliases** - в конец - `'Form' => 'Collective\Html\FormFacade',`     
                                              `'Html' => 'Collective\Html\HtmlFacade',`   
* **Если при** запуске миграции, не видит новоиспеченную миграцию: `composer dump-autoload -o`        


## PHPUnit
1. Создание теста: `cmd> php artisan make:test UserTest`
2. Тесты находяться: **./tests** 
3. Запуск тестов:
```
cmd> ./vendor/bin/phpunit ./tests/              --> запуск всех тестов
cmd> ./vendor/bin/phpunit ./tests/UserTest      --> запуск теста UserTest
```


## Laravel Excel:
* Установка
```php
composer require maatwebsite/excel
```
* Добавить в config/app.php класс и алиас, чтобы можно было обращатсья через фасады (use Excel;)
```php
Maatwebsite\Excel\ExcelServiceProvider::class,
...
'Excel' => Maatwebsite\Excel\Facades\Excel::class,
```
###### users.xlsx
```
|name|password|
|Alex|1234|
....
....
```

###### excel_form.blade.php
```php
<span>
<table>
<tr>

 {{-- Загрузка Excel --}}
	<td>
	   <form action="/distributor/load-xls" method="post" enctype="multipart/form-data" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet">
	        <input type="file" name="file" style='float:left;'>
			<input type="hidden" name="_token" value="{{csrf_token()}}">
	        <input class='btn btn-success' style='float:left;' type="submit" value='import from XLS'>
	  </form>
	</td>

	 {{-- Выдача Excel --}}
	<td>
		<a style='margin-left:20px;' href='/admin/distributor/get-xls' class='btn btn-info'>export to XLS</a>
	</td>
 </tr>
 </table>
 </span>
 <br>
 <br>

```

###### routes/web.php
```php
Route::get('distributor/get-xls', 'SomeController@getXls');
Route::post('distributor/load-xls', 'SomeController@loadFromXls');
```

###### SomeController.php

```php
use Excel;
use Illuminate\Support\Facades\Input;
...
...
   /*
   *  Загрузка Excel файла и вывод данных в массивы 
   *
   */
   public function loadFromXls(User $user, Distributor $distributor)
     {
       // обработка пришедшых данных
       $input = Input::all();
       $file  = array_get($input,'file');

       // проверка на выбранн ли файл и являеться ли он excel (.xls, .xlsx)
       if(!$file){
        return redirect()->back()->withErrors("File not selected");
       }

       $extension = $file->getClientOriginalExtension();
       if(!in_array($extension,['xls','xlsx'])){
        
        return redirect()->back()->withErrors("error file type - need xls,xlsx");
       }
     
      // Сохранение файла, если нужно 
      // $path = $file->store('excel');

       // Выведет массив из данных
       Excel::load($file->getPathName(), function($reader) use($user, $distributor)
        {
          $results     = $reader->get();  // получение всех данных
          $first_sheet = $results[0];     // выбрать первый лист
 
           // получить все данные из 1 листа
          foreach($first_sheet as $row)
           {
              echo $row->name;
              echo $row->password;
              
           
             // создание пользователя 
              $user = $user->create([ 
                             'name'           => $row->name,
                             'password'       => $row->password,
                             'email'          => $row->email,
                             'parent_user_id' => Auth::user()->id
                           ]);

             // создание дистрибютора и связка его с новосозданным пользователем (user.id -> distributor.user_id)
             $distributor->create([ 
                             'user_id' => $user->id,
                             'logo'    => 'some logo',
                             'phone'   => '222-222-222',
                             'site'    => 'www.dis.com',
                             'email'   => 'dis@ss.com',
                           ]);
           }
        });
      }
      
      public function getXls(){
   
  /*
   *  Создание Excel файла на основе данных из БД
   *
   */
  Excel::create('materials-base', function($excel) {

   $excel->sheet('materials', function($sheet) {
    $sheet->loadView('materials');
    
    $materials=Material::where('enabled','=','1')->get();
     
     foreach($materials as $material){
      //echo $material->title;
      $sheet->appendRow([
       $material->id,
       (isset($material->vendor->title)?$material->vendor->title:''),
       $material->article, 
       $material->title,
       $material->units,
       $material->zone,
       $material->vendor_price,
       $material->our_price,      
       $material->customer_price,
       $material->customer_discount,
       $material->coef_error,
       $material->coef_plintus
       ]);
     }
     
     
   });
   
    

  })->download('xls');;
 }
      
      
```
                                                  

