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
            method: 'GET',
            url: '/friends/dialog',
            params: {user: userId},
            // headers: {'Authorization': 'Token token=xxxxYYYYZzzz'}
                })
                 .success(function(data)
                  {
                   // With the data succesfully returned, call our callback
                    callbackFunc(data);
                  })

                .error(function(xhr, ajaxOptions, thrownError)
                 {
                   alert(xhr.status);
                   alert(thrownError);
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



