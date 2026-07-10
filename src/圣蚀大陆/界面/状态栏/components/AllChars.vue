<template>
  <details class="msb-all">
    <summary>全部角色<span class="msb-count">{{ rows.length }}</span></summary>
    <div class="msb-chars msb-chars-all">
      <div
        v-for="row in rows"
        :key="row.name"
        class="msb-char-row msb-char-row-mini"
        :class="{ 'msb-char-row-pro': row.isProtagonist, 'msb-char-row-absent': !row.isPresent }"
      >
        <span class="msb-char-name" :class="{ 'msb-char-name-pro': row.isProtagonist }">{{ row.name }}</span>
        <span class="msb-stat">
          <i class="fa-solid fa-heart" style="color: #ff6b9d"></i>
          <span class="msb-bar-wrap msb-bar-mini"><span class="msb-bar msb-bar-aff" :style="{ width: row.aff + '%' }"></span></span>
          <span class="msb-stat-val">{{ row.aff }}</span>
        </span>
        <span class="msb-stat">
          <i class="fa-solid fa-skull" style="color: #ff5252"></i>
          <span class="msb-bar-wrap msb-bar-mini"><span class="msb-bar msb-bar-corr" :style="{ width: row.corr + '%' }"></span></span>
          <span class="msb-stat-val">{{ row.corr }}</span>
        </span>
        <!-- 契约阶段非"无"时显示标签 -->
        <span v-if="row.contract !== '无'" class="msb-stat-lbl" style="color: #d2a4e8">{{ row.contract }}</span>
      </div>
    </div>
  </details>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

/**
 * 全部角色名单：从角色 record 的 keys 取，避免硬编码
 * 新 schema 角色为嵌套对象：角色[name].好感度 / 堕落度 / 契约阶段
 * 每行附 isPresent（是否在场，不在场半透明）+ isProtagonist（主角高亮）
 */
const rows = computed(() => {
  const p = store.data.value;
  const protagonist = p.玩家.当前扮演主角;
  const present = p.世界.在场角色;
  return Object.keys(p.角色).map(name => {
    const char = p.角色[name];
    return {
      name,
      isProtagonist: name === protagonist,
      isPresent: present.includes(name),
      aff: char.好感度,
      corr: char.堕落度,
      contract: char.契约阶段,
    };
  });
});
</script>
