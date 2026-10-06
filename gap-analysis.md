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
1. 🟠 Operator erstellt Datenraum (Create Dataspace Profile)
    - Datenräume können erstellt werden (in Redline)
    - Nur der Name wird festgehalten und eine ID
    - _Redline (oder CFM agents) könnten das Dataspace Profile im edc-v anlegen_
        - __Frage: Woher kommen die Daten für das Profile?__
2. 🟠/🟢 Nutzer legt Account an (Create Tenant) 
    - Nutzer kann die Registrierung durchführen:
        1. Service Provider auswählen
        2. Tenant Namen eingeben
        3. Dataspaces auswählen, an denen teilgenommen werden soll
        4. Info darüber, dass der Service Provider die Anfrage erhalten hat
    - _Was fehlt: Keine Daten zum Unternehmen (Zertifikate, Adresse, etc...) --> Werden nicht verarbeitet von Redline_
3. 🟢 Nutzer kann aus einer Liste von Datenräumen auswählen 
    - Siehe 2.
4. 🟢 Register \<Datenraum\> 
    - Siehe 2.
5. 🟢 Operator bekommt die Anfrage und gibt sie frei 
6. 🔴 Nutzer sieht Teilnahme und kann diese managen 
    - _Keine Benachrichtigung darüber, dass Tenant bereit ist_
    - _Aktuell keine Anzeige der Datenräume in den Tenant views_
7. 🟠 Nutzer kann Daten mit Partnern aus dem Datenraum teilen 
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

### Zu klären
Auf welche Entities hat das Dataspace Profile Einfluss im edc-v?<br>
Optimal wäre:
- Unabhängig:
  - Asset
- Abhängig:
  - PolicyDefinition
  - ContractDefinition
  - Alles folgende ...

#### Ergebnis
> [!NOTE]
> Keine der Entities ist Dataspace Profile spezifisch!

- Separierung vielleicht über Credential Scopes im Issuer Service. Muss ich noch testen.<br>
    IdentityHub scope config:
    ```yaml
    edc:
      identityhub:
        scopes:
          - name: membership-a-type
            pattern: 'org[.]eclipse[.]dspace[.]dcp[.]vc[.]type:MembershipCredential[.]space-a:read'
            leftOperand: verifiableCredential.credential.type
            operator: contains
            rightOperand: MembershipCredential

          - name: membership-a-issuer
            pattern: 'org[.]eclipse[.]dspace[.]dcp[.]vc[.]type:MembershipCredential[.]space-a:read'
            leftOperand: issuerId
            operator: '='
            rightOperand: did:web:issuer-a.example


    ```
    DcpScope:
    ```json
    {
      "@context": ["https://w3id.org/edc/connector/management/v2"],
      "@type": "DcpScope",
      "@id": "membership-a",
      "type": "DEFAULT",
      "profile": "space-a",
      "value": "org.eclipse.dspace.dcp.vc.type:MembershipCredential.space-a:read"
    }
    ```
- Bei gleichem credential Namen müssen die Policies aber auch auf den Issuer prüfen, sonst landen beide Policies im Catalog Dataset.
    ```mermaid
    sequenceDiagram
        participant C as Consumer
        participant E as Provider EDC — Profile A
        participant H as Consumer IdentityHub
        participant P as Access-policy evaluation
        C->>E: Request catalog through profile A
        E->>H: Request A-specific membership scope
        H-->>E: Active MembershipCredential from issuer A
        E->>E: Validate credential against profile A — PASS
        E->>P: Evaluate contract A access policy
        Note over P: Any active membership?
        P-->>E: YES — A's credential satisfies it
        E->>P: Evaluate contract B access policy
        Note over P: Any active membership?
        P-->>E: YES — the same A credential satisfies it
        E-->>C: Same dataset with offers A and B
    ```


## User & Admin View

