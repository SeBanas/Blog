// Listowanie stylów
function listStyles() {
	var list = ""; 
	for (var i = 0; (styl = document.getElementsByTagName("link")[i]); i++) { // Szukanie wszystkich elementow stylu
		if (styl.getAttribute("title")) { // Jesli styl ma ustawiony tytul
			title = styl.getAttribute("title"); 
			list += "<a href=\"#\" onclick=\"setStyle(\'" + title + "\'); return false;\">Zmień styl na " + title + ".</a><br/>"; // Dodanie odpowiedniego stringa do listy stylow, zeby sie wyswietlalo jako odnosniki
		}
	}
	document.getElementById("styleList").innerHTML = list; // Wpisanie w element z id="styleList" stworzonego stringa
}

// Ustawienie stylu
function setStyle(name) {
	var styl;
	for (var i = 0; (styl = document.getElementsByTagName("link")[i]); i++) { // Przeszukanie wszystkich elementow stylu w celu znalezienia
										  // tego, ktorego atrybut title jest taki sam jak argument funkcji (name)
		if (styl.getAttribute("title")) { // Szukanie tylko w tych, ktore maja ustawiony atrybut title
			styl.disabled = true; // Wylaczenie stylu
			if (styl.getAttribute("title") == name) styl.disabled = false; // Jesli znaleziono styl ktory ma byc ustawiony, to wlaczenie go
		}
	}
}

// Pobranie atrybutu title aktywnego stylu
function getStyle() {
	var styl;
	for (var i = 0; (styl = document.getElementsByTagName("link")[i]); i++) { // Przeszukanie wszystkich elementow stylu w celu znalezienia
										  // jednego, ktory atrybut disabled ma ustawiony na false
		if (styl.getAttribute("title") && !styl.disabled) return styl.getAttribute("title"); // Zwrocenie atrybutu title ustawionego stylu
	}
	return null;
}

// Stworzenie ciasteczka dla stylu
function createCookie(name, styl, days) {
	if (days) { // Jesli podana ilosc dni do wygasniecia ciasteczka
		var date = new Date();
		date.setTime(date.getTime() + (days*24*60*60*1000)); // Dodanie do aktualnej daty dni podanych jako argument funkcji, przeksztalconych na milisekundy
		var expires = "; expires=" + date.toGMTString(); // Stworzenie stringa dla elementu ciasteczka "expires", nadanie mu wartosci daty wygasniecia
  	}
	else expires = "";
	document.cookie = name + "=" + styl + expires + "; path=/"; // Stworzenie ciasteczka wygladajacego przykladowo tak:
								    // style=main; expires=Thu, 10 Jan 2016 12:00:00 UTC; path=/ 
}

// Odczytywanie ciasteczka stylu
function readCookie(name) {
	var name = name + "="; // Zmiana atrybutu name ciasteczka na jego wartosc i znak rownosci (do wyciagania nazwy stylu)
	var cookieArray = document.cookie.split(';'); // Rozbicie ciasteczka na pojedyncze elementy

	for(var i = 0; i < cookieArray.length; i++) { // Przeszukiwanie ciasteczka w celu znalezienia elementu dotyczacego nazwy stylu
		var c = cookieArray[i];
		while (c.charAt(0) == ' ') c = c.substring(1, c.length); // Pozbycie sie pustych znakow na poczatku
		if (c.indexOf(name) == 0) return c.substring(name.length, c.length); // Pobranie i zwrocenie nazwy stylu (atrybutu title)
	}
	return null;
}

// Co ma sie stac przy ladowaniu strony
window.onload = function(e) {
	var styleCookie = readCookie("style"); // Odczytanie nazwy stylu z ciasteczka
	var styleTitle = styleCookie ? styleCookie : getStyle(); // Jesli w ciasteczku jest zapisana nazwa stylu to przypisanie jej
								 // do zmiennej styleTytle, w przeciwnym wypadku przypisanie aktualnego stylu
	setStyle(styleTitle); // Ustawienie stylu
}

// Co ma sie stac przy opuszczaniu strony
window.onunload = function(e) {
	var styleTitle = getStyle(); // Przypisanie nazwy aktualnego stylu do zmiennej styleTitle
	createCookie("style", styleTitle, 10); // Stworzenie ciasteczka tego stylu, wygasajacego za 10 dni
}

// Zeby przy zmianie na inna podstrone pozostawal ustawiony styl
var styleCookie = readCookie("style");
var styleTitle = styleCookie ? styleCookie : getStyle();
setStyle(styleTitle);
