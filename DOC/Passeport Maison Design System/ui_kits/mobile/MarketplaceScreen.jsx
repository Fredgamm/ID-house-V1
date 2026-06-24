/* global React, TOK, Ic, Btn, Badge, SectionTitle, LISTINGS, ProductCard, PROS */

/* ── Supplier card ───────────────────────────────────── */
function SupplierCard({ name, spec, rating, distance, verified, premium, logo, color, onPress }) {
  return (
    <div onClick={onPress} style={{
      background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 12,
      padding: 12, display: 'flex', gap: 12, alignItems: 'center', boxShadow: TOK.shadowSm,
      cursor: onPress ? 'pointer' : 'default',
    }}>
      <div style={{
        width: 44, height: 44, borderRadius: 10, background: color || TOK.primary100,
        color: TOK.primary700, display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 16, fontWeight: 700, flexShrink: 0,
      }}>{logo}</div>
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <span style={{ fontSize: 14, fontWeight: 600, color: TOK.text }}>{name}</span>
          {verified && <Badge kind="pro" icon="seal-check">Pro</Badge>}
          {premium  && <Badge kind="premium" icon="crown">Premium</Badge>}
        </div>
        <div style={{ fontSize: 11, color: TOK.t2, marginTop: 2 }}>{spec}</div>
        <div style={{ fontSize: 11, color: TOK.t3, marginTop: 4, display: 'flex', gap: 10 }}>
          <span><Ic name="star" style={{ color: '#F59E0B' }}/> {rating}</span>
          <span><Ic name="map-pin"/> {distance}</span>
        </div>
      </div>
      <Ic name="chevron-right" style={{ color: TOK.t3, fontSize: 18 }}/>
    </div>
  );
}

/* ── Category grid (unchanged) ──────────────────────── */
function CategoryGrid() {
  const cats = [
    { icon: 'paint-roller', label: 'Peinture',    n: 24, c: '#FEE2E2', cc: '#B91C1C' },
    { icon: 'wrench',        label: 'Plomberie',   n: 18, c: '#F0EFFB', cc: '#5245ED' },
    { icon: 'lightning',     label: 'Électricité', n: 12, c: '#FEF3C7', cc: '#B45309' },
    { icon: 'tree',          label: 'Jardin',      n: 9,  c: '#DCFCE7', cc: '#15803D' },
  ];
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, padding: '0 20px' }}>
      {cats.map(c => (
        <div key={c.label} style={{
          background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 12,
          padding: 14, display: 'flex', alignItems: 'center', gap: 10,
          boxShadow: TOK.shadowSm, cursor: 'pointer',
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: c.c, color: c.cc,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}><Ic name={c.icon}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600 }}>{c.label}</div>
            <div style={{ fontSize: 11, color: TOK.t3 }}>{c.n} pros</div>
          </div>
        </div>
      ))}
    </div>
  );
}

