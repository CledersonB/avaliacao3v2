<template>
    <div>
        <v-container>
            <v-row>
                <v-col cols="12">
                    <v-form>
                        <v-responsive max-width="400">
                            <br>
                            <v-text-field label="Data" type="date" v-model="data" variant="outlined" color="primary"
                                hide-details="auto" prepend-icon="mdi-calendar-range" />
                            <br>
                            <v-text-field label="Hora" type="time" v-model="hora" variant="outlined" color="primary"
                                hide-details="auto" prepend-icon="mdi-clock" />
                            <br>
                            <v-text-field v-model="descricao" label="Descrição" variant="outlined" color="primary"
                                hide-details="auto" prepend-icon="mdi-note-text" />
                            <br>
                            <v-btn color="success" @click="salvar">Salvar</v-btn>
                        </v-responsive>
                    </v-form>
                </v-col>
                <v-col v-for="item, index in agenda" :key="index" cols="12" sm="6" md="4" lg="3">
                    <v-card color=#B0C4DE class="ma-5">
                        <v-card-title>{{ item.data }}</v-card-title>
                        <v-card-subtitle> {{ item.hora }}</v-card-subtitle>
                        <v-card-text>{{ item.descricao }}</v-card-text>
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
        data: '',
        hora: '',
        descricao: '',
        agenda: []
    }),


    methods: {

        load() {
            this.axios.get('https://agendaav02-default-rtdb.firebaseio.com//agenda.json')
                .then(response => {
                    return this.agenda = response.data;

                }).catch(error => {
                    console.log(error)
                })
        },

        salvar(idedit) {
            if (this.idedit != null) {
                this.axios.patch('https://agendaav02-default-rtdb.firebaseio.com//agenda/' + this.idedit + '.json', {
                    data: this.data,
                    hora: this.hora,
                    descricao: this.descricao
                }).then(
                    alert('Evento Atualizado com sucesso!'),
                    this.data = '',
                    this.hora = '',
                    this.descricao = '',
                    this.idedit = null,
                    this.load()
                ).catch(
                    err => console.log(err)
                )
            } else {

                this.axios.post('https://agendaav02-default-rtdb.firebaseio.com//agenda.json', {
                    data: this.data,
                    hora: this.hora,
                    descricao: this.descricao

                }).then(
                    alert('Evento cadastrado com sucesso!'),
                    this.data = '',
                    this.hora = '',
                    this.descricao = '',
                    this.idedit = null,
                    this.load(),

                ).catch(
                    err => console.log(err)
                )


            }
        },
        editar(id) {
            let edit = this.agenda[id]
            this.idedit = id,
                this.data = edit.data,
                this.hora = edit.hora,
                this.descricao = edit.descricao

        },
        remover(id) {
            let url = 'https://agendaav02-default-rtdb.firebaseio.com//agenda/' + id + '.json'
            this.axios.delete(url)
                .then(
                    alert('Evento removido com sucesso!'),
                    this.load(),
                ).catch(
                    err => console.log(err)
                )
        }
    },
    mounted() {
        this.load();
    },
}

</script>