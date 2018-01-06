<template>
  <header>
    <a class="logo" href="/"><span>Yates</span>Dev</a>
    <button class="sidebar-toggle"></button>
  </header>
</template>

<script>
export default {
  data: () => {
    return {}
  }
}
</script>

<style lang="scss" scoped>
header {
  display: grid;
  grid-template-columns: repeat(12, [col-start] 1fr);
  grid-gap: 20px;
  background-color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  margin-bottom: 2em;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23);
}

.logo {
  grid-column: col-start / span 5;
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
  grid-column: col-start 11 / span 2;
  margin: auto;

  @media (min-width: 500px) {
    display: none;
  }
}
</style>