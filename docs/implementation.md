# Implementation

We divide the implementation into two features: (1) onboarding and (2) data provisioning.

## Component Interactions

### Onboarding

### Data Provisioning

This use case implements the [pull sequence](use-case.md#pull). The SME acts as the data provider and another party acts as the data consumer, that downloads the provided certificate data. Figure 1 depicts a high-level technical flow.

![Pull sequence](files/figs/diagrams-scenario-pull-detail.png)

_Figure 1. Technical pull sequence_

| # | What                                           | Who            |
|---|------------------------------------------------|----------------|
| 1 | Prepare & publish data offering                | Provider (SME) |
| 2 | Establish connection _(negotiate agreement)_   | Consumer       |
| 3 | Approve access request _(negotiate agreement)_ | Provider (SME) |
| 4 | Download certificate data                      | Consumer       |

_Table 1. Steps for providing certificate data. Step 3 is not part of this demonstrator._

## APIs

### Consumed Endpoints

As part of the demonstrator, the End-User API integrates into the [JAD](https://github.com/Metaform/jad) that deploys a multi-tenant EDC.

#### Onboarding API

[//]: # (API of MSP for onboarding ?)

#### Connector API

The JAD provides an API for [certificate sharing via HTTP](https://github.com/Metaform/jad?tab=readme-ov-file#certificates-sharing-via-http). The End-User API implements the provider API.

| # | Steps                      | Endpoint                                                                         |
|---|----------------------------|----------------------------------------------------------------------------------|
| 1 | Upload certificate         | {{baseURL}}/app/internal/api/control/certs                                       |
| 2 | Create asset               | {{baseURL}}/cp/api/mgmt/v4alpha/participants/{{provider_id}}/assets              |
| 3 | Create policy definition   | {{baseURL}}/cp/api/mgmt/v4alpha/participants/{{provider_id}}/policydefinitions   |
| 4 | Create contract definition | {{baseURL}}/cp/api/mgmt/v4alpha/participants/{{provider_id}}/contractdefinitions |

_Table 2. Endpoints for certificate management with JAD_

Other endpoints that are implemented:

- `{{baseURL}}/app/internal/api/control/certs/request` for querying uploaded certificate data

[//]: # (Creation of participant profile / credential?)
[//]: # (Initiation of data plane?)

### Provided Endpoints

#### Notification

The application must be notified about onboarding status updates. A push approach provides the following advantages: lower bandwidth consumption, real-time user experience / responsiveness, scalability and resource-efficiency. Therefore, the application implements the following endpoint:

POST `/api/notifications`

Request body:
```json
{
  "@type": "OnboardingProcess",
  "dataspaceId": {{DATASPACE_ID}},
  "status": {{STATUS}}
}
```
Schema:

```json        
{
  "$schema": "http://json-schema.org/draft/2019-09/schema",
  "$id": "https://example.com/schemas/onboarding-process.json",
  "title": "OnboardingProcess",
  "type": "object",
  "properties": {
    "@type": {
      "type": "string",
      "const": "OnboardingProcess"
    },
    "dataspaceId": {
      "type": "string"
    },
    "status": {
      "type": "string",
      "enum": ["APPROVED", "DECLINED"]
    }
  },
  "required": ["@type", "dataspaceId", "status"],
  "additionalProperties": false
}
```

[//]: # (The dataspace registration steps that require manual checks and approvals are mocked for the on-stage demo.)
