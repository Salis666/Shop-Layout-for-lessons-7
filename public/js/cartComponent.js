Vue.component('cart', {
	data(){
		return {
			cartUrl: '/getBasket.json',
			cartItems: [],
		}
	},
	methods: {
		add(item){
			let find = this.cartItems.find(el => el.id === item.id);
			if(find){
				this.$parent.putJson(`/api/cart/${find.id}`, {quantity: 1})
				.then(data => {
					if(data.result === 1){
						find.quantity++
					}
				})
			} else {
				const prod = Object.assign({quantity: 1}, item);
				this.$parent.postJson(`/api/cart`, prod)
				.then(data => {
					if (data.result === 1) {
						this.cartItems.push(prod)
					}
				})
			}
		},
		remove(item){
			let find = this.cartItems.find(el => el.id === item.id);
			if(find) {
				if(find.quantity > 1) {
					this.$parent.putJson(`/api/cart/${find.id}`, {quantity: -1})
					.then(data => {
						if (data.result === 1) {
								item.quantity--;
						}
					})
				} else {
					this.$parent.deleteJson(`/api/cart/${find.id}`, find)
					.then(data => {
						if (data.result === 1) {
							this.cartItems.splice(this.cartItems.indexOf(item), 1);
						}
					})
				}
			}
		},
	},
	mounted(){
		this.$parent.getJson(`/api/cart`)
		.then(data => {
			for (let item of data){
				this.$data.cartItems.push(item);
			}
		});
	},
	props: ['products'],
	template: `
	<div class="b-flexCart container b-flexCart_marginTop b-flexCart_flex">
                <div class="b-flexCart__cart">
					<cartProduct
                        v-for="item of cartItems"
						:key="item.id"
						:img="item.img" 
						:product="item"
                        @remove="remove">
					</cartProduct>
				</div>
                <div class="b-flexCart__pay b-flexCart__pay_margin">
                            <form class="b-payForm b-payForm_flex" action="#">
                                        <h2 class="b-payForm__name b-payForm__name_marginButtom">SHIPPING ADRESS
                                        </h2>
                                        <input class="b-payForm__sityInput b-payForm__sityInput_marginButtom"
                                                    placeholder="Bangladesh">
                                        <input class="b-payForm__stateInput b-payForm__stateInput_marginButtom"
                                                    placeholder="State">
                                        <input class="b-payForm__postcodeInput b-payForm__postcodeInput_marginButtom"
                                                    placeholder="Postcode / Zip">
                                        <button class="b-payForm__buttonSubmit b-payForm__buttonSubmit_marginButtom"
                                                    type="submit">GET A
                                                    QUOTE</button>
                            </form>
                            <proceed :products="cartItems"></proceed>
                </div>
    </div>
	`
});


Vue.component('cartProduct', {
	props: ['product', 'img'],
	template: `
	<div class="b-cartPay">
                <img class="b-cartPay__img" :src="img"
                            alt="product">

                <div class="b-cartPay__text b-cartPayText">
                            <h2 class="b-cartPayText__name b-cartPayText__name_marginBottom">
                                        {{product.name_product}}
                            </h2>
                            <div class="b-price b-price_flex b-price_marginBottom">
                                        <p class="b-price__text">Price:</p>
                                        <p class="b-price__text b-price__text_marginLeft b-price__text_orange">$ {{product.price*product.quantity}}</p>
                            </div class="b-price b-price_marginBottom">
                            <div class="b-price b-price_marginBottom">
                                        <p class="b-price__text">Color: Red</p>
                            </div>
                            <div class="b-price b-price_marginBottom">
                                        <p class="b-price__text">Size: Xl</p>
                            </div class="b-price b-price_marginBottom">
                            <div class="b-price b-price_flex">
                                        <p class="b-price__text">Quantity:</p>
                                        <p class="b-price__size b-price__size_marginLeft">
                                                    {{product.quantity}}
                                        </p>
                            </div>
                </div>
                <a href="#" class="b-cartPay__close" @click="$root.$refs.cart.remove(product)"><img src="pic/closeBig.svg"
                                        alt="close"></a>
    </div>
	`
});

Vue.component('proceed', {
	props: ['products'],
	methods: {
		getTotalPrice(products) {
			let totalPrice = 0;
			if(products) {
				for (let item of products) {
					totalPrice += item.price * item.quantity;
				}
				return totalPrice;
			} else {
				return 0
			}

		}
	},
	template: `
	<div class="b-proceed b-proceed_flex b-proceed_margin">
                <div class="b-proceed__subBox b-proceed__subBox_flex">
                            <p class="b-proceed__sub">SUB TOTAL</p>
                            <p class="b-proceed__subPrice">$ {{getTotalPrice(products)}}</p>
                </div>

                <div class="b-proceed__grandBox b-proceed__grandBox_flex">
                            <p class="b-proceed__grand">GRAND TOTAL</p>
                            <p class="b-proceed__grandPrice">$ {{getTotalPrice(products)}}</p>
                </div>

                <img class="b-proceed__line" src="product_pic/grey_line.svg" alt="line">
                <a class="b-proceed__botton b-proceed__botton_margin" href="#">PROCEED
                            TO CHECKOUT</a>
    </div>
	`
});