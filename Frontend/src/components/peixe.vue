<template>
      <section>
        <b-field label="Prato de Peixe:">
            <b-autocomplete
                v-model="name"
                :data="peixe"
                placeholder="Exemplo Bacalhau à Brás"
                field="name"
                :loading="isFetching"
                @keyup.native="getAsyncData"
                @select="option => selected = option.name">
                
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
    export default {
        data() {
            return {
                data: [],
                peixe: [],
                name: '',
                selected: "",
                isFetching: false
            }
        },

        methods: {
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
                        this.peixe = [];
                        data.dishes.forEach((item) => this.data.push(item))
                        for ( var i =0; i< this.data.length; i++)
                        {
                            if (data.dishes[i].dishType == "Peixe")
                            {
                                this.peixe.push(data.dishes[i]);
                            }
                        }
                        console.log(this.peixe);
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