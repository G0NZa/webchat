<script>
export default {
  name: 'inputNameComponent',
  props: ['isLogged'],
  data: function() {
    return {
      userName: ''
    };
  },
  methods: {
    sendUserName: function() {
      if (this.userName.length > 0) {
        this.$emit('set-name', this.userName);
      }
    }
  }
}
</script>
<template>
  <div id="nameInput" v-show="!isLogged">
    <div class="field is-grouped">
      <div class="control">
        <input
            v-model="userName"
            class="input is-primary" placeholder="Your name"
            @keydown.enter="sendUserName"
        />
      </div>
      <div class="control">
        <button
            :disabled="!userName"
            class="button is-primary"
            @click="sendUserName"
        >
          Enter
        </button>
      </div>
    </div>
  </div>
</template>