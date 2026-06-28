// MVU 数据 store：通过 defineMvuDataStore 连接酒馆助手 stat_data 变量
// store.data 即 schema.ts 定义的变量结构（Ref，模板自动解包）
import { defineMvuDataStore } from '@util/mvu';
import { Schema } from '../../schema';

// 获取当前消息ID，兼容 @@iframe 环境（没有酒馆助手注入）
function getMessageId() {
  if (typeof window.getCurrentMessageId === 'function') {
    return window.getCurrentMessageId();
  }
  // fallback: 从 iframe 的父窗口查找当前消息
  // @@iframe 的 iframe 应该在某个消息的 DOM 结构中
  try {
    const iframe = window.frameElement as HTMLIFrameElement | null;
    if (iframe) {
      // 向上查找包含此 iframe 的 .mes 元素
      let el = iframe.parentElement;
      while (el && !el.classList.contains('mes')) {
        el = el.parentElement;
      }
      if (el) {
        // 从 .mes 元素获取 mesid
        const mesid = el.getAttribute('mesid');
        if (mesid !== null) {
          return parseInt(mesid, 10);
        }
      }
    }
  } catch (e) {
    console.warn('Failed to get message ID from DOM:', e);
  }
  // 最后的 fallback: 使用 -1 表示未知
  return -1;
}

export const useDataStore = defineMvuDataStore(Schema, {
  type: 'message',
  message_id: getMessageId(),
});
