<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-form>
                        <v-responsive max-width="400">
                            <br>
                            <v-text-field label="Nome" v-model="nome" variant="outlined" color="primary" hide-details="auto"
                                prepend-icon="mdi-account-tie" />
                            <br>
                            <v-text-field label="Telefone" v-model="telefone" variant="outlined" color="primary"
                                hide-details="auto" prepend-icon="mdi-cellphone" />
                            <br>
                            <v-text-field label="E-mail" v-model="email" variant="outlined" color="primary"
                                hide-details="auto" prepend-icon="mdi-email" />
                            <br>

                            <v-btn color="success" @click="salvar">Salvar</v-btn>
                        </v-responsive>
                    </v-form>
                </v-col>
                <v-col v-for="item, index in contatos" :key="index" cols="12" sm="6" md="4" lg="3">
                    <v-card color="#B0C4DE" class="ma-5">
                        
                        <v-card-title>{{ item.nome }}</v-card-title>
                        <v-card-subtitle> {{ item.telefone }}</v-card-subtitle>
                        <v-card-subtitle> {{ item.email }}</v-card-subtitle>

                        <v-card-actions>
                            <v-spacer>
                                <v-btn color="secundary" @click="editar(index)">Editar</v-btn>
                                <v-btn color="error" @click="remover(index)">Remover</v-btn>
                            </v-spacer>
                        </v-card-actions>
                    </v-card>
                </v-col>
            </v-row>
        </v-container>

    </div>
</template>

<script>
export default {
    props: {
        items: {
            type: Array,
            required: true
        }
    },
    data: () => ({
        search: '',
        idedit: null,
        nome: '',
        telefone: '',
        email: '',
        contatos: [],
    }),


    
    computed: {
        filteredItems() {
            if (!this.search) {
                return this.contatos
            }
            const searchTerm = this.search.toLowerCase()
            return this.contatos.filter(item => {
                return (
                    item.name.toLowerCase().includes(searchTerm)

                )
            })
        }
    },
    methods: {
        load() {
        this.axios.get('https://agendaav02-default-rtdb.firebaseio.com//contatos.json')
            .then(response => {
                this.contatos = response.data;

            }).catch(error => {
                console.log(error)
            })
    },
        
        salvar(idedit) {
            console.log(this.idedit)
            if (this.idedit != null) {
                this.axios.patch('https://agendaav02-default-rtdb.firebaseio.com//contatos/' + this.idedit + '.json', {
                    nome: this.nome,
                    telefone: this.telefone,
                    email: this.email
                }).then(
                    alert('Contato Atualizado com sucesso!'),
                    this.nome = '',
                    this.telefone = '',
                    this.email = '',
                    this.idedit = null,
                    this.load(),
                ).catch(
                    err => console.log(err)
                )
            } else {
                this.axios.post('https://agendaav02-default-rtdb.firebaseio.com//contatos.json', {
                    nome: this.nome,
                    telefone: this.telefone,
                    email: this.email

                }).then(
                    alert(this.nome + ' salvo com sucesso!'),
                    this.nome = '',
                    this.telefone = '',
                    this.email = '',
                    this.load(),
                ).catch(
                    err => console.log(err)
                )
            }
        },
        remover(id) {
            let url = 'https://agendaav02-default-rtdb.firebaseio.com/contatos/' + id + '.json'
            this.axios.delete(url)
                .then(
                    alert('Contato removido com sucesso!'),
                    this.load(),
                    res => console.log(res)
                ).catch(
                    err => console.log(err)
                )
        },
        editar(id) {
            let edit = this.contatos[id]
            this.idedit = id,
                this.nome = edit.nome,
                this.telefone = edit.telefone,
                this.email = edit.email

                


        },
    },
    mounted() {
        this.load()
    }

}

</script>


