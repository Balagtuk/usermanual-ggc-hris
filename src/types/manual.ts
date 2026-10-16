export interface FieldDefinition {
  name: string
  requirement: 'Required' | 'Optional'
  dataType?: string
  description: string
}

export interface StepBadge {
  number: number
  x: number // percentage 0-100 from left
  y: number // percentage 0-100 from top
  title: string
  location?: string
  purpose: string
  action: string
  permission?: string
}

export interface StepItem {
  number: number
  title: string
  description: string
  image?: string
  alt?: string
  caption?: string
  highlights?: string[]
  badges?: StepBadge[]
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
