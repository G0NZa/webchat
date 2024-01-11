<script>
export default {
  name: 'inputMessageComponent',
  data: function() {
    return {
      message: ''
    };
  },
  methods: {
    send: function() {
      if (this.message.length > 0) {
        this.$emit('send-message', this.message);
        this.message = '';
      }
    }
  }
}
</script>
<template>
  <div class="controls field has-addons">
    <div class="control is-expanded">
      <input
          v-model="message"
          class="input is-primary"
          placeholder="Write message"
          @keydown.enter="send">
    </div>
    <div class="control">
      <button
          :disabled="!message"
          class="button is-primary"
          @click="send"
      >
        Send
      </button>
    </div>
  </div>
</template>