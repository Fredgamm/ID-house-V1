/* global React */
// Shared UI primitives for the Passeport Maison mobile kit.
// Maps tokens from ../../colors_and_type.css to inline-style helpers.

const { useState, useEffect, useRef } = React;

const TOK = {
  primary: '#7065F0',
  primary50: '#F7F7FD',
  primary100: '#F0EFFB',
  primary200: '#E0DEF7',
  primary400: '#A8A2F6',
  primary700: '#5245ED',
  primary800: '#2516DF',
  primary900: '#100A55',
  text: '#000929',
  textDeep: '#100A55',
  t2: '#4D5461',
  t3: '#6C727F',
  border: '#E0DEF7',
  borderSoft: '#F0EFFB',
  surface: '#FFFFFF',
  bg: '#F7F7FD',
  input: '#F7F7FD',
  muted: '#F0EFFB',
  fixedBg: '#FEE2E2', fixedTx: '#B91C1C',
  movableBg: '#F0EFFB', movableTx: '#5245ED',
  proBg: '#DCFCE7', proTx: '#15803D',
  premiumBg: '#FEF3C7', premiumTx: '#B45309',
  aiBg: '#E0F2FE', aiTx: '#075985',
  success: '#16A34A',
  shadowSm: '0 1px 2px rgba(0,9,41,0.04), 0 1px 3px rgba(0,9,41,0.06)',
  shadowLg: '0 12px 24px -8px rgba(0,9,41,0.12), 0 4px 8px -4px rgba(0,9,41,0.06)',
  shadowPurple: '0 8px 20px -8px rgba(112,101,240,0.35)',
  font: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, system-ui, sans-serif",
  display: "'Plus Jakarta Sans', -apple-system, system-ui, sans-serif",
};

// ──────────────────────────────────────────────────────────────
// Icon — React-owned inline SVG via Lucide UMD
// ──────────────────────────────────────────────────────────────
const PH_TO_LUCIDE = {
  'house':'home','squares-four':'layout-grid','package':'package','file-text':'file-text',
  'storefront':'store','chat-circle-dots':'message-circle','chart-line':'trending-up',
  'list-bullets':'list','user-circle':'user-circle','gear':'settings',
  'armchair':'armchair','cooking-pot':'cooking-pot','bed':'bed-double','bathtub':'bath',
  'desk':'briefcase','path':'route','garage':'warehouse','tree-evergreen':'trees',
  'magnifying-glass':'search','funnel':'filter','plus':'plus','sparkle':'sparkles',
  'seal-check':'badge-check','crown':'crown','share-network':'share-2',
  'download-simple':'download','pencil-simple':'pencil','trash':'trash-2',
  'caret-left':'chevron-left','caret-right':'chevron-right','x':'x',
  'dots-three':'more-horizontal','camera':'camera','file':'file',
  'cell-signal-full':'signal','wifi-high':'wifi','battery-full':'battery-full',
  'lock-key':'lock','check-circle':'circle-check-big','check':'check',
  'star':'star','heart':'heart','eye':'eye','map-pin':'map-pin',
  'snowflake':'snowflake','couch':'sofa','fan':'fan','television-simple':'tv',
  'paint-roller':'paint-roller','wrench':'wrench','lightning':'zap','tree':'trees',
  'qr-code':'qr-code',
};
function toPascal(s) { return s.split('-').map(p => p[0].toUpperCase() + p.slice(1)).join(''); }
function camelKeys(obj) {
  const out = {};
  for (const k of Object.keys(obj)) {
    const ck = k.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
    out[ck] = obj[k];
  }
  return out;
}
function Ic({ name, size = '1em', stroke = 1.75, style }) {
  const resolved = PH_TO_LUCIDE[name] || name;
  const data = (window.lucide && window.lucide.icons) ? window.lucide.icons[toPascal(resolved)] : null;
  if (!data) return <span style={{ display: 'inline-block', width: size, height: size, ...(style||{}) }}/>;
  const [, attrs, children] = data;
  const cleanAttrs = camelKeys(attrs);
  return (
    <svg {...cleanAttrs} width={size} height={size} strokeWidth={stroke} style={{ display: 'inline-block', verticalAlign: '-0.125em', ...(style||{}) }}>
      {children.map(([tag, a], i) => React.createElement(tag, { key: i, ...camelKeys(a) }))}
    </svg>
  );
}

