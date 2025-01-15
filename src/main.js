import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import store from './store';
import { setupPlugins } from './plugins';

// Import your existing pages
import Home from './pages/index.vue';
import About from './pages/about.vue';
import Archive from './pages/archive.vue';
import Works from './pages/works/_slug.vue';

// Create router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', component: Home },
    { path: '/about', component: About },
    { path: '/archive', component: Archive },
    { path: '/works/:slug', component: Works, name: 'works-slug' },
    // Add other routes as needed
  ]
});

// Create and mount the app
const app = createApp(App);

// Setup plugins
setupPlugins(app);

// Use router and store
app.use(router);
app.use(store);

// Mount the app
app.mount('#app'); 