


 // ................................................................................................. COOKIES
 /***********************************************************
 *  Получить куки
 *
 *  @param string - name - имя куки которого хотим получить
 *******************************************************/
 function GetCookie(name)
 {
      var matches = document.cookie.match(new RegExp(
         "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
       ));
       return matches ? decodeURIComponent(matches[1]) : undefined;
 }




/***********************************************************
*  Удалить куки
*
*  @param string - name - имя куки которого хотим удалить
*******************************************************/
function DelCookie(name)
{
   document.cookie = name + "=" + "; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT";
}




/***********************************************************
*  Поставить куки
*
*  @param string - name  - имя куки
*  @param string - value - значение
*******************************************************/
function SetCookie(name,value)
 {
   var now = new Date();

//   now.setMinutes(  + now.getMinutes()); // минуты
   now.setDate( 1 + now.getDate()); //дни
   document.cookie = name + "=" + value +"; path=/; expires="+ now.toGMTString();
 }
 
 
 
 
  /***********************************************************
 *  Выход из системы (Очищение куков)
 *
 *******************************************************/
 function Logout()
  {
     DelCookie('Uid');
     DelCookie('Login');
     location.href = "login.html";
  }
 // ................................................................................................. COOKIES





/***********************************************************
*   Возвращает отформатированную сегодняшнюю дату
*
*******************************************************/
function GetCurrentDate()
 {
   d = new Date();

   curr_date          =         d.getDate() > 9 ? d.getDate() : '0'  + d.getDate() ;
   curr_month         =         d.getMonth() > 9 ? (d.getMonth()+1) : '0'  + (d.getMonth()+1) ;
   curr_year          =         d.getFullYear();
   curr_hour          =         d.getHours() > 9 ? d.getHours() : '0'  + d.getHours() ;
   curr_minutes       =         d.getMinutes() > 9 ? d.getMinutes() : '0'  + d.getMinutes() ;

   return curr_date + "." + curr_month + "." + curr_year + " " + curr_hour + ":" + curr_minutes;
 }



 /***********************************************************
  *   Получение данных с формы(<div>,<form>)
  *
  *******************************************************/
 function GetData(obj_form)
  {
    var hData = {};
    $('input, textarea, select', obj_form).each(function(){
         if(this.name && this.name != '')
          {
            hData[this.name] = this.value;
            console.log('hData[' + this.name + '] = ' + hData[this.name]);
          }
    });
    return hData;
  }






/***********************************************************
*   Проверка почты на валидность
*
*  @param string - emailAddress - почта на проверку
*******************************************************/
function isValidEmailAddress(emailAddress)
 {
    var pattern = new RegExp(/^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i);
    return pattern.test(emailAddress);
 }







/***********************************************************
*  Проверка массива на пустоту
*
*  @param array - object - массив на проверку на пустоту
*******************************************************/
function isEmpty(object)
{
  return JSON.stringify(object) == "{}";
}





/* *********************************************************************** BOOTSRAP func   */
// JUMP TO TOP
$(document).ready(function(){
      $('body').append('<div id="toTop" class="btn ma-btn"><span class="glyphicon glyphicon-chevron-up"></span> Наверх</div>');
    	$(window).scroll(function () {
			if ($(this).scrollTop() != 0) {
				$('#toTop').fadeIn();
			} else {
				$('#toTop').fadeOut();
			}
		});
    $('#toTop').click(function(){
        $("html, body").animate({ scrollTop: 0 }, 600);
        return false;
    });
});




// TOOLTIP(BOOTSRAP)
// align can be: left,right,bottom,top
function Tooltip(obj,word,align){

    $(document).ready(function(){

        var object = "#" + obj;
        $(object).tooltip({title: word, placement: align});

    });
}





