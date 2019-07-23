<?php
$file = file_get_contents('./player.log');
$searchString = $_POST['world'] . ', ' . $_POST['p'] . ', ' . $_POST['id'];
if(strpos(file_get_contents("./player.log"), $searchString) == false) {
    $file = fopen ('./player.log', 'a+');
    fwrite($file, date("Y-M-d H:i:s") . ', ' . $searchString . ', ' . $_SERVER['REMOTE_ADDR'] . ", 3.0.4 \r\n");
}
?>