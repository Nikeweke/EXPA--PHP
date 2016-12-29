#### Composer подсказки: http://composer.json.jolicode.com/

#### Установка composer'a
1. Можно установить глобально и тогда можна обращаться: **composer ....**
2. Или скачать локально composer.phar в папку с проектом и обращаться:**php composer.phar ....** 

#### Для использования в файл index.php
```php
<?php
// вот эту строку надо добавить для подгрузки пакетов
require_once __DIR__ . '/vendor/autoload.php';

// и потом можно юзать классы пакетов
$time = new PHP_Timer();
```

