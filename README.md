# Online gyógyszertár
host: https://pharmanancy-app.web.app/

## Funkciók

- Az oldalon lehet termékekre név és ár szerint szűrni, le van védve a profile és rendeléshez tartozó routing AuthGuarddal.
- ngOnDestroy és ngOnInit használata a termékek feltölréséhez (app.component.ts)
- lekérdezések servicekben lettek megvalósítva
- Lehet felhasználót regisztrálni, szerkeszteni az adatait és törölni is a profil oldalon
- Bejeletkezés után el lehet kezdeni a kosarat össze rakni majd ezt is lehet szerkeszteni és törölni (firebasben tárolom le a kosarat is szóval itt is megjelenik minden CRUD művelet) majd végül le lehet adni a rendelést.
- A profil oldalon minden előző rendelése a felhasználónak meg van jelenítve és minden rendelés kattintható amivel el lehet jutni a rendelés részletező oldalra


