<template>
  <div id="app">
    <NavBar :sections="sections" v-on:TOGGLE_SIDEBAR="toggleSidebar"></NavBar>
    <SideBar :sections="sections" :visible="showSidebar" v-on:TOGGLE_SIDEBAR="toggleSidebar"></SideBar>
    <!-- <MainContent></MainContent> -->
    <!-- <FooterBar></FooterBar> -->
  </div>
</template>

<script>
import { NavBar, SideBar } from '~/components';
import ResumeData from '~/resume.json';

export default {
  components: {
    'NavBar': NavBar,
    'SideBar': SideBar
  },
  data: () => {
    return {
      resume: ResumeData,
      sections: [
        { title: 'ABOUT', path: '#about' },
        { title: 'PORTFOLIO', path: '#portfolio' },
        { title: 'EXPERIENCE', path: '#experience' },
        { title: 'CONTACT', path: '#contact' },
      ],
      showSidebar: false,
    };
  },
  methods: {
    toggleSidebar() {
      this.showSidebar = !this.showSidebar;
    },
  },
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