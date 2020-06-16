<template>
  <div>
    <button
      class="decreasing"
      v-bind:class="{ disabledButton: amount === 1 }"
      @click="reduceByOne"
      :disabled="amount === 1"
    >
      &minus;
    </button>
    <input type="text" v-model="amount" readonly />
    <button class="increasing" @click="increaseByOne">&plus;</button>
  </div>
</template>

<script>
export default {
  props: {
    amount: {
      type: Number,
      required: true
    }
  },
  methods: {
    reduceByOne() {
      this.$emit('reduceByOne')
    },
    increaseByOne() {
      this.$emit('increaseByOne')
    }
  },
}
</script>

<style scoped>
div {
  @apply flex;
}

button.decreasing,
button.increasing,
input[type='text'] {
  @apply w-8 h-8 outline-none;
}

button {
  @apply border border-blue-400 bg-white text-blue-400 flex justify-center items-center;
}

button.decreasing {
  border-top-left-radius: 0.25rem;
  border-bottom-left-radius: 0.25rem;
}

button.increasing {
  border-top-right-radius: 0.25rem;
  border-bottom-right-radius: 0.25rem;
}

input[type='text'] {
  @apply border-l-0 border-r-0 border-t border-b border-blue-400 text-center text-xs;
}

button:hover {
  @apply border-none bg-blue-400 text-white;
}

button.disabledButton {
  @apply border-none text-white bg-disabled cursor-default;
}
</style>
