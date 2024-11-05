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

export interface FluxProfile {
  id: string
  userId: string
  handle: string
  displayName: string
  createdAt: string
  updatedAt: string
}

export interface UserProfile {
  id: string
  screenName: string
  fullName: string
  avatarUrl: string
  bio: string
  location: string
  joinReason: string
  nuclearLikes: string
  xUsername: string
  website: string
  createdAt: string
  updatedAt: string
}
