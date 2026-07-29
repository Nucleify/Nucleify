import { isNextRuntime } from './is_next_runtime'

const moduleDefaultColors: Record<string, string> = {
  'activity-c': '#ffb600',
  'activity-d': '#cc9200',
  'activity-h': '#ffb60015',
  'activity-f': '#ffb60080',
  'activity-sc': '#ffb60035',
  'activity-sl': '#ffb60026',
  'activity-hv': '#e7a60b',
  'article-c': '#1187c7',
  'article-d': '#0d5a8a',
  'article-h': '#1187c715',
  'article-f': '#1187c780',
  'article-sc': '#1187c735',
  'article-sl': '#1187c726',
  'article-hv': '#0f79b2',
  'contact-c': '#10b981',
  'contact-d': '#054a32',
  'contact-h': '#10b98115',
  'contact-f': '#10b98180',
  'contact-sc': '#10b98135',
  'contact-sl': '#10b98126',
  'contact-hv': '#10a674',
  'file-c': '#6db910',
  'file-d': '#518a0c',
  'file-h': '#6db91015',
  'file-f': '#6db91080',
  'file-sc': '#6db91035',
  'file-sl': '#6db91026',
  'file-hv': '#60a30f',
  'money-c': '#11c73b',
  'money-d': '#0d9a2e',
  'money-h': '#11c73b15',
  'money-f': '#11c73b80',
  'money-sc': '#11c73b35',
  'money-sl': '#11c73b26',
  'money-hv': '#11c73b',
  'question-c': '#8cb910',
  'question-d': '#6f940d',
  'question-h': '#8cb91015',
  'question-f': '#8cb91080',
  'question-sc': '#8cb91035',
  'question-sl': '#8cb91026',
  'question-hv': '#7ca40f',
  'technology-c': '#b95910',
  'technology-d': '#94470d',
  'technology-h': '#b9591015',
  'technology-f': '#b9591080',
  'technology-sc': '#b9591035',
  'technology-sl': '#b9591026',
  'technology-hv': '#9b4b0e',
  'user-c': '#64748b',
  'user-d': '#4f5d6f',
  'user-h': '#64748b15',
  'user-f': '#64748b80',
  'user-sc': '#64748b35',
  'user-sl': '#64748b26',
  'user-hv': '#566479',
}

export const mainDefaultColorsNuxt: Record<string, string> = {
  'main-c': '#10b981',
  'main-d': '#054a32',
  'main-h': '#10b98115',
  'main-f': '#10b98180',
  'main-sc': '#10b98135',
  'main-sl': '#10b98126',
  'main-hv': '#10a674',
}

export const mainDefaultColorsNext: Record<string, string> = {
  'main-c': '#60a5fa',
  'main-d': '#1e40af',
  'main-h': '#60a5fa15',
  'main-f': '#60a5fa80',
  'main-sc': '#60a5fa35',
  'main-sl': '#60a5fa26',
  'main-hv': '#3b82f6',
}

export function getDefaultColors(): Record<string, string> {
  return {
    ...moduleDefaultColors,
    ...(isNextRuntime() ? mainDefaultColorsNext : mainDefaultColorsNuxt),
  }
}

export function getDefaultColor(key: string): string {
  return getDefaultColors()[key] ?? ''
}

export const defaultColors: Record<string, string> = new Proxy(
  {} as Record<string, string>,
  {
    get(_target, key: string | symbol) {
      if (typeof key !== 'string') return undefined
      return getDefaultColors()[key]
    },
    ownKeys() {
      return Reflect.ownKeys(getDefaultColors())
    },
    getOwnPropertyDescriptor(_target, key) {
      if (typeof key !== 'string' || !(key in getDefaultColors())) {
        return undefined
      }

      return {
        enumerable: true,
        configurable: true,
        value: getDefaultColors()[key],
      }
    },
  }
)
