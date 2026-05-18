import { marked } from 'marked'

import { apiHandle } from 'nucleify'

export async function loadReadme(
  modulePath: string,
  onSuccess: (html: string) => void,
  onError?: () => void
): Promise<void> {
  if (!modulePath) {
    onError?.()
    return
  }

  try {
    await apiHandle<string>({
      url: appUrl() + `/modules/${modulePath}/README.md`,
      method: 'GET',
      onSuccess: async (data: string) => {
        const html = await marked.parse(data)
        const processedHtml = html.replaceAll('/public', appUrl())
        onSuccess(processedHtml)
      },
    })
  } catch (error) {
    console.error(`Error loading README for ${modulePath}:`, error)
    onError?.()
  }
}
