<template>
  <div class="user-profile">
    <div class="profile-header">
      <img :src="userCover" alt="Cover" class="cover-image">
    </div>
    <div class="flex p-6 justify-between">
      <div class="flex">
        <UAvatar :src="userAvatar" class="mr-4" />
        <div>
          <h2 class="user-name">{{ displayName }}</h2>
          <p class="user-handle">@{{ handle }}</p>
          <p class="user-bio">{{ userBio }}</p>
          <div class="user-meta">
            <span class="location" v-if="location">📍 {{ location }}</span>
            <span class="website" v-if="website">
              🔗 <a :href="website" target="_blank" rel="noopener noreferrer">{{ websiteDomain }}</a>
            </span>
            <span class="join-date">🗓️ Joined {{ joinDate }}</span>
          </div>
        </div>
      </div>
      <div v-if="isOwnProfile">
        <UButton @click="() => navigateTo(`/profile/${handle}/me`)">See your full profile</UButton>
      </div>
    </div>
  </div>
</template>

<script setup>
const fluxStore = useFluxStore()
const props = defineProps({
  fluxUser: {
    type: Object,
    required: true
  }
})

const displayName = computed(() => props.fluxUser?.display_name)
const handle = computed(() => props.fluxUser?.handle)
const userAvatar = computed(() => props.fluxUser?.avatar_url || '/images/logo-sq-pirate.jpg')
const userCover = computed(() => props.fluxUser?.cover_url || '/images/flux-theme-v1.jpg')
const userBio = computed(() => props.fluxUser?.bio)
const location = computed(() => props.fluxUser?.location)
const website = computed(() => props.fluxUser?.website)
const joinDate = computed(() => formatDate(props.fluxUser?.created_at))

const isOwnProfile = computed(() => {
  return (fluxStore.profile?.handle === handle.value)
})
</script>

<style scoped>
.user-profile {
  background-color: #fff;
  border-radius: 15px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.profile-header {
  position: relative;
  height: 200px;
}

.cover-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar {
  position: absolute;
  bottom: -60px;
  left: 20px;
  width: 120px;
  height: 120px;
  border-radius: 50%;
  border: 4px solid #fff;
}

.profile-info {
  display: flex;
  padding: 20px;
}

.user-name {
  margin: 0;
  font-size: 24px;
}

.user-handle {
  color: #657786;
  margin: 5px 0;
}

.user-bio {
  margin: 15px 0;
}

.user-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  color: #657786;
  margin-bottom: 15px;
}

.user-stats {
  display: flex;
  gap: 20px;
}

.user-stats span {
  color: #657786;
}

.user-stats strong {
  color: #14171a;
}
</style>