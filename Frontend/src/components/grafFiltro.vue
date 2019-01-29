<template>
      <section>
        <b-field label="">
            <b-select placeholder="Ontem"  @input="teste()" v-model="optionChange" >
                <option v-for="option in options" >{{ option }}</option>
            </b-select>
            {{optionChange}}
        </b-field>
    </section>
</template>

<script>
    export default {
        data() {
            return {
                nome: "",
                option: "",
                options: ['Ontem', 'Kiko', 'Hugo', 'Sebas', 'Artem'],
                optionChange: ""
            }
        },
        methods: {
            teste: function() {
                console.log(this.optionChange)
            }
        }
    }
</script>
