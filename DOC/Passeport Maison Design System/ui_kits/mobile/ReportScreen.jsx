/* global React, TOK, Ic, Btn, Badge, SectionTitle */

/* ── Completeness ring (SVG inline) ─────────────────── */
function CompletenessRing({ pct }) {
  const R = 30, circ = 2 * Math.PI * R;
  const dash = (pct / 100) * circ;
  return (
    <svg width={74} height={74} style={{ flexShrink: 0 }}>
      <circle cx={37} cy={37} r={R} fill="none" stroke={TOK.border} strokeWidth={7}/>
      <circle cx={37} cy={37} r={R} fill="none" stroke={TOK.primary} strokeWidth={7}
        strokeDasharray={`${dash} ${circ - dash}`}
        strokeLinecap="round"
        style={{ transformOrigin: '37px 37px', transform: 'rotate(-90deg)' }}
      />
      <text x="37" y="37" textAnchor="middle" dominantBaseline="central"
        fontSize="15" fontWeight="800" fill={TOK.textDeep}
        fontFamily="Plus Jakarta Sans, sans-serif">
        {pct}%
      </text>
    </svg>
  );
}

/* ── Mini stat chip ───────────────────────────────────── */
function StatChip({ value, label, accent }) {
  return (
    <div style={{
      flex: 1, minWidth: 0, background: TOK.surface,
      border: `1.5px solid ${TOK.border}`, borderRadius: 10,
      padding: '10px 6px', textAlign: 'center', boxShadow: TOK.shadowSm,
    }}>
      <div style={{ fontSize: 14, fontWeight: 800, color: accent || TOK.textDeep, letterSpacing: '-0.01em', marginBottom: 2 }}>
        {value}
      </div>
      <div style={{ fontSize: 10, color: TOK.t3 }}>{label}</div>
    </div>
  );
}

