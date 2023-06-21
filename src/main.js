/**
 * main.js
 *
 * Bootstraps Vuetify and other plugins then mounts the App`
 */

// Components
import App from './App.vue'

// Composables
import { createApp } from 'vue'

// Plugins
import { registerPlugins } from '@/plugins'
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDLL20GmVDF1Doi9E_7IAndrUZ6tTxGg2I",
  authDomain: "app01-96c54.firebaseapp.com",
  databaseURL: "https://app01-96c54-default-rtdb.firebaseio.com",
  projectId: "app01-96c54",
  storageBucket: "app01-96c54.appspot.com",
  messagingSenderId: "907504694048",
  appId: "1:907504694048:web:114e42d960d64a8f5a1d45"
};
// Initialize Firebase
initializeApp(firebaseConfig);


//axios 
import axios from 'axios'

import vueAxios from 'vue-axios'

const app = createApp(App)
app.use(vueAxios, axios)

//app.config.globalProperties.$axios = axios
registerPlugins(app)

app.mount('#app')