/* ── Add listing sheet ────────────────────────────────── */
function AddListingSheet({ open, onClose }) {
  const [step,         setStep]      = React.useState(1);
  const [selectedEq,   setSelected]  = React.useState(null);
  const [price,        setPrice]     = React.useState('');
  const [condition,    setCondition] = React.useState('Bon état');

  function reset() { setStep(1); setSelected(null); setPrice(''); setCondition('Bon état'); }
  function handleClose() { reset(); onClose(); }

  const movable = [
    { id: 1, icon: 'sofa',        name: 'Canapé Roche Bobois',    room: 'Salon',   hint: '3 200' },
    { id: 2, icon: 'tv',          name: 'Télévision Samsung 55"', room: 'Salon',   hint: '1 100' },
    { id: 3, icon: 'cooking-pot', name: 'Lave-vaisselle Bosch',   room: 'Cuisine', hint: '650'   },
  ];

  if (!open) return null;

  return (
    <div onClick={handleClose} style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn 200ms ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: TOK.surface,
        borderRadius: '24px 24px 0 0',
        padding: '10px 20px 40px',
        animation: 'slideUp 250ms ease',
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: '#D1D5DB', margin: '0 auto 16px' }}/>

        {/* ── Step 1 — pick equipment ── */}
        {step === 1 && (
          <div>
            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 4 }}>Quel équipement vendez-vous ?</div>
            <div style={{ fontSize: 13, color: TOK.t2, marginBottom: 16 }}>
              Choisissez parmi vos équipements mobiliers.
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
              {movable.map(eq => {
                const sel = selectedEq && selectedEq.id === eq.id;
                return (
                  <button key={eq.id} onClick={() => { setSelected(eq); setStep(2); }} style={{
                    display: 'flex', alignItems: 'center', gap: 12,
                    padding: 14, background: sel ? TOK.primary100 : TOK.muted,
                    borderRadius: 12,
                    border: `1.5px solid ${sel ? TOK.primary : 'transparent'}`,
                    cursor: 'pointer', textAlign: 'left', fontFamily: TOK.font,
                  }}>
                    <div style={{
                      width: 40, height: 40, borderRadius: 10,
                      background: TOK.movableBg, color: TOK.movableTx,
                      display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20, flexShrink: 0,
                    }}><Ic name={eq.icon}/></div>
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: 14, fontWeight: 600, color: TOK.text }}>{eq.name}</div>
                      <div style={{ fontSize: 11, color: TOK.t2 }}>{eq.room} · valeur estimée {eq.hint} €</div>
                    </div>
                    <Ic name="chevron-right" style={{ color: TOK.t3 }}/>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* ── Step 2 — price + condition ── */}
        {step === 2 && selectedEq && (
          <div>
            <button onClick={() => setStep(1)} style={{
              display: 'flex', alignItems: 'center', gap: 6,
              background: 'transparent', border: 0,
              color: TOK.t2, fontSize: 13, cursor: 'pointer', fontFamily: TOK.font,
              marginBottom: 14, padding: 0,
            }}>
              <Ic name="chevron-left" style={{ fontSize: 16 }}/> Retour
            </button>

            <div style={{ fontSize: 17, fontWeight: 700, marginBottom: 14 }}>Détails de l'annonce</div>

            {/* Item preview */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 10,
              padding: '10px 12px', background: TOK.muted, borderRadius: 10, marginBottom: 16,
            }}>
              <div style={{
                width: 36, height: 36, borderRadius: 8,
                background: TOK.movableBg, color: TOK.movableTx,
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, flexShrink: 0,
              }}><Ic name={selectedEq.icon}/></div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600 }}>{selectedEq.name}</div>
                <div style={{ fontSize: 11, color: TOK.t2 }}>{selectedEq.room}</div>
              </div>
              <Badge kind="movable">Mobilier</Badge>
            </div>

            {/* Price */}
            <div style={{ marginBottom: 14 }}>
              <label style={{ fontSize: 12, fontWeight: 600, color: TOK.t2, display: 'block', marginBottom: 6 }}>
                Prix de vente
              </label>
              <div style={{ position: 'relative' }}>
                <input
                  type="number"
                  placeholder={selectedEq.hint}
                  value={price}
                  onChange={e => setPrice(e.target.value)}
                  style={{
                    width: '100%', padding: '12px 36px 12px 14px',
                    border: `1.5px solid ${TOK.border}`, borderRadius: 10,
                    fontSize: 15, fontFamily: TOK.font, color: TOK.text,
                    background: TOK.input, outline: 'none', boxSizing: 'border-box',
                  }}
                />
                <span style={{
                  position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)',
                  fontSize: 13, fontWeight: 600, color: TOK.t3, pointerEvents: 'none',
                }}>€</span>
              </div>
            </div>

            {/* Condition */}
            <div style={{ marginBottom: 20 }}>
              <div style={{ fontSize: 12, fontWeight: 600, color: TOK.t2, marginBottom: 8 }}>État</div>
              <div style={{ display: 'flex', gap: 8 }}>
                {['Bon état', 'Très bon état', 'Neuf'].map(c => {
                  const a = condition === c;
                  return (
                    <button key={c} onClick={() => setCondition(c)} style={{
                      flex: 1, padding: '9px 4px', borderRadius: 8,
                      fontSize: 11, fontWeight: 600, cursor: 'pointer', fontFamily: TOK.font,
                      border: `1.5px solid ${a ? TOK.primary : TOK.border}`,
                      background: a ? TOK.primary100 : TOK.surface,
                      color: a ? TOK.primary700 : TOK.t2,
                    }}>{c}</button>
                  );
                })}
              </div>
            </div>

            <Btn variant="primary" size="lg" full onClick={handleClose} icon="store">
              Publier l'annonce
            </Btn>
          </div>
        )}
      </div>

      <style>{`
        @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
        @keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }
      `}</style>
    </div>
  );
}

