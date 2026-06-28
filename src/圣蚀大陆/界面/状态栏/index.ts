// 状态栏入口：等待酒馆助手 Mvu 全局初始化 + stat_data 就绪后挂载 Vue 应用
import { waitUntil } from 'async-wait-until';
import App from './App.vue';
import './global.css';

$(async () => {
  // 必须等待 Mvu 扩展初始化完成，否则 getVariables 读不到 stat_data
  await waitGlobalInitialized('Mvu');
  // 等待当前楼层消息的 stat_data 变量存在（MVU 写入后才有值）
  await waitUntil(() => _.has(getVariables({ type: 'message' }), 'stat_data'));
  createApp(App).use(createPinia()).mount('#app');
});
