<template>
  <div id="app">
    <NavBar :sections="sections" v-on:TOGGLE_SIDEBAR="toggleSidebar"></NavBar>
    <SideBar :sections="sections" :visible="showSidebar" v-on:TOGGLE_SIDEBAR="toggleSidebar"></SideBar>
    <div class="main-content">
      <About :info="resume.basics"></About>
    </div>
    <!-- <MainContent></MainContent> -->
    <!-- <FooterBar></FooterBar> -->
  </div>
</template>

<script>
import { NavBar, SideBar, About } from '~/components';
import ResumeData from '~/resume.json';

export default {
  components: {
    'NavBar': NavBar,
    'SideBar': SideBar,
    'About': About,
  },
  data: () => {
    return {
      resume: ResumeData,
      sections: [
        { title: 'About', path: '#about' },
        { title: 'Portfolio', path: '#portfolio' },
        { title: 'Experience', path: '#experience' },
        { title: 'Contact', path: '#contact' },
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

.main-content {
  margin-top: 100px;
  position: relative;
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-gap: 20px;
  & > * {
    grid-column: col-start / span 12;
  }
}

</style>