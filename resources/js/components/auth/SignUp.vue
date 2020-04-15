<template>
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">
                <div class="card-header">
                    SignUp
                </div>
                <div class="card-body">
                    <form @submit.prevent="sign_up">
                        <table class="table">
                            <tr>
                                <th>Name</th>
                                <td>
                                    <input autocomplete="none" type="text" class="form-control" v-model="user.name"
                                           placeholder="Name"/>
                                </td>
                            </tr>
                            <tr>
                                <th>Email</th>
                                <td>
                                    <input class="form-control" v-model="user.email" placeholder="Email"/>
                                </td>
                            </tr>
                            <tr>
                                <th>Password</th>
                                <td>
                                    <input type="password" class="form-control" v-model="user.password"
                                           placeholder="Password"/>
                                </td>
                            </tr>

                            <tr>
                                <td>
                                    <router-link :to="{ name:'home' }" class="btn">Cancel</router-link>
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
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import validate from 'validate.js';
    import {login} from "../../helpers/auth";

    export default {
        name: 'SignUp',
        data() {
            return {
                user: {
                    name: '',
                    email: '',
                    password: '',
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
            sign_up() {
                this.errors = null;
                const constraints = this.getConstraints();
                const errors = validate(this.$data.user, constraints);
                if (errors) {
                    this.errors = errors;
                    return;
                }

                this.$store.dispatch('signUp', this.$data.user).then((response) => {
                    login(this.$data.user)
                        .then((res) => {
                            this.$store.commit("loginSuccess", res.data);
                            this.$router.push({path: '/'});
                        })
                        .catch((error) => {
                            console.log(error)
                        });
                }).catch((err) => {
                    this.errors = err.response.data.errors
                });
            },
            getConstraints() {
                return {
                    name: {
                        presence: true,
                        length: {
                            minimum: 4,
                            message: 'The Name Must Be At least 6 charachters'
                        }
                    },
                    email: {
                        email: true,
                        presence: true,
                    },
                    password: {
                        presence: true,
                        length: {
                            minimum: 6,
                            message: 'The Psssword Must Be At least 6 charachters'
                        }
                    }
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