// POWERPASS
function PowerPass(field){

            $(document).ready(function(){


                var object = "#" + field;


            //minimum 8 characters
            var bad = /(?=.{8,}).*/;
            //Alpha Numeric plus minimum 8
            var good = /^(?=\S*?[a-z])(?=\S*?[0-9])\S{8,}$/;
            //Must contain at least one upper case letter, one lower case letter and (one number OR one special char).
            var better = /^(?=\S*?[A-Z])(?=\S*?[a-z])((?=\S*?[0-9])|(?=\S*?[^\w\*]))\S{8,}$/;
            //Must contain at least one upper case letter, one lower case letter and (one number AND one special char).
            var best = /^(?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9])(?=\S*?[^\w\*])\S{8,}$/;

            $(object).on('keyup', function () {
                var password = $(this);
                var pass = password.val();
                var passLabel = $('[for="password"]');
                var stength = 'Слабый';
                var pclass = 'danger';
                if (best.test(pass) == true) {
                    stength = 'Очень сильный';
                    pclass = 'success';
                } else if (better.test(pass) == true) {
                    stength = 'Сильный';
                    pclass = 'warning';
                } else if (good.test(pass) == true) {
                    stength = 'Почти хороший';
                    pclass = 'warning';
                } else if (bad.test(pass) == true) {
                    stength = 'Слабый';
                } else {
                    stength = 'Ты шутишь ?';
                }

                var popover = password.attr('data-content', stength).data('bs.popover');
                popover.setContent();
                popover.$tip.addClass(popover.options.placement).removeClass('danger success info warning primary').addClass(pclass);

            });

            $('input[data-toggle="popover"]').popover({
                placement: 'top',
                trigger: 'focus'
            });

            })
}

/* *********************************************************************** BOOTSRAP func   */





//********************************************************************************** SIMPLE FUNCTIONS

//Показывает обьект который пришел как атрибут (JQUERY)
function ShowObject(el){ $("#"+el).show('blind',600); }

function ShowObject1(el){ $("#"+el).show();  }

// Скрывает обьект который пришел как атрибут (JQUERY)
function HideObject(el){ $("#"+el).hide('blind',600); }

 // Скрывает обьект который пришел как атрибут (без JQ)
 function HideObject1(obj)
  {
    var el = document.getElementById(obj);
    el.style.display = "none";

  }

// Скрывает или показывает обьект который пришел как атрибут (JQUERY)
function ToggleObject(el){ $("#"+el).toggle('blind',600);

 }

// Скрывает или показывает обьект который пришел как атрибут (без JQ)
function ToggleObject1(obj)
 {
      var el = document.getElementById(obj);

      if( el.style.display == "none"){ el.style.display = "";}
      else{ el.style.display = "none"; }
 }

// Направляет на страницу
function HeadPage(page)
 {
   document.location.href = page;
 }

//********************************************************************************** SIMPLE FUNCTIONS




//**********************************************************************************  AJAX-FUNCTIONS

/* **************** Функция для действий от которых не надо ответ (Likes , Viewed pages)  */

/* Функция для вывода данных  */
function DivOut(obj,page_id)
 {
     var msg = 0;

     if(obj == "top_news_1")  { msg = 1; } //Top News 1
     if(obj == "top_news_1_indicators")  { msg = 7; } //Top News 1 Indicators
     if(obj == "games_div")   { msg = 2; }  //Games
     if(obj == "software_div"){ msg = 3; }  //Soft
     if(obj == "hardware_div"){ msg = 4; }  //HARD
     if(obj == "it_div")      { msg = 5; }  //IT
     if(obj == "top_news_2")  { msg = 6; } //Top News 2
     if(obj == "coments_div")  { msg = 8; } //Top News 2

     $.ajax({
             url:     "inc/out.php", //Адрес подгружаемой страницы
             type:     "post", //Тип запроса
             dataType: "html", //Тип данных
             data:     ({a : msg, id: page_id}) ,
             success: function(response) {
                                         var resp = $.trim(response); // VERY important thing , do not touch !!!
                                          ///alert(resp);

                                         //Вывод в див
                                          $("#"+obj).html(resp);
                                         },

         error: function(response) { alert("ERROR!!"); }
      });
}




/* Функция для одиночных действий , которым не нужнен тег <form>  */
function Action(button, page)
 {
      // button - это нажатая кнопка
     // page - на какой странице, в основном это статья полная

     $.ajax({
             url:     "inc/core.php", //Адрес подгружаемой страницы
             type:     "POST", //Тип запроса
             dataType: "html", //Тип данных
             data: ({btn : button, page_id : page }),
             success: function(response) {

                                             /*
                                                Здесь response - это ответ с сервера , ловим ехо от PHP;
                                                потом применяеться фукнция $.trim() так как в переменной много пробелов как сначала так и в конце
                                             */
                                             var resp = $.trim(response);
                                            //   alert(resp);

                                          },

         error: function(response) { alert("ERROR!!"); }
      });
}




