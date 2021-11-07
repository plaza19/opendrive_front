<template>
    <div>

        <h1>Dashboard</h1>
        <h2>{{userData}}</h2>

    </div>
</template>

<script>

import { getAuth } from "firebase/auth";

    export default {
        name:"Dashboard",
        data () {
            return {
                userData : ""
            }
        },
        methods: {
            getUserData() {
                const auth = getAuth();
                console.log(auth.currentUser);
                this.userData = auth.currentUser;
            }
        }, mounted() {
            this.getUserData();
        }
    }
</script>

<style scoped>

</style>