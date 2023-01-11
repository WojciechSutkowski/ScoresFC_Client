# Klient aplikacji ScoresFC

Aplikacja została stworzona w ramach pracy inżynierskiej.

## Temat pracy

**Projekt i implementacja aplikacji internetowej do wspomagania wyświetlania wyników sportowych na żywo**

---

### Cel pracy

Celem pracy było zaprojektowanie i zaimplementowanie aplikacji internetowej pozwalającej użytkownikowi na śledzenie wyników meczów piłkarskich na żywo, statystyk oraz innych danych ze świata piłki nożnej. Grupa docelowa została zawężona z uwagi na to że najpopularniejsze aplikacje tego typu oferują zazwyczaj dane z wielu różnych sportów, co wprowadza większe skomplikowanie obsługi dla użytkowników. Aplikacja ScoresFC obsługuje wyłącznie dane piłkarskie z uwagi na największą popularność tego sportu, będąc aplikacją jasną i przejrzystą w obsłudze, łącząc przy tym najlepsze cechy znanych graczy na rynku. Aplikacja jest również przyjazna osobom walczącym z nałogiem hazardu, gdyż w odróżnieniu od konkurencji nie wyświetla reklam oraz kursów bukmacherskich, za to posiada odnośnik do strony Polskiego Towarzystwa Psychologicznego, gdzie osoby uzależnione mogą znaleźć pomoc w walce z nałogiem.

### Wykorzystane technologie

- Node.js + Express.js (serwer aplikacji)
- Vue.js + Sass (część kliencka aplikacji)
- MongoDB (baza danych)
- Jest (testy jednostkowe)
- Cypress (testy E2E)

### Wymagania

Klient aplikacji ScoresFC ma za zadanie główne wyświetlanie danych pobieranych z serwera (dla wszystkich rodzajów użytkowników), a także obsługę jego pozostałych funkcjonalności (możliwość rejestracji i logowania, dodawania komentarzy do meczów, panel administratora do zarządzania komentarzami). Klient bezposrednio łączy się też z API-Football, obsługując udostępniane przez to API [**widgety**](https://www.api-football.com/widgets).
