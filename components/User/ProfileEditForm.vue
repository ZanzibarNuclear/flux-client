<template>
  <form @submit.prevent="saveProfile" class="profile-edit-form">
    <div class="form-group">
      <label for="displayName">Display Name</label>
      <input id="displayName" v-model="form.displayName" type="text" required>
    </div>
    <div class="form-group">
      <label for="bio">Bio</label>
      <textarea id="bio" v-model="form.bio" rows="3"></textarea>
    </div>
    <div class="form-group">
      <label for="location">Location</label>
      <input id="location" v-model="form.location" type="text">
    </div>
    <div class="form-group">
      <label for="website">Website</label>
      <input id="website" v-model="form.website" type="url">
    </div>
    <div class="form-actions">
      <button type="button" @click="cancel" class="cancel-btn">Cancel</button>
      <button type="submit" class="save-btn">Save Changes</button>
    </div>
  </form>
</template>

<script setup>
const props = defineProps({
  userData: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['save', 'cancel']);

const form = ref({
  displayName: props.userData.displayName,
  bio: props.userData.bio,
  location: props.userData.location,
  website: props.userData.website
});

function saveProfile() {
  emit('save', { ...form.value });
}

function cancel() {
  emit('cancel');
}
</script>

<style scoped>
.profile-edit-form {
  background-color: #fff;
  padding: 20px;
  border-radius: 15px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

input[type="text"],
input[type="url"],
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.cancel-btn,
.save-btn {
  padding: 10px 20px;
  border-radius: 20px;
  font-weight: bold;
  cursor: pointer;
}

.cancel-btn {
  background-color: #fff;
  color: #1da1f2;
  border: 1px solid #1da1f2;
}

.save-btn {
  background-color: #1da1f2;
  color: #fff;
  border: none;
}
</style>
