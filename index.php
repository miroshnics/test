<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css" integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
  <title>Тестовое задание</title>
</head>
<body>
  <?php  require 'header.php'; ?>
  <div class="container">
    <div id="welcome"></div>


    <div class="input-group">
      <select class="custom-select" id="tbl-select" aria-label="Выберите таблицу">
        <option selected>Выберите таблицу</option>
      </select>
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" type="button">Обновить</button>
      </div>
    </div>

  </div>

  <script src="func.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js" integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
</body>
</html>
