/******************************************
*   Передать свой заголовок в запросе
*
******************************************/
 app.controller("Lists", function($scope, $http)
 {
   // Передать в Заголовок запрос "Uid"
   $http.defaults.headers.common.Uid = GetCookie('Uid');
  }); 
  
  
  
  
/******************************************
*   Если tooltip(Bootstrap) не работает в зоне работы Angular
*
******************************************/  
<i data-placement="top"  title="Tooltip on left" onmouseenter="$(this).tooltip('show')"></i>




/******************************************
*   Развернутая функция $http
*
******************************************/  
 $http({
                   url: url,
                   method: method,
                   data: postData,
                   headers: {
                       'Uid': GetCookie('Uid')
                     }
               })
               .then(function(response) {

                    // прием данных
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
