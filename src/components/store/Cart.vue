<!-- eslint-disable -->
<template lang="pug">
  .cart
    ul.list-group.with-width(
      v-for="{ groupId, productId, productQuantity, name } in cart_data"
      :key="name"
    )
      li.list-group-item.with-box-shadow
        .product-group-name {{ productsByGroups[groupId].groupName }}
        ul.product-name {{ productsByGroups[groupId].products[productId].name }}
        .cart-name-by-group
          .cart-with-margin ₽ {{productsByGroups[groupId].products[productId].price.RUB}}
          input.cart-input(
            v-model="productQuantity"
            :min="1"
            :max="productsByGroups[groupId].products[productId].productQuantity"
          )
        .cart-btn(
          @click="removeCart({ groupId, productId })"
          ) Удалить
    .cart-total-price(
      v-if="totalPrice"
    ) Общая стоимость: ₽{{totalPrice}}
</template>

<script>
/*eslint-disable*/
import {mapMutations} from 'vuex'
export default {
  props:{
    cart_data: {
      type: Array,
      default: () => []
    }
  },

  data(){
    return{
      productQuantity: [],
    }
  },
  methods:{
    ...mapMutations(['removeCart']),
  },
  computed:{
    productsByGroups(){
      return this.$store.state.products.productsByGroups
    },
    totalPrice(){
      let totalResult = 0
      for(let { groupId, productId, productQuantity } of this.cart_data){
        totalResult += this.productsByGroups[groupId].products[productId].price.RUB * productQuantity
      }
      return +(totalResult).toFixed(2)
    }
  },
}
</script>

<style scoped>
.cart {
  margin: 38px;
}

.cart-name-by-group {
  display: flex;
  margin-left: 33px;
}

.with-box-shadow {
  box-shadow: 2px 2px 8px #333;
  margin-bottom: 15px;
}

.cart-btn {
  color: #00ad5f;
  border: 1px solid #00ad5f;
  padding: 10px;
  margin: 5px;
  border-radius: 7px;
  cursor: pointer;
  background-color: #fff;
  transition: all .3s linear;
  width: 80px;
  margin-left: 33px;
}

.cart-with-margin {
  margin-right: 15px;
}

.cart-btn:hover {
  color: #fff;
  border: 1px solid #00ad5f;
  background-color: #00ad5f;
}
</style>