### Комманды для "php artisan"
* **1.   Создать контроллер**:                         php artisan make:controller NameController
* **2.  Создать миграцию**:                           php artisan make:migration create_tasks_table --create=tasks     
* **3.  Создать модель**:                             php artisan make:model Task  
* **4.  Создать миграцию и модель**:                 php artisan make:model Name -m     
* **5. Запуск миграций (создание таблиц)**:          php artisan migrate
* **6.  Просмотра маршрутов (routes)**:               php artisan route:list
* **7.  DatabaseSeeder** - это тестовые записи в БД:  php artisan db:seed      
* **8. Middleware** -                             php artisan make:middleware NameMiddleware  
  


### Вывовод данных на страницу
```php
public function Index(){
$posts = ['stuff' => $stuff, 'st2' => 'dude'];
view -> return view('post.index', ['posts' => $posts]); // где $posts это массив данных
}
```

###  Для работы link_to_route() и для вставки ссылок на css, js 
```php
href="{!! URL::asset('assets/css/booter/css/bootstrap.css') !!}"
```
* в composer.js после - "laravel/framework": "5.2.", надо дописать :   "laravelcollective/html": "~5.0"    
* написать в cmd(предварительно перейти в папку где лежит 'artisan') : php composer.phar update    
* в папке config/ открыть - app.php, там найти массив 'providers'  в конец которого добавить :     'Collective\Html\HtmlServiceProvider',    
* в том же файле в массив aliases - в конец - 'Form' => 'Collective\Html\FormFacade',     
                                              'Html' => 'Collective\Html\HtmlFacade',         


### Комментирование в шаблонизаторe Blade
{{-- Это комментарий --}}   


### В Маршрутах лучше не писать пути с нижним подчеркиванием потом это не воркает !!


### Отправка формы AJAX 
Если через метод GET - то норм все отправляеться нормально (пишешь в маршрутах путь, потом отсылаешь данные туда)    
Метод POST - по-другому ---- надо вставить в начало страницы такое : <meta name="csrf-token" content="{{ csrf_token() }}" />
и в ajax.js прописать настройки(заголовки) для ajax:
```js
// будет отправлять в каждом запросе AJAX - csrf-token - защиту
$.ajaxSetup({
  headers: {
            'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
         }
 }); 
```


### При вставке может возникнуть ошибка SQL с словом Update_at или Created_at - это ругаеться на timestamp
Решение : написать в классe той модели которой юзаешь----: public $timestamps = false;

### Регистрация своего Middleware
* в файле Http/Kernel.php есть два массива:
   - $routeMiddleware: middleware которые не применяться ко всем роутам, там нужно регать свой middleware
   - $middlewareGroups: стандартные middleware нужные для работы 
###### AuthMiddleware.php
```php
namespace App\Http\Middleware;
use Closure;

class AuthMiddleware{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next){
         // получаем куки
         $userData          =   $request->cookie('fcData');
         $userSettings      =   $request->cookie('fcSettings');

         // если кук нет - то редирект на авторизацию
         if(! $userData and ! $userSettings)
          {
            return redirect()->route('AuthPage');
          }
        return $next($request);
    }
}
```

###### Kernel.php
```php  
protected $routeMiddleware = [
...
'myauth' => \App\Http\Middleware\AuthMiddleware::class, // My Middleware     
...];
```

###  Cookies (Get, Delete, Set)
```php
// Установка кук:  
$cookie1 = cookie('email', $userData['email'], 2880);
$cookie2 = cookie('id'   , $userData['id'], 2880);
return  response($resData)->cookie($cookie1)->cookie($cookie2);

// Достать куку : 
public function GetCookie(Request $request, $name) {
    return $request->cookie($name);
 }
 
// Удалить куку:  
public function DelCookie($name){
    $cookie = cookie()->forget('cookiename');
    return    response('cookie has been deleted')->withCookie($cookie);
 }  
``` 
