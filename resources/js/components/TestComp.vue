<template>
    <div>
        <h1>this is test Component {{ mama_id}}</h1>
        <router-view></router-view>
    </div>
</template>

<script>
    export default {
        name: "TestComp",
        data() {
            return {
                mama_id: this.$route.params.mama_id
            }
        },
        props: {
            id: {
                required: true,
                type: String,
            }
        }
    }
</script>

<style scoped>

</style>
