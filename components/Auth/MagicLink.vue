<template>
  <div>
    <h3>Request a Magic Link</h3>
    <div>You can sign in using your email. We will send you a magic link that will bring you back here all signed in. If
      this is your first time, we will create a free account for you. Easy peasy.</div>
    <div class="flex flex-col gap-2 border-gray-200 rounded-lg p-4">
      <UInput v-model="magicForm.alias" icon="i-ph-user" placeholder="What should we call you?" />
      <UInput v-model="magicForm.email" icon="i-ph-envelope" placeholder="What is your email address?" />
      <UButton @click="() => login()" :disabled="!magicForm.active"
        class="bg-nuclear-blue-400 text-white px-4 py-2 rounded">
        Request Magic Link
      </UButton>
      <UButton v-if="emailFeedback.done" @click="enableResend" class="bg-green-200 text-white px-4 py-2 rounded">
        Resend
      </UButton>
    </div>
    <UModal v-model="emailFeedback.show" :title="emailFeedback.heading">
      <UCard>
        <template #header><span class="text-lg font-bold">{{ emailFeedback.heading }}</span></template>
        <div>{{ emailFeedback?.message }}</div>
        <template #footer>
          <UButton @click="() => emailFeedback.show = false">Close</UButton>
        </template>
      </UCard>
    </UModal>
  </div>
</template>

<script lang="ts" setup>
const magicForm = reactive({
  email: '',
  alias: '',
  active: true
})

const emailFeedback = reactive({
  done: false,
  show: false,
  heading: '',
  message: ''
})

const enableResend = () => {
  magicForm.active = true
  emailFeedback.done = false
}

// TODO: add field validation

const login = async () => {
  magicForm.active = false
  const response: any = await useAuthService().loginWithMagicLink(magicForm.email, magicForm.alias)

  if (response.status === 'success') {
    emailFeedback.heading = 'Magic Link Sent'
    emailFeedback.message = response.message
  } else {
    emailFeedback.heading = 'Error Sending Magic Link'
    emailFeedback.message = response.message
  }
  emailFeedback.show = true
  emailFeedback.done = true
}

</script>