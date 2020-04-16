import {getLocalUser, login} from "./helpers/auth";
import axios from "axios";

const user = getLocalUser();

export default {
    state: {
        // appUrl: "http://localhost/Laravel-Vue-SPA",
        appUrl: "https://kero123.000webhostapp.com/Laravel-Vue-SPA",
        currentUser: user,
        isLoggedIn: !!user,
        loading: false,
        auth_error: null,
        posts: []
    },
    getters: {
        isLoading(state) {
            return state.loading;
        },
        isLoggedIn(state) {
            return state.isLoggedIn;
        },
        currentUser(state) {
            return state.currentUser;
        },
        authError(state) {
            return state.auth_error;
        },
        posts(state) {
            return state.posts;
        }
    },
    mutations: {
        login(state) {
            state.loading = true;
            state.auth_error = null;
        },
        loginSuccess(state, payload) {
            state.auth_error = null;
            state.isLoggedIn = true;
            state.loading = false;
            state.currentUser = Object.assign({}, payload.user, {token: payload.access_token});
            localStorage.setItem("user", JSON.stringify(state.currentUser));
        },
        loginFailed(state, payload) {
            state.loading = false;
            state.auth_error = payload.error;
        },
        logout(state) {
            localStorage.removeItem("user");
            state.isLoggedIn = false
            state.currentUser = null
        },
        updatePosts(state, payload) {
            state.posts = payload;
        },
        likePost(state, post) {
            post.claps++
        }
    },
    actions: {
        login(context) {
            context.commit("login");
        },
        getPosts(context) {
            axios.get(`${context.state.appUrl}/api/post`)
                .then((response) => {
                    context.commit('updatePosts', response.data.posts);
                }).catch((err) => {
            })
        },
        likePost(context, post) {
            axios.post(`${context.state.appUrl}/api/post/like`, {post_id: post.id})
                .then((data) => {
                    context.commit("likePost", post)
                }).catch(err => {
            });
        },

        signUp(context, user) {
            const promise = new Promise((success, fail) => {
                axios.post(`${context.state.appUrl}/api/user/signUp`, user)
                    .then((response) => {
                        success()
                    }).catch(err => {
                    fail(err)
                })
            })
            return promise
        }
    }
};
