const app = new Vue ({
	el: '#app',
	data () {
		return {
			showCart: false,
			products: [],
			filtered: [],
			cartItems: [],
			productUrl: '/api/products',
			cartUrl: '/api/cart'
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
		add(item){
			this.getJson(`/api/cart`)
			.then(data => {
				let find = this.cartItems.find(el => el.id === item.id);
				if(find){
					find.quantity++;
					console.log('quantity +')
				} else {
					const prod = Object.assign({quantity: 1}, item);
					this.cartItems.push(prod);
					fs.appendFole('cart.json', JSON.stringify(prod), err => {console.log(err)});
					console.log('product push');

				}

			})
		},
		postJson(url, data){
			return fetch(url, {
				method: 'POST',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
			.then(result => result.json())
			.catch(error => {
				console.log(error)
				this.$refs.error.text = error;
			})
		},
		putJson(url, data){
			return fetch(url, {
				method: 'PUT',
				headers: {
					"Content-Type": "application/json"
				},
				body: JSON.stringify(data)
			})
			.then(result => result.json())
			.catch(error => {
				console.log(error)
				this.$refs.error.text = error;
			})
		},
	},

	mounted() {
		this.getJson(this.productUrl)
		.then(data => {
			for(let item of data){
				this.products.push(item);
				this.filtered.push(item);
			}
		});
		this.getJson(this.cartUrl)
		.then(data => {
			for (let item of data){
				this.cartItems.push(item);
			}
		});
	},
});