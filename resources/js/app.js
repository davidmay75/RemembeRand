import './bootstrap';

import { createApp } from 'vue';

const app = createApp({});
// Register your components here
// app.component('example-component', ExampleComponent);
// import ExampleComponent from './components/ExampleComponent.vue';
import MemoryGame from './components/MemoryGame.vue';
import GameSettings from './components/GameSettings.vue';
import Header from './components/Header.vue';
import Logo from './components/Logo.vue';
// app.component('example-component', ExampleComponent);
app.component('game-settings', GameSettings);
app.component('memory-game', MemoryGame);
app.component('site-header', Header);
app.component('logo', Logo);

app.mount('#app');