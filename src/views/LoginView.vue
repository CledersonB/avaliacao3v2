<template>
    <v-container>
        <v-row >
            <v-col cols="12" md="6">
                <v-card width="400" style="margin-left: 75%; " >
                    <v-card-title>
                        <span class="headline">Login</span>
                    </v-card-title>
                    <v-card-text>
                        <v-form>
                            <v-text-field v-model="email" label="Email"></v-text-field>
                            <v-text-field type="password" v-model="password" label="Password"></v-text-field>
                        </v-form>
                    </v-card-text>
                    <v-card-actions>
                        <v-btn rounded color="primary" @click="login">Login</v-btn>
                        <v-btn rounded color="primary" @click="signgoogle">Sign In with Google</v-btn>
                    </v-card-actions>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script setup>
import { useloggedStore } from "@/store/login.js";
import { ref, onMounted } from 'vue';

const email = ref('')
const password = ref('')
const loggedStore = useloggedStore()

import { getAuth, signInWithEmailAndPassword, signInWithPopup, GoogleAuthProvider, signOut, onAuthStateChanged } from "firebase/auth";
import router from "@/router";

const islogged = ref(false)
const usuario = ref(0)

const login = () => {
    signInWithEmailAndPassword(getAuth(), email.value, password.value)
        .then(() => {
            router.push('/dashboard')
            loggedStore.logged(getAuth().currentUser.displayName, getAuth().currentUser.email, true)

        })
        .catch((error) => {
            const errorCode = error.code;
            alert(errorCode);
        });
}
const signgoogle = () => {
    signInWithPopup(getAuth(), new GoogleAuthProvider())
        .then(() => {
            router.push('/dashboard')
            loggedStore.logged(getAuth().currentUser.displayName, getAuth().currentUser.email, getAuth().currentUser.photoURL, true)
        })
        .catch((error) => {
            const errorCode = error.code;
            const errorMessage = error.message;
            const email = error.email;
            const credential = GoogleAuthProvider.credentialFromError(error);

        });
}

onMounted(() => {
    onAuthStateChanged(getAuth(), (user) => {
        if (user) {
            const usuario = (user.email)
            islogged.value = true
        } else {
            islogged.value = false
        }
    });
});

</script>
