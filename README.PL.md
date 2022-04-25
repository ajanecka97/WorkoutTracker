# GymBuddy

Projekt zrobiony w ramach zadania na studiach

## CZĘŚĆ I

### Wymagagnia

-   5 stron HTML
    -   Strony powinny zawierać:
        -   formatowanie tekstu (pogrubienia, kursywy), nagłówki (h1-h6), wyrównanie
            tekstu, paragrafy
        -   obrazki
        -   linki (do zewnętrznych stron), link na obrazku
        -   tabelka
-   CSS
    -   Przynajmniej 10 różnych selektorów
-   JavaScript
    -   Przynajmniej 3 skrypty
-   Responsywność
    -   Strona musi wyglądać dobrze na komputerze, tablecie i komórce
-   Strona musi przejść walidację: http://validator.w3.org/

### Opis projektu

Aplikacja to prosty dziennik ćwiczeń na siłowni. Składa się z następujących stron:

-   Lista treningów
-   Lista ćwiczeń dla konkretnego treningu
-   Widok konkretnego ćwiczenia
-   Strona z opcją dodania nowego treningu
-   Strona z opcją dodania nowego ćwiczenia

Strona jest wysoce interaktywna. Zawiera wiele elementów, które automatycznie się renderują na podstawie otrzymanych danych.
Niektóre z nich to:

-   Tabelki
-   Akordeony
-   Modale
-   Breadcrumby

W części 1 aplikacja nie posiada backendu, ale local storage jest wykorzystywany w celu zapewnienia trwałości danych.

Użyte technologie:

-   HTML
-   Javascript
-   SCSS (skompilowany do CSS)
-   Bootstrap
-   Node (do zarządzania pakietami - kompilacja SCSS, HTTP server)

#### Set up

W celu uruchomienia strony w lokalnym środowisku, można skorzystać z następujących kroków:

1. Zainstaluj node.js, jeżeli go nie posiadasz
2. Uruchom `npm install` w głównym folderze projektu
3. Uruchom `npm start` w celu uruchomienia serwera
4. Wejdź na `http://192.168.1.103:8080` w wybranej przeglądarce

Uruchomiona strona jest również dostępna [tutaj](https://simple-gym-buddy.netlify.app/)
