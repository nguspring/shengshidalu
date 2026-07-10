<template>
  <div class="msb-section msb-sec-chars">
    <div class="msb-sec-label">在场<span class="msb-count">{{ rows.length }}</span></div>
    <div class="msb-chars">
      <div
        v-for="row in rows"
        :key="row.name"
        class="msb-char-row"
        :class="{ 'msb-char-row-pro': row.isProtagonist }"
      >
        <span class="msb-char-name" :class="{ 'msb-char-name-pro': row.isProtagonist }">{{ row.name }}</span>
        <!-- 主角跳过好感/服从列，只显示堕落度 -->
        <template v-if="!row.isProtagonist">
          <span class="msb-stat">
            <i class="fa-solid fa-heart" style="color: #ff6b9d"></i>
            <span class="msb-stat-label">好感度</span>
            <span class="msb-bar-wrap msb-bar-sm"><span class="msb-bar msb-bar-aff" :style="{ width: row.aff + '%' }"></span></span>
            <span class="msb-stat-val">{{ row.aff }}</span>
          </span>
          <span class="msb-stat">
            <i class="fa-solid fa-circle-dot" style="color: #c77dff"></i>
            <span class="msb-stat-label">服从度</span>
            <span class="msb-bar-wrap msb-bar-sm"><span class="msb-bar msb-bar-obey" :style="{ width: row.obey + '%' }"></span></span>
            <span class="msb-stat-val">{{ row.obey }}</span>
          </span>
        </template>
        <span class="msb-stat">
          <i class="fa-solid fa-moon" style="color: #ff5252"></i>
          <span class="msb-stat-label">堕落度</span>
          <span class="msb-bar-wrap msb-bar-sm"><span class="msb-bar msb-bar-corr" :style="{ width: row.corr + '%' }"></span></span>
          <span class="msb-stat-val">{{ row.corr }}</span>
        </span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

// 新 schema 中 角色是嵌套对象：角色[name].好感度 / .服从度 / .堕落度 / .契约阶段
// 主角标记取 世界.当前主角（新 schema 顶层字段）
const rows = computed(() => {
  const p = store.data;
  const protagonist = p.世界.当前主角;
  return p.世界.在场角色.map(name => {
    const charData = p.角色[name];
    const isProtagonist = name === protagonist;
    return {
      name,
      isProtagonist,
      corr: charData?.堕落度 ?? 0,
      aff: isProtagonist ? null : (charData?.好感度 ?? 0),
      obey: isProtagonist ? null : (charData?.服从度 ?? 0),
    };
  });
});
</script>
