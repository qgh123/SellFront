<template>
  <div class="main-div">
    <app-main class="bgColor"></app-main>
    <!--<loading class="loading-wrapper" v-if="httpArray || httpLoading"></loading>-->
  </div>
</template>

<script>
  import AppMain from './AppMain'
  export default {
    name: "main-layout",
    components: {
      AppMain
    }
  }
</script>


<style>
  .bgColor {
    background-color: #fff;
  }
  .main-div {
    margin: 0 auto;
    width: 100%;
  }
</style>

