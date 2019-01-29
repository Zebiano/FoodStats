<template>
      <section>
        <b-field label="Prato de carne:">
            <b-autocomplete
                v-model="name"
                :data="carne"
                placeholder="Exemplo Arroz de Pato"
                field="name"
                :loading="isFetching"
                @keyup.native="getAsyncData"
                @select="option => selected = option.name"
                @change:"hugoboss">
                
                <template slot-scope="props">
                    <div class="media">
                        <div class="media-content">
                            {{ props.option.name }}
                            <br>
                        </div>
                    </div>
                </template>
</b-autocomplete>
</b-field>
</section>
</template>

<script>
    import axios from 'axios'
    import debounce from 'debounce'
        export var ola = this.name;
    export default {
        
        props: ['props.option.name'],
        data() {
            return {
                data: [],
                carne: [],
                name: '',
                selected: null,
                selecionado: [],
                isFetching: false,
                hugo: "fiuza"
            }
        },

        methods: {
            hugoboss: function(){
                console.log("ola")
            },
            getAsyncData: debounce(function() {
                if (!this.name.length) {
                    this.data = []
                    return
                }
                this.isFetching = true
                axios({
                        url: `http://projeto-sd-zebiano.c9users.io/dishes/name/${this.name}`,
                        method: 'get',
                        headers: {
                            "Authorization": "Bearer " + localStorage.getItem("token")
                        }
                    })
                    .then(({ data }) => {
                        console.log(data.dishes)
                        this.carne = [];
                        data.dishes.forEach((item) => this.data.push(item))
                        console.log(data.dishes);
                        /* if (data.dishes.length == 0)
                         {
                             this.carne.push({name: "Não Existe"});
                         }*/
                        for (var i = 0; i < this.data.length; i++) {
                            if (data.dishes[i].dishType == "Carne") {
                                this.carne.push(data.dishes[i]);
                            }
                        }
                        console.log(this.carne);
                    })
                    .catch((error) => {
                        this.data = [];
                        throw error
                    })
                    .finally(() => {
                        this.isFetching = false
                    })
            }, 500)



        },
    }
</script>
