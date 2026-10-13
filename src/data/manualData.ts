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
    authorizedRoles: ['HR Administrator', 'Operations Director'],
    permissions: ['department.read', 'department.create'],
    category: 'Organizational Setup',
    icon: 'mdi-account-group-outline',
    description: 'Group operations into functional departments such as Accounting, HR, Sales, and IT.',
    overview: 'Departments establish organizational accountability, cost center allocation, and manager supervision pipelines.',
    uiFeatures: [
      {
        name: 'Instant Search Bar',
        icon: 'mdi-magnify',
        location: 'Top Toolbar (Left)',
        purpose: 'Department lookup',
        action: 'Filters functional departments in real time by title or abbreviated code (e.g., HRD, FIN, OPR).',
      },
      {
        name: '+ Create Department Button',
        icon: 'mdi-plus',
        location: 'Top Toolbar (Right)',
        purpose: 'Department registration',
        action: 'Launches the dialog to register a new organizational department and cost center identifier.',
      },
      {
        name: 'Department Code Field',
        icon: 'mdi-identifier',
        location: 'Create & Edit Dialogs',
        purpose: 'Standard acronym code',
        action: 'Enforces a standardized 3-4 character code used in employee ID generation and reporting.',
      },
      {
        name: 'Status Selector (Active / Inactive)',
        icon: 'mdi-toggle-switch-outline',
        location: 'Department Dialog & Table',
        purpose: 'Operational status control',
        action: 'Archived departments are hidden from employee onboarding while preserving past cost center history.',
      },
      {
        name: 'Row Action Menu (⋮)',
        icon: 'mdi-dots-vertical',
        location: 'Department Table Rows',
        purpose: 'Direct record maintenance',
        action: 'Provides immediate triggers to Edit department titles or Archive obsolete functional units.',
      },
    ],
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
    menuPath: 'Admin Settings > Divisions',
    authorizedRoles: ['HR Administrator', 'Department Head'],
    permissions: ['division.read', 'division.create'],
    category: 'Organizational Setup',
    icon: 'mdi-sitemap-outline',
    description: 'Sub-unit divisions that categorize specialized units within a Department.',
    overview: 'Divisions allow deeper grouping inside large departments (e.g., Recruitment & Staffing, Employee Relations under HR).',
    uiFeatures: [
      {
        name: 'Instant Search Bar',
        icon: 'mdi-magnify',
        location: 'Top Toolbar (Left)',
        purpose: 'Division & team search',
        action: 'Filters specialized divisions by sub-unit title or parent department association.',
      },
      {
        name: 'Parent Department Selector',
        icon: 'mdi-account-group-outline',
        location: 'Create & Edit Dialogs',
        purpose: 'Organizational hierarchy link',
        action: 'Dropdown assigning the sub-division to its parent department (e.g., Payroll Services under Accounting).',
      },
      {
        name: '+ Create Division Button',
        icon: 'mdi-plus',
        location: 'Top Toolbar (Right)',
        purpose: 'Sub-team provisioning',
        action: 'Opens the registration modal to create an operational sub-team inside a department.',
      },
      {
        name: 'Row Action Menu (⋮)',
        icon: 'mdi-dots-vertical',
        location: 'Division Table Rows',
        purpose: 'Record operations',
        action: 'Enables editing division titles or modifying parent department mappings.',
      },
    ],
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
    menuPath: 'Admin Settings > Positions',
    authorizedRoles: ['HR Administrator', 'Compensation & Benefits Officer'],
    permissions: ['position.read', 'position.create'],
    category: 'Organizational Setup',
    icon: 'mdi-podium-gold',
    description: 'Organizational positions representing ranks (e.g., Executive, Manager, Officer, Associate).',
    overview: 'Positions govern rank hierarchies and determine approval matrices for leaves, travel orders, and requisitions.',
    uiFeatures: [
      {
        name: 'Instant Search Bar',
        icon: 'mdi-magnify',
        location: 'Top Toolbar (Left)',
        purpose: 'Rank lookup',
        action: 'Filters organizational ranks (e.g., Executive, Manager, Officer, Associate) in real time.',
      },
      {
        name: 'Position Level Score',
        icon: 'mdi-numeric',
        location: 'Create & Edit Dialogs',
        purpose: 'Seniority & approval threshold',
        action: 'Defines numerical rank level used by automated approval workflow matrices and travel expense limits.',
      },
      {
        name: '+ Create Position Button',
        icon: 'mdi-plus',
        location: 'Top Toolbar (Right)',
        purpose: 'Rank structure provisioning',
        action: 'Opens the modal dialog to establish a standardized corporate rank classification.',
      },
      {
        name: 'Row Action Menu (⋮)',
        icon: 'mdi-dots-vertical',
        location: 'Position Table Rows',
        purpose: 'Rank maintenance',
        action: 'Enables editing position names or adjusting numerical seniority levels.',
      },
    ],
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
