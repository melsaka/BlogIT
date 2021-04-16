<template>
<section class="text-gray-600 body-font px-5">
	<div class="py-5 border-b pl-9">
        <router-link :to="{name: 'posts.create'}" class="btn btn-secondary btn-sm">
            Create Post
        </router-link>
    </div>
	<div class="card lg:card-side bordered" v-for="post in posts.data" :key="post.id">
		<div class="card-body">
			<h2 class="card-title">
				<router-link :to="{name:'posts.show', params:{slug: post.slug} }" class="hover:bg-purple-100 px-2">
					{{ post.title }}
				</router-link>
				<router-link :to="{name: 'topics.show', params: {slug: post.topic.slug}}" class="badge mx-2">{{ post.topic.name }}</router-link>
			</h2>
			<p class="px-2">
				{{ post.body.substr(0, 150) }}
			</p>
			<div class="card-actions px-2">
				<router-link :to="{name:'posts.edit', params:{slug: post.slug} }" class="btn btn-primary btn-sm">Edit Post</router-link>
				<form @submit.prevent="removePost(post.slug)">
					<button class="btn btn-ghost btn-sm">Delete</button>
				</form>
			</div>
		</div>
	</div>

	<button v-if="posts.meta.nextPage" @click.prevent="loadmore()" class="btn btn-primary w-full mt-6">
		Loadmore..
	</button>
</section>
</template>

<script>
import axios from 'axios'
import localizedFormat from 'dayjs/plugin/localizedFormat'
import { mapGetters, mapActions } from 'vuex'
import dayjs from 'dayjs'

dayjs.extend(localizedFormat);

export default {
    computed: {
        ...mapGetters([
            'posts',
        ])
    },
    methods: {
		...mapActions([
			'deletePost'
		]),
        englishDate(date) {
            return dayjs(date).format('LL');
        },
		removePost(slug) {
			axios.delete('http://localhost:5000/api/v1/posts/'+slug)
				.then(() => {
					this.deletePost(slug);
				})
		},
		loadmore() {
            if( this.posts.meta.nextPage )
            {
                axios.get('http://localhost:5000/api/v1/posts?page='+ this.posts.meta.nextPage).then(response => {
                        this.posts.data = [...this.posts.data, ...response.data.data];
                        this.posts.meta = response.data.meta;
                    })
            }
        }
    }
}
</script>
