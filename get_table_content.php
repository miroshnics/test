<?php

require "db_connect.php";

try {
  $link = new PDO("mysql:host=$host;dbname=$db;charset=UTF8", $user, $pass);
} catch (PDOException $e) {
  die($e->getMessage());
}

$output = array();
/*
if ($_GET['data'] == 'head') {
  header('Content-Type: application/json');
  $stmt = $link->query("SHOW COLUMNS FROM " . $_GET['tbl']);
  while ($row = $stmt->fetch())
  {
    $output[] = $row[0];
  }
  echo json_encode($output);
  exit;
}

else if ($_GET['data'] == 'content') {
  $stmt = $link->query("SELECT * FROM " . $_GET['tbl']);
  while ($row = $stmt->fetch())
  {
    $output[] = $row;
  }
  echo json_encode($output);
  exit;
}



else */if ($_GET['data'] == 'all') {
  header('Content-Type: application/json');

  $stmt = $link->query("SHOW COLUMNS FROM " . $_GET['tbl']);
  while ($row = $stmt->fetch())
  {
    $output[0][] = $row[0];
  }

  $stmt = $link->query("SELECT * FROM " . $_GET['tbl']);
  while ($row = $stmt->fetch(PDO::FETCH_OBJ))
  {
    $output[] = $row;
  }

  echo json_encode($output);
  exit;
}
