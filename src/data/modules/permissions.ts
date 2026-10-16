import type { ModuleDoc } from '@/types/manual'

export const rolePermissionsModule: ModuleDoc = {
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
  }
