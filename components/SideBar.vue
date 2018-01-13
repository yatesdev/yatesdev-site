<template>
  <div :class="['nav-sidebar' , { visible: visible }]">
    <button class="nav-sidebar-close" @click="toggleSidebar">
      <i class="rsicon rsicon-close"></i>
    </button>
    <div class="nav-sidebar-links">
      <ul>
        <li v-for="section in sections" :key="section.title">
          <a :href="section.path">{{section.title}}</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'sidebar',
  props: {
    sections: {
      type: Array,
      required: true,
    },
    visible: {
      type: Boolean,
      required: true,
    },
  },
  methods: {
    toggleSidebar() {
      this.$emit('TOGGLE_SIDEBAR');
    }
  }
};
</script>

<style lang="scss" scoped>
  .nav-sidebar {
    position: fixed;
    right: 0;
    top: 0;
    height: 100%;
    width: 300px;
    z-index: 100;
    background-color: #07cb79;
    -webkit-transform: translateX(300px);
    -moz-transform: translateX(300px);
    transform: translateX(300px);
    transition: transform 400ms cubic-bezier(0.37, 0.15, 0.32, 0.94);
    &.visible {
      transform: translateX(0);
    }
  }

  .nav-sidebar-links {
    ul {
      margin: 0;
      padding: 0;
      list-style: none;
    }
    li {
      line-height: 1;
      margin-bottom: 20px;
    }
    a {
      color: #fff;
      font-size: 14px;
      font-weight: 600;
      font-family: 'Open Sans', sans-serif;
      line-height: 1;
      display: inline-block;
      text-decoration: none;
    }
    padding: 50px 14px 20px 50px;
  }

  .nav-sidebar-close {
    position: absolute;
    right: 10px;
    top: 10px;
    border: 0;
    margin: 0;
    padding: 0;
    background: transparent;
    display: block;
    i {
      color: #3d4451;
      font-size: 25px;
      line-height: 1;
      display: block;
    }
  }
</style>