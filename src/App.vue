<template lang="pug">
  div
    .app
      .exchange-rate Курс: &nbsp
        input.profile-edit_input(
          v-model="exchangeRate"
          :placeholder="getExchangeRates && getExchangeRates.RUB ? getExchangeRates.RUB : 'Введите новый курс'"
          @change="changeExchangeRates(exchangeRate)"
        )
      Products(
        :newExchangeRate="newExchangeRate"
      )
      Cart(
        v-if="getCart.length"
        :cart_data="getCart"
      )
</template>

<script>
import Products from "@/components/store/Products"
import Cart from "@/components/store/Cart";
import {mapGetters, mapActions, mapMutations} from 'vuex'

export default {
  name: 'App',
  components: {
    Products,
    Cart
  },
  data(){
    return{
      exchangeRate: null,
      newExchangeRate: null,
    }
  },
  mounted() {
    setInterval( () => {
      this.getProducts()
    },15000)
  },
  methods:{
    ...mapActions(['addToCart', 'getProducts']),
    ...mapMutations(['updateExchangeRates']),
    changeExchangeRates(val){
      // Лимит от 20  до 80
      if ( val >= 20 && val <= 80) {
        this.updateExchangeRates({ key: 'RUB', val })
      }
      return this.newExchangeRate = val
    }
  },
  computed:{
    ...mapGetters([
        'getCart',
        'getProductsByGroups',
        'getExchangeRates'
    ])
  },
}
</script>

<style>
body {
  margin: 0;
  padding: 0;
}

.app {
  display: flex;
}

.exchange-rate {
  margin: 40px 40px 10px 70px;
}

.profile-edit_input {
  color: #00ad5f;
  border: 1px solid #00ad5f;
  padding: 10px;
  border-radius: 7px;
  cursor: pointer;
  background-color: #fff;
  transition: all .3s linear;
  width: 100px;
}
</style>
