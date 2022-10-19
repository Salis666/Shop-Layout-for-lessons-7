Vue.component('cart', {
	props: ['products'],
	template: `
	<div class="b-flexCart__cart">
		<cartProduct 
			v-for="item of products"
			:key="item.id"
			:img="item.img" 
			:product="item">
		</cartProduct>
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
                <a href="#" class="b-cartPay__close"><img src="pic/closeBig.svg"
                                        alt="close"></a>
    </div>
	`
});

Vue.component('proceed', {
	props: ['products'],
	methods: {
		getTotalPrice() {
			let totalPrice = 0;
			for (let i = 0; i < this.products.length; i ++) {
			    totalPrice += this.products[i].price * this.products[i].quantity;
			}
			return totalPrice;
		}
	},
	template: `
	<div class="b-proceed b-proceed_flex b-proceed_margin">
                <div class="b-proceed__subBox b-proceed__subBox_flex">
                            <p class="b-proceed__sub">SUB TOTAL</p>
                            <p class="b-proceed__subPrice">$ {{getTotalPrice()}}</p>
                </div>

                <div class="b-proceed__grandBox b-proceed__grandBox_flex">
                            <p class="b-proceed__grand">GRAND TOTAL</p>
                            <p class="b-proceed__grandPrice">$ {{getTotalPrice()}}</p>
                </div>

                <img class="b-proceed__line" src="product_pic/grey_line.svg" alt="line">
                <a class="b-proceed__botton b-proceed__botton_margin" href="#">PROCEED
                            TO CHECKOUT</a>
    </div>
	`
});