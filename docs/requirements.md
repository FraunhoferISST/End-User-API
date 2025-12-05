# Requirements

To develop the functionality and design of the End-User API, we need to understand which users we are targeting. To do this, we define personas and user stories.

## Personas

In small and medium-sized enterprises (SMEs), roles are often mixed (multi-hat). We define the core role into three personas: the administrator that establishes the connection to the dataspace, the data owner that provides data to business partners to comply with regulations and requirements, and the data science / analyst that uses data to perform specific tasks.

[//]: # (Who decides to join a dataspace? Who actually initiates the onboarding?)
[//]: # (Who manages assets data?)
[//]: # (Who operates on received data?)

### SME admin

The person who sets up and maintains the connection to the dataspace, manages access, and ensures governance and compliance.

| Aspect           | Details                                                                                                                                                                                                   |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Goals            | - Successfully onboard the organization to the dataspace<br>- Ensure secure, compliant, and auditable data sharing<br>- Maintain up-to-date access control and user provisioning                          |
| Responsibilities | - Create and manage dataspace connections, identities, and trust anchors<br>- Configure roles, permissions, and data access policies<br>- Monitor onboarding progress, SLA adherence, and security alerts |
| Pain points      | - Complex onboarding processes and fragmented tooling<br>- Keeping governance policies aligned with evolving regulations<br>- Maintaining an audit trail and satisfying audits                            |
| Interactions     | - Managed Service Provider (MSP), IT security, data owners                                                                                                                                                |
| Quote            | "I need an easy and auditable way to establish a technical connection to an ecosystem."                                                                                                                   |

_Table 1. Description of the persona Administrator_

### SME data owner

The person who owns the data and ensures it's shared in compliance with regulations and business policies.

| Aspect           | Details                                                                                                                                                                                                                     |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Goals            | - Make relevant data available to approved partners while protecting compliance<br>- Define data sharing conditions, quality, and governance controls<br>- Monitor data usage and ensure data remains within allowed scopes |
| Responsibilities | - Identify datasets, metadata, and access rules<br>- Approve or revoke data sharing requests; set data usage constraints (policies)<br>- Validate data quality and maintain data lineage                                    |
| Pain points      | - Fear of data misuse or non-compliance by partners<br>- Difficulty enforcing data quality and compliance<br>- Limited visibility into how data is used after sharing                                                       |
| Interactions     | - Legal, data user, partner managers                                                                                                                                                                                        |
| Quote            | "My data has value, but I must control how and with whom it's shared."                                                                                                                                                      |

_Table 2. Description of the persona Data Owner_

### SME data user

The practitioner who consumes shared data to perform analytics and generate insights (e.g., data scientist or analyst).

| Aspect           | Details                                                                                                                                                                                             |
|------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Goals            | - Access the right data quickly to deliver actionable insights<br>- Combine datasets securely while respecting compliance<br>- Produce reproducible analyses with clear data provenance             |
| Responsibilities | - Request data access, explore datasets, and perform analyses<br>- Document data sources, transformations, and quality checks<br>- Collaborate with data owners to refine data sharing requirements |
| Pain points      | - Delays obtaining data access or incomplete data governance<br>- Navigating inconsistent data schemas or missing metadata<br>- Balancing speed of analysis with compliance constraints             |
| Interactions     | - Data owners, admins                                                                                                                                                                               |
| Quote            | "I need reliable data, with clear lineage, so I can turn it into trustworthy insights."                                                                                                             |

_Table 3. Description of the persona Data Scientist_

## User Stories

The following user stories are enabled with the End-User API.

| Story                                             | Role      | Goal                                                                             | Acceptance criteria                                                                                                                                                                                                                |
|---------------------------------------------------|-----------|----------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US-11.1: Initiate registration                    | SME admin | Start the registration process for joining the dataspace so onboarding can begin | - Registration form is accessible with required fields <br> - Validation checks run on required fields and provide actionable errors <br> - Registration request is created with status "submitted" and a reference ID is returned |
| US-11.2: Consent and terms acceptance             | SME admin | Review and accept terms and condition for ecosystem participation                | - All required terms and conditions are presented <br> - User can electronically acknowledge and accept terms <br> - Acceptance is recorded with versioned document references and timestamp                                       |
| US-11.3: Configure initial contact and governance | SME admin | Provide initial governance details (data owners, primary contact, roles)         | - Primary contact and roles are defined and linked to the organization <br> - Governance rules (who can approve data sharing, who manages access) are configured <br> - Contact information is validated and stored                |
| US-11.4: Prepare for interaction with partners    | SME admin | Configure partner-related settings for post-registration interactions            | - Business partner are stored with their main information                                                                                                                                                                          |

_Table 4. User stories for US-11 (registration)_

| Story                                   | Role          | Goal                                               | Acceptance criteria                                                                                                                                                                                  |
|-----------------------------------------|---------------|----------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US-12.1: Global dataset search          | SME data user | Search across multiple data sources                | - Search box returns results from all connected sources<br> - Results show source, ecosystem, and dataset title                                                                                      |
| US-12.2: Advanced filters               | SME data user | Filter datasets by metadata                        | - Facets for source, ecosystem, use case, and ownership exist<br> - Filtering is fast and preserves state across navigations<br> - Invalid filter combinations show helpful messages                 |
| US-12.3: Dataset metadata               | SME data user | View rich metadata to assess relevance and quality | - Metadata includes dataset name, description, owner, basic stats, and access rules<br> - Metadata is up-to-date                                                                                     |
| US-12.4: Access and permission checks   | SME data user | Verify what datasets can be accessed and by whom   | - Access controls are shown for each dataset (who can request, view, or share)<br> - Request access workflow can be initiated from discovery<br> - Access changes are logged with timestamp and role |                                                                                                        |

_Table 5. User stories for US-12 (data discovery)_

| Story                                        | Role           | Goal                                                              | Acceptance criteria                                                                                                                                                                          |
|----------------------------------------------|----------------|-------------------------------------------------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| US-13.1: Upload of use case data             | SME data owner | Upload use case data for partners                                 | - Upload form accepts required fields (e.g., dataset name, partner) <br> - File upload supports common formats (PDF) <br> - Validation errors are displayed with actionable messages         |
| US-13.2: Data schema and metadata            | SME data owner | Provide consistent metadata to enable processing and compliance   | - Metadata fields include description, purpose, and legal basis (policies) <br> - Required metadata must be provided before acceptance                                                       |
| US-13.3: Provenance, lineage, and versioning | SME data owner | Track origin and changes for uploaded use case data               | - Provenance records include source partner, upload time, and responsible user <br> - Versioning enabled; previous versions remain auditable                                                 |
| US-13.4: Access control                      | SME data owner | Manage who can view, share, or request the uploaded use case data | - Access controls defined per dataset with roles <br> - Approval workflow for sharing data with partners is configurable <br> - All access requests and approvals are logged with timestamps |

_Table 6. User stories for US-13 (compliance)_