<?php
$filename = "messages.txt";
if (!file_exists($filename)) { // Jak nie ma pliku wiadomosci
	$file = fopen($filename, "w");
	fwrite($file, "Rozpoczynamy czat!\n");
	fclose($file);
} else { // Jak jest
	$file = fopen($filename, "r");
	$text = fread($file, filesize($filename));
	fclose($file);
	echo $text;
}
?>
