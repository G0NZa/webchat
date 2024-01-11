<template>
  <div class="mx-5 my-5">
    <h5 class="subtitle is-4">VueJS, SocketIO and NodeJS chat</h5>
    <br>
    <h2 v-if="isLogged">Hello <b>{{ this.userName }}</b></h2>
    <!-- Chat Box goes here -->
    <div class="columns">
      <div class="column is-two-thirds">

        <!-- inputs user name -->
        <inputNameComponent
            :is-logged="isLogged"
            @set-name="setName"
        />

        <!-- message list -->
        <div class="box" v-show="isLogged">
          <messageComponent :messages="messages" />
          <!-- inputs new message -->
          <inputMessageComponent @send-message="sendMessage" />
        </div>
      </div>

      <!-- user list -->
      <div class="column">
        <usersComponent :users="users" />
      </div>
    </div>
  </div>
</template>
<script>
/* eslint-disable */
import { ref } from 'vue';
import { io } from 'socket.io-client';
import inputMessageComponent from './components/InputMessageComponent';
import inputNameComponent from './components/InputNameComponent';
import messageComponent from './components/MessageComponent';
import usersComponent from './components/UsersComponent';

export default {
  name: 'App',
  components: {
    inputNameComponent,
    inputMessageComponent,
    messageComponent,
    usersComponent,
  },
  setup() {
    const messages = ref([]);
    const users = ref([]);
    const userName = ref('');
    const isLogged = ref(false);

    return {
      messages,
      users,
      userName,
      isLogged,
    }
  },
  methods: {
    sendMessage(message) {
      if (message) {
        this.socket.emit('send-msg', { message: message, user: this.userName });
      }
    },
    setName(userName) {
      this.userName = userName;
      this.isLogged = true;
      this.socket.emit('add-user', this.userName);
    },
    scrollToEnd() {
      const container = this.$el.querySelector('.messages');
      container.scrollTop = container.scrollHeight;
    }
  },
  created() {
    // Client Socket events
    this.socket = io(process.env.VUE_APP_SOCKET_URL);

    // When the server emits a message, the client updates message list
    this.socket.on('read-msg', (message) => {
      this.messages.push(message);

      setTimeout(() => this.scrollToEnd(), 100);
    });

    // When user connects, the server emits user-connected event which updates user list
    this.socket.on('user-connected', (userId) => {
      this.users.push(userId);
    });

    // Init chat event. Updates the initial chat with current messages
    this.socket.on('init-chat', (messages) => {
      this.messages = messages;
    });

    // Init user list. Updates user list when the client init
    this.socket.on('update-users', (users) => {
      this.users = users;
    });
  },
  updated() {
    this.scrollToEnd();
  },
};
</script>