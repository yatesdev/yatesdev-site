<template>
  <header>
    <div class="logo"><span>Yates</span>Dev</div>
  </header>
</template>

<script>
export default {
  data: () => {
    return { name: 'Dev' }
  }
}
</script>

<style lang="scss" scoped>
header {
  position: relative;
  background-color: #fff;
  margin-bottom: 2em;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.19), 0 6px 10px rgba(0, 0, 0, 0.23);
}

.logo {
  color: #9a9da2;
  font-size: 30px;
  font-weight: 400;
  font-family: 'Fredoka One', cursive;
  vertical-align: middle;
  overflow: hidden;
  padding-top: 10px;
  padding-bottom: 10px;
  padding-left: 15px;

  span {
    color: #07cb79;
    margin-right: 1px;
  }
}
</style>