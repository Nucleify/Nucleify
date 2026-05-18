import { isAnyCurrentUrl, officeRoutes } from 'nucleify'

export function useOfficeType() {
  const officeType = getOfficeType()

  function getOfficeType() {
    switch (true) {
      case isAnyCurrentUrl(officeRoutes.front):
        return 'front-office'
      case isAnyCurrentUrl(officeRoutes.back):
        return 'back-office'
      default:
        console.log('No office type found')
        return 'default'
    }
  }

  return {
    officeType,
    getOfficeType,
  }
}
