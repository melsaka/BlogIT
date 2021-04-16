import Vue from 'vue'
import App from './App'
import axios from 'axios'
import router from './router/web'
import store from './store/index'
import "tailwindcss/tailwind.css"

Vue.config.productionTip = false

axios.defaults.headers.common['Authorization'] = 'Barrer ' + store.getters.token;

axios.interceptors.response.use(function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response;
}, function (error) {
	// Any status codes that falls outside the range of 2xx cause this function to trigger
	if( error.response.status == 401 || error.response.status == 403) {
		store.commit('logout');
	}

    return Promise.reject(error);
});

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
