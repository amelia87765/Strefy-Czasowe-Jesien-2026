export type FormatKind = 'post' | 'reel' | 'story'

export type SizeSpec = {
  width: number
  height: number
  label: string
  recommended?: boolean
}

export type Platform = {
  id: string
  name: string
  formats: Record<FormatKind, SizeSpec[] | null>
}

export const formatKindLabel: Record<FormatKind, string> = {
  post: 'Post',
  reel: 'Rolka',
  story: 'Relacja',
}

export const formatKinds: FormatKind[] = ['post', 'reel', 'story']

/**
 * Wymiary w pikselach — źródło prawdy dla narzędzia.
 * Instagram / Facebook / TikTok: 1080 szerokości jako standard eksportu.
 * 4:5 = 1080×1350, 9:16 = 1080×1920, 1:1 = 1080×1080.
 * Landscape IG 1.91:1 zaokrąglone do 1080×566 (nie da się 1.91 dokładnie w liczbach całkowitych).
 */
export const platforms: Platform[] = [
  {
    id: 'instagram',
    name: 'Instagram',
    formats: {
      post: [
        { width: 1080, height: 1350, label: '4:5', recommended: true },
        { width: 1080, height: 1080, label: '1:1' },
        { width: 1080, height: 566, label: '1.91:1' },
      ],
      reel: [{ width: 1080, height: 1920, label: '9:16', recommended: true }],
      story: [{ width: 1080, height: 1920, label: '9:16', recommended: true }],
    },
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    formats: {
      post: [{ width: 1080, height: 1920, label: '9:16', recommended: true }],
      reel: [{ width: 1080, height: 1920, label: '9:16', recommended: true }],
      story: [{ width: 1080, height: 1920, label: '9:16', recommended: true }],
    },
  },
  {
    id: 'facebook',
    name: 'Facebook',
    formats: {
      post: [
        { width: 1080, height: 1350, label: '4:5', recommended: true },
        { width: 1080, height: 1080, label: '1:1' },
      ],
      reel: [{ width: 1080, height: 1920, label: '9:16', recommended: true }],
      story: [{ width: 1080, height: 1920, label: '9:16', recommended: true }],
    },
  },
  {
    id: 'youtube',
    name: 'YouTube',
    formats: {
      post: [{ width: 1280, height: 720, label: '16:9 miniatura', recommended: true }],
      reel: [{ width: 1080, height: 1920, label: 'Shorts 9:16', recommended: true }],
      story: null,
    },
  },
]
