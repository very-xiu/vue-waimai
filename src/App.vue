<template>
  <div id="app">
    <router-view></router-view>
    <FooterGuide v-show="$route.meta.showFooter"></FooterGuide>
  </div>
</template>

<script>
import FooterGuide from "./components/FooterGuide/FooterGuide.vue";
import HeaderTop from "./components/HeaderTop/HeaderTop.vue";
import { mapActions, mapState } from "vuex";

export default {
  components: {
    FooterGuide,
    HeaderTop
  },
  mounted() {
    // this.$store.dispatch('getAddress');
    this.getAddress();
    this.getUserInfo();
  },
  methods: {
    ...mapActions(["getAddress", "getUserInfo"])
  },
  computed: {
    ...mapState(["address", "categorys", "userInfo"])
  }
};
</script>

<style lang="stylus" rel="stylesheet/stylus">
#app {
  width: 100%;
  height: 100%;
  background-color: #f5f5f5;
}
</style>
