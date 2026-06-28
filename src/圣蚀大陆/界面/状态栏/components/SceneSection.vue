<template>
  <div class="msb-section msb-sec-scene">
    <div class="msb-sec-label">场景</div>
    <div class="msb-tags">
      <span class="msb-tag msb-tag-loc"><i class="fa-solid fa-map-location-dot"></i>{{ current_location }}</span>
      <span class="msb-tag msb-tag-tower"><i class="fa-solid fa-fort-awesome"></i>{{ tower_floor }}F</span>
      <span class="msb-tag msb-tag-time"><i class="fa-solid fa-sun"></i>{{ time_of_day }}</span>
      <span class="msb-tag msb-tag-phase"><i class="fa-solid fa-scroll"></i>{{ story_phase }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from '../store';

const store = useDataStore();

// 场景区四项：当前区域 / 魔宫层数 / 时间 / 剧情阶段
const current_location = computed(() => store.data.value.世界.当前区域);
const tower_floor = computed(() => store.data.value.世界.魔宫层数);
const time_of_day = computed(() => store.data.value.世界.时间);
const story_phase = computed(() => store.data.value.剧情.阶段);
</script>
