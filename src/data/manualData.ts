export interface FieldDefinition {
  name: string
  requirement: 'Required' | 'Optional'
  dataType?: string
  description: string
}

export interface StepItem {
  number: number
  title: string
  description: string
  image?: string
  alt?: string
  caption?: string
  highlights?: string[]
}

export interface CalloutItem {
  type: 'info' | 'warning' | 'success' | 'tip'
  title: string
  text: string
}

export interface ScreenshotGalleryItem {
  src: string
  label: string
  caption?: string
  description?: string
  features?: string[]
}

export interface ScreenshotInfo {
  src?: string
  caption: string
  alt: string
  viewTitle: string
  mockupType: 'table' | 'form' | 'split-permissions' | 'matrix'
  gallery?: ScreenshotGalleryItem[]
}

export interface ModuleDoc {
  id: string
  num: number
  title: string
  route: string
  menuPath?: string
  permissions: string[]
  authorizedRoles?: string[]
  category: 'Account & Access' | 'Organizational Setup'
  icon: string
  description: string
  overview: string
  steps?: StepItem[]
  fields?: FieldDefinition[]
  callout?: CalloutItem
  screenshot?: ScreenshotInfo
  additionalTable?: {
    title: string
    headers: string[]
    rows: { col1: string; col2: string; col3: string }[]
  }
}

export interface IntroSection {
  title: string
  description: string
  points: { icon: string; title: string; text: string }[]
}

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

