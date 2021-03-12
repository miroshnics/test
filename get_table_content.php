<?php

require "db_connect.php";

try {
  $link = new PDO("mysql:host=$host;dbname=$db;charset=UTF8", $user, $pass);
} catch (PDOException $e) {
  die($e->getMessage());
}

$output = array();

if ($_GET['data'] == 'head') {
  $stmt = $link->query("SHOW COLUMNS FROM ".$_GET['tbl']);
  while ($row = $stmt->fetch())
  {
    $output[] = $row[0];
  }
  header('Content-Type: application/json');
  echo json_encode($output);
}

if ($_GET['data'] == 'content') {
  $stmt = $link->query("SELECT * FROM ".$_GET['tbl']);
  while ($row = $stmt->fetch())
  {
    $output[] = $row[0];
  }
  header('Content-Type: application/json');
  echo json_encode($output);
}
