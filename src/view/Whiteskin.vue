<template>

  <div class="pdf">



    <div class="txt" v-html="content">

    </div>

    <div style="height:300px;"></div>

    <Foot/>
  </div>


</template>

<script>
import Foot from '@/components/Foot'
import { booksApi } from '@/api/getData'
    export default {
        components:{
            Foot
        },
  data() {
    return {
      content:'',
      src: ''
    };
  },

  created: function() {
    this.init();
  },
  computed: {
    lang() {
      return this.$store.state.lang;
    },
    langPram(){
      return this.$store.state.lang;
    }
  },
  methods: {
    async init() {
      ///this.$store.state.HeaderActiveName = "1-8";
      //this.$store.commit("navigate", "nav-whitepaper");
      var dataArr = new URLSearchParams();
      var language = this.$i18n.locale
      dataArr.set("language",language)
      var res = await booksApi(dataArr);
      if(res.code == 200){

        this.content = res.data.content
      }
    },
    changePdfPage (val) {
      if (val === 0 && this.currentPage > 1) {
        this.currentPage--;
      }
      if (val === 1 && this.currentPage < this.pageCount) {
        this.currentPage++;
      }
    },
    loadPdfHandler (e) {
      this.currentPage = 1;
    }
  }
};
</script>

<style lang="scss" scoped>
.pdf{
  text-align:center;
  padding-top: 0px;
  width: 100%;
  height: 100%;
  padding-bottom: 0px;
  background: #51565b !important;
}
</style>
