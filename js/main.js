const app = new Vue ({
	el: '#app',
	data () {
		return {
			products: [],
			filtered: [],
			cartItems: []
		}
	},
	methods: {
		getJson(url){
			return fetch(url)
			.then(result => result.json())
			.catch(error => console.log(error))
		},
		search(userSearch){
			let regexp = new RegExp(userSearch, 'i');
			this.filtered = this.products.filter(el => regexp.test(el.name_product));
		},
		addProduct(item){
			this.getJson(`cart.json`)
			.then(data => {
				if(data.result === 1){
					let find = this.cartItems.find(el => el.id === item.id);
					if(find){
						find.quantity++;
					} else {
						const prod = Object.assign({quantity: 1}, item);
						this.cartItems.push(prod)
					}
				}
			})
		},
	},

	mounted() {
		this.getJson(`products.json`)
		.then(data => {
			for(let item of data){
				this.products.push(item);
				this.filtered.push(item);
			}
		});
		this.getJson('cart.json')
		.then(data => {
			for (let item of data){
				this.cartItems.push(item);
			}
		});
	},
});