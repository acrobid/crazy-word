import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

export interface CrazyWord {
  crazy: string;
  normal: string;
}

createApp(App).mount('#app')
