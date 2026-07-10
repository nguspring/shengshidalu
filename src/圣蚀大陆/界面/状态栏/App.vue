<template>
  <div class="msb-root">
    <SceneSection />
    <PlayerSection />
    <!-- 在场角色列表为空时不渲染该区（开场白时在场角色为空数组） -->
    <PresentChars v-if="present_chars.length > 0" />
    <!-- 全部角色名单取 角色 record 的 keys（新 schema 为嵌套对象，key 即角色名） -->
    <AllChars v-if="all_chars.length > 0" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useDataStore } from './store';
import AllChars from './components/AllChars.vue';
import PlayerSection from './components/PlayerSection.vue';
import PresentChars from './components/PresentChars.vue';
import SceneSection from './components/SceneSection.vue';

const store = useDataStore();

// store.data 是 Ref<Schema>，需 .value 访问内部值；computed 让其具备响应式
const present_chars = computed(() => store.data.value.世界.在场角色);
// 新 schema：角色为 z.record(key=角色名, value={好感度,服从度,...})，取 keys 得到全部角色名
const all_chars = computed(() => Object.keys(store.data.value.角色));
</script>
