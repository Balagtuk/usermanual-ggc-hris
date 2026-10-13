import type { ModuleDoc } from '@/data/manualData'

export interface MatchDetail {
  module: ModuleDoc
  matchedFieldNames: string[]
  matchedPermissions: string[]
  matchedStepTitles: string[]
  matchReasons: string[]
  previewText: string
}

export function searchModules(modules: ModuleDoc[], query: string): MatchDetail[] {
  const q = query.trim().toLowerCase()
  if (!q) return []

  const results: MatchDetail[] = []

  for (const m of modules) {
    const reasons: string[] = []
    const matchedFieldNames: string[] = []
    const matchedPermissions: string[] = []
    const matchedStepTitles: string[] = []
    let previewText = m.description

    if (m.title.toLowerCase().includes(q)) {
      reasons.push('Title')
    }

    if (m.route.toLowerCase().includes(q)) {
      reasons.push('Route')
    }

    if (m.overview.toLowerCase().includes(q) || m.description.toLowerCase().includes(q)) {
      reasons.push('Overview')
    }

    if (m.permissions) {
      for (const p of m.permissions) {
        if (p.toLowerCase().includes(q)) {
          matchedPermissions.push(p)
        }
      }
      if (matchedPermissions.length > 0) {
        reasons.push(`Permissions (${matchedPermissions.length})`)
      }
    }

    if (m.fields) {
      for (const f of m.fields) {
        if (f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)) {
          matchedFieldNames.push(f.name)
        }
      }
      if (matchedFieldNames.length > 0) {
        reasons.push(`Fields (${matchedFieldNames.length})`)
      }
    }

    if (m.steps) {
      for (const s of m.steps) {
        if (s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)) {
          matchedStepTitles.push(s.title)
        }
      }
      if (matchedStepTitles.length > 0) {
        reasons.push(`Steps (${matchedStepTitles.length})`)
      }
    }

    if (reasons.length > 0) {
      if (matchedFieldNames.length > 0 && m.fields) {
        const matchingField = m.fields.find(
          (f) => f.name.toLowerCase().includes(q) || f.description.toLowerCase().includes(q)
        )
        if (matchingField) {
          previewText = `Field: ${matchingField.name} — ${matchingField.description}`
        }
      } else if (matchedPermissions.length > 0) {
        previewText = `Permission: ${matchedPermissions[0]}`
      } else if (matchedStepTitles.length > 0 && m.steps) {
        const matchingStep = m.steps.find(
          (s) => s.title.toLowerCase().includes(q) || s.description.toLowerCase().includes(q)
        )
        if (matchingStep) {
          previewText = `Step: ${matchingStep.title} — ${matchingStep.description}`
        }
      }

      results.push({
        module: m,
        matchedFieldNames,
        matchedPermissions,
        matchedStepTitles,
        matchReasons: reasons,
        previewText,
      })
    }
  }

  return results
}
