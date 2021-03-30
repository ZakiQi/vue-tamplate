<template>
  <div class="home">
    <el-button>默认按钮</el-button>
  </div>
</template>

<script>
export default {
  name: 'name',

  data() {
    return {
      aaa: "222",
      bbb: "333"
    }
  },

  created() {
    let aaaaa = "3333";
    console.log(aaaaa);
  }
}
</script>

<style lang="scss">
.home {
  background-color: #1e2941;
  height: 100%;
  width: 100%;
  padding: 20px;
  color: #ffffff;
  font-size: 13px;
  box-sizing: border-box;
}
</style>
