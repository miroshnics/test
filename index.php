<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.6.0/jquery.min.js"></script>
  <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/css/bootstrap.min.css"
  integrity="sha384-B0vP5xmATw1+K9KRQjQERJvTumQW0nPEzvF6L/Z6nronJ3oUOFUFpCjEUQouq2+l" crossorigin="anonymous">
  <title>Тестовое задание</title>
</head>
<body>
  <?php  require 'header.php'; ?>
  <div class="container">
    <div id="welcome"></div>

    <label for="tbl-select">Выберите отображаемую таблицу:</label>
    <div class="input-group">
      <select class="custom-select" name="tbl-select" id="tbl-select" aria-label="Выберите таблицу">
        <option selected>Выберите таблицу</option>
      </select>
      <div class="input-group-append">
        <button class="btn btn-outline-secondary" id="tbl-show" type="button">Показать</button>
      </div>
    </div>

    <table class="table table-hover mt-5 d-none" id="main-tbl">
      <thead class="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
      </tbody>
    </table>

    <button type="button" id="new-btn" class="btn btn-primary d-none" data-toggle="modal" data-target="#newModal">Добавить новую запись</button>


    <?php require 'editModal.php' ?>
    <?php require 'newModal.php' ?>
    <?php require 'readmeModal.php' ?>
    <?php require 'optimizeModal.php' ?>

  </div>
  <script src="func.js" type="text/javascript"></script>
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@4.6.0/dist/js/bootstrap.bundle.min.js"
  integrity="sha384-Piv4xVNRyMGpqkS2by6br4gNJ7DXjqk09RmUpJ8jgGtD7zP9yug3goQfGII0yAns" crossorigin="anonymous"></script>
</body>
</html>
