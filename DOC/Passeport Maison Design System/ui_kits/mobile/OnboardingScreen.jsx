/* global React, TOK, Ic, Btn, Badge */

function OnboardingScreen({ onComplete }) {
  const [step, setStep] = React.useState(1);
  const [data, setData] = React.useState({
    name: '', city: '', type: 'appartement', surface: '', rooms: 3, planMethod: 'skip',
  });

  function update(key, val) { setData(prev => ({ ...prev, [key]: val })); }
  function next() { if (step < 3) setStep(s => s + 1); else onComplete(data); }
  function back() { setStep(s => s - 1); }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', background: TOK.surface }}>

      {/* Progress bar */}
      <div style={{ padding: '8px 24px 16px', flexShrink: 0 }}>
        <div style={{ height: step > 1 ? 'auto' : 0, overflow: 'hidden', marginBottom: step > 1 ? 14 : 0 }}>
          <button onClick={back} style={{
            background: 'transparent', border: 0, padding: 0,
            display: 'inline-flex', alignItems: 'center', gap: 6,
            color: TOK.t2, fontSize: 14, cursor: 'pointer', fontFamily: TOK.font,
          }}>
            <Ic name="chevron-left" style={{ fontSize: 18 }}/> Retour
          </button>
        </div>
        {step === 1 && <div style={{ height: 26 }}/>}
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          {[1, 2, 3].map(n => (
            <div key={n} style={{
              height: 4, borderRadius: 4, flexShrink: 0,
              width: n === step ? 32 : n < step ? 14 : 8,
              background: n <= step ? TOK.primary : TOK.border,
              transition: 'all 300ms ease',
            }}/>
          ))}
          <span style={{ fontSize: 11, color: TOK.t3, marginLeft: 4 }}>{step} / 3</span>
        </div>
      </div>

      {/* Step content */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '0 24px' }}>
        {step === 1 && <OBStep1 data={data} update={update}/>}
        {step === 2 && <OBStep2 data={data} update={update}/>}
        {step === 3 && <OBStep3 data={data} update={update}/>}
      </div>

      {/* CTA */}
      <div style={{ padding: '16px 24px 44px', flexShrink: 0 }}>
        <Btn variant="primary" size="lg" full onClick={next} icon={step === 3 ? 'check' : 'chevron-right'}>
          {step === 3 ? 'Accéder à mon passeport' : 'Continuer'}
        </Btn>
      </div>

    </div>
  );
}

