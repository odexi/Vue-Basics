<template>
    <v-list-item 
    class="temp-container"
    @click="tempClick(temp)"
    >
        <v-list-item-content>
            {{ temp.date.getHours() + ': ' + temp.temp }} ℃
        </v-list-item-content>
    </v-list-item>
</template>
<script>
export default {
    props: {
        temp: Object,
    },

    methods: {
        tempClick(temp) {
            this.$emit('tempClicked', temp);
        }
    }
}
</script>
<style scoped>
    .temp-container:hover {
        cursor: pointer;
        background-color: rgb(167,167,167);
    }
</style>