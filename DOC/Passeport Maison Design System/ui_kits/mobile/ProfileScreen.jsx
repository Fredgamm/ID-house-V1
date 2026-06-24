/* global React, TOK, Ic, Btn, Badge */

function ProfileScreen({ onClose }) {
  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: TOK.bg, display: 'flex', flexDirection: 'column',
      animation: 'slideInRight 280ms ease', overflow: 'hidden',
    }}>

      <div style={{ height: 47, background: TOK.surface, flexShrink: 0 }}/>

      {/* Header */}
      <div style={{
        background: TOK.surface, padding: '8px 20px 12px',
        display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
        borderBottom: `1px solid ${TOK.border}`,
      }}>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 16, background: TOK.muted, border: 0,
          color: TOK.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Ic name="chevron-left" style={{ fontSize: 18 }}/></button>
        <span style={{ flex: 1, fontSize: 17, fontWeight: 700 }}>Mon profil</span>
        <button style={{
          width: 32, height: 32, borderRadius: 16, background: TOK.muted, border: 0,
          color: TOK.t2, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Ic name="settings" style={{ fontSize: 16 }}/></button>
      </div>

      {/* Body */}
      <div style={{ flex: 1, overflowY: 'auto' }}>

        {/* User card */}
        <div style={{
          background: TOK.surface, padding: '20px', borderBottom: `1px solid ${TOK.border}`,
          display: 'flex', alignItems: 'center', gap: 14,
        }}>
          <div style={{
            width: 58, height: 58, borderRadius: 29,
            background: 'linear-gradient(135deg, #7065F0, #5245ED)', color: '#FFF',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 22, fontWeight: 800, flexShrink: 0,
          }}>F</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 16, fontWeight: 700, color: TOK.textDeep }}>Frédéric G.</div>
            <div style={{ fontSize: 13, color: TOK.t2, marginBottom: 6 }}>fredo@dettes.ca</div>
            <Badge kind="pro" icon="shield-check">Compte vérifié</Badge>
          </div>
        </div>

        {/* House overview */}
        <div style={{ margin: '12px 20px', padding: '14px', background: TOK.surface, border: `1.5px solid ${TOK.border}`, borderRadius: 14, boxShadow: TOK.shadowSm }}>
          <div style={{ fontSize: 13, fontWeight: 700, color: TOK.textDeep, marginBottom: 10 }}>Mon logement</div>
          {[
            { k: 'Maison Martin',    v: 'Maison · 68 m²'  },
            { k: 'Équipements',      v: '14 documentés'    },
            { k: 'Valeur estimée',   v: '428 500 €', accent: true },
          ].map(r => (
            <div key={r.k} style={{
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
              fontSize: 13, paddingBottom: 7, marginBottom: 7,
              borderBottom: `1px solid ${TOK.border}`,
            }}>
              <span style={{ color: TOK.t2 }}>{r.k}</span>
              <span style={{ fontWeight: r.accent ? 700 : 600, color: r.accent ? TOK.primary700 : TOK.text }}>{r.v}</span>
            </div>
          ))}
          <Btn variant="secondary" full size="sm">Voir le rapport →</Btn>
        </div>

        {/* Settings sections */}
        {[
          { section: 'Documents', items: [
            { icon: 'file-text',   label: 'Rapport patrimoine'    },
            { icon: 'download',    label: 'Télécharger (JSON)'    },
            { icon: 'share-2',     label: 'Partager le passeport' },
          ]},
          { section: 'Mes annonces', items: [
            { icon: 'store',       label: 'Voir mes annonces', note: '0 actives' },
          ]},
          { section: 'Compte', items: [
            { icon: 'bell',        label: 'Notifications',       note: 'Activées' },
            { icon: 'shield',      label: 'Confidentialité RGPD'                  },
            { icon: 'info',        label: 'À propos',            note: 'v0.1.0'   },
          ]},
        ].map(({ section, items }) => (
          <div key={section}>
            <div style={{
              padding: '14px 20px 6px', fontSize: 11, fontWeight: 700,
              color: TOK.t3, textTransform: 'uppercase', letterSpacing: '0.06em',
            }}>{section}</div>
            {items.map(item => (
              <button key={item.label} style={{
                display: 'flex', alignItems: 'center', gap: 12, width: '100%',
                padding: '13px 20px', background: TOK.surface,
                border: 0, borderBottom: `1px solid ${TOK.border}`,
                cursor: 'pointer', textAlign: 'left', fontFamily: TOK.font,
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 9, background: TOK.muted,
                  color: TOK.t2, display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 18, flexShrink: 0,
                }}><Ic name={item.icon}/></div>
                <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: TOK.text }}>{item.label}</span>
                {item.note && <span style={{ fontSize: 12, color: TOK.t2 }}>{item.note}</span>}
                <Ic name="chevron-right" style={{ color: TOK.t3, fontSize: 15 }}/>
              </button>
            ))}
          </div>
        ))}

        {/* Logout */}
        <div style={{ padding: '20px 20px 44px' }}>
          <button style={{
            width: '100%', padding: '14px', borderRadius: 12,
            background: '#FEE2E2', border: '1.5px solid #FECACA',
            color: '#B91C1C', fontSize: 15, fontWeight: 600,
            cursor: 'pointer', fontFamily: TOK.font,
          }}>Se déconnecter</button>
        </div>
      </div>

      <style>{`@keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>
    </div>
  );
}

Object.assign(window, { ProfileScreen });
