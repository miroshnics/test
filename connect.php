<?php

require "db_connect.php";

try {
	$link = new PDO("mysql:host=$host;dbname=$db;charset=UTF8", $user, $pass);
} catch (PDOException $e) {
	die($e->getMessage());
}

$output = array();

$stmt = $link->query("SHOW TABLES;");
while ($row = $stmt->fetch())
{
	$output[] = $row[0];
}
header('Content-Type: application/json');
echo json_encode($output);
