<script setup lang="ts">
import { computed, onBeforeMount, ref } from "vue";
import fetchLog from "../utils/fetchLog";
import parseLog from "../utils/parseLog";
import RenderLog from "./RenderLog";

const isLTS = ref(false);
const info = ref<ReturnType<typeof parseLog>>();

const versions = computed(() =>
  isLTS.value ? info.value?.LTSVersionBlocks : info.value?.versionBlocks
);

const status = computed(() => (isLTS.value ? "😃" : "👿"));

function setIsLTS(status: boolean) {
  isLTS.value = status;
}

onBeforeMount(async () => {
  const content = await fetchLog();

  info.value = parseLog(content);
});
</script>

<template>
  <section class="text-center">
    <h1 class="font-black text-6xl mt-30 mb-16">
      <span class="title">APISIX Versions</span>
      <div class="status"></div>
    </h1>
  </section>
  <section v-if="versions" class="content">
    <menu>
      <button @click="setIsLTS(false)" :class="{ selected: !isLTS }">ALL</button>
      <button @click="setIsLTS(true)" :class="{ selected: isLTS }">LTS</button>
    </menu>
    <RenderLog :contents="versions" />
  </section>
  <section v-else class="text-center">
    <h1 title="Something went wrong. Please check the console">{{ status }}</h1>
  </section>
</template>

<style>
.fade-move,
.fade-enter-active,
.fade-leave-active {
  transition: all 0.5s cubic-bezier(0.55, 0, 0.1, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scaleY(0.01) translate(30px, 0);
}

.fade-leave-active {
  position: absolute;
}

.content {
  @apply my-0 mx-auto w-3/5;
}

a {
  @apply color-rose-500;
}

.version-block {
  @apply list-none bg-neutral-100 my-4 px-5 pt-3 py-4 rounded-xl;
}

.title {
  @apply bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-indigo-500;
}

menu {
  @apply space-x-2 text-left;
}

menu > button {
  @apply border-0 rounded-xl px-4 py-2 bg-red-400 text-white cursor-pointer transition ease-linear transform hover:scale-95;
}

.selected {
  @apply opacity-60 cursor-not-allowed hover:scale-100;
}
</style>
