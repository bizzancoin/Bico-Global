<template>
  <div
    id="app"
    class="theme-default"
    :class="[theme ==='day' ? 'day' : 'night']"
    ref="appbox"
  >
    <transition name="el-fade-in-linear" class="allDiv" v-if="isRouterAlive">
      <router-view></router-view>
    </transition>
  </div>
</template>
<script>
export default {
  name: "App",
  provide() {
    return {
      reload: this.reload,
    };
  },
  data() {
    return {
      isRouterAlive: true,
      theme: localStorage.getItem('localTheme')?localStorage.getItem('localTheme'):'day',
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function () {
        this.isRouterAlive = true;
      });
    },
  },
  mounted: function () {
    var that=this;
    this.$bus.on("changeTheme", function (theme) {

      localStorage.setItem('localTheme',theme);
      that.theme = theme ;
    });
  },
  destroyed: function () {
    this.$bus.off("changeTheme");
  },
};
</script>

<style lang="less">
/*body {

  font-family: HarmonyOS Sans,PingFang SC,Microsoft Yahei,Heiti SC,WenQuanYi Micro Hei,Helvetica Neue,Helvetica,Arial,sans-serif!important;

}*/

body{


  /*font-family:NotoKufiArabic,'Uni Neue',Arial,sans-serif;*/
  font-family: 'Gate_Sans Medium';

}

body,
html {
  width: 100%;
  height: 100%;

  margin: 0;
  padding: 0;
  font-size: 14px;

  /* background-color: #0B0B0B; */
  /* color: #ffffff; */
}
html {
  min-width: 1200px;
}
body::-webkit-scrollbar,
html::-webkit-scrollbar {
  width: 0px !important;
  display: none;
}
html {
  scrollbar-width: none;
}

</style>
