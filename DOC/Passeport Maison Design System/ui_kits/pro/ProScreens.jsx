/* global React, TOK, Phone, StatusBar, Header, Ic, Btn, Badge, Card, SectionTitle */
const { useState: useStateP } = React;

function ProBottomNav({ active, onChange }) {
  const items = [
    { id: 'dash',     icon: 'trending-up',     label: 'Dashboard' },
    { id: 'catalog',  icon: 'list',            label: 'Catalogue' },
    { id: 'messages', icon: 'message-circle',  label: 'Messages', count: 3 },
    { id: 'vitrine',  icon: 'store',           label: 'Vitrine' },
  ];
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: 'rgba(255,255,255,0.92)', backdropFilter: 'blur(20px)',
      WebkitBackdropFilter: 'blur(20px)',
      borderTop: `1px solid ${TOK.border}`,
      padding: '8px 12px 34px', display: 'grid',
      gridTemplateColumns: 'repeat(4, 1fr)', gap: 6, zIndex: 50,
    }}>
      {items.map(it => {
        const isA = active === it.id;
        return (
          <button key={it.id} onClick={() => onChange(it.id)} style={{
            border: 0, background: isA ? TOK.primary50 : 'transparent',
            borderRadius: 10, padding: '8px 4px',
            display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3,
            color: isA ? TOK.primary : TOK.t3, cursor: 'pointer', position: 'relative',
          }}>
            <Ic name={it.icon} style={{ fontSize: 20 }}/>
            <span style={{ fontSize: 10, fontWeight: isA ? 700 : 600 }}>{it.label}</span>
            {it.count && (
              <span style={{
                position: 'absolute', top: 4, right: '50%', marginRight: -18,
                background: '#DC2626', color: '#FFF', fontSize: 10, fontWeight: 700,
                borderRadius: 8, padding: '0 5px', minWidth: 16, height: 16,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{it.count}</span>
            )}
          </button>
        );
      })}
    </div>
  );
}

function StatRow() {
  const stats = [
    { v: '23', l: 'Devis en cours', c: TOK.primary },
    { v: '142', l: 'Avis · 4,9 ★', c: '#F59E0B' },
    { v: '2 350 €', l: 'Mois en cours', c: TOK.success },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8, padding: '0 20px' }}>
      {stats.map(s => (
        <div key={s.l} style={{
          background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 12,
          padding: 14, boxShadow: TOK.shadowSm,
        }}>
          <div style={{
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            fontSize: 22, fontWeight: 800, color: TOK.text, lineHeight: 1, letterSpacing: '-0.01em',
          }}>{s.v}</div>
          <div style={{ fontSize: 10, color: TOK.t2, marginTop: 4 }}>{s.l}</div>
        </div>
      ))}
    </div>
  );
}

function ProStatus() {
  return (
    <div style={{ margin: '0 20px 14px', display: 'flex', alignItems: 'center', gap: 12,
      padding: 14, background: TOK.proBg, border: `1px solid #86EFAC`, borderRadius: 12 }}>
      <div style={{
        width: 40, height: 40, borderRadius: 50, background: '#FFF', color: TOK.proTx,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
      }}><Ic name="badge-check" style={{ fontSize: 22 }}/></div>
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: TOK.proTx }}>Compte Pro vérifié</div>
        <div style={{ fontSize: 11, color: TOK.proTx, opacity: 0.85 }}>SIRET 882 514 023 · K-bis valide</div>
      </div>
    </div>
  );
}

