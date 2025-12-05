# Catena-X Onboarding

To become a Catena-X participant, each company (applicant) must complete a registration process. In the following, we describe the key aspects of this process according to the [CX-0006 standard](https://catenax-ev.github.io/docs/next/standards/CX-0006-RegistrationAndInitialOnboarding). Table 1 introduces the actors that may be involved in the process.

| Actor                       | Description                                                                     |
|-----------------------------|---------------------------------------------------------------------------------|
| Company                     | Wants to get onboarded to Catena-X                                              |
| Core Service Provider       | Runs core services that enable the basic functionality within the dataspace     |
| Onboarding Service Provider | Enables data providers and consumers to be registered to the Catena-X dataspace |

_Table 1. Actors and roles in the onboarding process_

## Registration Process

Table 2 lists the main steps that are conducted to onboard a company to the Catena-X ecosystem (dataspace) from the company-side. Table 3 complements the steps taken by the dataspace.

The onboarding process begins with initiation, which can be triggered by an invitation or a request. The next step involves providing the necessary company master data. After that, the user selects the appropriate company role, which may include options such as active participant, app provider, service provider, or onboarding service provider. In the fourth step, the user must agree to the terms and conditions outlined in the framework agreement. Following this, an assessment is conducted to verify conformity with the relevant standards for the selected company role. The user then needs to provide proof of identity by submitting an excerpt from the commercial register or an equivalent document. Finally, the request is submitted, and the registration process is completed. Depending on the system, many of these steps can be automated, while others may require manual verification.

| # | Step                | Description                                                                     | Type        |
|---|---------------------|---------------------------------------------------------------------------------|-------------|
| 1 | Process initiation  | Start the onboarding process via invitation or request                          | manual      |
| 2 | Company data        | Provide company master data                                                     | automatable |
| 3 | Select company role | Active participant, app provider, service provider, onboarding service provider | automatable |
| 4 | Agreement           | Agree to terms and conditions (framework agreement)                             | automatable |
| 5 | Proof of conformity | Proof of conformity with relevant standards for the selected company role       | automatable |
| 6 | Proof of identity   | Provide an excerpt from the commercial register or equivalent                   | automatable |
| 7 | Submit request      | Submit registration                                                             | automatable |

_Table 2. Company-side Catena-X registration process_

The process continues with validation, which involves checking the company's data for accuracy and completeness. After validation, a Business Partner Number (BPN) is created for the company. Next, a wallet tenant is established, and the company's credentials are securely stored. Compliance with Gaia-X requirements is ensured through specific Gaia-X flows. Finally, the company receives feedback regarding the outcome, which could be a success, rejection, or the need for revision. All steps in this process can be automated as outlined in the table.

| # | Step          | Description                                                   | Type        |
|---|---------------|---------------------------------------------------------------|-------------|
| 1 | Validation    | Company data is validated to ensure accuracy and completeness | manual      |
| 2 | BPN Creation  | Create Business Partner Number (BPN) for the company          | automatable |
| 3 | Wallet tenant | Setup a wallet tenant                                         | automatable |
| 4 | Credentials   | Persist company credentials                                   | automatable |
| 5 | Gaia-X flows  | Company compliance according to Gaia-X                        | automatable |
| 6 | Approval      | Company receives feedback (success/rejection/revision)        | automatable |

_Table 3. Dataspace-side Catena-X registration process_


## Registration API

The Registration API for onboarding a company to Catena-X is documented in the [CX-0009 standard](https://catenax-ev.github.io/docs/next/standards/CX-0009-CXRegistrationAPI).

Swagger UI: [Link to GitHub](https://eclipse-tractusx.github.io/api-hub/portal-backend/v2.6.0/registration-service/swagger-ui/#/)

### Verification of company data

The API in Table 4 is provided by the Core Service Provider.
The base path for all requests is `/api/registration`.

| # | Method | Path                                                   | Request                                                   | Response                                                  | Support   |
|---|--------|--------------------------------------------------------|-----------------------------------------------------------|-----------------------------------------------------------|-----------|
| 1 | GET    | /legalEntityAddress/{bpn}                              | n/a                                                       | [CompanyAddress](files/companyAddress.json)               | _unclear_ |
| 2 | GET    | /application/{applicationId}/companyDetailsWithAddress | n/a                                                       | [RegistrationPartyData](files/registrationPartyData.json) | MUST      |
| 3 | GET    | /company/country/{alpha2Code}/uniqueidentifiers        | n/a                                                       | [UniqueIdentifiers](files/uniqueIdentifiers.json)         | COULD     |
| 4 | POST   | /application/{applicationId}/companyDetailsWithAddress | [RegistrationPartyData](files/registrationPartyData.json) | ACK/ERROR                                                 | MUST      |

_Table 4. API endpoints for verifying company data_

### Manage company roles and consent

The API in Table 5 is provided by the Core Service Provider.
The base path for all requests is `/api/registration`.

| # | Method | Path                                                      | Request                                                                 | Response                                                        | Support |
|---|--------|-----------------------------------------------------------|-------------------------------------------------------------------------|-----------------------------------------------------------------|---------|
| 5 | GET    | /company/companyRoles                                     | n/a                                                                     | [CompanyRoles](files/companyRoles.json)                         | MUST    |
| 6 | GET    | /companyRoleAgreementData                                 | n/a                                                                     | [CompanyRoleAgreementData](files/companyRoleAgreementData.json) | MUST    |
| 7 | POST   | /application/{applicationId}/companyRoleAgreementConsents | [CompanyRoleAgreementConsents](files/companyRoleAgreementConsents.json) | ACK/ERROR                                                       | MUST    |

_Table 5. API endpoints for managing company roles and consent_

### Registration of documents

The API in Table 6 is provided by the Core Service Provider.
The base path for all requests is `/api/registration`.

| #  | Method | Path                                                                 | Request     | Response    | Support |
|----|--------|----------------------------------------------------------------------|-------------|-------------|---------|
| 8  | GET    | /application/{applicationId}/documentType/{documentTypeId}/documents | n/a         | _undefined_ | SHOULD  |
| 9  | POST   | /application/{applicationId}/documentType/{documentTypeId}/documents | _undefined_ | _undefined_ | SHOULD  |
| 10 | DELETE | /documents/{documentId}                                              | _undefined_ | _undefined_ | SHOULD  |
| 11 | GET    | /documents/{documentId}                                              | n/a         | _undefined_ | MUST    |

_Table 6. API endpoints for registering documents_

### Verification and submission of registration

The API in Table 7 is provided by the Core Service Provider.
The base path for all requests is `/api/registration`.

| #  | Method | Path                                            | Request                                         | Response  | Support     |
|----|--------|-------------------------------------------------|-------------------------------------------------|-----------|-------------|
| 12 | GET    | /application/{applicationID}/registrationData   | [RegistrationData](files/registrationData.json) | ACK/ERROR | MUST        |
| 13 | POST   | /application/{applicationID}/submitregistration | n/a                                             | ACK/ERROR | _undefined_ |

_Table 7. API endpoints for managing company roles and consent_

### Verification of application

The API in Table 8 is provided by the Core Service Provider.
The base path for all requests is `/api/administration`.

| #  | Method | Path                                                              | Request                                       | Response    | Support     |
|----|--------|-------------------------------------------------------------------|-----------------------------------------------|-------------|-------------|
| 14 | POST   | /registration/application/{applicationId}/approve                 | _undefined_                                   | _undefined_ | _unclear_   |
| 15 | POST   | /registration/application/{applicationId}/decline                 | _undefined_                                   | _undefined_ | _unclear_   |
| 16 | POST   | /registration/application/clearinghouse                           | _undefined_                                   | _undefined_ | _unclear_   |
| 17 | POST   | /registration/application/{applicationId}/retrigger-clearinghouse | _undefined_                                   | _undefined_ | _unclear_   |
| 18 | POST   | /registration/application/{applicationId}/trigger-identity-wallet | _undefined_                                   | _undefined_ | _undefined_ |
| 19 | POST   | /registration/application/{applicationId}/trigger-bpn             | _undefined_                                   | _undefined_ | _undefined_ |
| 20 | POST   | /registration/application/clearinghouse/selfDescription           | [SelfDescription](files/selfDescription.json) | _undefined_ | MUST        |

_Table 8. API endpoints for verifying applications_

### Enablement of partner network

The API in Table 9 is provided by the Core Service Provider.
The base path for all requests is `/api/administration`.

| #  | Method | Path                                             | Request                                               | Response    | Support |
|----|--------|--------------------------------------------------|-------------------------------------------------------|-------------|---------|
| 21 | POST   | /registration/Network/partnerRegistration/submit | [PartnerRegistration](files/partnerRegistration.json) | _undefined_ | MUST    |
| 22 | GET    | /RegistrationStatus/callback                     | [Callback](files/callback.json)                       | _undefined_ | MUST    |
| 23 | POST   | /RegistrationStatus/callback                     | _undefined_                                           | _undefined_ | MUST    |

_Table 9. API endpoints for enabling the partner network with the Core Service Provider_

Endpoint #21 is used by Onboarding Service Providers to initiate the registration process.
Endpoint #22 can be used by Onboarding Service Providers to manage their callback.

## Implications

Considering the registration API and processes, the following data must be provided by a user that manages the registration process of their company.
- Information about the company (processed as [RegistrationPartyData](files/registrationPartyData.json))
- Consent to the framework agreement and company role (processed as [CompanyRoleAgreementConsents](files/companyRoleAgreementConsents.json))
- User information (processed as [PartnerRegistration](files/partnerRegistration.json))
- Proof of identity (provided with endpoints 8-11, processed manually)