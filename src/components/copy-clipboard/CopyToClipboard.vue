<script lang="ts" setup>
import { ref } from 'vue'

const textToCopy = ref('')
const copied = ref(false)
const copiedMessage = ref('Text copied to clipboard!')

const copyToClipboard = async () => {
  try {
    await navigator.clipboard.writeText(textToCopy.value)
    copied.value = true
    setTimeout(() => {
      copied.value = false
    }, 2000) // Hide the message after 2 seconds
  } catch (err) {
    console.error('Failed to copy: ', err)
  }
}
</script>

<template>
  <div>
    <input v-model="textToCopy" placeholder="Type text to copy" />
    <button @click="copyToClipboard">Copy Text</button>
    <p v-if="copied">{{ copiedMessage }}</p>
  </div>
</template>
