<template>
    <!--    <div>-->
    <button @click="like" class="btn btn-info">
        <i class="fas fa-thumbs-up"></i>
    </button>
    <!--    </div>-->
</template>

<script>
    import axios from 'axios';

    export default {
        name: "LikePost",
        props: {
            post: {
                required: true,
                type: Object
            },

        },
        methods: {
            like() {
                this.$store.dispatch('likePost', this.post);
            }
        }
    }
</script>

<style scoped>

</style>