// ──────────────────────────────────────────────────────────────
// Phone frame
// ──────────────────────────────────────────────────────────────
function Phone({ children, dark = false }) {
  return (
    <div style={{
      width: 390, height: 844, borderRadius: 56, overflow: 'hidden',
      background: dark ? '#0B0F17' : TOK.surface,
      boxShadow: '0 30px 60px -20px rgba(0,9,41,0.35), 0 0 0 12px #111, 0 0 0 13px #1F2937',
      position: 'relative', fontFamily: TOK.font, color: dark ? '#F7F7FD' : TOK.text,
      WebkitFontSmoothing: 'antialiased',
    }}>
      {/* dynamic island */}
      <div style={{
        position: 'absolute', top: 10, left: '50%', transform: 'translateX(-50%)',
        width: 120, height: 35, borderRadius: 22, background: '#000', zIndex: 100,
      }} />
      {children}
      {/* home indicator */}
      <div style={{
        position: 'absolute', bottom: 8, left: '50%', transform: 'translateX(-50%)',
        width: 140, height: 5, borderRadius: 3,
        background: dark ? 'rgba(255,255,255,0.6)' : 'rgba(0,9,41,0.35)',
        zIndex: 100,
      }}/>
    </div>
  );
}

function StatusBar({ dark = false }) {
  const c = dark ? '#FFFFFF' : '#000929';
  return (
    <div style={{
      height: 47, padding: '14px 28px 0', display: 'flex',
      justifyContent: 'space-between', alignItems: 'center',
      fontSize: 15, fontWeight: 600, color: c, position: 'relative', zIndex: 5,
    }}>
      <span>9:41</span>
      <span style={{ display: 'flex', gap: 5, alignItems: 'center', fontSize: 12 }}>
        <Ic name="signal" />
        <Ic name="wifi" />
        <Ic name="battery-full" />
      </span>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Header
// ──────────────────────────────────────────────────────────────
function Header({ title, subtitle, onBack, action, dark = false }) {
  const c = dark ? '#F7F7FD' : TOK.text;
  const sc = dark ? '#6C727F' : TOK.t2;
  const ic = dark ? '#1F2937' : TOK.muted;
  return (
    <div style={{
      padding: '8px 20px 14px', display: 'grid',
      gridTemplateColumns: '32px 1fr 32px', alignItems: 'center', gap: 12,
    }}>
      {onBack ? (
        <button onClick={onBack} style={{
          width: 32, height: 32, borderRadius: 16, background: ic, border: 0,
          color: c, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 16, cursor: 'pointer',
        }}><Ic name="chevron-left"/></button>
      ) : <span/>}
      <div style={{ textAlign: onBack ? 'left' : 'left' }}>
        <div style={{ fontSize: 17, fontWeight: 700, color: c, letterSpacing: '-0.01em' }}>{title}</div>
        {subtitle && <div style={{ fontSize: 11, color: sc, marginTop: 1 }}>{subtitle}</div>}
      </div>
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>{action}</div>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Bottom nav
// ──────────────────────────────────────────────────────────────
function BottomNav({ items, active, onChange, dark = false }) {
  const c = dark ? '#6B7280' : TOK.t3;
  const cA = dark ? '#A8A2F6' : TOK.primary;
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: dark ? 'rgba(11,15,23,0.92)' : 'rgba(255,255,255,0.92)',
      backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${dark ? '#1F2937' : TOK.border}`,
      padding: '8px 8px 34px', display: 'grid',
      gridTemplateColumns: `repeat(${items.length}, 1fr)`,
      zIndex: 50,
    }}>
      {items.map((it, i) => {
        const isAct = active === it.id;
        return (
          <button key={it.id} onClick={() => onChange(it.id)} style={{
            border: 0, background: 'transparent', cursor: 'pointer',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            padding: '6px 2px', color: isAct ? cA : c,
          }}>
            <Ic name={it.icon} style={{ fontSize: 22 }}/>
            <span style={{ fontSize: 10, fontWeight: isAct ? 600 : 500 }}>{it.label}</span>
          </button>
        );
      })}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Atoms
// ──────────────────────────────────────────────────────────────
function Btn({ children, variant = 'primary', size = 'default', onClick, icon, full, style }) {
  const pad = size === 'sm' ? '10px 18px' : size === 'lg' ? '16px 28px' : '12px 24px';
  const r = 8;
  const fs = size === 'sm' ? 14 : 16;
  const v = {
    primary: { bg: TOK.primary, c: '#FFF' },
    secondary: { bg: TOK.muted, c: TOK.text },
    outline: { bg: 'transparent', c: TOK.primary, b: `1.5px solid ${TOK.border}` },
    destructive: { bg: '#DC2626', c: '#FFF' },
    ghost: { bg: 'transparent', c: TOK.primary },
  }[variant];
  return (
    <button onClick={onClick} style={{
      background: v.bg, color: v.c, border: v.b || 0,
      padding: pad, borderRadius: r, fontSize: fs, fontWeight: 700,
      fontFamily: TOK.font, cursor: 'pointer', width: full ? '100%' : undefined,
      display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: 8,
      transition: 'opacity 150ms ease', ...(style || {}),
    }} onMouseDown={e => e.currentTarget.style.opacity = 0.8}
       onMouseUp={e => e.currentTarget.style.opacity = 1}
       onMouseLeave={e => e.currentTarget.style.opacity = 1}>
      {icon && <Ic name={icon} style={{ fontSize: fs + 2 }}/>}
      {children}
    </button>
  );
}

function Badge({ kind = 'neutral', icon, children }) {
  const pal = {
    fixed:    { bg: TOK.fixedBg, c: TOK.fixedTx },
    movable:  { bg: TOK.movableBg, c: TOK.movableTx },
    pro:      { bg: TOK.proBg, c: TOK.proTx },
    premium:  { bg: TOK.premiumBg, c: TOK.premiumTx },
    ai:       { bg: TOK.aiBg, c: TOK.aiTx },
    primary:  { bg: TOK.primary100, c: TOK.primary700 },
    neutral:  { bg: TOK.muted, c: TOK.t2 },
  }[kind];
  return (
    <span style={{
      display: 'inline-flex', alignItems: 'center', gap: 3,
      padding: '3px 8px', borderRadius: 6, fontSize: 11, fontWeight: 600,
      background: pal.bg, color: pal.c,
    }}>
      {icon && <Ic name={icon} style={{ fontSize: 12 }}/>}
      {children}
    </span>
  );
}

function Card({ children, style }) {
  return (
    <div style={{
      background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 12,
      padding: 14, boxShadow: TOK.shadowSm, ...(style || {}),
    }}>{children}</div>
  );
}

function FilterChips({ items, active, onChange }) {
  return (
    <div style={{ display: 'flex', gap: 8, overflowX: 'auto', padding: '0 20px 8px', scrollbarWidth: 'none' }}>
      {items.map(it => {
        const a = active === it.id;
        return (
          <button key={it.id} onClick={() => onChange(it.id)} style={{
            flexShrink: 0, padding: '6px 12px', borderRadius: 999,
            fontSize: 12, fontWeight: 600,
            background: a ? TOK.primary100 : TOK.muted,
            color: a ? TOK.primary700 : TOK.t2,
            border: a ? `1px solid #CBC7FA` : '1px solid transparent',
            cursor: 'pointer',
          }}>{it.label}</button>
        );
      })}
    </div>
  );
}

