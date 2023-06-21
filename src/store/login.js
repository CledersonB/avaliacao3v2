import { defineStore } from "pinia";
import { ref, computed } from "vue";

export const useloggedStore = defineStore("userlogged", () => {
    const user = ref({
        nome: null,
        email: null,
        photourl: null,
        islogged: false,
    });
    const logged = (nome, email, photourl, islogged) => {
        user.value.nome = nome;
        user.value.email = email;
        user.value.photourl = photourl;
        user.value.islogged = islogged;
    }

    return {
        user,
        logged,
    }
});