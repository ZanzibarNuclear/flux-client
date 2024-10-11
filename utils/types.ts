export interface Flux {
  id: number
  author: string
  authorUsername: string
  authorAvatar: string
  replyTo: number | null
  content: string
  timestamp: string
  viewCount: number
  replyCount: number
  boostCount: number
  boosted: boolean
}

export interface FluxUser {
  id: string
  userId: string
  handle: string
  displayName: string
  avatarUrl: string
  bio: string
  location: string
  website: string
  createdAt: string
  updatedAt: string
}
