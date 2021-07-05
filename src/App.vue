<template>
  <div class="view-login flex justify-center h-screen bg-red-500">
    <div class="w-full max-w-xs my-auto" 
      v-if="state.username === '' || state.username === null">
      <form class="bg-white shadow-md rounded-xl px-8 pt-6 pb-8 mb-4"
        @submit.prevent="Login">
      <h1 class="mb-5 text-center font-semibold text-gray-700 text-3xl">Login to firechat</h1>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="username">
            Username
          </label>
          <input 
            v-model="inputUsername"
            class="shadow bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" 
            id="username" type="text" placeholder="Username">
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 text-sm font-semibold mb-2" for="password">
            Password
          </label>
         <input class="shadow bg-gray-100 appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" type="text" placeholder="********">
        </div>
        <div class="flex items-center justify-between">
          <button 
          class="bg-red-500 hover:bg-red-700 text-white font-semibold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full" 
          type="submit">
            Sign In
          </button>
        </div>
      </form>
    </div>
    <div v-else class="view-chat rounded-xl w-full max-w-xs h-screen bg-gray-100">
      <header class="h-1/6 flex justify-between w-full">
        <h1 class="text-gray-700 text-3xl self-center">Welcome {{ state.username }}</h1>
        <button 
          class=" self-center text-white bg-gray-200 p-2 rounded-md"
          @click="Logout">LogOut</button>
      </header>
      <section class="chat-box h-4/6 bg-gray-200 rounded-md pt-5 overflow-y-scroll block">
      <div class="inline-block">

        <div class="mb-2 "
          v-for="message in state.messages" 
          :key="message.key"
          >
            <p :class="(message.username == state.username) ? 'w-full p-1 rounded-xl text-gray-700 text-sm mx-1 justify-end'
              : 'flex float-right w-full p-1 rounded-xl text-gray-700 text-sm mx-1 justify-end ' ">{{ message.username }}</p>
            <p :class="(message.username == state.username) ? 'w-full bg-red-400 py-1 px-2 rounded-xl text-white mx-1 max-w-max'
              : 'flex float-right bg-red-400 py-1 px-2 rounded-xl text-white mx-1 max-w-max'">{{ message.content }}</p>
        </div>
      </div>
      </section>
      <footer class="h-1/6">
        <form action="" class="h-full rounded-lg flex justify-between pb-2 pt-10 px-1"
            @submit.prevent="SendMessage">
          <input 
            type="text" 
            placeholder="Write a message" 
            v-model="inputMessage"
            class="bg-gray-200 w-full rounded-md text-black text-sm border-none outline-none py-3 px-2">
          <input 
            type="submit" 
            value="Send"
            class="bg-green-500 hover:bg-green-700 text-sm p-2 ml-2 text-white rounded-md cursor-pointer">
        </form>
      </footer>
    </div>
  </div>
</template>

<script>
import { reactive, onMounted, ref } from 'vue';
import db from "./db";

export default {
  setup() {
    const inputUsername = ref("")
    const inputMessage = ref("")

    const state = reactive ({
      username: "",
      messages:[]
    });

    const Login = () => {
      if(inputUsername.value != '' || inputUsername.value != null){
        state.username = inputUsername.value
        inputUsername.value = ""
      }
    }

    const Logout = () => {
      state.username = "";
    }

    const SendMessage = () => {
      const messagesRef = db.database().ref("messages")

      if(inputMessage.value === '' || inputMessage.value === null){
        return;
      }

      const message = {
        username: state.username,
        content: inputMessage.value
      }

      messagesRef.push(message)
      inputMessage.value = ""
    }
    
    onMounted(() => {
      const messagesRef = db.database().ref("messages")

      messagesRef.on('value', snapshot => {
        const data = snapshot.val();
        let messages = []

        Object.keys(data).forEach(key => {
          messages.push({
            id:key,
            username: data[key].username,
            content: data[key].content
          });
        });

        state.messages = messages;
      });
    });

    return {
      state,
      inputUsername,
      inputMessage,
      Login,
      SendMessage,
      Logout
    }
    
  }
}
</script>