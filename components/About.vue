<template>
  <section class="about">
    <div class="profile">
      <div class="image"></div>
      <div class="title">{{info.name}}</div>
      <div>{{age}}</div>
    </div>
  </section>
</template>

<script>
export default {
  props: {
    info: {
      type: Object,
      required: true,
    },
  },
  data: () => {
    return {}
  },
  computed: {
    age: () => {
      return Math.trunc((Date.now() - new Date('1992-08-23'))/(1000*60*60*24*365));
    }
  }

}
</script>

<style lang="scss" scoped>
  .about {
    grid-column: col-start 4 / span 6;
    background-color: #fff;
    margin: auto;
    width: 100%;
  }
  .profile {
    display: grid;
    grid-template-colums: repeat(12, [col-start] 1fr);
  }
  .image {
    grid-column: col-start / span 6;
  }
  .title {
    grid-column: col-start 5 / span 6;
  }
</style>