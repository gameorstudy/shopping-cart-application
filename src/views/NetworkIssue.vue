<template>
  <div>
    <h1>Uh-Oh!</h1>
    <h3>
      It looks you're experiencing some network issues, please click the back
      button and try again.
    </h3>

    <router-link :to="{ name: 'Home' }"
      >Or go back to the home page</router-link
    >
  </div>
</template>

<script>
export default {}
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
