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
siehe Onboarding-Flow

## User Stories

### US-11: Registration

| Story | Status | Acceptance-criterion assessment |
| --- | --- | --- |
| **US-11.1 — Initiate registration** | **Partly implemented** | **Form:** public and reachable, with provider/name/dataspace requirements, but no complete company form. **Validation/actionable errors:** required selection messages, disabled Submit, backend error alert; company-data validation missing, and whitespace-only name silently returns. **Submitted status/reference:** tenant is created and backend returns an ID, but no explicit submitted-state entity; public UI discards the ID. |
| **US-11.2 — Consent and terms acceptance** | **Not implemented** | **Present all required terms:** absent. **Electronic acknowledgment:** absent. **Versioned document references/timestamp:** absent. `agreementTypes` or CFM hardcoded `contractVersion: 1.0.0` is not a consent record. |
| **US-11.3 — Initial contact and governance** | **Not implemented** | **Primary contact/roles linked to organization:** no structured input or data model for contacts/data owners. **Approval/access-management rules:** absent. **Validate/store contact:** no contact/email/phone validation or supported contact workflow. Generic operator JSON properties do not meet these acceptance criteria. |
| **US-11.4 — Prepare interaction with partners** | **Implemented (minimal specified scope)** | **Store partner main information:** DID and nickname are persisted under participant/dataspace and retrieved for discovery/access selection. Meets the sole stated criterion if “main information” means this minimal reference. Legal name/address/contact profiles and editing/removal are not provided. |


### US-12: Data discovery

| Story | Status | Acceptance-criterion assessment |
| --- | --- | --- |
| **US-12.1 — Global dataset search** | **Partly implemented** | **Results from all connected sources:** saved partners queried in parallel, but only one primary dataspace and failures silently omitted. Search filters loaded results rather than searching all sources. **Source/ecosystem/title:** title and company nickname visible; ecosystem label absent. No multi-region/global discovery demonstrated. |
| **US-12.2 — Advanced filters** | **Partly implemented** | **Facets:** company/source filter and text search exist; ecosystem, use-case and ownership facets missing from Explore. **Fast/persistent state:** local filtering/pagination exists, but fetch-all design has no scale verification; filter state is component-local and lost on route recreation. **Invalid combinations/helpful feedback:** generic no-results text, no dedicated combination validation. |
| **US-12.3 — Dataset metadata** | **Partly implemented** | **Name/description/owner/basic stats/access:** name/type/size/provider and contract-existence badge exist. Description is never filled by the mapping; rich access rules/purpose/quality absent. **Up-to-date:** APIs are queried on load and after negotiation, but no freshness timestamp/refresh guarantee; source failures can appear as no data. |
| **US-12.4 — Access and permission checks** | **Partly implemented** | **Who can request/view/share:** limited partner labels and agreement badge, not a full permission model. **Request from discovery:** real contract negotiation implemented. **Timestamp/role access-change log:** agreements have signing dates and transfers have records, but no complete access-change audit log or responsible role. Remote permission/delivery check incomplete. |


### US-13: Upload/compliance

| Story | Status | Acceptance-criterion assessment |
| --- | --- | --- |
| **US-13.1 — Upload use-case data** | **Partly implemented** | **Required name/partner/use-case fields:** native filename used as name; optional partners selectable, but no editable dataset name/use-case-specific required inputs. **Common formats/PDF:** binary file upload with no MIME restriction by default, so PDF is accepted; configurable size/type checks exist. **Actionable errors:** oversized/unsupported-file alerts and failure feedback implemented. Full publish/share delivery has the integration gaps above. |
| **US-13.2 — Schema and metadata** | **Partly implemented** | **Description/purpose/legal basis/policies:** generated technical name/type/size and partner access policy exist; description, purpose and legal basis are not captured. **Required metadata before acceptance:** only nonempty selection/file checks; no required business-metadata schema or server-side validation for these fields. |
| **US-13.3 — Provenance, lineage and versioning** | **Partly implemented** | **Source/time/responsible user:** backend file metadata stores owner participant context and upload timestamp; remote provider DID is available. No responsible individual user and no lineage links. UI does not consistently expose true remote provenance. **Auditable previous versions:** no dataset-version chain/history API; repeated uploads create independent IDs. Redline `@Version` is optimistic locking, not document version history. JAD certificate DOWNLOAD history is separate and not integrated into this file flow. |
| **US-13.4 — Access control** | **Partly implemented** | **Per-dataset roles:** per-partner DID restrictions and generated policy/contract definition exist; role-based dataset rights do not. **Configurable partner-sharing approval:** no configurable human approval workflow. **All requests/approvals timestamped:** technical negotiations/agreements/transfers exist, but no complete role-attributed request/approval/revocation audit. Redline authorization gap also prevents a full compliance claim. |
