Vue.component ('catalog', {
	data () {
		return {
			products: [],
			filtred: []
		}
	},

	template: `
	<div class="catalog_card man_blue_jaket">
                <div>
                            <img class="catalog_card_img" src="pic/product/man_blue_jaket.png"
                                        alt="photo">
                </div>
                <div class="card_text_box">
                            <h3 class="card_name">ELLERY X M'O CAPSULE</h3>
                            <p class="card_text">Known for her sculptural takes on traditional
                                        tailoring, Australian
                                        arbiter of cool Kym Ellery teams up with Moda Operandi.</p>
                            <p class="card_price">$52.00</p>
                </div>
    </div>`
});