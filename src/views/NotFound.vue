<template>
  <div>
    <h1>Oops!</h1>
    <h3>
      The <template v-if="resource">{{ resource }}</template>
      <template v-if="resource === 'page'"> page</template> you're looking for is
      not here.
    </h3>
    <router-link :to="{ name: 'Home' }">Back to the home page</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
}
</script>

<style scoped>
div {
  @apply w-120 mx-auto mt-4;
}
h1 {
  font-size: 50px;
  font-weight: 700;
}
h3 {
  font-size: 28px;
  font-weight: 700;
}
</style>
