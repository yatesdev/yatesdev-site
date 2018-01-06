<template>
  <div id="app">
    <NavBar></NavBar>
  </div>
</template>

<script>
import { NavBar } from '~/components';
import ResumeData from '~/resume.json';

export default {
  components: {
    'NavBar': NavBar,
  },
  data: () => {
    return ResumeData;
  }
}
</script>

<style lang="scss">
body {
  width: 100%;
  height: 100%;
  margin: 0%;
  background-color: #efefef;
}
</style>