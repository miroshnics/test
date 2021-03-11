<?php

require "db_connect.php";

try {
	$link = new PDO("mysql:host=$host;dbname=$db;charset=UTF8", $user, $pass);
} catch (PDOException $e) {
	die($e->getMessage());
}

// SELECT * FROM INFORMATION_SCHEMA.TABLES
// SHOW TABLES;


$stmt = $link->query("SHOW TABLES;");
while ($row = $stmt->fetch())
{
  //echo '<pre>';
  echo '<br>';
  print_r($row);
}
