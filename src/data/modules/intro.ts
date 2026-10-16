export const INTRO_CONTENT = {
  title: 'Introduction & System Administration Guide',
  subtitle: 'Executive Setup Hierarchy, Security Governance, and Operational Guidelines for GGC HRIS',
  version: '2.0 (Vuetify Edition)',
  targetAudience: [
    {
      role: 'System & IT Administrators',
      icon: 'mdi-shield-crown-outline',
      description: 'Responsible for security configuration, user provisioning, role permission matrix setup, and system audit trails.',
    },
    {
      role: 'HR Directors & Managers',
      icon: 'mdi-account-tie',
      description: 'Responsible for defining organizational structure, departments, branch scopes, and position hierarchy.',
    },
    {
      role: 'Compliance & Audit Officers',
      icon: 'mdi-file-document-check-outline',
      description: 'Review access privileges, segregation of duties, and inactive employee credential policies.',
    },
  ],
  hierarchyFlow: [
    { step: 1, name: 'Entity', icon: 'mdi-domain', desc: 'Top-level corporate registered company or subsidiary.' },
    { step: 2, name: 'Branch', icon: 'mdi-storefront-outline', desc: 'Physical office, store, or warehouse site tied to an Entity.' },
    { step: 3, name: 'Department', icon: 'mdi-account-group-outline', desc: 'Functional unit (e.g., HR, IT, Finance, Operations).' },
    { step: 4, name: 'Division', icon: 'mdi-sitemap-outline', desc: 'Specialized sub-team operating inside a Department.' },
    { step: 5, name: 'Position', icon: 'mdi-podium-gold', desc: 'Rank classification governing approval thresholds.' },
    { step: 6, name: 'Job Title', icon: 'mdi-badge-account-horizontal-outline', desc: 'Contractual job designation assigned to employees.' },
    { step: 7, name: 'Role Permissions', icon: 'mdi-matrix', desc: 'Capability matrix attached to User Types across system views.' },
    { step: 8, name: 'User Management', icon: 'mdi-account-cog', desc: 'Individual login accounts assigned to a Role.' },
  ],
  corePrinciples: [
    {
      title: 'Parent-First Configuration Rule',
      icon: 'mdi-file-tree',
      text: 'Every organizational tier depends on its parent entity. Attempting to create a Branch before an Entity or a Division before a Department will stall system provisioning.',
    },
    {
      title: 'Principle of Least Privilege',
      icon: 'mdi-shield-lock-outline',
      text: 'Users should be assigned the baseline Role Permissions matching their job function. Avoid granting direct Super Admin access when department-scoped permissions suffice.',
    },
    {
      title: 'Deactivate Rather than Delete',
      icon: 'mdi-account-cancel-outline',
      text: 'When employees depart or contractors complete assignments, change their account status to Inactive. Never delete accounts that have approved requests, audit stamps, or biometric logs.',
    },
    {
      title: 'Role-Based vs. Direct User Override',
      icon: 'mdi-tune-vertical',
      text: 'Use Role Permissions Matrix (Module 9) for standard access. Use User Access Direct Permissions (Module 8) only for unique exceptional capabilities granted to specific individuals.',
    },
  ],
  preflightChecklist: [
    { number: 1, title: 'Register Legal Entity', detail: 'Create the primary enterprise entity and any regional subsidiaries.' },
    { number: 2, title: 'Provision Physical Branches', detail: 'Map branch locations and biometric sync identifiers to the respective Entity.' },
    { number: 3, title: 'Define Departments & Divisions', detail: 'Establish organizational units and divisional operational sub-teams.' },
    { number: 4, title: 'Configure Ranks & Job Titles', detail: 'Create position ranks (levels) and map specific contractual job titles.' },
    { number: 5, title: 'Review Role Permissions Matrix', detail: 'Confirm capabilities for HR, Manager, Staff, and Super Admin roles.' },
    { number: 6, title: 'Issue User Credentials', detail: 'Create admin and operator accounts with assigned roles and valid email addresses.' },
  ],
}
