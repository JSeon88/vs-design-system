<template>
  <div class="hello">
    <h1>{{ currentCount }}</h1>
    <button @click="upCount">Up</button>
    <button @click="downCount">down</button>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed, ref } from 'vue'

export default defineComponent ({
  props: {
    msg: String
  },
  setup() {
    let count = ref(0);
    const currentCount = computed(() => {
      return count.value;
    })

    function upCount() {
      return ++count.value;
    }

    function downCount() {
      return --count.value;
    }

    return {
      currentCount,
      upCount,
      downCount,
    }
  }
})
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
