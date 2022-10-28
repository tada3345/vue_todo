import { createApp } from 'vue';
import App from './App.vue';
import { OhVueIcon, addIcons } from 'oh-vue-icons';
import {
  PxBriefcaseAccount,
  PxHome,
  PxCheckbox,
  PxAddBox,
  PxTrash,
} from 'oh-vue-icons/icons';

addIcons(PxBriefcaseAccount, PxHome, PxCheckbox, PxAddBox, PxTrash);

import './main.css';

const app = createApp(App);
app.component('v-icon', OhVueIcon);
app.mount('#app');
