import {
  NucArticleDashboard,
  NucArticlePage,
  NucContactDashboard,
  NucContactPage,
  NucEntitiesPage,
  NucMoneyDashboard,
  NucMoneyPage,
} from './atomic'

export function registerNucEntities(): void {
  void NucArticlePage
  void NucContactPage
  void NucEntitiesPage
  void NucMoneyPage
  void NucArticleDashboard
  void NucContactDashboard
  void NucMoneyDashboard
}
