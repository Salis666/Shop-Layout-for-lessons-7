const urlImg = '../pic/product/'

Vue.component ('catalog', {
		props: ['products'],
		template: `
		<div class="catalog_grid container">
			<product v-for="item of products"
			:key="item.id"
			:img="item.img" 
			:product="item"></product>
		</div>
	`
});
Vue.component('product',{
	props: ['product', 'img'],
	template: `
	<div class="catalog_card product.style_name">
            <div>
                        <img class="catalog_card_img" :src="img"
                                    alt="photo">
            </div>
            <div class="card_text_box">
                        <h3 class="card_name">{{product.name_product}}</h3>
                        <p class="card_text">{{product.product_description}}</p>
                        <p class="card_price">$ {{product.price}}</p>
            </div>
    </div>
	`
});