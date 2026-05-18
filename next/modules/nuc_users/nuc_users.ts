import { NucUserDashboard } from './atomic'
import {
  NucUsersProfileNotificationsAlerts,
  NucUsersProfilePersonalInfo,
} from './settings'

export function registerNucUsers(): void {
  void NucUserDashboard
  void NucUsersProfilePersonalInfo
  void NucUsersProfileNotificationsAlerts
}
