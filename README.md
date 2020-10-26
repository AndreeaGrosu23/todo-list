# todo-list

# Functionalitati:
- adaugare de Task. Campuri: tip task - lista predefinita (ex: work, home, hobby), nume, data limita, durata estimata. Reguli de business: task-ul nu poate fi in trecut, durata nu poate fi negativa.

- afisare lista task-uri: Reguli de business: afisarea initiala se va face in functie de data crearii. Informatii: pe langa datele de mai sus (introduse la creare) se va mai afisa si numarul de zile ramase pana la data expirarii taskurilor.

- marcare task ca finalizat. Reguli de business: nu se poate marca ca fiind finalizat un task deja finalizat. Campuri: La finalizare se va cere durata efectiv lucrata pe task, iar alaturi de aceasta informatie se va salva automat si data finalizarii

- stergere task. Reguli de business: nu se poate sterge un task finalizat

- sortare task-uri dupa data expirarii (crescatoare si descrescatoare)

Aplicatia trebuie sa aiba un backend si un front end (decizia de arhitectura si tehnologii ramane in seama candidatului in functie de nivelul de cunostinte, insa ideal ar fi daca poate povesti in mare si alte variante de care a auzit/studiat). 

Layout minimal pt partea de front end, iar nivelul de design GUI trebuie sa fie tinut la minimum cat sa indeplineasca urmatoarele cerinte functionale (sa nu insiste cu poze, animatii, combinatii de culori sau alte probleme stilistice - ce ne intereseaza sunt solutiile tehnice)

- aplicatia trebuie sa fie pozitionata pe centrul paginii

- tipul task-ului trebuie sa fie diferentiat fie printr-o culoare diferita sau o iconita diferita

- data limita trebuie sa fie afisata cu rosu (sau alta mod distinctiv) daca a mai ramas o zi pana la expirarea task-ului si acesta nu e marcat ca fiind finalizat

- butonul de sortare trebuie sa indice modul in care sunt sortate task-urile (fie se schimba numele butonului: ex. cand task-urile sunt sortate ascendent sa se afiseze Sort by date descending si invers, fie printr-o iconita)

- numele listei si userul vor fi hardcoded, adica nu trebuie implementat flux de autentificare/autorizare.
- modul de introducere a datelor este la libera alegere, dar utilizatorul trebuie sa vada, undeva in ecran, eventualele erori de validare.

La nivel de backend se poate folosi ca storage fie o baza de date, fie un fisier pe disk (dar in acest caz sa existe o diagrama ERD cu modul in care ar face ei designul bazei de date).
