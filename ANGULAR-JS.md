##   init Angular Object
``` javascript
var app = angular.module('myApp', []);
```

##  Создание контроллера 2(варианта)
``` javascript
// 1 Variant
angular
     .module('myApp')
     .controller('myController', function($scope){....});

// 2 Variant
app.controller('MyController', function($scope){...}); // where app = angular.module(....)
```
                                                
                                                
                                                

##   Передать свой заголовок в запросе (LOCAL)
``` javascript
 app.controller("Lists", function($scope, $http)
 {
   // Передать в Заголовок запрос "Uid"
   $http.defaults.headers.common.Uid = GetCookie('Uid');
  }); 
  ```
  


##  Передать свой заголовок в запросе (GLOBAL)
``` javascript
var app = angular.module('MyApp', ['ngSanitize']).config(["$httpProvider", function($httpProvider) {

   // ставим в запросы Uid
    $httpProvider.defaults.headers.common.myHeader = 'Hello goat';

/*  $httpProvider.defaults.headers.put['Content-Type'] =   'application/x-www-form-urlencoded';
  $httpProvider.defaults.headers.post['Content-Type'] =   'application/x-www-form-urlencoded'; */
}]);
```

  
  
##   Если tooltip(Bootstrap) не работает в зоне работы Angular
```html
<i data-placement="top"  title="Tooltip on left" onmouseenter="$(this).tooltip('show')"></i>
```



##   Развернутая функция $http
```javascript
$http({
                   url: url,
                   method: method,
                   data: postData,
                   headers: {
                       'Uid': GetCookie('Uid')
                     }
               })
               .then(function(response) {

                    // прием данных ( Вот это важная СТРОКА без нее нельзя получить данные из Response)
                    data = response.data;

                    // при успехе
                     if(data['success'])
                      {
                        // Сообщение об удаче
                        Notify('fa fa-check', data['message'], '','','attached','bouncyflip');
                        $scope.GetLists(); // обновить списки
                     }

                    // при ошибке
                     else{
                       // Сообщение об ошибке
                       Notify('fa fa-remove', data['message'], '','','attached','bouncyflip');
                     }
               });
```



##   Перехватчик клавиш
``` javascript
// функция подействует если человек стоит на поле и жмет "Enter"
app.controller("Lists", function($scope, $http)
 {
   
    $scope.KeyCatch = function(keyEvent,titleItem, listId)
    {
        // Добавить запись в список по нажатию на "Enter"
        if (keyEvent.which === 13){ $scope.addItem(titleItem, listId);  }
    }
  }); 
```



