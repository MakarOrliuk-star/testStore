<!-- eslint-disable -->
<template lang="pug">
  .product
    ul.list-group.with-width(
        v-for="({ groupName, products }, groupId) in productsByGroups"
        :key="groupId"
    )
      li.list-group-item.with-box-shadow
        .product-group-name {{groupName}}
        ul.product-name(
          v-for="product in Object.values(products)"
          :key="product.id"
        )
          .product-name-result {{product.name}} &nbsp ({{product.productQuantity}})
          .product-price-rub
            .product-with-margin(
              :class="getExchangeRates.RUB < newExchangeRate ? 'red' : 'green'"
            ) ₽ {{product.price.RUB}}
            .product-btn(@click="onClickAddToCart(groupId, product.id, product.productQuantity, product.name)") Купить
</template>

<script>
/*eslint-disable*/
import {mapActions, mapGetters, mapMutations} from 'vuex'

export default {
  props:{
    newExchangeRate: {
      type: [Number, String],
      default: null
    }
  },
  data() {
    return {
    }
  },
  mounted() {
    this.getProducts()
  },
  methods: {
    ...mapActions([
        'getProducts'
    ]),
    ...mapMutations(['addCart']),
    onClickAddToCart(groupId, productId, productQuantity, name){
      const cartItemIndex = this.getCart.findIndex(cart => cart.groupId === groupId && cart.productId === productId)
      if (this.getCart[cartItemIndex]?.productQuantity === productQuantity){
        return false
      }
      this.addCart({ groupId, productId, name })
    },
  },
  computed:{
    ...mapGetters([
        'getCart',
      'getExchangeRates'
        ]),
    productsByGroups(){
      return this.$store.state.products.productsByGroups
    }
  },
}
</script>

<style scoped>
.product-name {
  display: flex;
  justify-content: space-between;
  width: 800px;
}

.with-width {
  margin: 0 auto;
  width: 900px;
  padding: 0 0 20px 0;
}

.with-box-shadow {
  box-shadow: 2px 2px 8px #333;
}

.product {
  margin: 38px;
}

.product-price-rub {
  display: flex;
  position: relative;
  left: 70px;
}

.product-name-result {
  display: flex;
  margin-top: 15px;
}

.product-group-name {
  border-bottom-style: groove;
}

.product-with-margin {
  margin-top: 15px;
  margin-right: 10px;
}

.product-btn {
  color: #00ad5f;
  border: 1px solid #00ad5f;
  padding: 10px;
  margin: 5px;
  border-radius: 7px;
  cursor: pointer;
  background-color: #fff;
  transition: all .3s linear;
}

.product-btn:hover {
  color: #fff;
  border: 1px solid #00ad5f;
  background-color: #00ad5f;
}
</style>