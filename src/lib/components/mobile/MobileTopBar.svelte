<script lang="ts">
  import { currentProject, viewMode, updateProjectName, undo, redo, snapEnabled, addFloor, removeFloor, setActiveFloor, layerVisibility } from '$lib/stores/project';
  import { manualSave, saveState } from '$lib/stores/saveStatus';
  import { get } from 'svelte/store';
  import { exportAsPNG, exportAsJSON, exportAsSVG, exportPDF } from '$lib/utils/export';
  import SettingsDialog from '$lib/components/toolbar/SettingsDialog.svelte';
  import AreaSummaryPanel from '$lib/components/sidebar/AreaSummaryPanel.svelte';
  import VersionHistoryPanel from '$lib/components/toolbar/VersionHistoryPanel.svelte';
  import { initAutoSave } from '$lib/stores/saveStatus';
  import { initVersionHistory } from '$lib/stores/versionHistory';
  import { onMount } from 'svelte';

  let { onToggleDrawer }: { onToggleDrawer?: () => void } = $props();

  let projectName = $state('');
  let mode = $state<'2d' | '3d'>('2d');
  let menuOpen = $state(false);
  let editingName = $state(false);
  let settingsOpen = $state(false);
  let areaOpen = $state(false);
  let versionHistoryOpen = $state(false);
  let snapOn = $state(true);
  let floors: any[] = $state([]);
  let activeFloorId = $state('');
  let exportSubOpen = $state(false);

  currentProject.subscribe(p => {
    if (p) { projectName = p.name; floors = p.floors; activeFloorId = p.activeFloorId; }
  });
  viewMode.subscribe(m => { mode = m; });
  snapEnabled.subscribe(v => { snapOn = v; });

  function setMode(m: '2d' | '3d') { viewMode.set(m); }

  function onNameBlur() { editingName = false; updateProjectName(projectName); }
  function onNameKeydown(e: KeyboardEvent) { if (e.key === 'Enter') (e.target as HTMLInputElement).blur(); }

  function closeMenu() { menuOpen = false; exportSubOpen = false; }

  function onExportPNG() {
    const p = get(currentProject);
    const canvas = document.querySelector('canvas') as HTMLCanvasElement;
    if (canvas) exportAsPNG(canvas, p ?? undefined);
    closeMenu();
  }
  function onExportJSON() { const p = get(currentProject); if (p) exportAsJSON(p); closeMenu(); }
  function onExportPDF() { const p = get(currentProject); if (p) exportPDF(p); closeMenu(); }

  onMount(() => {
    initAutoSave();
    initVersionHistory();
    function handleClickOutside(e: MouseEvent) {
      const menu = document.getElementById('mobile-menu');
      if (menuOpen && menu && !menu.contains(e.target as Node)) closeMenu();
    }
    document.addEventListener('click', handleClickOutside, true);
    return () => document.removeEventListener('click', handleClickOutside, true);
  });
</script>

