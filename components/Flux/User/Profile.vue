<template>
  <div class="user-profile">
    <div class="profile-header">
      <img :src="userCover" alt="Cover" class="cover-image">
    </div>
    <div class="profile-actions">
      <button v-if="!isOwnProfile" @click="toggleEditMode" class="edit-profile-btn">
        {{ isEditing ? 'Cancel' : 'Edit Profile' }}
      </button>
    </div>
    <div v-if="isEditing" class="profile-edit">
      <FluxUserProfileEditForm :userData="userData" @save="handleSaveProfile" @cancel="toggleEditMode" />
    </div>
    <div v-else class="profile-info">
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
        <p v-if="isOwnProfile">This is you!</p>
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
  return (fluxStore.profile.handle === handle.value)
})
const isEditing = ref(false);

function toggleEditMode() {
  if (isOwnProfile.value) {
    isEditing.value = !isEditing.value;
  } else {
    console.warn('Not your profile')
  }
}

function handleSaveProfile(updatedData) {
  console.log('Profile updated:', updatedData.value);
}
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

.profile-actions {
  display: flex;
  justify-content: flex-end;
  padding: 10px 20px;
}

.profile-edit {
  padding: 20px;
}

.edit-profile-btn,
.tune-in-btn {
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

.edit-profile-btn {
  background-color: #fff;
  color: #1da1f2;
  border: 1px solid #1da1f2;
}

.tune-in-btn {
  background-color: #1da1f2;
  color: #fff;
  border: none;
}

.tune-in-btn.tuned-in {
  background-color: #fff;
  color: #1da1f2;
  border: 1px solid #1da1f2;
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