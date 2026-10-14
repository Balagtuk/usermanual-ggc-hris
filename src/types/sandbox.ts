export interface ExplanationInfo {
  id: string
  badgeNumber: number
  name: string
  icon: string
  location: string
  purpose: string
  action: string
  permission: string
  tip: string
}

export type SandboxMode = 'play' | 'guide'
export type ViewMode = 'grid' | 'list'