function SectionTitle({ children, action }) {
  return (
    <div style={{
      display: 'flex', justifyContent: 'space-between', alignItems: 'baseline',
      padding: '14px 20px 8px',
    }}>
      <span style={{ fontSize: 13, fontWeight: 700, color: TOK.text }}>{children}</span>
      {action && <span style={{ fontSize: 12, color: TOK.primary, fontWeight: 600, cursor: 'pointer' }}>{action}</span>}
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Bottom sheet
// ──────────────────────────────────────────────────────────────
function Sheet({ open, onClose, children, title }) {
  if (!open) return null;
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn 200ms ease',
    }} onClick={onClose}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: TOK.surface,
        borderRadius: '24px 24px 0 0', padding: '10px 20px 30px',
        animation: 'slideUp 250ms ease',
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: '#D1D5DB', margin: '0 auto 14px' }}/>
        {title && <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 12 }}>{title}</div>}
        {children}
      </div>
      <style>{`
        @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
        @keyframes slideUp { from { transform: translateY(100%); } to { transform: translateY(0); } }
      `}</style>
    </div>
  );
}

// ──────────────────────────────────────────────────────────────
// Equipment item
// ──────────────────────────────────────────────────────────────
function EquipmentItem({ icon, name, meta, price, badge, onClick }) {
  return (
    <button onClick={onClick} style={{
      width: '100%', background: TOK.surface, border: `1px solid ${TOK.border}`,
      borderRadius: 12, padding: 14, display: 'flex', alignItems: 'center', gap: 12,
      cursor: 'pointer', textAlign: 'left', fontFamily: TOK.font,
      boxShadow: TOK.shadowSm,
    }}>
      <div style={{
        width: 52, height: 52, borderRadius: 12, flexShrink: 0,
        background: badge === 'fixed' ? TOK.fixedBg : badge === 'movable' ? TOK.movableBg : TOK.muted,
        color: badge === 'fixed' ? TOK.fixedTx : badge === 'movable' ? TOK.movableTx : TOK.t2,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
      }}><Ic name={icon}/></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 14, fontWeight: 600, color: TOK.text }}>{name}</div>
        <div style={{ fontSize: 11, color: TOK.t2, marginTop: 2, display: 'flex', alignItems: 'center', gap: 6 }}>
          {meta}{badge && <Badge kind={badge}>{badge === 'fixed' ? 'Fixe' : 'Mobilier'}</Badge>}
        </div>
      </div>
      {price && <div style={{ fontSize: 14, fontWeight: 700, color: TOK.text }}>{price}</div>}
    </button>
  );
}

// Export
Object.assign(window, {
  TOK, Ic, Phone, StatusBar, Header, BottomNav,
  Btn, Badge, Card, FilterChips, SectionTitle, Sheet, EquipmentItem,
});