/* ****************  Функция для отправки <FORM>  */
function SendForm(form_id,page_id)
 {

     /*
        form_id - это форма <form>
        page_id - страница статьи
     */


     $.ajax({
             url:     "inc/core.php", //Адрес подгружаемой страницы
             type:     "POST", //Тип запроса
             dataType: "html", //Тип данных
             data: $("#"+form_id).serialize(),
             success: function(response) {

                 /*
                    Здесь response - это ответ с сервера , ловим ехо от PHP;
                    потом применяеться фукнция $.trim() так как в переменной много пробелов как сначала так и в конце
                 */
                  var resp = $.trim(response);
                  // alert(resp);


               // Форма ОТЗЫВА
               if(form_id == "recall_form"){  $("#answer_dd" ).html(resp); }

               //  Оставляем КОММЕНТАРИЙ
               if(form_id == "coments_form")
                {
                   DivOut('coments_div',page_id) ; /* Обновить комменты чтобы увидеть новый */
                   $("#answer_comment" ).html(resp);
                 }


                 // РЕГИСТРАЦИЯ И ВХОД (en_form & reg_form)
                if(form_id == "reg_form" || form_id == "en_form")
                 {
                         /******************   Ответы с сервера ************/
                        var ans = "Вход"; /* Ответ для формы входа */
                        var ans1 = "Вы успешно зарегестрировались! Перейти на <a href=\"index.php\">главную</a>"; /* Ответ для формы регистрации */

                         /******************   Если все хорошо ************/
                        if(resp == ans){ document.location.href = "index.php"; } /* ENTER-form */
                        if(resp == ans1){ $("#msg_success_reg").show( function(){ $('#msg_success_reg').html("<h4>" + glyph + " " + resp + "</h4>"); }); }  /* REG-form */

                        /******************  Если все плохо  ************/
                        if(form_id == "en_form" && resp != ans){  Alertik(resp,'D'); } /* ENTER-form */
                        if(form_id == "reg_form" && resp != ans1){ Alertik(resp,'D');} /* REG-form  */
                  }
                                 },

         error: function(response) { alert("ERROR in SendForm() Ajax!!"); }
      });
}

//********************************************************************************** AJAX-FUNCTIONS




//********************************************************************************** Alerts
function Alertik(msg, type)
 {
   // DANGER
   if(type == "D"){ var dom = '<div class="top-alert"><div class="alert alert-danger alert-dismissible fade in " role="alert"><i class="glyphicon glyphicon-exclamation-sign"></i> ' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>'; }
   // Warning
   if(type == "W"){ var dom = '<div class="top-alert"><div class="alert alert-warning alert-dismissible fade in " role="alert"><i class="glyphicon glyphicon-question-sign"></i> ' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>'; }
   // SUCCESS
   if(type == "S"){ var dom = '<div class="top-alert"><div class="alert alert-success alert-dismissible fade in " role="alert"><i class="glyphicon glyphicon-ok"></i> ' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>'; }
   // INFO
   if(type == "I"){ var dom = '<div class="top-alert"><div class="alert alert-info alert-dismissible fade in " role="alert"><i class="glyphicon glyphicon-info-sign"></i> ' + msg + '<button type="button" class="close" data-dismiss="alert" aria-label="Close"><span aria-hidden="true">×</span></button></div></div>'; }

  var jdom = $(dom);
	jdom.hide();
	$("body").append(jdom);
	jdom.fadeIn();
	setTimeout(function() {
		jdom.fadeOut(function() {
			jdom.remove();
		});
	}, 6000);
}
//********************************************************************************** Alerts





//********************************************************************************** Вызов на каждой странице
    //  TOOLTIPS
    Tooltip('domik','Главная','left');
    Tooltip('angrydog','DD','right');
    Tooltip('timeline','Timeline','right');
    Tooltip('exit-button','Выйти','right');

    Tooltip('back','На главную','right');
    Tooltip('like','Вподобайка','right');
    Tooltip('getback_like','Не нравиться больше','right');

    // Плавное передвижение к дивам типа #it, #games ....
    //MovesToPositionSlowly();

    // Проверка на прочность пароля
    PowerPass('password');
//********************************************************************************** Вызов на каждой странице
