<template>
  <div class="nav-bar">
    <header>
      <a class="logo" href="/"><span>Yates</span>Dev</a>
      <button class="sidebar-toggle" @click="toggleSidebar()">
        <i class="rsicon rsicon-menu"></i>
      </button>
      <nav class="nav-links">
        <div class="nav-link" v-for="section in sections" :key="section.title">
          <nuxt-link :to="section.path">
            {{section.title}}
            <span></span>
          </nuxt-link>
        </div>
      </nav>
    </header>
  </div>
</template>

<script>
export default {
  props: {
    sections: {
      type: Array,
      required: true,
    }
  },
  data: () => {
    return {}
  },
  methods: {
    toggleSidebar: () => {
      this.$emit('TOGGLE_SIDEBAR');
    },
  },
}
</script>

<style lang="scss" scoped>
.nav-bar {
  display: block;
}
header {
  display: flex;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-gap: 20px;
  background-color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 2em;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23);
}

.logo {
  flex: 1 0 auto;
  padding-left: 15px;
  margin: auto;
  vertical-align: middle;
  overflow: hidden;
  color: #9a9da2;
  font-size: 30px;
  font-weight: 400;
  font-family: 'Fredoka One', cursive;
  text-decoration: none;
  span {
    color: #07cb79;
    margin-right: 1px;
  }

  @media (min-width: 500px) {
    grid-column: col-start / span 2;
  }
}

.sidebar-toggle {
  flex: 0 1 auto;
  margin: auto;
  margin: 0;
  padding-right: 15px;
  background: transparent;
  border: none;
  i {
    font-size: 25px;
    line-height: 1;
    display: block;
  }
  @media (min-width: 500px) {
    display: none;
  }
}

.nav-links {
  flex: 0 1 auto;
  display: none;
  // grid-column: col-start 9 / span 3;
  line-height: 3em;
  @media (min-width: 500px) {
    display: flex;
    flex-direction: row;
  }
}
.nav-link {
  display: none;
  position: relative;
  margin: 0 30px 0 0;
  a {
    margin: auto;
    vertical-align: middle;
    text-decoration: none;
    text-transform: uppercase;
    padding: 15px 0 12px;
    line-height: 1;
    color: #3d4451;
    font-size: 13px;
    font-weight: 700;
    font-family: 'Open Sans', sans-serif;
    span {
      background-color: #07cb79;
      position: absolute;
      left: 0;
      top: 80%;
      width: 0;
      height: 3px;
      border-radius: 10px;
      transition: width 150ms linear 0s;
    }
    &:hover,
    &.nuxt-link-active {
      span {
        width: 100%;
      }
    }
  }

  @media (min-width: 500px) {
    display: block;
    flex: 1 0 auto;
  }
}
</style>