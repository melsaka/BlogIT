<template>
	<form @submit.prevent="createTopic()">
		<div class="container mx-auto">
			<h1 class="text-xl my-6">New Topic</h1>
			<div class="form-control">
				<label class="label">
					<span class="label-text">Name</span>
				</label> 
				<input v-model="name" type="text" placeholder="Topic Name" class="input input-bordered">
			</div>
			<div class="form-control mt-3">
				<button class="btn btn-primary">Create</button>
			</div>
		</div>
	</form>
</template>

<script>
import { mapActions } from 'vuex'
import axios from 'axios'

export default {
	data() {
		return {
			name: '',
			errors: {}
		}
	},
	methods: {
		...mapActions([
            'setTopics',
        ]),
		createTopic() {
			axios.post('http://localhost:5000/api/v1/topics', {name: this.name})
				.then(() => {
					axios.get('http://localhost:5000/api/v1/topics').then(response => {
						this.setTopics(response.data);
					})
					this.$router.push({name: 'topics.index'});
				})
		}
	}
}
</script>