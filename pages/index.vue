<template>
  <div id="app">
    <NavBar></NavBar>
    <!-- <SideBar></SideBar> -->
    <!-- <MainContent></MainContent> -->
    <!-- <FooterBar></FooterBar> -->
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

#app {
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-gap: 20px;

  & > * {
    grid-column: col-start / span 12;
  }
}

</style>