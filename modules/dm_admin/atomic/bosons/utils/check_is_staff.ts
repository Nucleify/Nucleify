export function checkIsStaff(userRole: string): boolean {
  return ['tech', 'test_admin', 'admin', 'super_admin'].includes(userRole)
}
