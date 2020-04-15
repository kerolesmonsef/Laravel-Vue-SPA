<template>
    <div class="post-new">
        <template v-if="currentUser">
            <form @submit.prevent="add">
                <table class="table">
                    <tr>
                        <th>Contents</th>
                        <td>
                            <input type="text" class="form-control" v-model="post.contents" placeholder="Contents"/>
                        </td>
                    </tr>
                    <tr>
                        <th>Tags</th>
                        <td>
                            <input type="tags" class="form-control" v-model="post.tags" placeholder="Tags"/>
                        </td>
                    </tr>

                    <tr>
                        <td>
                            <router-link to="/posts" class="btn">Cancel</router-link>
                        </td>
                        <td class="text-right">
                            <input type="submit" value="Create" class="btn btn-primary">
                        </td>
                    </tr>
                </table>
            </form>
            <div class="errors" v-if="errors">
                <ul>
                    <li v-for="(fieldsError, fieldName) in errors" :key="fieldName">
                        <strong>{{ fieldName }}</strong> {{ fieldsError.join('\n') }}
                    </li>
                </ul>
            </div>
        </template>
        <template v-else>
            <h1>You Should
                <router-link :to="{ name:'login' }">Login</router-link>
                or
                <router-link :to="{ name:'signUp' }">SignUp</router-link>
                To Create a New Post
            </h1>
            <router-link :to="{ name:'login' }">Login</router-link><br>
            <router-link :to="{ name:'signUp' }">SignUp</router-link>
        </template>
    </div>
</template>

<script>
    import validate from 'validate.js';

    export default {
        name: 'New',
        data() {
            return {
                post: {
                    contents: '',
                    tags: '',
                    user_id: null,
                },
                errors: null
            };
        },
        computed: {
            currentUser() {
                return this.$store.getters.currentUser;
            }
        },
        methods: {
            add() {
                this.errors = null;
                const constraints = this.getConstraints();
                const errors = validate(this.$data.post, constraints);
                if (errors) {
                    this.errors = errors;
                    return;
                }
                axios.post('/api/post/create', {...this.$data.post, ...{user_id: this.currentUser.id}}, {
                    headers: {
                        "Authorization": `Bearer ${this.currentUser.token}`,
                    }
                })
                    .then((response) => {
                        this.$router.push('/posts');
                    }).catch(err => {

                });
            },
            getConstraints() {
                return {
                    contents: {
                        presence: true,
                        length: {
                            minimum: 3,
                            message: 'Must be at least 3 characters long'
                        }
                    },
                    tags: {
                        presence: true,
                    },
                };
            }
        }
    }
</script>

<style>
    .errors {
        background: lightcoral;
        border-radius: 5px;
        padding: 21px 0 2px 0;
    }
</style>
