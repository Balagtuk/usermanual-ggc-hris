// Export all shared manual data types
export * from '@/types/manual'

// Export introduction overview content
export { INTRO_CONTENT } from './modules/intro'

// Import domain modules
import type { ModuleDoc } from '@/types/manual'
import { userModule } from './modules/users'
import { entityModule } from './modules/entities'
import { branchModule } from './modules/branch'
import { departmentModule } from './modules/departments'
import { divisionModule } from './modules/divisions'
import { positionModule } from './modules/position'
import { jobTitleModule } from './modules/jobTitle'
import { userAccessModule } from './modules/userAccess'
import { rolePermissionsModule } from './modules/permissions'

// Export aggregated manual modules roster
export const MANUAL_MODULES: ModuleDoc[] = [
  userModule,
  entityModule,
  branchModule,
  departmentModule,
  divisionModule,
  positionModule,
  jobTitleModule,
  userAccessModule,
  rolePermissionsModule,
]
