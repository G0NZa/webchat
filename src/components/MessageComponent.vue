<script>
export default {
  name: 'messageComponent',
  props: ['messages'],
}
</script>

<template>
  <div class="messages">
  <ul>
    <li v-for="message in messages" :key="message.id">
      <div class="media-content">
        <div class="content">
          <p>
            <strong>{{message.user}}</strong> <small>{{message.date}}</small>
            <br>
            {{message.text}}
          </p>
        </div>
      </div>
    </li>
  </ul>
  </div>
</template>