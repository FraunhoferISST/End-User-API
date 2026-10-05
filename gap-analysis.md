# Gap Analysis

Legende:
- 🟢 = Bereits Implementiert
- 🟠 = Teilweise Implementiert
- 🔴 = Nicht Implementiert
- Normal: Implementiert
- _Kursiv: Nicht Implementiert_

## Onboarding-Flow

TL;DR was fehlt:
- Dataspace Profiles in edc-v anlegen
- Dataspace Profiles für participants registrieren (edc-v)
- Registrierung ohne Unternehmensdaten. __Nur__ der Name aktuell
- Keine Benachrichtigung über Provisionierung an den Tenant nach der Registrierung 
- Tenant User (Admin) haben keine Datenraumübersicht aktuell
- Datei runterladen / transferieren
---
1. Operator erstellt Datenraum (Create Dataspace Profile) 🟠
    - Datenräume können erstellt werden (in Redline)
    - Nur der Name wird festgehalten und eine ID
    - _Redline (oder CFM agents) könnten das Dataspace Profile im edc-v anlegen_
        - __Frage: Woher kommen die Daten für das Profile?__
2. Nutzer legt Account an (Create Tenant) 🟠/🟢
    - Nutzer kann die Registrierung durchführen:
        1. Service Provider auswählen
        2. Tenant Namen eingeben
        3. Dataspaces auswählen, an denen teilgenommen werden soll
        4. Info darüber, dass der Service Provider die Anfrage erhalten hat
    - _Was fehlt: Keine Daten zum Unternehmen (Zertifikate, Adresse, etc...) --> Werden nicht verarbeitet von Redline_
3. Nutzer kann aus einer Liste von Datenräumen auswählen 🟢
    - Siehe 2.
4. Register \<Datenraum\> 🟢
    - Siehe 2.
5. Operator bekommt die Anfrage und gibt sie frei 🟢
6. Nutzer sieht Teilnahme und kann diese managen 🔴
    - _Keine Benachrichtigung darüber, dass Tenant bereit ist_
    - _Aktuell keine Anzeige der Datenräume in den Tenant views_
7. Nutzer kann Daten mit Partnern aus dem Datenraum teilen 🟠 
    - __Ein__ Tenant User
        - User kann Partner verwalten
            - Sieht zur Auswahl __alle__ Tenants aus Redline, __unabhängig__ von Datenraumzugehörigkeit
        - User lädt Dateien hoch (File View):
            1. Datei auswählen
            2. Partner auswählen (__unabhängig__ vom Datenraum)
            3. Hochladen
                1. Datei in file-sharing-app hochladen
                2. Asset erstellen
                3. Create/check CEL expression
                4. PolicyDefinition erstellen
                5. ContractDefinition erstellen
        - User transferiert Dateien (Explore View):
            1. Findet Datei in Partner Catalog
            2. Beantragt Zugriff (ContractNegotiation) 
            3. Erhält Zugriff
            4. Startet Download (TransferProcess)
            5. _Datei wird heruntergeladen/transferiert_
    - __Zwei__ Tenant User: Admin und User
        - Admin kann Partner verwalten (siehe oben)
        - Admin kann PolicyDefinition erstellen
        - Admin kann ContractDefinition erstellen
        - User lädt Dateien hoch (File View):
            1. Datei auswählen
            2. Bestehende ContractDefinition wählen
            3. Hochladen
                1. Datei in file-sharing-app hochladen
                2. Asset erstellen
                3. ContractDefinition __updaten__ (Asset Selector)
        - User transferiert Dateien (Explore View):
            - (siehe oben)
