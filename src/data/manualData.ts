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

export interface UIFeatureControl {
  name: string
  icon?: string
  location: string
  purpose: string
  action: string
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
  uiFeatures?: UIFeatureControl[]
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
    menuPath: 'Admin Settings > User Management',
    authorizedRoles: ['HR Administrator', 'System Super Admin'],
    permissions: ['user.read', 'user.create', 'user.update'],
    category: 'Account & Access',
    icon: 'mdi-account-cog',
    description: 'Handbook guide for creating and maintaining employee and administrator login accounts, roles, and access statuses.',
    overview: 'The User Management module allows HR administrators to create and maintain system login accounts for personnel across all corporate entities. From this central hub, HR staff can search employee accounts, filter users by Entity, Branch, or Department, toggle between visual card and compact List Views, issue new credentials, assign user access roles, and manage active/inactive statuses.',
    uiFeatures: [
      {
        name: 'Instant Search Bar',
        icon: 'mdi-magnify',
        location: 'Top Toolbar (Left)',
        purpose: 'Real-time account filtering by keywords',
        action: 'Searches employee records simultaneously by Full Name, Username handle (@username), and Corporate Email.',
      },
      {
        name: 'Entity Filter Dropdown',
        icon: 'mdi-domain',
        location: 'Top Toolbar (Center)',
        purpose: 'Corporate company isolation',
        action: 'Filters the roster to show only accounts belonging to a selected legal company or corporate subsidiary.',
      },
      {
        name: 'Branch Filter Dropdown',
        icon: 'mdi-storefront-outline',
        location: 'Top Toolbar (Center)',
        purpose: 'Physical site isolation',
        action: 'Drills down into employees assigned to a specific store, regional branch, or corporate office location.',
      },
      {
        name: 'Department Filter Dropdown',
        icon: 'mdi-account-group-outline',
        location: 'Top Toolbar (Center)',
        purpose: 'Functional team isolation',
        action: 'Isolates accounts by department (e.g., Human Resources, IT, Accounting, Operations, or Logistics).',
      },
      {
        name: 'Refresh Button',
        icon: 'mdi-refresh',
        location: 'Top Toolbar (Right)',
        purpose: 'Live server data synchronization',
        action: 'Fetches the latest account statuses, active logins, and biometric records without needing to reload the entire web browser.',
      },
      {
        name: 'Grid View Toggle',
        icon: 'mdi-view-grid-outline',
        location: 'Top Toolbar (Right)',
        purpose: 'Visual photo card roster mode',
        action: 'Switches the screen into visual cards displaying employee profile portraits, status pills, and organization badges.',
      },
      {
        name: 'List View Toggle',
        icon: 'mdi-view-list-outline',
        location: 'Top Toolbar (Right)',
        purpose: 'Spreadsheet audit table mode',
        action: 'Switches into a multi-column table displaying full credential attributes for bulk administrative reviews.',
      },
      {
        name: '+ Create Button',
        icon: 'mdi-plus',
        location: 'Top Toolbar (Far Right)',
        purpose: 'User account registration',
        action: 'Opens the Create User modal dialog to input an employee\'s username, email, and operational User Type role.',
      },
      {
        name: '3-Dots Action Menu (⋮)',
        icon: 'mdi-dots-vertical',
        location: 'User Card / Table Row',
        purpose: 'Contextual operations menu',
        action: 'Expands quick actions: "View" read-only profile, "Edit" credentials, or "Delete / Deactivate" account.',
      },
      {
        name: 'Status Badge (Active / Inactive)',
        icon: 'mdi-circle-slice-8',
        location: 'Card Header / Table Column',
        purpose: 'Account authorization state indicator',
        action: 'Green badge confirms active sign-in access; Grey badge indicates an archived, resigned, or inactive employee.',
      },
      {
        name: 'Upload Photo Button',
        icon: 'mdi-camera-outline',
        location: 'Create & Edit Dialogs',
        purpose: 'Profile avatar upload',
        action: 'Attaches a portrait image (PNG, JPG, WebP) displayed on biometric terminal kiosks and system profile cards.',
      },
      {
        name: 'Status Dropdown Selector',
        icon: 'mdi-account-check-outline',
        location: 'Edit User Dialog',
        purpose: 'Account deactivation control',
        action: 'Changing status to "Inactive" immediately terminates login sessions and revokes system access while preserving historical logs.',
      },
      {
        name: 'Items Per Page & Pagination',
        icon: 'mdi-page-next-outline',
        location: 'Bottom Footer Toolbar',
        purpose: 'Roster batch configuration',
        action: 'Sets batch display size (10, 25, 50, All) and navigates backwards and forwards across multi-page employee rosters.',
      },
    ],
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
    menuPath: 'Admin Settings > Entities',
    authorizedRoles: ['System Super Admin', 'HR Director'],
    permissions: ['entity.read', 'entity.create', 'entity.update'],
    category: 'Organizational Setup',
    icon: 'mdi-domain',
    description: 'Handbook guide for registering corporate companies, subsidiaries, and corporate umbrellas that establish organizational boundaries.',
    overview: 'An Entity represents a registered company, corporate subsidiary, or independent enterprise unit within the organization (e.g., Head Office, Retail Division, Logistics Corporation). In GGC HRIS, all branches, departments, employees, and payroll calculations are scoped to their respective Entity. Setting up entities correctly is the foundational first step before branches or departments can be created.',
    uiFeatures: [
      {
        name: 'Instant Search Bar',
        icon: 'mdi-magnify',
        location: 'Top Toolbar (Left)',
        purpose: 'Corporate entity search',
        action: 'Filters the entity directory in real time by company name, registered business title, or acronym code.',
      },
      {
        name: 'Refresh Button',
        icon: 'mdi-refresh',
        location: 'Top Toolbar (Right)',
        purpose: 'Directory synchronization',
        action: 'Re-syncs registered corporate company records and live employee headcount figures directly from the database.',
      },
      {
        name: 'Grid View Toggle',
        icon: 'mdi-view-grid-outline',
        location: 'Top Toolbar (Right)',
        purpose: 'Corporate card view mode',
        action: 'Displays company visual cards highlighting corporate emblems, standardized acronyms, and real-time employee headcount badges.',
      },
      {
        name: 'List View Toggle',
        icon: 'mdi-view-list-outline',
        location: 'Top Toolbar (Right)',
        purpose: 'Tabular corporate inventory mode',
        action: 'Displays a high-density spreadsheet table with standardized acronym codes, registered addresses, and postal codes.',
      },
      {
        name: '+ Create Button',
        icon: 'mdi-plus',
        location: 'Top Toolbar (Far Right)',
        purpose: 'Corporate subsidiary registration',
        action: 'Opens the Create Entity dialog to register a new legal company, subsidiary, or regional corporate umbrella.',
      },
      {
        name: 'Upload Logo Button',
        icon: 'mdi-image-outline',
        location: 'Create & Edit Dialogs',
        purpose: 'Corporate emblem upload',
        action: 'Uploads official corporate brand emblem (PNG, JPG, SVG) rendered across branch documents, payslips, and header bars.',
      },
      {
        name: 'Cascading Address Selectors',
        icon: 'mdi-map-marker-outline',
        location: 'Entity Registration Dialog',
        purpose: 'Philippine geographic hierarchy validation',
        action: 'Selecting Province dynamically loads valid Cities/Municipalities, which then loads valid registered Barangays.',
      },
      {
        name: '3-Dots Action Menu (⋮)',
        icon: 'mdi-dots-vertical',
        location: 'Each Entity Card & Row',
        purpose: 'Contextual operations menu',
        action: 'Triggers "View" corporate profile summary, "Edit" business details and address, or "Delete / Archive" entity.',
      },
      {
        name: 'Status Selector (Active / Inactive)',
        icon: 'mdi-domain-plus',
        location: 'Edit Entity Dialog',
        purpose: 'Corporate lifecycle control',
        action: 'Setting to "Inactive" archives the company and prevents new branches, departments, or personnel from being registered under it.',
      },
    ],
    steps: [
      {
        number: 1,
        title: 'Browse & Search Registered Entities (Grid View)',
        description: 'Navigate to Admin > Settings > Entity. The Entity Directory displays all registered corporate companies and subsidiaries as visual cards (e.g., Head Office, Damayan, Goodlife Plans Inc., Goodlife Chapel). Each card highlights the company emblem, registered business title, physical address summary, official acronym code (e.g., GLPI, GL-COOP), and Active status chip. Use the search bar to locate an entity quickly.',
        image: '/screenshots/Entity/1-list.png',
        caption: 'Entity Directory Grid View showing corporate cards, company emblems, and registered addresses.',
        highlights: ['Instant search by company name or code', 'Company cards with emblems and acronyms', 'Active status indicator chip', 'Grid / List view toggle', '3-Dots action menu per card'],
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
        title: 'View Entity Profile Information (CRUD: Read)',
        description: 'Click on an entity card or choose "View" from the action menu to open the Entity Information profile. This modal displays the entity emblem, registered name, standardized code, Active status chip, full registered address, and postal code. Includes direct action buttons for "Edit" and "Delete".',
        image: '/screenshots/Entity/2-create.png',
        caption: 'Entity Information modal displaying active status, registered acronym, and postal address.',
        highlights: ['Detailed view of registered entity', 'Standardized corporate code and emblem', 'Complete registered street address', 'Postal code display', 'Direct triggers to Edit or Delete'],
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
    menuPath: 'Admin Settings > Branches',
    authorizedRoles: ['HR Administrator', 'Branch Admin'],
    permissions: ['branch.read', 'branch.create', 'branch.update'],
    category: 'Organizational Setup',
    icon: 'mdi-storefront-outline',
    description: 'Handbook guide for establishing physical branches, retail stores, and warehouses mapped to corporate entities and statutory wage regions.',
    overview: 'Branches represent the physical operational work sites—such as head offices, regional branches, retail stores, and warehouses—where employees report daily. Each branch is tied to a parent Entity and mapped to a specific Philippine Region. Regional mapping is crucial for HR operations because it determines statutory minimum wage compliance, regional holiday calendars, and DOLE reporting.',
    uiFeatures: [
      {
        name: 'Entity Filter Dropdown',
        icon: 'mdi-domain',
        location: 'Top Toolbar (Center)',
        purpose: 'Corporate umbrella filter',
        action: 'Isolates physical branches, stores, and warehouses belonging to a specific parent corporate company.',
      },
      {
        name: 'Instant Search Bar',
        icon: 'mdi-magnify',
        location: 'Top Toolbar (Left)',
        purpose: 'Location & contact search',
        action: 'Filters branches in real time by facility title, branch initials, municipality/city, or official contact phone hotline.',
      },
      {
        name: 'Refresh Button',
        icon: 'mdi-refresh',
        location: 'Top Toolbar (Right)',
        purpose: 'Terminal sync & status update',
        action: 'Re-syncs branch operational status, employee roster count, and biometric terminal connectivity timestamps.',
      },
      {
        name: 'Grid View Toggle',
        icon: 'mdi-view-grid-outline',
        location: 'Top Toolbar (Right)',
        purpose: 'Facility card mode',
        action: 'Displays location cards highlighting branch initials, municipality, and active employee headcount badges.',
      },
      {
        name: 'List View Toggle',
        icon: 'mdi-view-list-outline',
        location: 'Top Toolbar (Right)',
        purpose: 'Contact directory mode',
        action: 'Displays a complete contact telephone hotline, official branch email, and physical site street address table.',
      },
      {
        name: '+ Create Button',
        icon: 'mdi-plus',
        location: 'Top Toolbar (Far Right)',
        purpose: 'Branch provisioning',
        action: 'Opens the Create Branch dialog to register a physical store, corporate office, or regional distribution warehouse.',
      },
      {
        name: 'Statutory Region Selector',
        icon: 'mdi-map-outline',
        location: 'Branch Registration Dialog',
        purpose: 'DOLE / NWPC wage compliance',
        action: 'Maps the physical facility to its official Philippine Region to enforce statutory minimum wage rates and local holidays.',
      },
      {
        name: 'Auto-Formatting Contact Input',
        icon: 'mdi-phone-outline',
        location: 'Branch Registration Dialog',
        purpose: 'Phone syntax validation',
        action: 'Automatically formats entered digits into standardized Philippine mobile and landline syntax (09XX-XXX-XXXX).',
      },
      {
        name: 'Cascading Address Hierarchy',
        icon: 'mdi-map-marker-outline',
        location: 'Branch Registration Dialog',
        purpose: 'Location precision',
        action: 'Province > City/Municipality > Barangay cascading dropdowns prevent geographical data entry mistakes.',
      },
      {
        name: '3-Dots Action Menu (⋮)',
        icon: 'mdi-dots-vertical',
        location: 'Each Branch Card & Row',
        purpose: 'Location operations menu',
        action: 'Access "View" branch summary, "Edit" contacts/region, or "Deactivate" temporarily closed locations.',
      },
    ],
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
    menuPath: 'Admin Settings > Departments',
    authorizedRoles: ['System Super Admin', 'HR Administrator', 'Operations Director'],
    permissions: ['department.read', 'department.create', 'department.update', 'department.delete'],
    category: 'Organizational Setup',
    icon: 'mdi-account-group-outline',
    description: 'Handbook guide for establishing functional departments mapped to corporate legal entities.',
    overview: 'A Department represents a primary functional division of the organization—such as Audit, Claims, Finance, Human Resource, Information Technology, and Operations. In GGC HRIS, all departments are directly mapped to a parent Entity (e.g., Head Office), establishing clear corporate boundaries, cost center allocations, and leadership structures. Departments serve as the parent tier for operational Divisions, providing structured grouping for personnel, approval matrices, and organizational hierarchy visualization across all subsidiary companies.',
    uiFeatures: [
      {
        name: 'Instant Search Bar',
        icon: 'mdi-magnify',
        location: 'Top Toolbar (Left)',
        purpose: 'Real-time department filtering',
        action: 'Searches registered departments instantly by title (e.g., "Audit", "Finance", "Human Resource", "Information Technology").',
      },
      {
        name: 'Filter by Entity Dropdown',
        icon: 'mdi-domain',
        location: 'Top Toolbar (Center)',
        purpose: 'Corporate company isolation',
        action: 'Filters the department cards to show only departments registered under a selected corporate Entity (e.g., Head Office, Damayan).',
      },
      {
        name: 'Refresh Button',
        icon: 'mdi-refresh',
        location: 'Top Toolbar (Right)',
        purpose: 'Live server synchronization',
        action: 'Re-fetches latest department records, parent entity mappings, and live status directly from the database.',
      },
      {
        name: 'Grid View Toggle',
        icon: 'mdi-view-grid-outline',
        location: 'Top Toolbar (Right)',
        purpose: 'Visual department card mode',
        action: 'Displays visual cards featuring building avatars, department titles, parent entity subtitles, and contextual action menus.',
      },
      {
        name: 'List View Toggle',
        icon: 'mdi-view-list-outline',
        location: 'Top Toolbar (Right)',
        purpose: 'Tabular inventory mode',
        action: 'Displays high-density table view with Department Name, Entity Name, and action column for bulk administrative audits.',
      },
      {
        name: '+ Create Department Button',
        icon: 'mdi-plus-circle-outline',
        location: 'Top Toolbar (Far Right)',
        purpose: 'Department registration',
        action: 'Opens the Department creation dialog to select parent Entity and enter a new Department Name.',
      },
      {
        name: '3-Dots Action Menu (⋮ / ...)',
        icon: 'mdi-dots-horizontal',
        location: 'Department Card / Table Row',
        purpose: 'Contextual operations menu',
        action: 'Triggers contextual actions: "View" department information, "Edit" department details, or "Delete" department record.',
      },
      {
        name: 'Department Card Avatar',
        icon: 'mdi-office-building-marker-outline',
        location: 'Department Card Header',
        purpose: 'Functional visual indicator',
        action: 'Thematic building avatar icon identifying organizational cost centers and operational functional teams.',
      },
      {
        name: 'Parent Entity Subtitle',
        icon: 'mdi-domain',
        location: 'Department Card Body',
        purpose: 'Organizational parent indicator',
        action: 'Displays the parent legal company (e.g., "Head Office") owning and governing the department.',
      },
      {
        name: 'Items Per Page & Pagination',
        icon: 'mdi-page-next-outline',
        location: 'Bottom Footer Toolbar',
        purpose: 'Directory batch configuration',
        action: 'Sets batch display size (10, 25, 50, All) and navigates backwards and forwards across multi-page department rosters.',
      },
    ],
    steps: [
      {
        number: 1,
        title: 'Filter & Search the Department Directory (Grid View)',
        description: 'Navigate to Admin > Settings > Departments. The Department Directory displays registered units as clean visual cards (e.g., Audit Department, Claims Department, Finance Department, Human Resource, Information Technology). Each card highlights the department icon, department title, and parent Entity subtitle (e.g., "Head Office"). Use the "Filter by Entity" dropdown in the top toolbar to isolate departments by corporate entity, or type into the search bar to locate specific departments immediately.',
        image: '/screenshots/Departments/1-list.png',
        caption: 'Department Directory Grid View showing department cards, parent entity links, search bar, and entity filter dropdown.',
        highlights: ['Filter by Entity dropdown selector', 'Instant search bar ("search here...")', 'Department cards with parent entity labels', 'Grid vs List view toggle buttons', 'Contextual 3-dots action menu per card', '+ Create Department action button'],
      },
      {
        number: 2,
        title: 'Register a New Department (CRUD: Create)',
        description: 'Click the "+ Create Department" button in the upper-right toolbar to open the Department creation modal dialog. Select the parent Entity legally governing the department from the "Entity" dropdown menu (e.g., "Head Office"). Next, enter the official Department Name in the input field (e.g., "Quality Assurance Department"). Verify that the name is clear and standardized, then click "Save" to register the department.',
        image: '/screenshots/Departments/2-create.png',
        caption: 'Create Department dialog with parent Entity selection dropdown and Department Name text input.',
        highlights: ['Parent Entity dropdown selector', 'Department Name input field', 'Save button with automatic validation', 'Close (X) dialog button'],
      },
      {
        number: 3,
        title: 'View Department Details & Parent Mapping (CRUD: Read)',
        description: 'Click on any department card or select "View" from the 3-dots action menu (...) to open the Department Information profile dialog. This view displays the verified parent ENTITY (e.g., "Head Office") and registered DEPARTMENT NAME (e.g., "Audit Department"). Administrative users with appropriate permissions can directly click the "Edit" button to update details or the "Delete" button to remove the record.',
        image: '/screenshots/Departments/3-details.png',
        caption: 'Department Information modal showing verified parent entity link, department title, and direct Edit/Delete action triggers.',
        highlights: ['Read-only ENTITY display', 'Read-only DEPARTMENT NAME display', 'Direct "Edit" button shortcut', 'Protected "Delete" button', 'Close (X) button'],
      },
      {
        number: 4,
        title: 'Remove Department with Safety Confirmation (CRUD: Delete)',
        description: 'Click the "Delete" button from the Department Information modal or from the 3-dots card menu. A system "Confirm Action" security modal appears asking: "Are you sure you want to delete the department [Name]?". Click "Cancel" to abort the operation safely, or click "Confirm" to finalize the deletion. Note: Departments with active child divisions or assigned employees cannot be deleted until dependencies are re-assigned.',
        image: '/screenshots/Departments/4-delete-confirm.png',
        caption: 'Confirm Action security modal preventing accidental deletion of organizational functional units.',
        highlights: ['Warning security prompt ("Confirm Action")', 'Target department name verification', 'Cancel button to abort safely', 'Confirm button to execute deletion', 'Dependency integrity protection'],
      },
      {
        number: 5,
        title: 'Edit Department Name & Reassign Entity (CRUD: Update)',
        description: 'Select "Edit" from the Department Information modal or the 3-dots action menu. The Department modal opens with the current Entity (e.g., "Head Office") and Department Name (e.g., "Audit Department") pre-filled. HR administrators can modify the title or reassign the department to a different corporate subsidiary from the Entity dropdown. Click "Save" to commit the changes and refresh the directory roster.',
        image: '/screenshots/Departments/5-edit.png',
        caption: 'Edit Department dialog pre-populated with current entity assignment and department title for updates.',
        highlights: ['Pre-filled parent Entity dropdown', 'Editable Department Name input field', 'Form validation check', 'Save button to commit changes', 'Instant directory synchronization'],
      },
    ],
    fields: [
      { name: 'Entity', requirement: 'Required', dataType: 'Dropdown', description: 'Selects the parent corporate registered company (e.g., Head Office, Goodlife Plans Inc.).' },
      { name: 'Department Name', requirement: 'Required', dataType: 'String', description: 'Official descriptive title of the functional unit (e.g., Audit Department, Human Resource).' },
    ],
    screenshot: {
      caption: 'Department Management registry displaying organizational functional units and corporate entity mappings.',
      alt: 'Department Management Interface Preview',
      viewTitle: 'Departments Directory View',
      mockupType: 'table',
      gallery: [
        { src: '/screenshots/Departments/1-list.png', label: 'Directory Grid View', caption: 'Departments visual card roster with entity filter toolbar' },
        { src: '/screenshots/Departments/2-create.png', label: 'Create Department Modal', caption: 'Registration dialog with entity selector and name input' },
        { src: '/screenshots/Departments/3-details.png', label: 'Department Information', caption: 'Read-only profile showing verified parent entity and name' },
        { src: '/screenshots/Departments/4-delete-confirm.png', label: 'Delete Confirmation', caption: 'Safety prompt preventing accidental department removal' },
        { src: '/screenshots/Departments/5-edit.png', label: 'Edit Department Dialog', caption: 'Form for modifying department title and entity re-assignment' },
      ],
    },
    callout: {
      type: 'warning',
      title: 'Organizational Dependency Rule: Hierarchy Integrity',
      text: 'Before deleting or renaming a Department, ensure that all child Divisions (Module 5), employee profiles, and approval workflows mapped to this department are updated or reassigned. Deleting a parent department with active employees or pending leave requests may disrupt approval routing.',
    },
  },
  {
    id: 'mod-division',
    num: 5,
    title: 'Division Management',
    route: '/divisions',
    menuPath: 'Admin Settings > Division',
    authorizedRoles: ['System Super Admin', 'HR Administrator', 'Department Head'],
    permissions: ['division.read', 'division.create', 'division.update', 'division.delete'],
    category: 'Organizational Setup',
    icon: 'mdi-sitemap-outline',
    description: 'Handbook guide for managing operational sub-units and specialized teams nested inside parent departments.',
    overview: 'A Division represents a specialized sub-team or operational unit operating within a parent Department. For example, within the Human Resource Department, you can establish Recruitment Division, Employee Relations Division, and Learning & Development Division. Within Information Technology, you can establish IT Support Division, Technical Division, and Development Division. Setting up divisions provides granular team organization, enables departmental head delegation, and refines job placement in organizational charts.',
    uiFeatures: [
      {
        name: 'Instant Search Bar',
        icon: 'mdi-magnify',
        location: 'Top Toolbar (Left)',
        purpose: 'Division & team search',
        action: 'Filters operational sub-teams in real time by division title (e.g., "Recruitment", "IT Support", "Accounting") or parent department.',
      },
      {
        name: 'Department Filter Dropdown',
        icon: 'mdi-account-group-outline',
        location: 'Top Toolbar (Center)',
        purpose: 'Parent department filter',
        action: 'Filters the division roster to display only sub-teams belonging to a selected Department (e.g., Human Resource, Information Technology, Audit Department).',
      },
      {
        name: 'Refresh Button',
        icon: 'mdi-refresh',
        location: 'Top Toolbar (Right)',
        purpose: 'Live database synchronization',
        action: 'Re-syncs registered division records, parent department associations, and active personnel allocations directly from the server.',
      },
      {
        name: 'List View Toggle',
        icon: 'mdi-format-list-bulleted',
        location: 'Top Toolbar (Right)',
        purpose: 'Tabular sub-team audit mode',
        action: 'Switches into a multi-column table displaying Division Name, Parent Department, and Row Action menus for bulk auditing.',
      },
      {
        name: 'Grid View Toggle',
        icon: 'mdi-view-grid-outline',
        location: 'Top Toolbar (Right)',
        purpose: 'Visual division card mode (Active)',
        action: 'Displays division cards featuring team hierarchy avatars, division titles, parent department chips, and hover details.',
      },
      {
        name: '+ Create Button',
        icon: 'mdi-plus-circle-outline',
        location: 'Top Toolbar (Far Right)',
        purpose: 'Division provisioning',
        action: 'Opens the "Create Division" modal dialog to map a new operational sub-team under a selected parent department.',
      },
      {
        name: 'Hierarchy Avatar Icon',
        icon: 'mdi-source-branch',
        location: 'Division Card Header',
        purpose: 'Sub-unit visual indicator',
        action: 'Branded tree-branch icon distinguishing divisional sub-units from corporate-level entities and departments.',
      },
      {
        name: 'Card Hover / "View Details" Overlay',
        icon: 'mdi-cursor-default-click-outline',
        location: 'Division Card (On Hover)',
        purpose: 'Interactive profile preview trigger',
        action: 'Hovering over any card applies a gentle backdrop blur and presents the "View details" prompt to inspect full team attributes.',
      },
      {
        name: 'Parent Department Subtitle',
        icon: 'mdi-account-group-outline',
        location: 'Division Card Footer',
        purpose: 'Parent department mapping',
        action: 'Explicit label indicating which functional department (e.g., Finance Department, Human Resource, Audit Department) oversees this sub-unit.',
      },
      {
        name: 'Floating Quick Settings Gear',
        icon: 'mdi-cog-outline',
        location: 'Bottom Right Screen Corner',
        purpose: 'System interface preferences',
        action: 'Floating quick-access trigger to open application display configurations and administrative preferences.',
      },
    ],
    steps: [
      {
        number: 1,
        title: 'Browse & Filter Divisions by Department (Grid View)',
        description: 'Navigate to Admin > Settings > Division. The Divisions Directory loads all registered sub-units as clean visual cards (e.g., Learning & Development Division, Accounting Division, IT Support Division, Claims Investigation Division, Employee Relations Division, Technical Division, Recruitment Division, Internal Audit Division, Development Division, Compliance Division). Each card highlights the hierarchy tree icon, division title, and parent Department subtitle (e.g., Human Resource, Finance Department, Information Technology, Claims Department, Audit Department). Hovering over any card activates a focused overlay showing "View details". Use the "Department" dropdown filter in the top toolbar to isolate sub-teams under a specific department, or type into the search bar for instant keyword filtering.',
        image: '/screenshots/Divisions/1-list.png',
        caption: 'Divisions Directory Grid View showing specialized sub-teams, parent department links, "View details" hover effect, and filter toolbar.',
        highlights: ['Department filter dropdown', 'Instant search bar ("search here...")', 'Division cards with parent department labels', 'Hover "View details" trigger', 'List and Grid view toggle buttons', '+ Create division button'],
      },
      {
        number: 2,
        title: 'Register a Specialized Division (CRUD: Create)',
        description: 'Click the "+ Create" button on the top toolbar to open the "Create Division" modal dialog. Select the parent Department that oversees this team from the "Department *" dropdown menu (e.g., "Human Resource", "Information Technology", "Finance Department"). Next, enter the unique Division Name in the "Division Name *" input field (e.g., "Learning & Development Division"). Ensure both required fields marked with a red asterisk (*) are completed, then click the teal "Save" button to commit the new division to the organizational roster.',
        image: '/screenshots/Divisions/2-create.png',
        caption: 'Create Division modal dialog featuring parent Department dropdown selector and Division Name text input.',
        highlights: ['Parent Department selector dropdown ("Department *")', 'Division Name text input field ("Division Name *")', 'Mandatory asterisk (*) validation', 'Cancel button to abort safely', 'Teal "Save" button to commit creation', 'Close (X) dialog button'],
      },
      {
        number: 3,
        title: 'View Division Details & Action Hub (CRUD: Read)',
        description: 'Click on any division card (or the "View details" prompt) from the directory to open the read-only "View Division" dialog. This modal displays the verified parent Department (e.g., "Human Resource") and the official Division Name (e.g., "Learning & Development Division"). From this profile window, authorized administrators can choose between two primary actions: click the salmon "Delete" button to remove the record or click the teal "Edit" button to update its attributes.',
        image: '/screenshots/Divisions/3-details.png',
        caption: 'View Division read-only profile dialog displaying verified parent department link, division title, and direct Edit/Delete action triggers.',
        highlights: ['Read-only Department association display', 'Read-only Division Name display', 'Salmon "Delete" action button', 'Teal "Edit" action button', 'Close (X) dialog button'],
      },
      {
        number: 4,
        title: 'Remove Division with Safety Confirmation (CRUD: Delete)',
        description: 'Click the "Delete" button inside the View Division dialog. A system "Confirm Action" security dialog appears with an amber warning triangle icon and the prompt: "Please review before continuing" along with the specific question: "Are you sure you want to delete the division \"Learning & Development Division\"?". Click the slate "Cancel" button to abort the operation safely, or click the teal "Confirm" button to permanently delete the division. Note: A division cannot be removed if active employees, positions, or job titles are currently assigned to it.',
        image: '/screenshots/Divisions/4-delete-confirm.png',
        caption: 'Confirm Action security modal verifying administrator intent before permanently removing an operational division.',
        highlights: ['Warning security prompt ("Confirm Action")', 'Target division name verification ("Learning & Development Division")', 'Cancel button to abort safely', 'Confirm button to execute deletion', 'Sub-team dependency integrity check'],
      },
      {
        number: 5,
        title: 'Update Division Name & Parent Department (CRUD: Update)',
        description: 'Click the "Edit" button from the View Division dialog to open the "Update Division" modal dialog. The form automatically pre-fills with the existing Department (e.g., "Human Resource") and Division Name (e.g., "Learning & Development Division"). HR administrators can modify the title or reassign the division to another parent department from the Department dropdown. Click "Cancel" to discard any accidental changes or click the teal "Save" button to commit updates immediately.',
        image: '/screenshots/Divisions/5-edit.png',
        caption: 'Update Division dialog pre-populated with current department assignment and division title for modifications.',
        highlights: ['Pre-filled parent Department dropdown', 'Editable Division Name input field', 'Cancel button to discard changes', 'Teal "Save" button to commit updates', 'Instant roster synchronization'],
      },
    ],
    fields: [
      { name: 'Department *', requirement: 'Required', dataType: 'Dropdown (Select)', description: 'Parent Department selector governing this operational division (e.g., Human Resource, Information Technology, Finance Department). Must be pre-created in Module 4.' },
      { name: 'Division Name *', requirement: 'Required', dataType: 'Text (String)', description: 'Official descriptive title of the specialized sub-team (e.g., Learning & Development Division, IT Support Division, Compliance Division).' },
    ],
    screenshot: {
      caption: 'Division Management view showcasing operational sub-teams mapped to parent departments.',
      alt: 'Division Management Interface Preview',
      viewTitle: 'Division Sub-unit Setup',
      mockupType: 'table',
      gallery: [
        { src: '/screenshots/Divisions/1-list.png', label: 'Directory Grid View', caption: 'Visual grid displaying sub-units categorized by parent department' },
        { src: '/screenshots/Divisions/2-create.png', label: 'Create Division Modal', caption: 'Registration form with parent department selector and division name' },
        { src: '/screenshots/Divisions/3-details.png', label: 'View Division Profile', caption: 'Read-only profile modal with verified department link and action triggers' },
        { src: '/screenshots/Divisions/4-delete-confirm.png', label: 'Delete Confirmation', caption: 'Safety prompt preventing accidental sub-team removal' },
        { src: '/screenshots/Divisions/5-edit.png', label: 'Update Division Dialog', caption: 'Pre-filled dialog for modifying division title and parent department' },
      ],
    },
    callout: {
      type: 'tip',
      title: 'Sub-Unit Hierarchy Best Practice',
      text: 'Always create the parent Department (Module 4) before creating its Divisions. When onboarding new employees, selecting a Division automatically scopes their reporting lines and refines organizational chart visual trees.',
    },
  },
  {
    id: 'mod-position',
    num: 6,
    title: 'Position Management',
    route: '/position',
    menuPath: 'Admin Settings > Position',
    authorizedRoles: ['System Super Admin', 'HR Administrator', 'Compensation & Benefits Officer'],
    permissions: ['position.read', 'position.create', 'position.update', 'position.delete'],
    category: 'Organizational Setup',
    icon: 'mdi-podium-gold',
    description: 'Handbook guide for defining organizational ranks, seniority levels, and approval matrix positions.',
    overview: 'A Position represents an organizational rank classification—such as Executive, Director, Manager, Senior, Rank & File I, Rank & File II, and Associate. Unlike specific Job Titles (which represent exact contractual roles like "Senior React Developer" or "Payroll Specialist"), Positions govern the vertical rank hierarchy across the enterprise. Positions dictate approval thresholds (for leaves, travel orders, cash advances, and requisitions), salary grade bands, and executive delegation privileges in GGC HRIS.',
    uiFeatures: [
      {
        name: 'Instant Search Bar',
        icon: 'mdi-magnify',
        location: 'Top Toolbar (Left)',
        purpose: 'Position rank search',
        action: 'Filters organizational positions in real time by rank title (e.g., "Manager", "Director", "Rank & File", "Senior").',
      },
      {
        name: 'Refresh Button',
        icon: 'mdi-refresh',
        location: 'Top Toolbar (Right)',
        purpose: 'Live roster synchronization',
        action: 'Synchronizes registered position ranks, seniority level scores, and active headcount links from the database.',
      },
      {
        name: 'List View Toggle',
        icon: 'mdi-format-list-bulleted',
        location: 'Top Toolbar (Right)',
        purpose: 'Tabular rank audit mode',
        action: 'Switches into a high-density table displaying Position Name, Role Indicator, Creation Date, and Status for bulk audits.',
      },
      {
        name: 'Grid View Toggle',
        icon: 'mdi-view-grid-outline',
        location: 'Top Toolbar (Right)',
        purpose: 'Visual position card mode (Active)',
        action: 'Displays position cards featuring briefcase rank avatars, creation timestamps, Role badge chips, and Active status pills.',
      },
      {
        name: '+ Create Button',
        icon: 'mdi-plus-circle-outline',
        location: 'Top Toolbar (Far Right)',
        purpose: 'Position rank provisioning',
        action: 'Opens the "Create Position Information" modal dialog to define a standardized corporate rank classification.',
      },
      {
        name: 'Briefcase Avatar Icon',
        icon: 'mdi-briefcase-outline',
        location: 'Position Card Header',
        purpose: 'Rank tier visual indicator',
        action: 'Light blue circular avatar with briefcase icon identifying organizational rank classifications.',
      },
      {
        name: '3-Dots Action Menu (⋮ / ...)',
        icon: 'mdi-dots-horizontal',
        location: 'Position Card (Upper Right)',
        purpose: 'Contextual operations menu',
        action: 'Triggers contextual operations menu for the selected position rank.',
      },
      {
        name: 'Role Badge Pill',
        icon: 'mdi-shield-account-outline',
        location: 'Position Card Body',
        purpose: 'Role classification indicator',
        action: 'Visual pill indicating that this position classification acts as an authorized approval role tier in workflows.',
      },
      {
        name: 'Active Status Chip',
        icon: 'mdi-check-circle-outline',
        location: 'Position Card Footer',
        purpose: 'Operational status indicator',
        action: 'Green status chip confirming the position is active and selectable during employee onboarding.',
      },
      {
        name: 'Creation Timestamp Label',
        icon: 'mdi-calendar-clock-outline',
        location: 'Position Card Body',
        purpose: 'Audit creation date',
        action: 'Displays the exact registration date of the rank level (e.g., "Created: Sep 21, 2026") for audit compliance.',
      },
      {
        name: 'Floating Quick Settings Gear',
        icon: 'mdi-cog-outline',
        location: 'Bottom Right Screen Corner',
        purpose: 'System interface preferences',
        action: 'Floating quick-access trigger to open application display configurations and administrative preferences.',
      },
      {
        name: 'Items Per Page & Pagination',
        icon: 'mdi-page-next-outline',
        location: 'Bottom Footer Toolbar',
        purpose: 'Batch roster configuration',
        action: 'Controls items per page (e.g., 10), displays current record counter (e.g., 1-6 of 6), and provides navigation arrows (<< < > >>).',
      },
    ],
    steps: [
      {
        number: 1,
        title: 'Browse & Search Position Hierarchy (Grid View)',
        description: 'Navigate to Admin > Settings > Position. The Position Directory displays corporate ranks as visual cards (e.g., Manager, Director, Rank & File I, Rank & File II, Rank & File III, Senior). Each card displays the briefcase avatar, position title, registration timestamp ("Created: Sep 21, 2026"), Role badge pill (with shield icon), Active status chip, and 3-dots action menu (...). Use the instant search bar in the top toolbar to filter specific positions, or navigate pages via the bottom footer toolbar (showing "1-6 of 6").',
        image: '/screenshots/Positions/1-list.png',
        caption: 'Position Directory Grid View showing organizational rank cards, role badges, active status pills, and creation dates.',
        highlights: ['Instant search bar ("search here...")', 'Position cards with briefcase avatars', 'Role classification badge ("Role")', 'Active status chip indicator', 'Registration date timestamp ("Created: Sep 21, 2026")', 'Card 3-dots action menu (...)', '+ Create action button'],
      },
      {
        number: 2,
        title: 'Define a New Organizational Rank (CRUD: Create)',
        description: 'Click the "+ Create" button on the top toolbar to open the "Create Position Information" modal dialog. In the Position Role header section, review the prompt ("New Position Details: Define a new job role in the organization"). Enter the official position title in the "Position Name *" text field (showing placeholder "e.g. Software Engineer"). Click the grey "Cancel" button to abort safely, or click the teal "Save" button to register the position in the system.',
        image: '/screenshots/Positions/2-create.png',
        caption: 'Create Position Information dialog featuring position role preview avatar and position title input.',
        highlights: ['"Create Position Information" dialog header', '"New Position Details" preview banner', 'Position Name text input ("Position Name *")', 'Placeholder guide ("e.g. Software Engineer")', 'Grey Cancel button', 'Teal Save button', 'Close (X) dialog button'],
      },
      {
        number: 3,
        title: 'View Position Details & Seniority Information (CRUD: Read)',
        description: 'Click on any position card or select "View" from the 3-dots action menu to open the "Position Information" modal. This profile view features a top banner showing the briefcase avatar, position title ("Manager"), and "Role" shield badge. The details section displays the Position Name ("Manager"), Status ("Active" green pill), and system Created Date ("Sep 21, 2026"). Two action triggers are provided at the bottom: the salmon "Delete" button and the slate "Edit" button.',
        image: '/screenshots/Positions/3-details.png',
        caption: 'Position Information profile modal showing verified rank title, active status badge, and creation timestamp.',
        highlights: ['Briefcase avatar and title banner ("Manager")', 'Role badge with shield icon ("Role")', 'Read-only Position Name display', 'Active status verification chip', 'Created Date audit timestamp ("Sep 21, 2026")', 'Salmon Delete button', 'Slate Edit button', 'Close (X) dialog button'],
      },
      {
        number: 4,
        title: 'Delete Position Rank with Confirmation Dialog (CRUD: Delete)',
        description: 'Click the "Delete" button from the Position Information modal. A system "Confirm Action" security dialog appears with an amber warning triangle icon, the prompt "Please review before continuing", and the explicit confirmation question: "Are you sure you want to delete the position \"Manager\"?". Click the slate "Cancel" button to keep the position intact, or click the teal "Confirm" button to proceed with permanent deletion. Note: A position cannot be deleted if active employee profiles or Job Titles (Module 7) are currently assigned to this rank tier.',
        image: '/screenshots/Positions/4-delete-confirm.png',
        caption: 'Confirm Action dialog protecting corporate rank structures against accidental deletion.',
        highlights: ['Security warning alert icon ("Confirm Action")', 'Review prompt ("Please review before continuing")', 'Target position verification ("Manager")', 'Slate Cancel button to abort safely', 'Teal Confirm button to execute deletion', 'Dependency integrity protection'],
      },
      {
        number: 5,
        title: 'Edit Position Name & Role Specifications (CRUD: Update)',
        description: 'Click the "Edit" button from the Position Information modal. The "Edit Position Information" modal dialog opens featuring the "Edit Position Details: Modify job role information" section. The "Position Name *" field is pre-filled with the current title (e.g., "Manager"). HR administrators can modify the title to reflect updated organizational rank nomenclature or salary grade scales. Click the grey "Cancel" button to discard changes, or click the teal "Save" button to commit the update across all connected modules.',
        image: '/screenshots/Positions/5-edit.png',
        caption: 'Edit Position Information dialog for modifying organizational rank titles and approval level settings.',
        highlights: ['"Edit Position Information" dialog header', '"Edit Position Details" header banner', 'Pre-filled Position Name input ("Position Name *")', 'Cancel button to discard changes', 'Teal Save button to commit updates', 'Close (X) dialog button'],
      },
    ],
    fields: [
      { name: 'Position Name *', requirement: 'Required', dataType: 'Text (String)', description: 'Official title of the organizational rank classification (e.g., Manager, Director, Senior, Rank & File I, Rank & File II, Rank & File III). Mandatory input.' },
      { name: 'Status', requirement: 'Optional', dataType: 'Status Chip', description: 'System availability status (Active) governing selection in contracts and approval trees.' },
      { name: 'Created Date', requirement: 'Optional', dataType: 'Audit Date', description: 'System-generated audit registration timestamp (e.g., Sep 21, 2026) recorded upon initial position registration.' },
    ],
    screenshot: {
      caption: 'Position Management view documenting organizational seniority levels and approval rank levels.',
      alt: 'Position Management Interface Preview',
      viewTitle: 'Position Rank Hierarchy',
      mockupType: 'table',
      gallery: [
        { src: '/screenshots/Positions/1-list.png', label: 'Position Directory Grid View', caption: 'Visual grid displaying corporate rank tiers, role badges, and status' },
        { src: '/screenshots/Positions/2-create.png', label: 'Create Position Information', caption: 'Registration modal with role avatar preview and name input' },
        { src: '/screenshots/Positions/3-details.png', label: 'Position Information Profile', caption: 'Read-only profile modal with role indicator, status, and creation date' },
        { src: '/screenshots/Positions/4-delete-confirm.png', label: 'Confirm Action Delete Modal', caption: 'Security prompt preventing accidental rank tier deletion' },
        { src: '/screenshots/Positions/5-edit.png', label: 'Edit Position Information', caption: 'Pre-filled modal for modifying rank titles' },
      ],
    },
    callout: {
      type: 'info',
      title: 'Position vs. Job Title Distinction',
      text: 'Positions (Module 6) represent organizational seniority ranks (e.g., Manager, Director, Senior, Associate) that govern approval matrices and salary grade levels. Job Titles (Module 7) represent specific contractual designations (e.g., "Full Stack Developer", "Recruitment Specialist"). Always create the Position rank before linking specific Job Titles to it.',
    },
  },
  {
    id: 'mod-job-title',
    num: 7,
    title: 'Job Title Management',
    route: '/job-title',
    menuPath: 'Admin Settings > Job Titles',
    authorizedRoles: ['HR Administrator', 'Staffing Specialist'],
    permissions: ['jobtitle.read', 'jobtitle.create'],
    category: 'Organizational Setup',
    icon: 'mdi-badge-account-horizontal-outline',
    description: 'Specific job designation assigned to employees in contracts and official records.',
    overview: 'Job titles define specific functional roles and responsibilities mapped to standard positions.',
    uiFeatures: [
      {
        name: 'Instant Search Bar',
        icon: 'mdi-magnify',
        location: 'Top Toolbar (Left)',
        purpose: 'Contract title search',
        action: 'Searches contractual designations (e.g., Senior Fullstack Developer, Payroll Specialist).',
      },
      {
        name: 'Position Rank Link',
        icon: 'mdi-podium-gold',
        location: 'Create & Edit Dialogs',
        purpose: 'Seniority mapping',
        action: 'Dropdown connecting the specific contractual title to its baseline Position rank level.',
      },
      {
        name: '+ Create Job Title Button',
        icon: 'mdi-plus',
        location: 'Top Toolbar (Right)',
        purpose: 'Designation registration',
        action: 'Registers a formal job designation selectable when onboarding employee 201 records.',
      },
      {
        name: 'Job Description Textarea',
        icon: 'mdi-text-box-outline',
        location: 'Create & Edit Dialogs',
        purpose: 'Scope of responsibilities',
        action: 'Detailed summary of core duties, competencies, and deliverables expected for the role.',
      },
    ],
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
    menuPath: 'Admin Settings > User Access',
    authorizedRoles: ['System Super Admin', 'Security Compliance Officer'],
    permissions: ['permission.view', 'permission.create'],
    category: 'Account & Access',
    icon: 'mdi-shield-account-outline',
    description: 'Assign specific, individualized capabilities directly to a user account, augmenting their general Role.',
    overview: 'The interface is organized in a two-column layout: Left Panel (searchable user roster with permission badge counts) and Right Panel (permission categories such as Employee, Attendance, Payables, Organization for the active user).',
    uiFeatures: [
      {
        name: 'User Roster Search Box',
        icon: 'mdi-account-search-outline',
        location: 'Left Panel (Top)',
        purpose: 'Individual account lookup',
        action: 'Filters personnel list by name or username to immediately load their individual permission profile.',
      },
      {
        name: 'Permission Badge Counter',
        icon: 'mdi-shield-check-outline',
        location: 'Left Panel (User Item)',
        purpose: 'Override metric indicator',
        action: 'Displays numerical count of specific extra capabilities granted directly to that user account.',
      },
      {
        name: 'Manage Permissions Button',
        icon: 'mdi-cog-outline',
        location: 'Right Panel (Header)',
        purpose: 'Capability assignment trigger',
        action: 'Unlocks the interactive permission checklist dialog for the currently selected user account.',
      },
      {
        name: 'Capability Category Tree',
        icon: 'mdi-file-tree-outline',
        location: 'Right Panel (Body)',
        purpose: 'Granular access switches',
        action: 'Checkboxes across Employee, Attendance, Payables, and Organization domains for toggling individual actions.',
      },
      {
        name: 'Save Changes Button',
        icon: 'mdi-content-save-outline',
        location: 'Permission Modal (Bottom)',
        purpose: 'Override commitment',
        action: 'Commits capability changes; user receives updated access token upon their next session action.',
      },
    ],
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
    menuPath: 'Admin Settings > Role Permissions',
    authorizedRoles: ['System Super Admin', 'IT Director'],
    permissions: ['permission.read', 'permission.create'],
    category: 'Account & Access',
    icon: 'mdi-matrix',
    description: 'Configure the capability matrix assigned to each User Type across all system modules.',
    overview: 'This master matrix defines what each User Type (Role) can see and perform in the system. Changes applied to a User Type immediately take effect for all users assigned that type upon their next session token refresh.',
    uiFeatures: [
      {
        name: 'User Type (Role) Selector',
        icon: 'mdi-account-switch-outline',
        location: 'Top Tabs / Selector',
        purpose: 'Role profile switcher',
        action: 'Switches between operational roles (e.g., HR Administrator, Department Manager, Staff Employee, Super Admin).',
      },
      {
        name: 'Domain Capability Matrix',
        icon: 'mdi-matrix',
        location: 'Main Workspace Grid',
        purpose: 'Master access matrix switches',
        action: 'Grid of toggles mapping Read, Create, Update, and Delete capabilities across system modules for the chosen Role.',
      },
      {
        name: 'Bulk Select / Deselect Toggles',
        icon: 'mdi-checkbox-multiple-marked-outline',
        location: 'Module Group Headers',
        purpose: 'Batch permission configuration',
        action: 'Enables or disables all capabilities within an entire functional domain (e.g., Attendance) with a single click.',
      },
      {
        name: 'Save Matrix Changes Button',
        icon: 'mdi-content-save-check-outline',
        location: 'Bottom Floating Bar',
        purpose: 'Master security commitment',
        action: 'Commits role matrix updates system-wide with immediate propagation to all active employee sessions.',
      },
    ],
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
