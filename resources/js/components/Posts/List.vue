<template>
    <div>
        <div class="btn-wrapper">
            <router-link to="/posts/new" class="btn btn-primary btn-sm">New</router-link>
        </div>
        <table class="table">
            <thead>
            <th>Content</th>
            <th>User</th>
            <th>Tags</th>
            <th>claps Count</th>
            <th>Created AT</th>
            <th>Actions</th>
            </thead>
            <tbody>
            <template v-if="!posts.length">
                <tr>
                    <td colspan="4" class="text-center">No Posts Available</td>
                </tr>
            </template>
            <template v-else>
                <tr v-for="post in posts" :key="post.id">
                    <td>{{ post.contents }}</td>
                    <td>{{ post.user_name }}</td>
                    <td>{{ post.tags }}</td>
                    <td>{{ post.claps }}
                        <like-post :post="post"></like-post>
                    </td>
                    <td>{{ post.createdAt }}</td>
                    <td>
                        <router-link :to="`/posts/${post.id}`">View</router-link>
                    </td>
                </tr>
            </template>
            </tbody>
        </table>
    </div>
</template>

<script>
    import LikePost from "./LikePost";

    export default {
        name: 'list',
        components: {LikePost},
        mounted() {
            this.$store.dispatch('getPosts');
        },
        computed: {
            posts() {
                return this.$store.getters.posts;
            }
        }
    }
</script>

<style scoped>
    .btn-wrapper {
        text-align: right;
        margin-bottom: 20px;
    }
</style>
