import type { ModuleDoc } from '@/types/manual'

export const jobTitleModule: ModuleDoc = {
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
  }