/* ── Main report screen ───────────────────────────────── */
function ReportScreen({ onUpgrade }) {
  const sections = [
    { icon: 'package',     label: 'Équipements fixes',     detail: '14 éléments',     done: true  },
    { icon: 'trending-up', label: 'Valeur estimée',        detail: '428 500 €',        done: true  },
    { icon: 'camera',      label: 'Galerie photos',         detail: '23 photos',        done: true  },
    { icon: 'file-text',   label: 'Documents',              detail: '3 fichiers',       done: true  },
    { icon: 'clock',       label: 'Historique des travaux', detail: 'Non renseigné',    done: false },
    { icon: 'zap',         label: 'Diagnostic DPE',         detail: 'Non renseigné',    done: false },
  ];

  const shareTargets = [
    { icon: 'scale',     label: 'Notaire',   sub: 'Fiche certifiée + valeur patrimoniale', bg: TOK.primary100, ic: TOK.primary  },
    { icon: 'briefcase', label: 'Agent',     sub: 'Annonce enrichie + galerie de photos',  bg: TOK.aiBg,       ic: TOK.aiTx     },
    { icon: 'user',      label: 'Acheteur',  sub: 'Fiche de présentation du bien',         bg: TOK.proBg,      ic: TOK.proTx    },
  ];

  return (
    <div style={{ paddingBottom: 110 }}>

      {/* ── Completeness card ── */}
      <div style={{ padding: '8px 20px 0' }}>
        <div style={{
          background: TOK.surface, border: `1.5px solid ${TOK.border}`,
          borderRadius: 16, padding: 16, boxShadow: TOK.shadowSm,
          display: 'flex', alignItems: 'center', gap: 16,
        }}>
          <CompletenessRing pct={78}/>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700, color: TOK.textDeep, marginBottom: 4 }}>
              Dossier complété à 78 %
            </div>
            <div style={{ fontSize: 12, color: TOK.t2, lineHeight: 1.45, marginBottom: 10 }}>
              Ajoutez l'historique des travaux pour passer à 89 %.
            </div>
            <button style={{
              padding: '5px 12px', borderRadius: 6, background: TOK.primary100,
              border: 0, color: TOK.primary700, fontSize: 11, fontWeight: 600,
              cursor: 'pointer', fontFamily: TOK.font,
            }}>
              + Compléter maintenant
            </button>
          </div>
        </div>
      </div>

      {/* ── Stats row ── */}
      <div style={{ display: 'flex', gap: 8, padding: '14px 20px 0' }}>
        <StatChip value="428 500 €" label="Valeur"   accent={TOK.primary700}/>
        <StatChip value="14"        label="Équip."                           />
        <StatChip value="68 m²"     label="Surface"                          />
        <StatChip value="3"         label="Docs"                             />
      </div>

      {/* ── Share section ── */}
      <SectionTitle>Partager votre fiche</SectionTitle>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
        {shareTargets.map(t => (
          <button key={t.label} style={{
            display: 'flex', alignItems: 'center', gap: 12,
            padding: '12px 14px', borderRadius: 12,
            background: TOK.surface, border: `1.5px solid ${TOK.border}`,
            cursor: 'pointer', textAlign: 'left', fontFamily: TOK.font,
            boxShadow: TOK.shadowSm,
          }}>
            <div style={{
              width: 40, height: 40, borderRadius: 10, flexShrink: 0,
              background: t.bg, color: t.ic,
              display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
            }}><Ic name={t.icon}/></div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: TOK.text }}>{t.label}</div>
              <div style={{ fontSize: 11, color: TOK.t2 }}>{t.sub}</div>
            </div>
            <div style={{
              padding: '5px 12px', borderRadius: 6, flexShrink: 0,
              background: TOK.primary, color: '#FFF',
              fontSize: 11, fontWeight: 700,
            }}>Partager</div>
          </button>
        ))}

        {/* Copy link row */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '10px 14px', borderRadius: 12,
          background: TOK.muted, border: `1.5px solid ${TOK.border}`,
        }}>
          <Ic name="link" style={{ color: TOK.t2, fontSize: 16, flexShrink: 0 }}/>
          <span style={{
            flex: 1, fontSize: 12, color: TOK.t2,
            overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
          }}>
            passeportmaison.fr/f/a8x29k…
          </span>
          <button style={{
            padding: '5px 10px', borderRadius: 6, flexShrink: 0,
            background: TOK.surface, border: `1px solid ${TOK.border}`,
            color: TOK.text, fontSize: 11, fontWeight: 600,
            cursor: 'pointer', fontFamily: TOK.font,
          }}>Copier</button>
        </div>
      </div>

      {/* ── Report sections checklist ── */}
      <SectionTitle>Contenu du rapport</SectionTitle>
      <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 6 }}>
        {sections.map(s => (
          <div key={s.label} style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '10px 12px', borderRadius: 10,
            background: s.done ? '#F0FDF4' : TOK.surface,
            border: `1.5px solid ${s.done ? '#86EFAC' : TOK.border}`,
          }}>
            <Ic
              name={s.icon}
              style={{ color: s.done ? TOK.success : TOK.t3, fontSize: 18, flexShrink: 0 }}
            />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, fontWeight: s.done ? 600 : 500, color: s.done ? TOK.textDeep : TOK.t2 }}>
                {s.label}
              </div>
              <div style={{ fontSize: 11, color: s.done ? TOK.success : TOK.t3 }}>
                {s.detail}
              </div>
            </div>
            {s.done
              ? <Ic name="check" style={{ color: TOK.success, fontSize: 16 }}/>
              : <button style={{
                  padding: '4px 8px', borderRadius: 5, background: TOK.muted,
                  border: 0, color: TOK.primary, fontSize: 11, fontWeight: 600,
                  cursor: 'pointer', fontFamily: TOK.font,
                }}>Ajouter</button>
            }
          </div>
        ))}
      </div>

      {/* ── Export PDF (Premium) ── */}
      <div style={{ padding: '16px 20px 0' }}>
        <button onClick={onUpgrade} style={{
          width: '100%', padding: '16px 20px', borderRadius: 14,
          background: 'linear-gradient(135deg, #7065F0 0%, #5245ED 100%)',
          border: 0, cursor: 'pointer', fontFamily: TOK.font,
          display: 'flex', alignItems: 'center', gap: 14,
          boxShadow: '0 8px 20px -8px rgba(112,101,240,0.4)',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10,
            background: 'rgba(255,255,255,0.18)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
          }}><Ic name="download" style={{ color: '#FFF' }}/></div>
          <div style={{ flex: 1, textAlign: 'left' }}>
            <div style={{ fontSize: 14, fontWeight: 700, color: '#FFF' }}>
              Télécharger le rapport PDF
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.72)', marginTop: 2 }}>
              12 pages · certifié · prêt pour le notaire
            </div>
          </div>
          <Badge kind="premium" icon="crown">Premium</Badge>
        </button>
      </div>

    </div>
  );
}

Object.assign(window, { ReportScreen, CompletenessRing });