<div class="h-12 bg-gradient-to-r from-slate-800 to-slate-700 flex items-center px-2 gap-1.5 shrink-0 shadow-sm">
  <!-- Back -->
  <a href="/" class="p-2.5 text-white/70 hover:text-white flex items-center justify-center min-w-[44px] min-h-[44px]" title="Projects">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 18l-6-6 6-6"/></svg>
  </a>

  <!-- Project name -->
  <div class="flex-1 min-w-0">
    {#if editingName}
      <input
        type="text"
        bind:value={projectName}
        onblur={onNameBlur}
        onkeydown={onNameKeydown}
        class="w-full bg-white/20 text-white font-semibold px-2 py-1 rounded border border-white/30 outline-none text-sm"
        autofocus
      />
    {:else}
      <button
        class="w-full text-left font-semibold text-white text-sm truncate px-1 py-1 rounded hover:bg-white/10 transition-colors min-h-[36px] flex items-center"
        onclick={() => editingName = true}
        title="Tap to rename"
      >{projectName}</button>
    {/if}
  </div>

  <!-- Undo / Redo -->
  <button onclick={undo} class="p-2.5 text-white/80 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded hover:bg-white/10" title="Undo">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"/></svg>
  </button>
  <button onclick={redo} class="p-2.5 text-white/80 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded hover:bg-white/10" title="Redo">
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="23 4 23 10 17 10"/><path d="M20.49 15a9 9 0 1 1-2.13-9.36L23 10"/></svg>
  </button>

  <!-- 2D / 3D pill -->
  <div class="flex bg-white/15 rounded-full p-0.5">
    <button
      onclick={() => setMode('2d')}
      class="px-2.5 py-1 text-xs font-bold rounded-full transition-colors min-h-[32px] {mode === '2d' ? 'bg-white text-slate-800' : 'text-white/80 hover:text-white'}"
    >2D</button>
    <button
      onclick={() => setMode('3d')}
      class="px-2.5 py-1 text-xs font-bold rounded-full transition-colors min-h-[32px] {mode === '3d' ? 'bg-white text-slate-800' : 'text-white/80 hover:text-white'}"
    >3D</button>
  </div>

  <!-- Save indicator + Save button -->
  <span class="text-[11px] font-medium {$saveState === 'saved' ? 'text-emerald-400' : $saveState === 'saving' ? 'text-amber-300 animate-pulse' : 'text-white/50'}">
    {#if $saveState === 'saving'}Saving…{:else if $saveState === 'saved'}✓{:else}•{/if}
  </span>

  <!-- Menu button -->
  <div class="relative" id="mobile-menu">
    <button
      onclick={() => menuOpen = !menuOpen}
      class="p-2.5 text-white/80 hover:text-white min-w-[44px] min-h-[44px] flex items-center justify-center rounded hover:bg-white/10"
      title="Menu"
      aria-label="More options"
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><circle cx="12" cy="5" r="1"/><circle cx="12" cy="12" r="1"/><circle cx="12" cy="19" r="1"/></svg>
    </button>

    {#if menuOpen}
      <div class="absolute right-0 top-full mt-1 bg-white rounded-xl shadow-xl border border-gray-100 py-1.5 w-52 z-50 overflow-hidden">
        <!-- Save -->
        <button
          class="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left flex items-center gap-3 min-h-[44px]"
          onclick={() => { manualSave(); closeMenu(); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"/><polyline points="17 21 17 13 7 13 7 21"/><polyline points="7 3 7 8 15 8"/></svg>
          Save
        </button>

        <div class="h-px bg-gray-100 my-1"></div>

        <!-- Snap toggle -->
        <button
          class="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left flex items-center gap-3 min-h-[44px]"
          onclick={() => { snapEnabled.update(v => !v); closeMenu(); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>
          Snap {snapOn ? '(On)' : '(Off)'}
        </button>

        <!-- Area Summary -->
        <button
          class="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left flex items-center gap-3 min-h-[44px]"
          onclick={() => { areaOpen = true; closeMenu(); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 3v18"/></svg>
          Area Summary
        </button>

        <!-- Version History -->
        <button
          class="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left flex items-center gap-3 min-h-[44px]"
          onclick={() => { versionHistoryOpen = true; closeMenu(); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/></svg>
          Version History
        </button>

        <div class="h-px bg-gray-100 my-1"></div>

        <!-- Export sub-menu toggle -->
        <button
          class="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left flex items-center justify-between gap-3 min-h-[44px]"
          onclick={() => exportSubOpen = !exportSubOpen}
        >
          <span class="flex items-center gap-3">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg>
            Export
          </span>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="transition-transform {exportSubOpen ? 'rotate-90' : ''}"><path d="M9 18l6-6-6-6"/></svg>
        </button>

        {#if exportSubOpen}
          <div class="bg-gray-50 border-t border-gray-100">
            <button class="w-full px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-100 text-left min-h-[44px]" onclick={onExportPNG}>PNG (2D)</button>
            <button class="w-full px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-100 text-left min-h-[44px]" onclick={onExportPDF}>PDF</button>
            <button class="w-full px-6 py-2.5 text-sm text-gray-600 hover:bg-gray-100 text-left min-h-[44px]" onclick={onExportJSON}>JSON</button>
          </div>
        {/if}

        <div class="h-px bg-gray-100 my-1"></div>

        <!-- Settings -->
        <button
          class="w-full px-4 py-3 text-sm text-gray-700 hover:bg-gray-50 text-left flex items-center gap-3 min-h-[44px]"
          onclick={() => { settingsOpen = true; closeMenu(); }}
        >
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1-2.83 2.83l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-4 0v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83-2.83l.06-.06A1.65 1.65 0 0 0 4.68 15a1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1 0-4h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 2.83-2.83l.06.06A1.65 1.65 0 0 0 9 4.68a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 4 0v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 2.83l-.06.06A1.65 1.65 0 0 0 19.4 9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 0 4h-.09a1.65 1.65 0 0 0-1.51 1z"/></svg>
          Settings
        </button>
      </div>
    {/if}
  </div>
</div>

<SettingsDialog bind:open={settingsOpen} />
<VersionHistoryPanel bind:open={versionHistoryOpen} />

{#if areaOpen}
<div class="fixed inset-0 z-50 flex items-end justify-center bg-black/40" onclick={() => areaOpen = false} onkeydown={(e) => { if (e.key === 'Escape') areaOpen = false; }} role="dialog" tabindex="-1">
  <div class="bg-white rounded-t-2xl shadow-2xl w-full max-h-[70vh] overflow-hidden" onclick={(e) => e.stopPropagation()} role="document">
    <div class="flex items-center justify-between px-5 py-3 border-b border-gray-200">
      <h2 class="text-base font-semibold text-gray-800">Area Summary</h2>
      <button onclick={() => areaOpen = false} class="text-gray-400 hover:text-gray-600 text-2xl leading-none min-w-[44px] min-h-[44px] flex items-center justify-center">&times;</button>
    </div>
    <div class="overflow-y-auto max-h-[calc(70vh-52px)] p-2">
      <AreaSummaryPanel />
    </div>
  </div>
</div>
{/if}
