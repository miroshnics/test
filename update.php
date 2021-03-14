<?php

require "db_connect.php";

try {
  $link = new PDO("mysql:host=$host;dbname=$db;charset=UTF8", $user, $pass);
} catch (PDOException $e) {
  die($e->getMessage());
}

$output = array();

header('Content-Type: application/json');

$query_str = "UPDATE " . $_GET['db_table'] . " SET";

foreach ($arr as $key => $value) {
    echo "Key: $key; Value: $value<br />\n";
}

$stmt = $link->query("SHOW COLUMNS FROM " . $_GET['tbl']);
while ($row = $stmt->fetch())
{
  $output[] = $row;
}

echo json_encode($output);
exit;
