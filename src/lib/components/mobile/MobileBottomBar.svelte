<script lang="ts">
  import { selectedTool, panMode, placingDoorType, placingWindowType } from '$lib/stores/project';
  import type { Tool } from '$lib/stores/project';

  let { onOpenDrawer }: { onOpenDrawer?: () => void } = $props();

  let currentTool = $state<Tool>('select');
  let isPan = $state(false);

  selectedTool.subscribe(t => { currentTool = t; });
  panMode.subscribe(v => { isPan = v; });

  function setTool(tool: Tool) {
    selectedTool.set(tool);
    panMode.set(false);
  }

  function setPan() {
    panMode.set(true);
    selectedTool.set('select');
  }

  const tools: { id: Tool | 'pan'; icon: string; label: string; path?: string }[] = [
    {
      id: 'select',
      label: 'Select',
      icon: `<path d="M3 3l7.07 16.97 2.51-7.39 7.39-2.51L3 3z"/><path d="M13 13l6 6"/>`
    },
    {
      id: 'wall',
      label: 'Wall',
      icon: `<rect x="3" y="8" width="18" height="8" rx="1"/><line x1="7" y1="8" x2="7" y2="16"/><line x1="12" y1="8" x2="12" y2="16"/><line x1="17" y1="8" x2="17" y2="16"/>`
    },
    {
      id: 'door',
      label: 'Door',
      icon: `<rect x="3" y="2" width="13" height="20" rx="1"/><path d="M16 12h4"/>`
    },
    {
      id: 'window',
      label: 'Window',
      icon: `<rect x="3" y="4" width="18" height="16" rx="1"/><line x1="12" y1="4" x2="12" y2="20"/><line x1="3" y1="12" x2="21" y2="12"/>`
    },
    {
      id: 'pan',
      label: 'Pan',
      icon: `<path d="M18 11V6a2 2 0 0 0-4 0v1"/><path d="M14 10V4a2 2 0 0 0-4 0v2"/><path d="M10 10.5V6a2 2 0 0 0-4 0v8"/><path d="M18 8a2 2 0 1 1 4 0v6a8 8 0 0 1-8 8h-2c-2.8 0-4.5-.86-5.99-2.34l-3.6-3.6a2 2 0 0 1 2.83-2.82L7 15"/>`
    },
  ];

  function isActive(toolId: Tool | 'pan'): boolean {
    if (toolId === 'pan') return isPan;
    return currentTool === toolId && !isPan;
  }
</script>

<nav class="h-16 bg-white border-t border-gray-200 flex items-center shrink-0 shadow-[0_-2px_8px_rgba(0,0,0,0.08)] safe-area-inset-bottom">
  {#each tools as tool}
    <button
      class="flex-1 flex flex-col items-center justify-center gap-0.5 h-full transition-colors
        {isActive(tool.id)
          ? 'text-blue-600 bg-blue-50'
          : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'}"
      onclick={() => tool.id === 'pan' ? setPan() : setTool(tool.id as Tool)}
      aria-label={tool.label}
      title={tool.label}
    >
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        {@html tool.icon}
      </svg>
      <span class="text-[10px] font-medium">{tool.label}</span>
    </button>
  {/each}

  <!-- More / Drawer button -->
  <button
    class="flex-1 flex flex-col items-center justify-center gap-0.5 h-full text-gray-500 hover:text-blue-600 hover:bg-blue-50 transition-colors"
    onclick={onOpenDrawer}
    aria-label="More tools"
    title="Build Panel"
  >
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
      <rect x="3" y="3" width="7" height="7" rx="1"/>
      <rect x="14" y="3" width="7" height="7" rx="1"/>
      <rect x="3" y="14" width="7" height="7" rx="1"/>
      <rect x="14" y="14" width="7" height="7" rx="1"/>
    </svg>
    <span class="text-[10px] font-medium">More</span>
  </button>
</nav>
