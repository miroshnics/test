<?php

require "db_connect.php";

$output = array();
$columns = array();
$values = array();

// Очистка буфера
ob_end_clean();

$table =  $_POST['db_table'];

$query_str = "INSERT INTO " . $table . " (";

foreach ($_POST as $key => $value) {
  if ($value == "") continue;

  if ($key != 'db_table') {
    $columns[] = $key;
    $values[] = $value;
  }
}

foreach ($columns as $column) {
  $query_str .= $column . ",";
}
$query_str = substr($query_str,0,-1);

$query_str .=  ") VALUES (";
foreach ($values as $value) {
  $query_str .= "'" . $value . "',";
}
$query_str = substr($query_str,0,-1);

$query_str .=  ");";


try {
  $link = new PDO("mysql:host=$host;dbname=$db;charset=UTF8", $user, $pass);
  $stmt = $link->query($query_str);
} catch (PDOException $e) {
  $output[] = $query_str . "<br>" . $e->getMessage();
}

echo $query_str;
exit;
