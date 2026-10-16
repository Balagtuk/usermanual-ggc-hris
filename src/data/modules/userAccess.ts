import type { ModuleDoc } from '@/types/manual'

export const userAccessModule: ModuleDoc = {
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
  }
