export function checkIsAdmin(userRole: string): boolean {
  return ['admin', 'test_admin', 'super_admin'].includes(userRole)
}
