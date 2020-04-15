<template>
    <div class="post-view" v-if="post">
        <div class="user-img">
            <img src="https://www.scottsdaleazestateplanning.com/wp-content/uploads/2018/01/user.png" alt="">
        </div>
        <div class="user-info">
            <table class="table">
                <tr>
                    <th>ID</th>
                    <td>{{ post.id }}</td>
                </tr>
                <tr>
                    <th>Content</th>
                    <td>{{ post.contents }}</td>
                </tr>
                <tr>
                    <th>Tags</th>
                    <td>{{ post.tags }}</td>
                </tr>

                <tr>
                    <th>User</th>
                    <td>{{ post.user_name }}</td>
                </tr>
                <tr>
                    <th>Claps</th>
                    <td>
                        {{ post.claps }}
                        <!--                        <i class="fas fa-thumbs-up"></i>-->
                        <like-post :post="post"></like-post>
                    </td>
                </tr>
            </table>
            <div>
                <router-link to="/posts">Back to all posts</router-link>
            </div>
        </div>
    </div>
</template>

<script>
    import LikePost from "./LikePost";

    export default {
        name: 'ViewPost',
        components: {LikePost},
        created() {
            if (this.posts.length) {
                this.post = this.posts.find((post) => post.id == this.$route.params.id);
            } else {
                axios.get(`/api/post/show/${this.$route.params.id}`)
                    .then((response) => {
                        this.post = response.data.post
                    });
            }
        },
        data() {
            return {
                post: {}
            };
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            },
            posts() {
                return this.$store.getters.posts;
            }
        }
    }
</script>

<style scoped>
    .post-view {
        display: flex;
        align-items: center;
    }

    .user-img {
        flex: 1;
    }

    .user-img img {
        max-width: 160px;
    }

    .user-info {
        flex: 3;
        overflow-x: scroll;
    }
</style>
