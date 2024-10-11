<template>
  <div class="user-profile">
    <div class="profile-header">
      <img :src="userCover" alt="Cover" class="cover-image">
      <img :src="userAvatar" :alt="username" class="avatar">
    </div>
    <div class="profile-actions">
      <button v-if="isCurrentUser" @click="toggleEditMode" class="edit-profile-btn">
        {{ isEditing ? 'Cancel' : 'Edit Profile' }}
      </button>
      <button v-else @click="toggleTuneIn" :class="['tune-in-btn', { 'tuned-in': isTunedIn }]">
        {{ isTunedIn ? 'Tuned In' : 'Tune In' }}
      </button>
    </div>
    <div v-if="isEditing" class="profile-edit">
      <FluxUserProfileEditForm :userData="userData" @save="saveProfile" @cancel="toggleEditMode" />
    </div>
    <div v-else class="profile-info">
      <h2 class="user-name">{{ displayName }}</h2>
      <p class="user-handle">@{{ username }}</p>
      <p class="user-bio">{{ userBio }}</p>
      <div class="user-meta">
        <span class="location" v-if="location">📍 {{ location }}</span>
        <span class="website" v-if="website">
          🔗 <a :href="website" target="_blank" rel="noopener noreferrer">{{ websiteDomain }}</a>
        </span>
        <span class="join-date">🗓️ Joined {{ joinDate }}</span>
      </div>
      <div class="user-stats">
        <span><strong>{{ followingCount }}</strong> Tuning In</span>
        <span><strong>{{ followersCount }}</strong> Tuned In</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  username: {
    type: String,
    required: true
  }
})

// Mock user data (replace with API call in real app)
const userData = ref({
  displayName: 'John Doe',
  avatar: `https://api.dicebear.com/6.x/initials/svg?seed=${props.username}`,
  cover: 'https://picsum.photos/800/200',
  bio: 'Enthusiastic developer and Flux enjoyer',
  location: 'San Francisco, CA',
  website: 'https://johndoe.com',
  joinDate: 'September 2023',
  followingCount: 1234,
  followersCount: 5678
})

const isCurrentUser = computed(() => {
  // Logic to determine if this is the current user's profile
  return false
})

const isTunedIn = ref(false)
const displayName = computed(() => userData.value.displayName)
const userAvatar = computed(() => userData.value.avatar)
const userCover = computed(() => userData.value.cover)
const userBio = computed(() => userData.value.bio)
const location = computed(() => userData.value.location)
const website = computed(() => userData.value.website)
const websiteDomain = computed(() => {
  if (website.value) {
    return new URL(website.value).hostname
  }
  return ''
})
const joinDate = computed(() => userData.value.joinDate)
const followingCount = computed(() => userData.value.followingCount)
const followersCount = computed(() => userData.value.followersCount)

function toggleTuneIn() {
  isTunedIn.value = !isTunedIn.value
  // Implement tune in/out functionality
  console.log(isTunedIn.value ? 'Tuned in' : 'Tuned out')
}

const isEditing = ref(false);

function toggleEditMode() {
  isEditing.value = !isEditing.value;
}

function saveProfile(updatedData) {
  // Update the userData with the new information
  userData.value = { ...userData.value, ...updatedData };
  // Close the edit form
  isEditing.value = false;
  // Here you would typically make an API call to save the changes
  console.log('Profile updated:', userData.value);
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