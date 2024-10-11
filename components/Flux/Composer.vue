<template>
  <div v-if="isActive" class="flux-composer">
    <textarea v-model="fluxContent" :placeholder="placeholder" id="flux-content"></textarea>
    <button @click="postFlux">{{ replyingTo ? 'Reply' : 'Flux it' }}</button>
    <button v-if="replyingTo" @click="cancelReply" class="cancel-reply">Cancel Reply</button>
  </div>
  <div v-else>
    <p>Please log in to flux.</p>
  </div>
</template>

<script setup>
import { useFluxStore } from '@/stores/flux'

const props = defineProps({
  replyingTo: {
    type: Object,
    default: null
  }
})

const fluxStore = useFluxStore()
const fluxContent = ref('')
const isActive = computed(() => fluxStore.activeAuthor)
const placeholder = computed(() =>
  props.replyingTo ? "Write your reply..." : "What's nu(-clear)?"
)

function postFlux() {
  const fluxData = {
    content: fluxContent.value,
    authorId: fluxStore.activeAuthor.id,
    parentId: props.replyingTo?.id,
  }
  // Send fluxData to your API
  console.log('Posting flux:', fluxData)
  console.log('replyingTo', props.replyingTo)
  fetch('/api/fluxes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(fluxData)
  })
    .then(response => response.json())
    .then(data => {
      console.log('Flux posted successfully:', data)
      console.warn('TODO: Add to reactions in store')
      // TODO: add reply to store.reactions for active flux
    })
    .catch(error => {
      console.error('Error posting flux:', error)
    })
  fluxContent.value = '' // Clear the input after posting
}

function cancelReply() {
  emit('cancel-reply')
}
</script>

<style scoped>
.flux-composer {
  margin-bottom: 20px;
}

textarea {
  width: 100%;
  height: 100px;
  padding: 10px;
  border: 1px solid #e1e8ed;
  border-radius: 5px;
}

button {
  margin-top: 10px;
  padding: 10px 20px;
  background-color: #1da1f2;
  color: white;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}

.replying-to {
  background-color: #f0f0f0;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
  font-size: 0.9em;
}

.cancel-reply {
  margin-left: 10px;
  padding: 5px 10px;
  background-color: #e0e0e0;
  color: #333;
  border: none;
  border-radius: 20px;
  cursor: pointer;
}
</style>