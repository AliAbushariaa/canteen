import { createApp } from 'vue';
import { createRouter, createWebHistory } from 'vue-router';
import App from './App.vue';
import Contact from './contact.vue';
import Order from './order.vue';
import Success from './success.vue';
import PlacedOrders from './PlacedOrders.vue';
import Allergies from './allergies.vue';

const routes = [
  { path: '/', component: App },
  { path: '/contact', component: Contact },
  { path: '/order', component: Order },
  { path: '/success', component: Success },
  { path: '/placed-orders', component: PlacedOrders },
  { path: '/allergies', component: Allergies },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

const app = createApp(App);
app.use(router);
app.mount('#app');
