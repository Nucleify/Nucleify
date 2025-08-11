import { ref } from 'vue'

import { isAnyCurrentUrl, officeRoutes } from 'atomic'

export function useOfficeType() {
  const officeType = ref(getOfficeType())

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
