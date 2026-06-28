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
        <!-- 主角跳过好感/服从列，只显示堕落度（与原 EJS 逻辑一致） -->
        <template v-if="!row.isProtagonist">
          <span class="msb-stat">
            <i class="fa-solid fa-heart" style="color: #ff6b9d"></i>
            <span class="msb-bar-wrap msb-bar-sm"><span class="msb-bar msb-bar-aff" :style="{ width: row.aff + '%' }"></span></span>
            <span class="msb-stat-val">{{ row.aff }}</span>
          </span>
          <span class="msb-stat">
            <i class="fa-solid fa-circle-dot" style="color: #c77dff"></i>
            <span class="msb-bar-wrap msb-bar-sm"><span class="msb-bar msb-bar-obey" :style="{ width: row.obey + '%' }"></span></span>
            <span class="msb-stat-val">{{ row.obey }}</span>
          </span>
        </template>
        <span class="msb-stat">
          <i class="fa-solid fa-skull" style="color: #ff5252"></i>
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

// 预计算每行数据：主角标记 + 三项属性（主角的 aff/obey 设 null 不渲染）
const rows = computed(() => {
  const p = store.data.value;
  const protagonist = p.玩家.当前主角;
  return p.世界.在场角色.map(name => {
    const isProtagonist = name === protagonist;
    return {
      name,
      isProtagonist,
      corr: p.角色.堕落度[name] ?? 0,
      // 主角的 aff/obey 用 null 占位（模板 v-if 不渲染），避免显示主角对自己的好感/服从
      aff: isProtagonist ? null : (p.角色.好感度[name] ?? 0),
      obey: isProtagonist ? null : (p.角色.服从度[name] ?? 0),
    };
  });
});
</script>
