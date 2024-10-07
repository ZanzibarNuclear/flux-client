<template>
  <div class="flux-composer">
    <div v-if="replyingTo" class="replying-to">
      Replying to: {{ replyingTo.content }}
    </div>
    <textarea v-model="fluxContent" :placeholder="placeholder"></textarea>
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
    parent_id: props.replyingTo?.id
  }
  // Send fluxData to your API
  console.log('Posting flux:', fluxData)
  fluxContent.value = '' // Clear the input after posting
  if (props.replyingTo) {
    emit('reply-posted')
  }
}

function cancelReply() {
  emit('cancel-reply')
}

const emit = defineEmits(['reply-posted', 'cancel-reply'])
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