export default new VueRouter({
    routes: [
        {
            path: '/index',
            name: 'index',
            component: Vue.component( 'index', require( './pages/Index.vue' ) )
        }
    ]
});