export const MANUAL_MODULES: ModuleDoc[] = [
  {
    id: 'mod-user',
    num: 1,
    title: 'User Management',
    route: '/user',
    permissions: ['user.read', 'user.create', 'user.update'],
    category: 'Account & Access',
    icon: 'mdi-account-cog',
    description: 'Handbook guide for creating and maintaining employee and administrator login accounts, roles, and access statuses.',
    overview: 'The User Management module allows HR administrators to create and maintain system login accounts for personnel across all corporate entities. From this central hub, HR staff can search employee accounts, filter users by Entity, Branch, or Department, toggle between visual card and compact List Views, issue new credentials, assign user access roles, and manage active/inactive statuses.',
    steps: [
      {
        number: 1,
        title: 'Filter & Search the User Directory (Grid View)',
        description: 'Navigate to Admin > Settings > User. The User Directory loads all registered accounts in Grid View as visual cards. Each card clearly displays the employee’s profile photo, full name, @username, email, parent Entity, Branch, Department, Division, and role badge (e.g., Super Administrator, Director, Employee). Use the Entity, Branch, and Department dropdown filters in the top toolbar to isolate accounts by unit, or type into the search bar to locate specific staff immediately.',
        image: '/screenshots/User/1-roster.png',
        caption: 'User Directory Grid View showing employee cards, role pills, and organization filter bar.',
        highlights: ['Entity, Branch, and Department filters', 'Instant search by name, username, or email', 'Role pill & organization indicators', 'Grid vs List view toggle', '3-Dots action menu per card'],
      },
      {
        number: 2,
        title: 'Switch to High-Volume Tabular Roster (List View)',
        description: 'For bulk administrative reviews and cross-department audits, click the List View toggle icon on the right toolbar. The display transitions into a structured table detailing Name, Username, Corporate Email, Entity, Branch, Department, Division, User Type, and Status chips. Use the pagination bar at the bottom to configure display limits (e.g., 10, 25, 50, or All entries).',
        image: '/screenshots/User/2-add-modal.png',
        caption: 'User List View providing full column visibility for administrative privilege audits.',
        highlights: ['Compact tabular layout for bulk auditing', 'Direct visibility of Department & Division', 'Quick status indicators', 'Row action menu for View/Edit/Delete', 'Bottom pagination controls'],
      },
      {
        number: 3,
        title: 'Create a New User Account (CRUD: Create)',
        description: 'Click the "+ Create" button in the upper-right toolbar to open the Create User dialog. Enter the employee’s unique Username (max 45 characters, no spaces), First Name, optional Middle Name, and Last Name. Enter their official corporate Email address for system alerts and password resets. Choose their operational User Type (Role) from the dropdown list to set baseline permissions. Click "Upload photo" to attach an optional avatar portrait (PNG, JPG, WebP), then click "Save".',
        image: '/screenshots/User/3-form-fields.png',
        caption: 'Create User dialog for entering credentials, uploading avatar portraits, and assigning roles.',
        highlights: ['Upload profile photo (PNG, JPG, WebP)', 'Unique Username validation', 'First, Middle, and Last Name inputs', 'Corporate Email validation', 'User Type role assignment dropdown', 'Save & Cancel buttons'],
      },
      {
        number: 4,
        title: 'View User Profile & Information (CRUD: Read)',
        description: 'Click on any user card or select "View" from the 3-dots action menu to open the read-only User Information modal. This dialog presents the user’s account status (Active/Inactive), User Type role pill, uploaded portrait, full name with @username handle, and official email address. Authorized administrators can click "Edit" to modify credentials or "Delete" to remove the account.',
        image: '/screenshots/User/4-edit-dialog.png',
        caption: 'User Information profile dialog showing verified credentials and direct action shortcuts.',
        highlights: ['Read-only credential verification', 'Active / Inactive status badge', 'User Type role pill', 'Direct shortcut to Edit dialog', 'Protected Delete button'],
      },
      {
        number: 5,
        title: 'Edit Credentials & Deactivate Resigned Accounts (CRUD: Update)',
        description: 'Choose "Edit" from the action menu or from the View modal. You can update the employee’s name, email, re-assign their User Type role, or replace their avatar. When an employee departs, resigns, or is placed on leave, change the "Status" dropdown from Active to "Inactive". Setting an account to Inactive revokes login privileges immediately while safeguarding all past approvals, biometric logs, and historical audit trails.',
        image: '/screenshots/User/5-status.png',
        caption: 'Edit User dialog with Status selector for managing account activation and deactivation.',
        highlights: ['Update personal info and email', 'Re-assign User Type role', 'Active / Inactive status toggle', 'Replace or remove avatar photo', 'Preserves audit logs upon deactivation'],
      },
    ],
    callout: {
      type: 'warning',
      title: 'HR Administrative Rule: Deactivate, Never Delete',
      text: 'When an employee departs, resigns, or goes on extended leave, always set their status to "Inactive". Never delete user accounts that have performed approvals, generated time logs, or submitted official requests, as deleting breaks historical compliance and audit trails.',
    },
  },
  {
    id: 'mod-entity',
    num: 2,
    title: 'Entity Management',
    route: '/Entity',
    permissions: ['entity.read', 'entity.create', 'entity.update'],
    category: 'Organizational Setup',
    icon: 'mdi-domain',
    description: 'Handbook guide for registering corporate companies, subsidiaries, and corporate umbrellas that establish organizational boundaries.',
    overview: 'An Entity represents a registered company, corporate subsidiary, or independent enterprise unit within the organization (e.g., Head Office, Retail Division, Logistics Corporation). In GGC HRIS, all branches, departments, employees, and payroll calculations are scoped to their respective Entity. Setting up entities correctly is the foundational first step before branches or departments can be created.',
    steps: [
      {
        number: 1,
        title: 'Browse & Search Registered Entities (Grid View)',
        description: 'Navigate to Admin > Settings > Entity. The Entity Directory displays all registered corporate companies and subsidiaries as visual cards (e.g., Head Office, Damayan, Goodlife Plans Inc., Goodlife Chapel). Each card highlights the company emblem, registered business title, physical address summary, total employee headcount count (members count), official acronym code (e.g., GLPI, GL-COOP), and Active status chip. Use the search bar to locate an entity quickly.',
        image: '/screenshots/Entity/1-list.png',
        caption: 'Entity Directory Grid View showing corporate cards, company emblems, and employee headcounts.',
        highlights: ['Instant search by company name or code', 'Company cards with emblems and acronyms', 'Real-time employee headcount badge', 'Grid / List view toggle', '3-Dots action menu per card'],
      },
      {
        number: 2,
        title: 'Switch to Tabular Inventory (List View)',
        description: 'Click the List View toggle icon on the toolbar to view entities in a structured table. Columns detail Logo icon, Entity Name, Acronym Code, Full Address, Postal Code, and Active Status badge. This view provides a concise overview of the entire corporate umbrella and registered office locations across the enterprise.',
        image: '/screenshots/Entity/4-edit.png',
        caption: 'Entity List View displaying acronym codes, full registered addresses, and postal codes.',
        highlights: ['High-density list of all subsidiaries', 'Postal code & full address visibility', 'Standardized acronym code column', 'Actions trigger on each row', 'Items per page pagination'],
      },
      {
        number: 3,
        title: 'Register a New Corporate Entity (CRUD: Create)',
        description: 'Click the "+ Create" button on the toolbar to open the Create Entity Information dialog. Click "Upload logo" to attach the official company emblem (PNG, JPG, SVG). Enter the registered Entity Name (e.g., "Goodlife Plans Inc.") and an Entity Code acronym (e.g., "GL-PLANS"). In the Address Information section, select the Province first—the City/Municipality and Barangay dropdowns will automatically filter to match. Enter the optional Street details and required Postal Code, then click "Save".',
        image: '/screenshots/Entity/5-status.png',
        caption: 'Create Entity dialog with corporate logo upload and cascading Philippine address hierarchy.',
        highlights: ['Company logo upload (PNG, JPG, SVG)', 'Required Entity Name and Entity Code', 'Cascading Philippine address selector (Province > City > Barangay)', 'Street and Postal Code inputs', 'Save & Cancel buttons'],
      },
      {
        number: 4,
        title: 'View Entity Profile & Assigned Headcount (CRUD: Read)',
        description: 'Click on an entity card or choose "View" from the action menu to open the Entity Information profile. This modal displays the entity emblem, registered name, standardized code, Active status chip, total employee headcount currently assigned (Total Employees), full registered address, and postal code. Includes direct action buttons for "Edit" and "Delete".',
        image: '/screenshots/Entity/2-create.png',
        caption: 'Entity Information modal displaying active status, total employee headcount, and postal address.',
        highlights: ['Detailed view of registered entity', 'Total employee headcount badge', 'Complete registered street address', 'Postal code display', 'Direct triggers to Edit or Delete'],
      },
      {
        number: 5,
        title: 'Edit Entity Details & Archive Status (CRUD: Update)',
        description: 'Select "Edit" to modify corporate information. HR administrators can update the company name or acronym, upload a refreshed corporate logo, and adjust physical address information. If a subsidiary ceases business operations, change the Status dropdown from Active to "Inactive". Setting an entity to Inactive archives it and prevents new branches from being registered under it.',
        image: '/screenshots/Entity/3-details.png',
        caption: 'Edit Entity modal for updating business names, corporate logos, address details, and active status.',
        highlights: ['Modify registered entity title & code', 'Replace or remove corporate logo', 'Update cascading address details', 'Status selector (Active / Inactive)', 'Save updates with confirmation'],
      },
    ],
    callout: {
      type: 'tip',
      title: 'Parent-First Foundation Rule',
      text: 'Corporate Entities serve as the umbrella for the entire HRIS hierarchy. You must register an Entity before you can add branches, departments, or assign new employees to that corporate division.',
    },
  },
  {
    id: 'mod-branch',
    num: 3,
    title: 'Branch Management',
    route: '/branch',
    permissions: ['branch.read', 'branch.create', 'branch.update'],
    category: 'Organizational Setup',
    icon: 'mdi-storefront-outline',
    description: 'Handbook guide for establishing physical branches, retail stores, and warehouses mapped to corporate entities and statutory wage regions.',
    overview: 'Branches represent the physical operational work sites—such as head offices, regional branches, retail stores, and warehouses—where employees report daily. Each branch is tied to a parent Entity and mapped to a specific Philippine Region. Regional mapping is crucial for HR operations because it determines statutory minimum wage compliance, regional holiday calendars, and DOLE reporting.',
    steps: [
      {
        number: 1,
        title: 'Browse & Filter Branches by Parent Entity (Grid View)',
        description: 'Navigate to Admin > Settings > Branch. Physical branches, stores, and warehouses appear as location cards showing branch initials, facility name (e.g., Bansalan Branch, Digos Branch), municipality/province snippet, active employee headcount badge (e.g., 70 Employees), operational tenure, and an action menu. Use the "Entity" filter dropdown in the top toolbar to isolate branches owned by a specific corporate company.',
        image: '/screenshots/Branch/1-list.png',
        caption: 'Branch Directory Grid View showing physical facilities, employee headcounts, and Entity filter.',
        highlights: ['Parent Entity dropdown filter', 'Instant search by branch name or city', 'Employee headcount badge per branch', 'Grid / List view toggle', '3-Dots action menu per card'],
      },
      {
        number: 2,
        title: 'Switch to Structured Contact Directory (List View)',
        description: 'Click the List View toggle to view branches in a structured table. Columns clearly display Branch Name, formatted Contact Hotline, official Email Address, physical Location Address, and action menus. This format is ideal for administrative directory printouts and emergency contact lookups.',
        image: '/screenshots/Branch/4-details.png',
        caption: 'Branch List View providing complete contact telephone hotlines, emails, and physical addresses.',
        highlights: ['Comprehensive contact list (Phone & Email)', 'Full physical address column', 'Tabular overview for operations', 'Row-based actions menu', 'Pagination controls'],
      },
      {
        number: 3,
        title: 'Register a New Branch Location (CRUD: Create)',
        description: 'Click the "+ Create" button on the toolbar to open the Create Branch Information dialog. Select the parent Entity legally owning the site, and choose the administrative Region (e.g., Eastern Visayas, NCR). Enter the official Branch Name (e.g., "Cebu Regional Branch"). Type the branch contact number (which automatically formats into standard Philippine mobile syntax 09XX-XXX-XXXX) and official branch email. Complete the cascading location fields (Province, City/Municipality, Barangay, Street, and Postal Code), then click "Save".',
        image: '/screenshots/Branch/5-edit.png',
        caption: 'Create Branch dialog with parent Entity selection, statutory Region picker, and contact inputs.',
        highlights: ['Parent Entity selection dropdown', 'Statutory Region selector (NWPC wage mapping)', 'Auto-formatting contact phone input', 'Official branch email field', 'Cascading Philippine address inputs', 'Postal code validation'],
      },
      {
        number: 4,
        title: 'View Branch Profile & Wage Region (CRUD: Read)',
        description: 'Click on a branch card or select "View" to inspect the Branch Information profile. Displays the Branch Name, parent Entity (e.g., HEAD OFFICE), statutory Region (e.g., REGION VIII - EASTERN VISAYAS), total assigned employees headcount, full physical address, postal code, formatted contact number, and Active status badge. Includes buttons to "Edit" or "Delete".',
        image: '/screenshots/Branch/2-create.png',
        caption: 'Branch Information profile showing parent entity link, wage region, staff count, and hotline.',
        highlights: ['Verification of parent company link', 'Statutory wage region display', 'Total employee headcount badge', 'Direct contact telephone & postal code', 'Buttons to Edit or Delete branch'],
      },
      {
        number: 5,
        title: 'Edit Branch Contact Info & Operating Status (CRUD: Update)',
        description: 'Select "Edit" to modify branch information. HR administrators can update telephone contacts or email addresses, adjust physical site address details, or re-assign wage regions. If a branch temporarily closes for renovations or ceases operations, toggle the Status dropdown from Active to "Inactive". Inactive branches are archived and hidden from active employee dispatch.',
        image: '/screenshots/Branch/3-dropdown.png',
        caption: 'Edit Branch dialog for updating phone hotlines, email addresses, and active operational status.',
        highlights: ['Update branch phone & email contacts', 'Adjust statutory wage region', 'Update cascading physical address', 'Toggle operational Status (Active / Inactive)', 'Save updates with confirmation dialog'],
      },
    ],
    callout: {
      type: 'info',
      title: 'Why Region Mapping Matters for HR',
      text: 'In the Philippines, statutory minimum wage rates and special local non-working holidays are established per region by the National Wages and Productivity Commission (NWPC). Correctly setting a branch\'s Region guarantees compliant payroll calculations.',
    },
  },
  {
    id: 'mod-departments',
    num: 4,
    title: 'Department Management',
    route: '/departments',
    permissions: ['department.read', 'department.create'],
    category: 'Organizational Setup',
    icon: 'mdi-account-group-outline',
    description: 'Group operations into functional departments such as Accounting, HR, Sales, and IT.',
    overview: 'Departments establish organizational accountability, cost center allocation, and manager supervision pipelines.',
    fields: [
      { name: 'Department Name', requirement: 'Required', dataType: 'String', description: 'Descriptive title of the department.' },
      { name: 'Department Code', requirement: 'Required', dataType: 'String', description: 'Abbreviated identifier (e.g., HRD, ITD, FIN).' },
      { name: 'Status', requirement: 'Required', dataType: 'Dropdown', description: 'Active / Inactive toggle.' },
    ],
    screenshot: {
      caption: 'Department Management registry displaying organizational functional units and active cost centers.',
      alt: 'Department Management Interface Preview',
      viewTitle: 'Departments Directory View',
      mockupType: 'table',
    },
  },
  {
    id: 'mod-division',
    num: 5,
    title: 'Division Management',
    route: '/divisions',
    permissions: ['division.read', 'division.create'],
    category: 'Organizational Setup',
    icon: 'mdi-sitemap-outline',
    description: 'Sub-unit divisions that categorize specialized units within a Department.',
    overview: 'Divisions allow deeper grouping inside large departments (e.g., Recruitment & Staffing, Employee Relations under HR).',
    fields: [
      { name: 'Division Name', requirement: 'Required', dataType: 'String', description: 'Title of the division (e.g., Recruitment & Staffing, Payroll Services).' },
      { name: 'Department', requirement: 'Required', dataType: 'Dropdown', description: 'Parent Department dropdown selector.' },
    ],
    screenshot: {
      caption: 'Division Management view showcasing operational sub-teams mapped to parent departments.',
      alt: 'Division Management Interface Preview',
      viewTitle: 'Division Sub-unit Setup',
      mockupType: 'table',
    },
  },
  {
    id: 'mod-position',
    num: 6,
    title: 'Position Management',
    route: '/position',
    permissions: ['position.read', 'position.create'],
    category: 'Organizational Setup',
    icon: 'mdi-podium-gold',
    description: 'Organizational positions representing ranks (e.g., Executive, Manager, Officer, Associate).',
    overview: 'Positions govern rank hierarchies and determine approval matrices for leaves, travel orders, and requisitions.',
    fields: [
      { name: 'Position Name', requirement: 'Required', dataType: 'String', description: 'Title of the position rank.' },
      { name: 'Position Level', requirement: 'Optional', dataType: 'Integer', description: 'Rank level used for hierarchical approval workflows and travel order limits.' },
    ],
    screenshot: {
      caption: 'Position Management view documenting organizational seniority levels and approval rank levels.',
      alt: 'Position Management Interface Preview',
      viewTitle: 'Position Rank Hierarchy',
      mockupType: 'table',
    },
  },
  {
    id: 'mod-job-title',
    num: 7,
    title: 'Job Title Management',
    route: '/job-title',
    permissions: ['jobtitle.read', 'jobtitle.create'],
    category: 'Organizational Setup',
    icon: 'mdi-badge-account-horizontal-outline',
    description: 'Specific job designation assigned to employees in contracts and official records.',
    overview: 'Job titles define specific functional roles and responsibilities mapped to standard positions.',
    fields: [
      { name: 'Job Title', requirement: 'Required', dataType: 'String', description: 'Designation (e.g., Senior Fullstack Developer, HR Officer).' },
      { name: 'Position Rank', requirement: 'Required', dataType: 'Dropdown', description: 'Link to the corresponding Position.' },
      { name: 'Description', requirement: 'Optional', dataType: 'Text', description: 'Summary of duties and responsibilities.' },
    ],
    screenshot: {
      caption: 'Job Title Management directory establishing contracted titles linked to organizational position ranks.',
      alt: 'Job Title Management Interface Preview',
      viewTitle: 'Job Title Catalog',
      mockupType: 'table',
    },
  },
  {
    id: 'mod-user-access',
    num: 8,
    title: 'User Access (Direct Permissions)',
    route: '/Permissions/UserAccess',
    permissions: ['permission.view', 'permission.create'],
    category: 'Account & Access',
    icon: 'mdi-shield-account-outline',
    description: 'Assign specific, individualized capabilities directly to a user account, augmenting their general Role.',
    overview: 'The interface is organized in a two-column layout: Left Panel (searchable user roster with permission badge counts) and Right Panel (permission categories such as Employee, Attendance, Payables, Organization for the active user).',
    steps: [
      {
        number: 1,
        title: 'Select User',
        description: 'Search for the user using the search box on the left panel and click their name to load their permission profile.',
      },
      {
        number: 2,
        title: 'Click "Manage"',
        description: 'Click the Manage button in the right panel header to open the permission assignment dialog.',
      },
      {
        number: 3,
        title: 'Toggle Capabilities',
        description: 'Tick or untick specific permissions (e.g., employee.read, employee.create) and click Save Changes.',
      },
    ],
    screenshot: {
      caption: 'Two-column User Access screen: Left roster of users with direct badge counters; Right panel category tree with permission switches.',
      alt: 'User Access Direct Permissions Preview',
      viewTitle: 'Direct User Permission Override Workspace',
      mockupType: 'split-permissions',
    },
    callout: {
      type: 'tip',
      title: 'Best Practice',
      text: 'Use Role Permissions (Module 9) for general staff access. Only use Direct User Access for unique exceptions (e.g., granting a department head one specific extra approval capability).',
    },
  },
  {
    id: 'mod-role-permissions',
    num: 9,
    title: 'Role Permissions Matrix',
    route: '/permissions',
    permissions: ['permission.read', 'permission.create'],
    category: 'Account & Access',
    icon: 'mdi-matrix',
    description: 'Configure the capability matrix assigned to each User Type across all system modules.',
    overview: 'This master matrix defines what each User Type (Role) can see and perform in the system. Changes applied to a User Type immediately take effect for all users assigned that type upon their next session token refresh.',
    screenshot: {
      caption: 'Role Permissions Matrix showing capability matrices per User Type with toggle switches across module domains.',
      alt: 'Role Permissions Matrix Preview',
      viewTitle: 'Master Role Permission Matrix',
      mockupType: 'matrix',
    },
    additionalTable: {
      title: 'Standard Permission Groups',
      headers: ['Module Group', 'Capability Keys', 'Scope Description'],
      rows: [
        {
          col1: 'Employee',
          col2: 'employee.read, employee.create, employee.update, employee.delete',
          col3: 'Controls viewing and modifying employee master records and 201 files.',
        },
        {
          col1: 'Attendance',
          col2: 'attendance.read, attendance.create, attendance.update',
          col3: 'Access to daily, per-employee, and overall biometric attendance logs.',
        },
        {
          col1: 'Payables & Allowance',
          col2: 'employee-payables.read, employee-allowance.read',
          col3: 'Access to employee deductions, loans, and payable amortizations.',
        },
        {
          col1: 'Admin Settings',
          col2: 'user.read, permission.read, entity.read',
          col3: 'Restricted access to the system configuration modules documented here.',
        },
      ],
    },
    callout: {
      type: 'warning',
      title: 'Warning: Super Admin Protection',
      text: 'Never remove permission.read or permission.create from the primary Super Admin user type to prevent administrative lockout.',
    },
  },
]
