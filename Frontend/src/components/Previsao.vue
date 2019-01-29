<template>
    <section style="padding: 40px">
        <cards></cards>
        <charts style="margin-top: 5vh"></charts>
    </section>
</template>

<script>
    import cards from './previsaoDoDia.vue'
    import charts from './previsaoGraficos.vue'
    export default {
        name: '',
        components: {
            cards,
            charts
        },
        created() {
            //console.log("ola")
        },

        methods: {
            
        }

    }
</script>