/* ── Marketplace screen ───────────────────────────────── */
function MarketplaceScreen({ mktAdd, onMktAddClose, onSelectListing = () => {}, onSelectPro = () => {} }) {
  const [view,         setView]      = React.useState('explore');
  const [searchActive, setSearch]    = React.useState(false);
  const [query,        setQuery]     = React.useState('');
  const [addOpen,      setAddOpen]   = React.useState(false);

  // Sync external "+" trigger from App header
  React.useEffect(() => {
    if (mktAdd) { setAddOpen(true); }
  }, [mktAdd]);

  function closeAdd() {
    setAddOpen(false);
    if (onMktAddClose) onMktAddClose();
  }

  return (
    <div style={{ paddingBottom: 110 }}>

      {/* ── Internal tab bar ── */}
      <div style={{ display: 'flex', padding: '0 20px 14px', gap: 8 }}>
        {[
          { id: 'explore',  label: 'Explorer'      },
          { id: 'listings', label: 'Mes annonces'  },
        ].map(t => {
          const a = view === t.id;
          return (
            <button key={t.id} onClick={() => setView(t.id)} style={{
              padding: '7px 18px', borderRadius: 999, fontFamily: TOK.font,
              fontSize: 13, fontWeight: 600, border: 0, cursor: 'pointer',
              background: a ? TOK.primary : TOK.muted,
              color: a ? '#FFF' : TOK.t2,
              transition: 'all 150ms ease',
            }}>{t.label}</button>
          );
        })}
      </div>

      {/* ══ EXPLORER view ══════════════════════════════ */}
      {view === 'explore' && (
        <div>
          {/* Search bar */}
          <div style={{ padding: '0 20px 14px' }}>
            {!searchActive ? (
              <button onClick={() => setSearch(true)} style={{
                width: '100%', background: TOK.muted, borderRadius: 10,
                padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
                color: TOK.t2, border: 0, cursor: 'pointer',
                fontFamily: TOK.font, textAlign: 'left',
              }}>
                <Ic name="search" style={{ fontSize: 16 }}/>
                <span style={{ fontSize: 13 }}>Plombier, électricien, peintre…</span>
              </button>
            ) : (
              <div>
                {/* Active search input */}
                <div style={{ display: 'flex', gap: 8, alignItems: 'center', marginBottom: 14 }}>
                  <div style={{
                    flex: 1, background: TOK.surface, borderRadius: 10,
                    padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10,
                    border: `1.5px solid ${TOK.primary}`,
                  }}>
                    <Ic name="search" style={{ fontSize: 16, color: TOK.primary }}/>
                    <input
                      value={query} onChange={e => setQuery(e.target.value)}
                      placeholder="Plombier, électricien…"
                      style={{
                        border: 0, outline: 'none', fontSize: 13, flex: 1,
                        fontFamily: TOK.font, color: TOK.text, background: 'transparent',
                      }}
                    />
                    {query.length > 0 && (
                      <button onClick={() => setQuery('')} style={{
                        border: 0, background: 'transparent', cursor: 'pointer', color: TOK.t3, padding: 0,
                      }}><Ic name="x" style={{ fontSize: 15 }}/></button>
                    )}
                  </div>
                  <button onClick={() => { setSearch(false); setQuery(''); }} style={{
                    border: 0, background: 'transparent', cursor: 'pointer',
                    color: TOK.primary, fontSize: 13, fontWeight: 600,
                    fontFamily: TOK.font, whiteSpace: 'nowrap',
                  }}>Annuler</button>
                </div>

                {/* Recent searches */}
                <div style={{ fontSize: 11, color: TOK.t3, marginBottom: 8 }}>Recherches récentes</div>
                {['Plombier urgence', 'Peintre intérieur', 'Électricien tableau'].map(s => (
                  <button key={s} onClick={() => setQuery(s)} style={{
                    display: 'flex', alignItems: 'center', gap: 10, width: '100%',
                    padding: '9px 0', border: 0,
                    borderBottom: `1px solid ${TOK.border}`,
                    background: 'transparent', cursor: 'pointer',
                    textAlign: 'left', fontFamily: TOK.font,
                  }}>
                    <Ic name="clock" style={{ color: TOK.t3, fontSize: 15 }}/>
                    <span style={{ flex: 1, fontSize: 13, color: TOK.text }}>{s}</span>
                    <Ic name="arrow-up-left" style={{ color: TOK.t3, fontSize: 13 }}/>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Categories + pros (hidden during active search) */}
          {!searchActive && (
            <div>
              <SectionTitle>Catégories</SectionTitle>
              <CategoryGrid/>
              <SectionTitle action="Voir tout">Pros près de chez vous</SectionTitle>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 20px' }}>
                {PROS.map(p => (
                  <SupplierCard
                    key={p.id}
                    name={p.name} spec={p.spec}
                    rating={`${p.rating} · ${p.reviews} avis`}
                    distance={p.distance}
                    verified={p.verified} premium={p.premium}
                    logo={p.logo} color={p.color}
                    onPress={() => onSelectPro(p)}
                  />
                ))}
              </div>

              {/* Ventes entre particuliers */}
              <SectionTitle action="Voir tout">Ventes entre particuliers</SectionTitle>
              <div style={{
                display: 'flex', gap: 12, overflowX: 'auto',
                paddingLeft: 20, paddingRight: 20, paddingBottom: 6,
                scrollbarWidth: 'none',
              }}>
                {LISTINGS.map(l => (
                  <ProductCard key={l.id} listing={l} onPress={onSelectListing}/>
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* ══ MES ANNONCES view ══════════════════════════ */}
      {view === 'listings' && (
        <div style={{ padding: '0 20px' }}>
          {/* Empty state */}
          <div style={{
            textAlign: 'center', padding: '40px 20px 32px',
            background: TOK.surface, borderRadius: 16,
            border: `1.5px solid ${TOK.border}`,
          }}>
            <div style={{
              width: 60, height: 60, borderRadius: 16, background: TOK.muted,
              color: TOK.t3, display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 30, margin: '0 auto 16px',
            }}><Ic name="store"/></div>
            <div style={{ fontSize: 16, fontWeight: 700, color: TOK.textDeep, marginBottom: 6 }}>
              Pas encore d'annonce
            </div>
            <div style={{ fontSize: 13, color: TOK.t2, lineHeight: 1.55, marginBottom: 20 }}>
              Mettez vos équipements mobiliers en vente — canapé, télévision, électroménager…
            </div>
            <Btn variant="primary" full onClick={() => setAddOpen(true)} icon="plus">
              Publier ma première annonce
            </Btn>
          </div>

          {/* Tip */}
          <div style={{
            marginTop: 12, padding: '12px 14px', borderRadius: 12,
            background: TOK.movableBg,
            display: 'flex', gap: 10, alignItems: 'flex-start',
          }}>
            <Ic name="info" style={{ color: TOK.movableTx, fontSize: 16, flexShrink: 0, marginTop: 1 }}/>
            <div style={{ fontSize: 12, color: TOK.movableTx, lineHeight: 1.5 }}>
              Seuls les équipements <strong>mobiliers</strong> peuvent être mis en vente. Les équipements fixes restent liés à votre bien.
            </div>
          </div>
        </div>
      )}

      {/* Add listing sheet */}
      <AddListingSheet open={addOpen} onClose={closeAdd}/>
    </div>
  );
}

Object.assign(window, { MarketplaceScreen, SupplierCard, CategoryGrid });
