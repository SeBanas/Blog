<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<title>Przeglądanie bloga</title>
	<meta http-equiv="Content-Type" content="application/xhtml+xml; charset=UTF-8" />
</head>
<body style="background-color: #60a0db">

<?php
// Dolaczanie menu z pliku menu.php
include 'menu.php';
print_menu();

// Funkcja listujaca istniejace blogi
function listblogs() {
	$blogs = glob('*', GLOB_ONLYDIR); //wyjasnione w pliku wpis.php
	echo "<ul>";
	foreach ($blogs as &$blog) {
		echo "<li><a href=blog.php?nazwa=$blog>$blog</a></li>";
	}
	echo "</ul>";
}
if (!isset($_GET["nazwa"])) { // jesli nie zostal podany indeks nazwa
	echo "Lista dostępnych blogów:";
	listblogs();
} elseif (!is_dir(htmlspecialchars($_GET["nazwa"]))) { // jesli nie istnieje blog o nazwie pod indeksem nazwa
	echo "Nie znaleziono bloga!<br/>Lista dostępnych blogów:";
	listblogs();
} else { // jesli podany indeks i blog istnieje
	$blog = htmlspecialchars($_GET["nazwa"]);
	echo "<h1>Blog <strong style=\"color: red\">".$blog."</strong><br/></h1>";
	$files = array_filter(glob($blog.'/*'), 'is_file'); // tablica zawierajaca tylko pliki
	$entries = array_diff($files, array($blog.'/info')); // Usuniecie pliku info z tablicy plikow
	arsort($entries); // posortowanie od najnowszego
	foreach ($entries as &$entry) {
		if (preg_match('/^'.preg_quote($blog, '/').'\/[0-9]*$/', $entry)) { // Listowanie tylko wpisow, bez zalaczonych plikow
			echo "<h3>Wpis:</h3>";
			$read = file($entry);
			echo "<p>";
			foreach ($read as &$line) {
				echo $line."<br/>";
			}
			echo "</p>";
			$i = 0;
			foreach ($entries as &$file) {
				if (preg_match('/^'.preg_quote($entry, '/').'[1-3]\..*$/', $file)) { // Listowanie tylko zalaczonych plikow
					if ($i == 0) { // Żeby tylko raz wypisywalo naglowek i tylko wtedy gdy zalaczniki sa dodane do wpisu
					echo "<h4>Załączone pliki:</h4>";
					$i++;
					}
					echo "<a href=\"$file\">".basename($file)."</a><br/>";
				}
			}
			echo "<br/>";
			if (is_dir($entry.'.k')) { // Sprawdzenie czy komentarze istnieja
				echo "<h4>Komentarze (od najnowszego):</h4>";
				$koms = array_filter(glob($entry.'.k/*'), 'is_file'); // pobranie do tablicy plikow komentarzy
				arsort($koms);
				foreach($koms as &$kom) {
					$read = file($kom);
					echo "<p>";
					$i = 0;
					foreach ($read as &$line) { // Odczytanie komentarza bez ostatniej linii (bez IP)
						if ($i != (count($read) - 1)) {
							echo $line."<br/>";
						}
						$i++;
					}
					echo "</p>";
				}
			}
			echo "<a href=\"komentarz.php?$entry\">Dodaj komentarz.</a></p><br/>";
			echo "----------------------------------------------<br/>";
		}
	}
}


?>
</body>
</html>
