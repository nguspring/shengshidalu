<template>
  <div class="msb-section msb-sec-player">
    <div class="msb-sec-label">玩家</div>
    <div class="msb-tags">
      <span class="msb-tag msb-tag-id"><i class="fa-solid fa-shield-halved"></i>{{ identity }}</span>
      <span class="msb-tag msb-tag-fac"><i class="fa-solid fa-scale-balanced"></i>{{ alignment }}</span>
      <span class="msb-tag msb-tag-sync">
        <i class="fa-solid fa-wand-magic-sparkles"></i>
        <span class="msb-bar-wrap"><span class="msb-bar msb-bar-magic" :style="{ width: magic_sync + '%' }"></span></span>
        {{ magic_sync }}%
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

// 玩家区三项：身份 / 阵营偏向 / 魔力同步率（带进度条）
const identity = computed(() => store.data.玩家.身份);
const alignment = computed(() => store.data.玩家.阵营偏向);
const magic_sync = computed(() => store.data.玩家.魔力同步率);
</script>
