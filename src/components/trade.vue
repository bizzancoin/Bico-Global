<template>
  <!--交易币种行情-->
  <vue-seamless-scroll :data="ticketArr" :class-option="optionLeft" class="warp">
    <ul class="transaction_pair">
      <li v-for="(item, index) in ticketArr" :key="item.symbol + index" @click="detailFun(item)">
        <div class="pairList">
          <div growing-ignore="true" class="trade-block">
            <ul class="market-ticker">
              <li data-ha-click="">
                <a>
                  <dl class="htusdt">

                    <dt>
                      <strong><img :src="item.img" style="width: 20px;height: 20px;margin-right: 4px;border-radius: 30px;position: relative;top: -2px;"/>{{ item.symbol }}</strong>
                    </dt>

                    <dd class="price">
                      ${{ item.close }}
                      <em>≈ {{ (item.close*rateNumber).toFixed(item.number) }}</em>
                    </dd>

                    <dd class="vol">24H Vol {{ item.amount }}</dd>

                    <dd class="rate rise">

                        <p class="profie" v-if="item.rose.toFixed(2) > 0">+{{ item.rose.toFixed(2) }}%
                          <img src="../assets/ht.png" style="position: absolute;top: 68px;right: -2px;width: 100%;"/>
                        </p>

                        <p class="loss" v-else>{{ item.rose.toFixed(2) }}%
                          <img src="../assets/lt.png" style="position: absolute;top: 68px;right: -2px;width: 100%;"/>
                        </p>

                    </dd>

                  </dl>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </li>
    </ul>
  </vue-seamless-scroll>
</template>
<script>
import { ticketApi } from "@/api/getData";
import vueSeamlessScroll from "vue-seamless-scroll";
export default {
  props: ["activeName"],
  components: {
    vueSeamlessScroll,
  },
  data() {
    return {
      ticketArr: [], //币种行情数据
      timer: null,
      rateNumber:sessionStorage.getItem("platFormRateNumber"),
    };
  },
  computed: {
    optionLeft() {
      return {
        direction: 2,
        limitMoveNum: 2,
        hoverStop: false,
      };
    },
  },
  mounted() {
    var that = this;
    that.ticketFun();
    that.timer = setInterval(() => {
      that.ticketFun();
    }, 2000);
  },
  methods: {
    detailFun(item){
      var that = this;
      that.$router.push('/currencyTrade?symbol='+item.symbol);
    },
    async ticketFun() {
      //币种行情
      var that = this;
      var data = new URLSearchParams();
      data.set("type", that.activeName);
      var res = await ticketApi(data);
      that.ticketArr = [];
      if (res.success) {
        var arr = res.data;
        arr.forEach((element) => {
          if (element.symbol != "") {
            that.ticketArr.push(element);
          }
        });
      } else {
        clearInterval(that.timer);
      }
    },
  },
  destroyed() {
    clearInterval(this.timer);
  },
};
</script>
<style lang="less">
.warp {
  overflow: hidden;
}
.transaction_pair {
  display: -ms-flexbox;
  display: flex;
  -ms-flex-pack: center;
  justify-content: center;

  border-top: 1px solid hsla(0, 0%, 100%, 0.15);

  color: #536ea5;
  .pairList {
    width: 240px;
  }
  .profie {
    color: #da1e1e;

  }
  .loss {


    color: #0da88b;
  }
}

dd {
  display: block;
  margin-inline-start: 0px;
}
</style>
