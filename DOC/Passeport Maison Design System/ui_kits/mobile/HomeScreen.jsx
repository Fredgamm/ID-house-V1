/* global React, TOK, Card, Badge, Btn, SectionTitle, EquipmentItem */

function ValueCard({ onUpgrade }) {
  return (
    <div style={{
      margin: '0 20px', padding: '18px 20px',
      background: 'linear-gradient(135deg, #7065F0 0%, #5245ED 100%)',
      borderRadius: 16, color: '#FFF',
      boxShadow: '0 8px 20px -8px rgba(112,101,240,0.4)',
    }}>
      <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.75 }}>
        Votre patrimoine
      </div>
      <div style={{
        fontFamily: 'Plus Jakarta Sans, sans-serif', fontSize: 40, fontWeight: 800, lineHeight: 1,
        letterSpacing: '-0.01em', margin: '4px 0 10px',
      }}>428 500 €</div>
      <div style={{
        display: 'inline-flex', alignItems: 'center', gap: 4, padding: '3px 8px',
        borderRadius: 6, background: 'rgba(255,255,255,0.16)', fontSize: 11, fontWeight: 600,
      }}>↑ 12 400 € · 12 mois</div>

      <div style={{
        display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)',
        borderTop: '1px solid rgba(255,255,255,0.18)', marginTop: 14, paddingTop: 12,
      }}>
        {[{k:'Surface',v:'68 m²'},{k:'Équipements',v:'14'},{k:'Documents',v:'23'}].map((s,i) => (
          <div key={s.k} style={{ paddingLeft: i ? 12 : 0, borderLeft: i ? '1px solid rgba(255,255,255,0.18)' : 0 }}>
            <div style={{ fontSize: 10, opacity: 0.75 }}>{s.k}</div>
            <div style={{ fontSize: 14, fontWeight: 700 }}>{s.v}</div>
          </div>
        ))}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 12 }}>
        <span style={{ fontSize: 11, opacity: 0.85 }}>Confiance</span>
        <div style={{ flex: 1, height: 5, borderRadius: 3, background: 'rgba(255,255,255,0.2)', overflow: 'hidden' }}>
          <div style={{ width: '92%', height: '100%', background: '#4ADE80' }}/>
        </div>
        <span style={{ fontSize: 11, fontWeight: 700 }}>92 %</span>
      </div>
    </div>
  );
}

function QuickActions({ onAdd, onScan, onShare }) {
  const acts = [
    { icon: 'plus', label: 'Ajouter', onClick: onAdd },
    { icon: 'qr-code', label: 'Scanner', onClick: onScan },
    { icon: 'file-text', label: 'Document', onClick: () => {} },
    { icon: 'share-network', label: 'Partager', onClick: onShare },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 8, padding: '0 20px' }}>
      {acts.map(a => (
        <button key={a.label} onClick={a.onClick} style={{
          background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 12,
          padding: '12px 4px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
          cursor: 'pointer', boxShadow: TOK.shadowSm,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10, background: TOK.primary100,
            color: TOK.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}><Ic name={a.icon}/></div>
          <span style={{ fontSize: 11, fontWeight: 600, color: TOK.text }}>{a.label}</span>
        </button>
      ))}
    </div>
  );
}

function AiNudge() {
  return (
    <div style={{
      margin: '0 20px', padding: 14, display: 'flex', gap: 12, alignItems: 'center',
      background: TOK.aiBg, borderRadius: 12, border: `1px solid #BAE6FD`,
    }}>
      <div style={{
        width: 32, height: 32, borderRadius: 10, background: '#FFF', color: TOK.aiTx,
        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
      }}><Ic name="sparkles"/></div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: TOK.aiTx }}>Suggéré par l'IA</div>
        <div style={{ fontSize: 11, color: TOK.aiTx, opacity: 0.85 }}>
          Vous avez photographié un lave-vaisselle Bosch. L'ajouter à la cuisine ?
        </div>
      </div>
      <Ic name="chevron-right" style={{ color: TOK.aiTx, fontSize: 18 }}/>
    </div>
  );
}

function HomeScreen({ onOpenEquip, onUpgrade, onAdd }) {
  return (
    <div style={{ paddingBottom: 110 }}>
      <div style={{ padding: '4px 20px 14px' }}>
        <div style={{ fontSize: 13, color: TOK.t2 }}>Bonjour Camille,</div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em' }}>
          12 rue de la Paix
        </div>
      </div>
      <ValueCard onUpgrade={onUpgrade}/>
      <SectionTitle>Actions rapides</SectionTitle>
      <QuickActions onAdd={onAdd}/>
      <SectionTitle>Suggestions IA</SectionTitle>
      <AiNudge/>
      <SectionTitle action="Voir tout">Équipements récents</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 20px' }}>
        <EquipmentItem
          icon="snowflake" name="Climatisation Daikin" meta="Salon · 2022"
          price="1 850 €" badge="fixed" onClick={onOpenEquip}/>
        <EquipmentItem
          icon="couch" name="Canapé Roche Bobois" meta="Salon · 2021"
          price="3 200 €" badge="movable"/>
        <EquipmentItem
          icon="cooking-pot" name="Plaque induction Siemens" meta="Cuisine · 2023"
          price="980 €" badge="fixed"/>
      </div>
    </div>
  );
}

Object.assign(window, { HomeScreen, ValueCard, QuickActions, AiNudge });
