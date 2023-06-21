<template>
  <v-responsive>
    <v-app>
      <v-navigation-drawer>
        <v-list>
          <v-list-item two-line>
            <v-avatar>
              <v-img :width="286" aspect-ratio="1/1" cover :src="photourl"></v-img>
            </v-avatar>
            <v-list-item-content>
              <v-list-item-title>{{ nome }}</v-list-item-title>
              <v-list-item-subtitle>{{ email }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>
        </v-list>
        <v-divider></v-divider>
        <v-tabs v-model="tab" grow>
          <v-tab value="1">Agenda</v-tab>
          <v-tab value="2">Contatos</v-tab>
        </v-tabs>
        <v-list style="position: fixed; bottom: 0;">
          <v-list-item prepend-icon="mdi-logout" title="Logout" @click="logout"></v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-main class="ma-5 text-center">
        <v-window v-model="tab">
          <v-window-item value="1">
            <agenda :items="compromissos" />
          </v-window-item>
          <v-window-item value="2">
            <contats :items="contato" />
          </v-window-item>
        </v-window>
      </v-main>
    </v-app>
  </v-responsive>
</template>
<script>
import agenda from "@/components/AgendaComponent.vue"
import contats from '@/components/ContatsComponent.vue'
import { useloggedStore } from "@/store/login.js";
import { getAuth, signOut } from "firebase/auth";

const logged = useloggedStore()
const photourl = logged.user.photourl
const nome = logged.user.nome
const email = logged.user.email

export default {
  components: {
    agenda,
    contats,
  },
  data: () => ({
    tab: 1,
    photourl: photourl,
    nome: nome,
    email: email,



  }),

  methods: {

    salvar() {
      this.axios.post('https://agendaav02-default-rtdb.firebaseio.com//agenda.json', {
        nome: 'Teste',
        idade: 20
      }).then(
        //res => console.log(res)
      ).catch(
        // err => console.log(err)
      )
    },
    update() {
      this.axios.patch('https://agendaav02-default-rtdb.firebaseio.com//agenda/-NTq4KddgcDSbIg5MstN.json', {
        nome: 'Decio Cajado',
        idade: 55
      }).then(
        // res => console.log(res)
      ).catch(
        //err => console.log(err)
      )
    },
    delete() {
      this.axios.delete('https://agendaav02-default-rtdb.firebaseio.com//agenda/-NTq4KddgcDSbIg5MstN.json')
        .then(
        //res => console.log(res)
      ).catch(
        // err => console.log(err)
      )
    },
    logout() {
      signOut(getAuth())
        .then(() => {
          window.location.href = ('/')
        })
        .catch((error) => {
          console.log(error)
        })
    }
  },
  read() {
    this.axios.get('https://agendaav02-default-rtdb.firebaseio.com/agenda')
      .then(
      //res => console.log(res)
    ).catch(
      //err => console.log(err)
    )
  },

}
</script>
