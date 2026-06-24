<script lang="ts">
  import { type Snippet } from 'svelte';

  let {
    open = $bindable(false),
    title = 'Panel',
    children,
    heightClass = 'max-h-[70vh]',
  }: {
    open?: boolean;
    title?: string;
    children?: Snippet;
    heightClass?: string;
  } = $props();

  let startY = 0;
  let dragging = false;
  let dragDelta = $state(0);

  function onTouchStart(e: TouchEvent) {
    startY = e.touches[0].clientY;
    dragging = true;
    dragDelta = 0;
  }

  function onTouchMove(e: TouchEvent) {
    if (!dragging) return;
    const delta = e.touches[0].clientY - startY;
    if (delta > 0) dragDelta = delta;
  }

  function onTouchEnd() {
    dragging = false;
    if (dragDelta > 80) open = false;
    dragDelta = 0;
  }
</script>

{#if open}
  <!-- Backdrop -->
  <!-- svelte-ignore a11y_no_static_element_interactions -->
  <div
    class="fixed inset-0 bg-black/30 z-40 transition-opacity"
    onclick={() => open = false}
    onkeydown={(e) => { if (e.key === 'Escape') open = false; }}
  ></div>

  <!-- Sheet -->
  <div
    class="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-2xl shadow-2xl flex flex-col {heightClass}"
    style="transform: translateY({dragDelta}px); transition: {dragging ? 'none' : 'transform 0.3s ease'};"
  >
    <!-- Drag handle -->
    <div
      class="flex items-center justify-center pt-3 pb-1 cursor-grab active:cursor-grabbing"
      role="presentation"
      ontouchstart={onTouchStart}
      ontouchmove={onTouchMove}
      ontouchend={onTouchEnd}
    >
      <div class="w-10 h-1 bg-gray-300 rounded-full"></div>
    </div>

    <!-- Header -->
    <div class="flex items-center justify-between px-4 py-2 border-b border-gray-100">
      <h2 class="text-sm font-semibold text-gray-800">{title}</h2>
      <button
        onclick={() => open = false}
        class="text-gray-400 hover:text-gray-600 min-w-[44px] min-h-[44px] flex items-center justify-center text-xl leading-none rounded-full hover:bg-gray-100"
        aria-label="Close"
      >
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
      </button>
    </div>

    <!-- Content -->
    <div class="flex-1 overflow-y-auto overscroll-contain">
      {@render children?.()}
    </div>
  </div>
{/if}
