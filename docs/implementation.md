# Technical components

We divide the implementation into two features: (1) onboarding and (2) data provisioning.

![Component diagram](files/figs/diagrams-components-tech.png)

_Figure 1. Component diagram_

### APIs

Other APIs:
- [CFM Provider flow](https://github.com/Metaform/jad/tree/main/requests/EDC-V%20Onboarding/CFM%20-%20Provision%20Provider)
- [EDC-V Provider flow](https://github.com/Metaform/jad/tree/main/requests/EDC-V%20Onboarding/EDC-V%20Management/Prepare%20Provider%20Participant)
- [Cert use case](https://github.com/Metaform/jad/tree/main/requests/EDC-V%20Onboarding/EDC-V%20Management/Data%20Transfer/Http%20Certs/Provider)

#### Backend

The frontend application integrates into [redline](https://github.com/Metaform/redline). The base path is `/api/ui`.

| Frame                                                        | Input from backend (GET)                                                  | Output to backend (POST)                                             |
|--------------------------------------------------------------|---------------------------------------------------------------------------|----------------------------------------------------------------------|
| [1 Select dataspace](wireframes.md#select-dataspace-)        | list of dataspaces (property `name`)                                      | -                                                                    |
| [1.1 Register company](wireframes.md#register-company)       | -                                                                         | -                                                                    |
| [1.2 Enter company data](wireframes.md#enter-company-data)   | -                                                                         | -                                                                    |
| [1.3 Upload documents](wireframes.md#upload-documents)       | -                                                                         | document                                                             |
| [1.4 Accept conditions](wireframes.md#accept-conditions)     | dataspace (property `agreement`)                                          | -                                                                    |
| [1.5 Submit registration](wireframes.md#submit-registration) | -                                                                         | registration data (cf. [here](catena-x/files/registrationData.json)) |
| [2 Network overview](wireframes.md#overview)                 | registration (participant id, registration date, registration status)     | -                                                                    |
| [2.1 Dataspace details](wireframes.md#details)               | participant                                                               | -                                                                    |
| [2.2 Manage partners](wireframes.md#manage-memberships)      | dataspaceInfo (property `participants`)                                   | -                                                                    |
| [3 Home](wireframes.md#use-case-selection)                   | -                                                                         | -                                                                    |
| [4 Files overview](wireframes.md#view-files)                 | list of files                                                             | -                                                                    |
| [4.1 Upload file](wireframes.md#add-file)                    | -                                                                         | -                                                                    |
| [4.2 Select file](wireframes.md#select-file)                 | -                                                                         | document                                                             |
| [4.3 Add details](wireframes.md#add-details)                 | -                                                                         | -                                                                    |
| [4.4 Manage access](wireframes.md#manage-access)             | dataspaceInfo (property `participant.name`)                               | -                                                                    |
| [4.5 Upload file](wireframes.md#upload-file)                 | -                                                                         | file data (cf. [here](files/fileData.json))                          |
| [4.6 File details](wireframes.md#view-file-details)          | file, agreement, _(optional: selected negotiation & transfer properties)_ | -                                                                    |
| [4.7 Discover data](wireframes.md#discover-data-optional)    | list of assets                                                            | -                                                                    |

_Table 2. Backend endpoints for GUI interactions_

#### Mapping

The backend must map user input into backend requests (to CFM and EDC-V). The frontend does not trigger the JAD requests.

- registration data must be mapped to CFM requests
- file upload data must be mapped to EDC-V requests

## Persistence

Required repositories for persistency, partly provided by the JAD database server (see [here](https://github.com/Metaform/jad?tab=readme-ov-file#components)).

| Repository            | Component                                    |
|-----------------------|----------------------------------------------|
| tenant                | backend, CFM database                        |
| credential            | IdentityHub database, IssuerService database |
| asset                 | control plane database                       |
| policy definition     | control plane database                       |
| contract definition   | control plane database                       |
| vault data            | Hashicorp Vault                              |
| certificate file      | CFM database (?)                             |
| participant           | backend                                      |
| dataspace             | backend                                      |

_Table 3. Repository for End-User API backend_

## Interactions

### Onboarding

After entering the company data and requesting access to the dataspace, the participant is technically onboarded.

See [CFM interactions](https://github.com/Metaform/jad?tab=readme-ov-file#5-prepare-the-data-space).

### Data Provisioning

This use case implements the [pull sequence](use-case.md#pull). The SME acts as the data provider and another party acts as the data consumer, that downloads the provided certificate data. Figure 1 depicts a high-level interaction flow.

![Pull sequence](files/figs/diagrams-scenario-pull-detail.png)

_Figure 2. Representative pull sequence_

| # | What                                           | Who            |
|---|------------------------------------------------|----------------|
| 1 | Prepare & publish data offering                | Provider (SME) |
| 2 | Establish connection _(negotiate agreement)_   | Consumer       |
| 3 | Approve access request _(negotiate agreement)_ | Provider (SME) |
| 4 | Download certificate data                      | Consumer       |

_Table 4. Steps for providing certificate data. Step 3 is not part of the demonstrator._

See [EDC-V interactions](https://github.com/Metaform/jad?tab=readme-ov-file#seeding-the-provider).