/* ── Step 1 — Nom du bien ─────────────────────────────── */
function OBStep1({ data, update }) {
  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: TOK.primary100, color: TOK.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, marginBottom: 14,
        }}><Ic name="house"/></div>
        <div style={{ fontSize: 26, fontWeight: 800, color: TOK.textDeep, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
          Donnez un nom<br/>à votre bien
        </div>
        <div style={{ fontSize: 14, color: TOK.t2, lineHeight: 1.5 }}>
          Ce nom apparaîtra dans votre passeport et vos rapports partagés.
        </div>
      </div>

      <OBInput label="Nom du bien" placeholder="ex. Appartement Paris 11e" value={data.name} onChange={v => update('name', v)}/>
      <div style={{ height: 12 }}/>
      <OBInput label="Ville" placeholder="ex. Paris" value={data.city} onChange={v => update('city', v)}/>

      <div style={{ marginTop: 16 }}>
        <div style={{ fontSize: 11, color: TOK.t3, marginBottom: 8 }}>Suggestions</div>
        <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
          {['Appartement principal', 'Maison de famille', 'Résidence secondaire'].map(s => (
            <button key={s} onClick={() => update('name', s)} style={{
              padding: '5px 10px', borderRadius: 6, fontSize: 11, fontWeight: 500,
              background: TOK.muted, border: `1px solid ${TOK.border}`,
              color: TOK.t2, cursor: 'pointer', fontFamily: TOK.font,
            }}>{s}</button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── Step 2 — Logement ───────────────────────────────── */
function OBStep2({ data, update }) {
  const types = [
    { id: 'appartement', icon: 'building-2', label: 'Appartement' },
    { id: 'maison',      icon: 'house',       label: 'Maison'       },
    { id: 'autre',       icon: 'warehouse',   label: 'Autre'        },
  ];

  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: TOK.primary100, color: TOK.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, marginBottom: 14,
        }}><Ic name="building-2"/></div>
        <div style={{ fontSize: 26, fontWeight: 800, color: TOK.textDeep, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
          Décrivez votre<br/>logement
        </div>
        <div style={{ fontSize: 14, color: TOK.t2, lineHeight: 1.5 }}>
          Ces informations permettent d'estimer la valeur patrimoniale de votre bien.
        </div>
      </div>

      {/* Type selector */}
      <div style={{ marginBottom: 20 }}>
        <div style={{ fontSize: 12, fontWeight: 600, color: TOK.t2, marginBottom: 10 }}>Type de logement</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 8 }}>
          {types.map(t => {
            const a = data.type === t.id;
            return (
              <button key={t.id} onClick={() => update('type', t.id)} style={{
                padding: '14px 8px', borderRadius: 10,
                border: `1.5px solid ${a ? TOK.primary : TOK.border}`,
                background: a ? TOK.primary100 : TOK.surface,
                cursor: 'pointer', textAlign: 'center', fontFamily: TOK.font,
                transition: 'all 150ms ease',
                display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6,
              }}>
                <div style={{ fontSize: 22, color: a ? TOK.primary : TOK.t2 }}><Ic name={t.icon}/></div>
                <div style={{ fontSize: 11, fontWeight: 600, color: a ? TOK.primary700 : TOK.t2 }}>{t.label}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Surface + rooms */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: TOK.t2, marginBottom: 6 }}>Surface</div>
          <div style={{ position: 'relative' }}>
            <input
              type="number" placeholder="68" value={data.surface}
              onChange={e => update('surface', e.target.value)}
              style={{
                width: '100%', padding: '12px 36px 12px 12px',
                border: `1.5px solid ${TOK.border}`, borderRadius: 10,
                fontSize: 15, fontFamily: TOK.font, color: TOK.text,
                background: TOK.input, outline: 'none', boxSizing: 'border-box',
              }}
            />
            <span style={{
              position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
              fontSize: 12, color: TOK.t3, fontWeight: 600, pointerEvents: 'none',
            }}>m²</span>
          </div>
        </div>

        <div>
          <div style={{ fontSize: 12, fontWeight: 600, color: TOK.t2, marginBottom: 6 }}>Pièces</div>
          <div style={{
            border: `1.5px solid ${TOK.border}`, borderRadius: 10,
            background: TOK.input, padding: '10px 12px',
            display: 'flex', alignItems: 'center', justifyContent: 'space-between',
          }}>
            <button onClick={() => update('rooms', Math.max(1, data.rooms - 1))} style={{
              width: 30, height: 30, borderRadius: 7, background: TOK.muted, border: 0,
              cursor: 'pointer', color: TOK.text, fontSize: 18, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>−</button>
            <span style={{ fontSize: 17, fontWeight: 700, color: TOK.text }}>{data.rooms}</span>
            <button onClick={() => update('rooms', Math.min(12, data.rooms + 1))} style={{
              width: 30, height: 30, borderRadius: 7, background: TOK.primary, border: 0,
              cursor: 'pointer', color: '#FFF', fontSize: 18, fontWeight: 700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>+</button>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Step 3 — Plan ───────────────────────────────────── */
function OBStep3({ data, update }) {
  const options = [
    { id: 'draw',   icon: 'pen-tool', title: 'Dessiner maintenant',  sub: "Créez votre plan depuis l'éditeur intégré" },
    { id: 'import', icon: 'upload',   title: 'Importer un plan',     sub: "PDF ou image — l'IA extrait les pièces automatiquement", badge: 'ai' },
    { id: 'skip',   icon: 'clock',    title: "Ignorer pour l’instant", sub: 'Vous pourrez ajouter le plan à tout moment' },
  ];

  return (
    <div style={{ paddingBottom: 20 }}>
      <div style={{ marginBottom: 28 }}>
        <div style={{
          width: 46, height: 46, borderRadius: 12,
          background: TOK.primary100, color: TOK.primary,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, marginBottom: 14,
        }}><Ic name="squares-four"/></div>
        <div style={{ fontSize: 26, fontWeight: 800, color: TOK.textDeep, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 8 }}>
          Le plan de votre<br/>logement
        </div>
        <div style={{ fontSize: 14, color: TOK.t2, lineHeight: 1.5 }}>
          Le plan localise vos équipements. Vous pouvez l'ignorer et y revenir à tout moment.
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 10, marginBottom: 16 }}>
        {options.map(opt => {
          const a = data.planMethod === opt.id;
          return (
            <button key={opt.id} onClick={() => update('planMethod', opt.id)} style={{
              padding: 16, borderRadius: 12,
              border: `1.5px solid ${a ? TOK.primary : TOK.border}`,
              background: a ? TOK.primary100 : TOK.surface,
              display: 'flex', alignItems: 'center', gap: 12,
              cursor: 'pointer', textAlign: 'left', fontFamily: TOK.font,
              boxShadow: a ? '0 4px 12px -4px rgba(112,101,240,0.25)' : TOK.shadowSm,
              transition: 'all 150ms ease',
            }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, flexShrink: 0,
                background: a ? TOK.primary : TOK.muted,
                color: a ? '#FFF' : TOK.t2,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 22,
              }}><Ic name={opt.icon}/></div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: a ? TOK.primary700 : TOK.text, marginBottom: 2 }}>
                  {opt.title}
                </div>
                <div style={{ fontSize: 11, color: TOK.t2, lineHeight: 1.4 }}>{opt.sub}</div>
              </div>
              {opt.badge && <Badge kind={opt.badge} icon="sparkles">IA</Badge>}
              {a && <Ic name="circle-check-big" style={{ color: TOK.primary, fontSize: 20, flexShrink: 0 }}/>}
            </button>
          );
        })}
      </div>

      <div style={{
        padding: '12px 14px', borderRadius: 10, background: TOK.aiBg,
        display: 'flex', gap: 10, alignItems: 'flex-start',
      }}>
        <Ic name="sparkles" style={{ color: TOK.aiTx, fontSize: 15, flexShrink: 0, marginTop: 1 }}/>
        <div style={{ fontSize: 12, color: TOK.aiTx, lineHeight: 1.5 }}>
          <strong>Bon à savoir :</strong> même sans plan, vous pouvez commencer à ajouter vos équipements immédiatement.
        </div>
      </div>
    </div>
  );
}

/* ── Shared input ────────────────────────────────────── */
function OBInput({ label, placeholder, value, onChange, type = 'text' }) {
  return (
    <div>
      <label style={{ fontSize: 12, fontWeight: 600, color: TOK.t2, display: 'block', marginBottom: 6 }}>
        {label}
      </label>
      <input
        type={type} placeholder={placeholder} value={value}
        onChange={e => onChange(e.target.value)}
        style={{
          width: '100%', padding: '13px 14px',
          border: `1.5px solid ${TOK.border}`, borderRadius: 10,
          fontSize: 15, fontFamily: TOK.font, color: TOK.text,
          background: TOK.input, outline: 'none', boxSizing: 'border-box',
        }}
      />
    </div>
  );
}

Object.assign(window, { OnboardingScreen });
