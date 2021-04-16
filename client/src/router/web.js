import Vue from 'vue'
import VueRouter from 'vue-router'
import website from './modules/website'
import topics from './modules/topics'
import posts from './modules/posts'
import auth from './modules/auth'
import Middleware from '@/middlewares/index';

Vue.use(VueRouter)

const routes = [
    ...website,
    ...topics,
    ...posts,
    ...auth
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

const middleware = new Middleware();

router.beforeEach((to, from, next) => {

	let rules = Object.prototype.hasOwnProperty.call(to.meta, 'middlewares') ? to.meta.middlewares : [];

	for (let rule of rules) {
		// check if we have a guard for this rule and if so we call it to check the rule validation
		let validation = middleware.check(rule);
		// if the user didn't meet rule requirements then we punish him
		if ( !validation ) {
			return middleware.applyPunishment(rule, next);
		}
	}

	next();
});

export default router;