function ProDashboard() {
  return (
    <div style={{ paddingBottom: 110 }}>
      <ProStatus/>
      <SectionTitle>Activité du mois</SectionTitle>
      <StatRow/>
      <SectionTitle action="Voir tout">Demandes récentes</SectionTitle>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { name: 'Camille Martin', t: 'Devis robinetterie cuisine', amt: '420 €', when: 'Il y a 2 h', new: true },
          { name: 'Julien Berger', t: 'Réparation chauffe-eau', amt: 'En attente', when: 'Hier', new: false },
          { name: 'Anne Dubois', t: 'Installation lave-vaisselle', amt: '180 €', when: '2 jours', new: false },
        ].map(r => (
          <div key={r.name} style={{
            background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 12,
            padding: 14, display: 'flex', alignItems: 'center', gap: 12, boxShadow: TOK.shadowSm,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 50, background: TOK.primary100,
              color: TOK.primary700, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13,
            }}>{r.name.split(' ').map(x => x[0]).join('')}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600 }}>{r.name}</span>
                {r.new && <Badge kind="primary">Nouveau</Badge>}
              </div>
              <div style={{ fontSize: 11, color: TOK.t2, marginTop: 2 }}>{r.t}</div>
              <div style={{ fontSize: 10, color: TOK.t3, marginTop: 2 }}>{r.when}</div>
            </div>
            <div style={{ fontSize: 13, fontWeight: 700, color: TOK.text }}>{r.amt}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProCatalog() {
  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{ padding: '0 20px 8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: 12, color: TOK.t2 }}>12 services · 4 actifs</span>
        <Btn variant="primary" size="sm" icon="plus">Ajouter</Btn>
      </div>
      <div style={{ padding: '8px 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[
          { icon: 'wrench', name: 'Diagnostic plomberie', cat: 'À domicile · 60 min', price: '80 €', active: true },
          { icon: 'droplet', name: 'Réparation fuite', cat: 'Urgence · sur site', price: 'Sur devis', active: true },
          { icon: 'thermometer', name: 'Entretien chaudière', cat: 'Annuel', price: '120 €', active: true },
          { icon: 'shower-head', name: 'Installation robinetterie', cat: 'Sur place · 90 min', price: '150 €', active: false },
        ].map(s => (
          <div key={s.name} style={{
            background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 12,
            padding: 14, display: 'flex', alignItems: 'center', gap: 12, boxShadow: TOK.shadowSm,
            opacity: s.active ? 1 : 0.55,
          }}>
            <div style={{
              width: 48, height: 48, borderRadius: 12, background: TOK.primary50,
              color: TOK.primary700, display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}><Ic name={s.icon} style={{ fontSize: 22 }}/></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600 }}>{s.name}</div>
              <div style={{ fontSize: 11, color: TOK.t2, marginTop: 2 }}>{s.cat}</div>
            </div>
            <div style={{ textAlign: 'right' }}>
              <div style={{ fontSize: 13, fontWeight: 700 }}>{s.price}</div>
              <div style={{ fontSize: 10, color: s.active ? TOK.success : TOK.t3, marginTop: 2 }}>
                {s.active ? '● Actif' : '○ Désactivé'}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function ProMessages() {
  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{ padding: '0 20px 8px' }}>
        <div style={{
          background: TOK.muted, borderRadius: 10, padding: '10px 14px',
          display: 'flex', alignItems: 'center', gap: 10, color: TOK.t2,
        }}>
          <Ic name="search" style={{ fontSize: 16 }}/>
          <span style={{ fontSize: 13 }}>Rechercher un client…</span>
        </div>
      </div>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {[
          { n: 'Camille Martin', preview: 'Bonjour, je serais disponible jeudi…', when: '14:32', unread: 2, init: 'CM' },
          { n: 'Julien Berger', preview: 'Merci pour le devis ! On peut prévoir…', when: 'Hier', unread: 1, init: 'JB' },
          { n: 'Anne Dubois', preview: 'Parfait, à demain 9h.', when: '2 j', unread: 0, init: 'AD' },
          { n: 'Marc Lavigne', preview: 'Vous avez encore des créneaux la sema…', when: '4 j', unread: 0, init: 'ML' },
          { n: 'Sophie Klein', preview: 'Le chauffe-eau refait des siennes.', when: '1 sem', unread: 0, init: 'SK' },
        ].map(m => (
          <div key={m.n} style={{
            background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 12,
            padding: 12, display: 'flex', gap: 12, alignItems: 'center', boxShadow: TOK.shadowSm,
          }}>
            <div style={{
              width: 42, height: 42, borderRadius: 50,
              background: 'linear-gradient(135deg,#F0EFFB,#CBC7FA)',
              color: TOK.primary800, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontWeight: 700, fontSize: 13, flexShrink: 0,
            }}>{m.init}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
                <span style={{ fontSize: 14, fontWeight: 600 }}>{m.n}</span>
                <span style={{ fontSize: 10, color: TOK.t3 }}>{m.when}</span>
              </div>
              <div style={{
                fontSize: 12, color: m.unread ? TOK.text : TOK.t2, marginTop: 2,
                fontWeight: m.unread ? 500 : 400,
                whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis',
              }}>{m.preview}</div>
            </div>
            {m.unread > 0 && (
              <span style={{
                background: TOK.primary, color: '#FFF', borderRadius: 50,
                width: 20, height: 20, fontSize: 10, fontWeight: 700,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>{m.unread}</span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

function ProVitrine() {
  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{
        margin: '0 20px 12px', padding: 20, borderRadius: 16, color: '#FFF',
        background: 'linear-gradient(135deg, #7065F0 0%, #5245ED 100%)',
        boxShadow: '0 8px 20px -8px rgba(112,101,240,0.4)',
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14, background: '#FFF',
            color: TOK.primary700, fontSize: 22, fontWeight: 700,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>MD</div>
          <div style={{ flex: 1 }}>
            <div style={{
              fontFamily: "'Plus Jakarta Sans', sans-serif", fontSize: 20, fontWeight: 800, lineHeight: 1.2,
            }}>Maxime Durand</div>
            <div style={{ fontSize: 12, opacity: 0.85, marginTop: 2 }}>Plomberie · Chauffage · Paris 11e</div>
          </div>
        </div>
        <div style={{ display: 'flex', gap: 14, marginTop: 14, fontSize: 12 }}>
          <span><Ic name="star" stroke={2} style={{ color: '#FCD34D', marginRight: 4 }}/>4,9 · 142 avis</span>
          <span><Ic name="badge-check" stroke={2} style={{ color: '#86EFAC', marginRight: 4 }}/>Pro vérifié</span>
        </div>
      </div>

      <SectionTitle>Spécialités</SectionTitle>
      <div style={{ padding: '0 20px', display: 'flex', gap: 6, flexWrap: 'wrap' }}>
        {['Fuites', 'Robinetterie', 'Chauffe-eau', 'Chaudière gaz', 'Pompe à chaleur'].map(s => (
          <span key={s} style={{
            padding: '6px 12px', borderRadius: 999, background: TOK.muted, color: TOK.t2,
            fontSize: 12, fontWeight: 600,
          }}>{s}</span>
        ))}
      </div>

      <SectionTitle action="Modifier">Photos de chantiers</SectionTitle>
      <div style={{ padding: '0 20px', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 6 }}>
        {[1,2,3,4,5,6].map(i => (
          <div key={i} style={{
            aspectRatio: '1/1', borderRadius: 10,
            background: `linear-gradient(${i*40}deg, #F0EFFB, #CBC7FA)`,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            color: '#FFF', fontSize: 18,
          }}>
            <Ic name="image" style={{ opacity: 0.4 }}/>
          </div>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { ProBottomNav, ProDashboard, ProCatalog, ProMessages, ProVitrine });
