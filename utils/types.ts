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

export interface Achievement {
  id: string
  name: string
  description: string
  karmaAwarded: number
  awardedAt: string
}

export interface FluxProfile {
  id: string
  userId: string
  handle: string
  displayName: string
  fluxCount: number
  reactionCount: number
  boostCount: number
  followerCount: number
  followingCount: number
  createdAt: string
  updatedAt: string
  achievements: Achievement[]
}

export interface UserPreferences {
  theme: 'light' | 'dark' | 'system'
  emailNotifications: boolean
  digestFrequency: 'daily' | 'weekly' | 'never'
  showOnlineStatus: boolean
}

export interface UserProfile {
  id: string
  alias: string
  fullName: string
  avatarUrl: string
  bio: string
  location: string
  joinReason: string
  nuclearLikes: string
  xUsername: string
  website: string
  email: string
  karmaScore: number
  preferences: UserPreferences
  createdAt: string
  updatedAt: string
}
