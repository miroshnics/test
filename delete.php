<?php

require "db_connect.php";

$output = array();

// Очистка буфера
ob_end_clean();

$table =  $_POST['db_table'];

$query_str = "DELETE FROM " . $table . " WHERE ";

foreach ($_POST as $key => $value) {
  if ($key != 'db_table') {
    $query_str .= $key . "='" . $value . "' AND ";
  }
}
$query_str = substr($query_str,0,-4);

$query_str .=  ";";


try {
  $link = new PDO("mysql:host=$host;dbname=$db;charset=UTF8", $user, $pass);
  $stmt = $link->query($query_str);
} catch (PDOException $e) {
  $output[] = $query_str . "<br>" . $e->getMessage();
}

echo $query_str;
exit;
