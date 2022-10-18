Vue.component('search', {
  data () {
      return {
        userSearch: ''
      }
    },
    template: 
    `
    <form action="#" class="search_form link"  @submit.prevent='$parent.search(userSearch)'>
      <input type="text" class="search-field" v-model='userSearch'>
      <button type="submit" class="btn-search">
          <i class="fas fa-search"></i>
      </button>
    </form>
    `
})

