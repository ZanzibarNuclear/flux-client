<template>
  <div class="flux-composer">
    <div v-if="replyingTo" class="replying-to">
      Replying to: {{ replyingTo.content }}
    </div>
    <textarea v-model="fluxContent" :placeholder="placeholder" id="flux-content"></textarea>
    <button @click="postFlux">{{ replyingTo ? 'Reply' : 'Flux it' }}</button>
    <button v-if="replyingTo" @click="cancelReply" class="cancel-reply">Cancel Reply</button>
  </div>
</template>

<script setup>
const props = defineProps({
  replyingTo: {
    type: Object,
    default: null
  }
})
const fluxContent = ref('')

const placeholder = computed(() =>
  props.replyingTo ? "Write your reply..." : "What's nu(-clear)?"
)

function postFlux() {
  const fluxData = {
    content: fluxContent.value,
    parent_id: props.replyingTo?.id,
    author: "zanzibar",
  }
  // Send fluxData to your API
  console.log('Posting flux:', fluxData)
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
      if (props.replyingTo) {
        emit('reply-posted', data)
      } else {
        emit('posted', data)
      }
    })
    .catch(error => {
      console.error('Error posting flux:', error)
    })
  fluxContent.value = '' // Clear the input after posting
}

function cancelReply() {
  emit('cancel-reply')
}

const emit = defineEmits(['posted', 'reply-posted', 'cancel-reply'])
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