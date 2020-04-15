<template>
    <div id="main" class="container">
        <div class="content">
<!--            this is a header component-->
            <Header/>
<!--            <router-link to="/some_route">some dot</router-link>-->
<!--            this is where the other components will be rendered here-->
            <router-view></router-view>

        </div>
    </div>
</template>

<script>
    import Header from './Header'

    export default {
        name: 'MainApp',
        components: {Header},
        mounted() {
            // console.log('Component mounted.')
        }
    }
</script>
