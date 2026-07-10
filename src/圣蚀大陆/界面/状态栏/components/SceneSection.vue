<template>
  <div class="msb-section msb-sec-scene">
    <div class="msb-sec-label">场景</div>
    <div class="msb-tags">
      <span class="msb-tag msb-tag-loc"><i class="fa-solid fa-map-location-dot"></i>{{ current_location }}</span>
      <span class="msb-tag msb-tag-tower" v-if="tower_floor > 0">层数 {{ tower_floor }}F</span>
      <span class="msb-tag msb-tag-time"><i class="fa-solid fa-clock"></i>{{ time_display }}</span>
      <span class="msb-tag msb-tag-phase"><i class="fa-solid fa-scroll"></i>{{ story_phase }}</span>
      <span class="msb-tag msb-tag-nsfw" v-if="nsfw_mode === '开启'"><i class="fa-solid fa-fire"></i>NSFW</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

// 场景区：当前区域 / 当前楼层（>0 才显示）/ 时间对象格式化 / 剧情阶段 / NSFW模式
// 当前主角已移到玩家区，因为玩家操控的主角属于玩家身份
const current_location = computed(() => store.data.世界.当前区域);
const tower_floor = computed(() => store.data.世界.当前楼层);
const story_phase = computed(() => store.data.剧情.阶段);
const nsfw_mode = computed(() => store.data.世界.nsfw模式);

// 时间格式化：年/月/日 时时 → "1024年3月15日 22时"
const time_display = computed(() => {
  const t = store.data.世界.时间;
  return `${t.年}年${t.月}月${t.日}日 ${t.时}时`;
});
</script>
