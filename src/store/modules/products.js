export default {
    state: {
        productsByGroups: {},
        exchangeRates: { RUB: 45 },
        cart: [],
    },
    mutations: {
        addCart({ cart }, { groupId, productId, name }) {
            // Добавляем в корзину
            const itemIndex = cart.findIndex(x => x.groupId === groupId && x.productId === productId)
            if (itemIndex !== -1) {
                cart[itemIndex].productQuantity++
            } else {
                cart.push({ groupId, productId, productQuantity: 1, name})
            }
        },

        removeCart({ cart }, { groupId, productId }) {
            // Удаляем с корзины
            const itemIndex = cart.findIndex(x => x.groupId === groupId && x.productId === productId)
            if (itemIndex !== -1) {
                cart.splice(itemIndex, 1)
            }
        },

        setProductsByGroups(state, { data, groups }) {
            // Получаем нужные нам данные из двух файлов
            console.log(data)
            console.log(groups)
            const productByGroupWithElements = Object.entries(groups)
                .map(group => [group[0], { groupName: group[1].G, products: {} }])
            console.log(productByGroupWithElements)
            const productsByGroups = Object.fromEntries(productByGroupWithElements)
            for (let {C: priceInUSD,
                      G: groupId,
                      T: productId,
                      P: productQuantity} of data) {
                if (groups[groupId]?.B[productId]) {
                    productsByGroups[groupId].products[productId] = {
                        id: productId,
                        name: groups[groupId].B[productId].N,
                        productQuantity,
                        price: {
                            USD: priceInUSD,
                            RUB: +(state.exchangeRates.RUB * priceInUSD).toFixed(2)
                        }
                    }
                }
            }
            state.productsByGroups = productsByGroups
        },

        updateExchangeRates({ exchangeRates, productsByGroups }, { key, val }) {
            // Обновляем стоимость для всех товаров, если меняем курс
            exchangeRates[key] = val
            console.log(exchangeRates[key])
            for (let groupId in productsByGroups) {
                for (let itemId in productsByGroups[groupId].products) {
                    productsByGroups[groupId].products[itemId].price[key] = +(productsByGroups[groupId].products[itemId].price.USD * val).toFixed(2)
                }
            }
        },

    },

    actions: {
        // Получаем данные с файлов и сетим в мутацию
        async getProducts({ dispatch, commit }) {
            const data = await dispatch('getProductsDataFromFile')
            const groups = await dispatch('getProductsGroupsFromFile')
            commit('setProductsByGroups', {data: data.Value.Goods, groups})
        },
        async getProductsDataFromFile() {
            const response = await fetch('/store/data.json')
            return await response.json()
        },
        async getProductsGroupsFromFile() {
            const response = await fetch('/store/names.json')
            return await response.json()
        },
    },

    getters:{
        getProductsByGroups(state){
            return state.productsByGroups;
        },
        getCart(state){
            return state.cart;
        },
        getExchangeRates(state){
            return state.exchangeRates
        }
    },
}