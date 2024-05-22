import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Import the router

// Create the Vue app instance and use the router
createApp(App)
  .use(router) // Use the router
  .mount('#app');
