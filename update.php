<?php

require "db_connect.php";

$output = array();

// Очистка буфера
ob_end_clean();

//header('Content-Type: application/json');

$table =  $_POST['db_table'];
$index = $_POST['index'];

$query_str = "UPDATE " . $table . " SET (" ;

foreach ($_POST as $key => $value) {
  if ($value == "") continue;
  
  if ($key != $table && $key != $index) $query_str .= $key . "=" . $value . " ";
}

$query_str .= ") WHERE " . $index . "=" . $_POST[$index];

//try {
//$link = new PDO("mysql:host=$host;dbname=$db;charset=UTF8", $user, $pass);
//$stmt = $link->query($query_str);

//while ($row = $stmt->fetch())
//{
//$output[] = $stmt;
//}

//} catch (PDOException $e) {
//  $output[] = $query_str . "<br>" . $e->getMessage();
//}

//echo json_encode($output);
//echo json_encode($output);
echo $query_str;
exit;
