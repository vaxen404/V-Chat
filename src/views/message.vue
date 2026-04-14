<script setup>
import { ref, onMounted, nextTick } from "vue"
import { useRouter } from "vue-router"

const router = useRouter()
const messages = ref([])
const newMessage = ref('')
const messageContainer = ref(null)
const myName = localStorage.getItem('userName') || 'Misafir'
let socket = null

const scrollToBottom = async () => {
    await nextTick()
    if (messageContainer.value) {
        messageContainer.value.scrollTop = messageContainer.value.scrollHeight
    }
}

onMounted(() => {
    socket = new WebSocket('ws://localhost:3000')
    socket.onmessage = (event) => {
        messages.value.push(event.data)
        scrollToBottom()
    }
})

const sendMessage = () => {
    if (newMessage.value.trim() !== '') {
        socket.send(`${myName}: ${newMessage.value}`)
        newMessage.value = ''
    }
}

const logout = () => {
    localStorage.clear()
    router.push('/')
}
</script>

<template>
  <div class="chat-wrapper">
    <div class="message-list" ref="messageContainer">
      <div v-if="messages.length === 0" class="empty-state">
        Sohbet başlatıldı. Hoş geldin {{ myName }}!
      </div>
      <div v-for="(msg, index) in messages" :key="index" class="bubble">
        {{ msg }}
      </div>
    </div>

    <div class="input-area">
      <input v-model="newMessage" @keyup.enter="sendMessage" placeholder="Mesajınızı yazın...">
      <button class="send-btn" @click="sendMessage">Gönder</button>
      <button class="logout-btn" @click="logout">Ayrıl</button>
    </div>
  </div>
</template>

<style scoped>
.chat-wrapper { display: flex; flex-direction: column; height: 100%; background-color: #1e1e1e; }
.message-list { flex: 1; overflow-y: auto; padding: 20px; display: flex; flex-direction: column; gap: 10px; }
.bubble { background-color: #2d2d2d; color: #eee; padding: 10px 15px; border-radius: 8px; max-width: 85%; align-self: flex-start; border: 1px solid #333; }
.empty-state { color: #444; text-align: center; margin-top: 40px; }
.input-area { height: 75px; background-color: #181818; display: flex; align-items: center; padding: 0 20px; gap: 10px; border-top: 1px solid #2a2a2a; }
input { flex: 1; height: 42px; background-color: #252525; border: 1px solid #333; color: white; padding: 0 15px; border-radius: 6px; outline: none; }
.send-btn { background: #42b883; color: white; border: none; padding: 0 20px; border-radius: 6px; cursor: pointer; height: 42px; font-weight: bold; }
.logout-btn { background: #ff4d4d; color: white; border: none; padding: 0 15px; border-radius: 6px; cursor: pointer; height: 42px; }
</style>