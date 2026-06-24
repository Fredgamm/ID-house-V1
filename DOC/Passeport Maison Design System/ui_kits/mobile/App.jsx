/* global React, ReactDOM, TOK, Ic, Phone, StatusBar, Header, BottomNav, Sheet, Btn, Badge,
   HomeScreen, EquipmentScreen, MarketplaceScreen, PlanScreen,
   WelcomeScreen, AuthScreen, OnboardingScreen,
   ListingDetailPage, MessagesScreen, ChatView, ProfileScreen, ProDetailPage */

/* ─────────────────────────────────────────────────────────
   Root — manages pre-app screen flow
   welcome → auth → onboarding → main
   ───────────────────────────────────────────────────────── */
function App() {
  const [screen,     setScreen]     = React.useState('welcome');
  const [firstVisit, setFirstVisit] = React.useState(false);

  // Pre-app screens share this container (no bottom nav, full height)
  function wrapFull(content) {
    return (
      <Phone>
        <StatusBar/>
        <div style={{
          height: 'calc(844px - 47px)',
          display: 'flex', flexDirection: 'column',
          overflow: 'hidden',
          background: TOK.surface,
        }}>
          {content}
        </div>
      </Phone>
    );
  }

  if (screen === 'welcome') return wrapFull(
    <WelcomeScreen
      onStart={() => setScreen('auth')}
      onLogin={() => setScreen('auth')}
    />
  );

  if (screen === 'auth') return wrapFull(
    <AuthScreen
      onBack={() => setScreen('welcome')}
      onSuccess={() => { setFirstVisit(true); setScreen('onboarding'); }}
    />
  );

  if (screen === 'onboarding') return wrapFull(
    <OnboardingScreen onComplete={() => setScreen('main')} />
  );

  return (
    <MainApp
      firstVisit={firstVisit}
      onFirstVisitDone={() => setFirstVisit(false)}
    />
  );
}

/* ─────────────────────────────────────────────────────────
   Main app (post-auth)
   ───────────────────────────────────────────────────────── */
function MainApp({ firstVisit, onFirstVisitDone }) {
  const [tab,         setTab]        = React.useState('home');
  const [addStep,          setAddStep]         = React.useState(null); // null | 'parent' | 'equipment' | 'room'
  const [upgradeOpen,      setUpgradeOpen]     = React.useState(false);
  const [mktAdd,           setMktAdd]          = React.useState(false);
  const [selectedEq,       setSelectedEq]      = React.useState(null);
  const [selectedListing,  setSelectedListing] = React.useState(null);
  const [chatConvo,        setChatConvo]       = React.useState(null);
  const [profileOpen,      setProfileOpen]     = React.useState(false);
  const [selectedPro,      setSelectedPro]     = React.useState(null);

  function openAdd() {
    if (firstVisit) onFirstVisitDone();
    setAddStep('parent');
  }

  // Contextual "+" per tab — null = hide button
  // Plan tab skips directly to room level (context is already clear)
  const tabActions = {
    home:     { onClick: openAdd },
    equip:    { onClick: openAdd },
    plan:     { onClick: () => setAddStep('room') },
    report:   null,
    market:   { onClick: () => setMktAdd(true) },
    messages: null,
  };
  const action = tabActions[tab];

  const titles = {
    home:     { t: 'Accueil',          sub: null },
    plan:     { t: 'Plan du logement',  sub: '68 m² · 5 pièces' },
    equip:    { t: 'Équipements',       sub: '14 enregistrés · 68 m²' },
    market:   { t: 'Marketplace',       sub: 'Pros vérifiés près de vous' },
    report:   { t: 'Rapport',           sub: 'Carnet de santé du logement' },
    messages: { t: 'Messages',          sub: '2 non lus' },
  };

  return (
    <Phone>
      <StatusBar/>
      {/* Profile avatar button (home tab only) + contextual "+" */}
      {(function() {
        const plusBtn = action ? (
          <button onClick={action.onClick} style={{
            width: 32, height: 32, borderRadius: 16, background: TOK.primary, border: 0,
            color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}><Ic name="plus" style={{ fontSize: 16 }}/></button>
        ) : null;
        const profileBtn = (
          <button onClick={() => setProfileOpen(true)} style={{
            width: 32, height: 32, borderRadius: 16, background: TOK.primary100, border: 0,
            color: TOK.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
            cursor: 'pointer',
          }}><Ic name="user-round" style={{ fontSize: 16 }}/></button>
        );
        const headerAction = tab === 'home'
          ? <div style={{ display: 'flex', gap: 8 }}>{profileBtn}{plusBtn}</div>
          : plusBtn;
        return (
          <Header
            title={titles[tab].t}
            subtitle={titles[tab].sub}
            action={headerAction}
          />
        );
      })()}

      <div style={{ flex: 1, overflowY: 'auto', height: 'calc(844px - 47px - 60px)', background: TOK.bg }}>
        {tab === 'home' && !firstVisit && (
          <HomeScreen
            onOpenEquip={() => setTab('equip')}
            onUpgrade={() => setUpgradeOpen(true)}
            onAdd={openAdd}
          />
        )}
        {tab === 'home' && firstVisit && (
          <FirstVisitHome onAdd={openAdd}/>
        )}
        {tab === 'plan'   && <PlanScreen/>}
        {tab === 'equip'  && <EquipmentScreen onOpen={i => setSelectedEq(i)}/>}
        {tab === 'market'   && <MarketplaceScreen mktAdd={mktAdd} onMktAddClose={() => setMktAdd(false)} onSelectListing={setSelectedListing} onSelectPro={setSelectedPro}/>}
        {tab === 'report'   && <ReportScreen onUpgrade={() => setUpgradeOpen(true)}/>}
        {tab === 'messages' && <MessagesScreen onOpenChat={setChatConvo}/>}
      </div>

      <BottomNav
        active={tab}
        onChange={setTab}
        items={[
          { id: 'home',     icon: 'house',          label: 'Accueil'  },
          { id: 'plan',     icon: 'squares-four',  label: 'Plan'     },
          { id: 'equip',    icon: 'package',        label: 'Équip.'   },
          { id: 'report',   icon: 'file-text',      label: 'Rapport'  },
          { id: 'market',   icon: 'storefront',     label: 'Marché'   },
          { id: 'messages', icon: 'message-circle', label: 'Messages' },
        ]}
      />

      {/* Two-level add sheet — parent → equipment | room */}
      <AddSheet step={addStep} onStep={setAddStep} onClose={() => setAddStep(null)} onNavigate={setTab}/>

      {upgradeOpen     && <UpgradeModal     onClose={() => setUpgradeOpen(false)}/>}
      {selectedEq      && <EquipmentDetail item={selectedEq} onClose={() => setSelectedEq(null)}/>}
      {selectedListing && <ListingDetailPage
        listing={selectedListing}
        onClose={() => setSelectedListing(null)}
        onGoToMessages={() => { setSelectedListing(null); setTab('messages'); }}
      />}
      {profileOpen  && <ProfileScreen  onClose={() => setProfileOpen(false)}/>}
      {chatConvo    && <ChatView       convo={chatConvo}  onClose={() => setChatConvo(null)}/>}
      {selectedPro  && <ProDetailPage  pro={selectedPro}  onClose={() => setSelectedPro(null)} onGoToMessages={() => { setSelectedPro(null); setTab('messages'); }}/>}
    </Phone>
  );
}

/* ─────────────────────────────────────────────────────────
   First-visit home — empty state + completion checklist
   ───────────────────────────────────────────────────────── */
function FirstVisitHome({ onAdd }) {
  return (
    <div style={{ paddingBottom: 110 }}>

      {/* Welcome value card */}
      <div style={{
        margin: '8px 20px 16px',
        background: 'linear-gradient(135deg, #7065F0 0%, #5245ED 100%)',
        borderRadius: 16, padding: '20px',
        boxShadow: '0 8px 20px -8px rgba(112,101,240,0.4)',
        color: '#FFF',
        animation: 'fadeInUp 350ms ease',
      }}>
        <div style={{ fontSize: 11, fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', opacity: 0.75, marginBottom: 4 }}>
          Bienvenue !
        </div>
        <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: '-0.01em', lineHeight: 1.2, marginBottom: 8 }}>
          Votre passeport<br/>est prêt.
        </div>
        <div style={{ fontSize: 13, opacity: 0.85, lineHeight: 1.45, marginBottom: 16 }}>
          Ajoutez votre premier équipement pour commencer à estimer la valeur de votre patrimoine.
        </div>

        {/* Value counter — zeroed */}
        <div style={{
          background: 'rgba(255,255,255,0.15)',
          borderRadius: 10, padding: '12px 14px',
          display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 10,
            background: 'rgba(255,255,255,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18,
          }}><Ic name="chart-line"/></div>
          <div>
            <div style={{ fontSize: 11, opacity: 0.75 }}>Valeur estimée</div>
            <div style={{ fontSize: 28, fontWeight: 800, letterSpacing: '-0.02em', lineHeight: 1 }}>0 €</div>
          </div>
        </div>

        <button onClick={onAdd} style={{
          width: '100%', padding: 13, borderRadius: 8,
          background: '#FFF', border: 0, cursor: 'pointer',
          fontSize: 14, fontWeight: 700, color: TOK.primary,
          fontFamily: TOK.font,
          display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8,
        }}>
          <Ic name="plus" style={{ fontSize: 18 }}/>
          Ajouter mon premier équipement
        </button>
      </div>

      {/* Completion checklist */}
      <div style={{ padding: '0 20px' }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: TOK.text, marginBottom: 10 }}>
          Complétez votre dossier
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {[
            { done: true,  label: 'Passeport créé',                   action: null },
            { done: false, label: 'Premier équipement ajouté',        action: onAdd },
            { done: false, label: 'Plan du logement renseigné',       action: null  },
            { done: false, label: 'Fiche partagée avec un pro',       action: null  },
          ].map((item, i) => (
            <button key={i} onClick={item.action || undefined} style={{
              display: 'flex', alignItems: 'center', gap: 12,
              padding: '12px 14px', borderRadius: 10,
              background: item.done ? '#F0FDF4' : TOK.surface,
              border: `1.5px solid ${item.done ? '#86EFAC' : TOK.border}`,
              cursor: item.action ? 'pointer' : 'default',
              textAlign: 'left', fontFamily: TOK.font,
              boxShadow: TOK.shadowSm,
            }}>
              <Ic
                name={item.done ? 'circle-check-big' : 'circle'}
                style={{ color: item.done ? TOK.success : TOK.border, fontSize: 20, flexShrink: 0 }}
              />
              <span style={{
                flex: 1, fontSize: 13,
                fontWeight: item.done ? 600 : 500,
                color: item.done ? TOK.success : TOK.text,
              }}>{item.label}</span>
              {!item.done && item.action && (
                <Ic name="chevron-right" style={{ color: TOK.t3, fontSize: 16 }}/>
              )}
              {item.done && (
                <Ic name="check" style={{ color: TOK.success, fontSize: 16 }}/>
              )}
            </button>
          ))}
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
      `}</style>
    </div>
  );
}

/* ─────────────────────────────────────────────────────────
   Two-level Add sheet
   parent → [ equipment | room ]
   ───────────────────────────────────────────────────────── */
function AddSheet({ step, onStep, onClose, onNavigate }) {
  const open = step !== null;

  // Parent options
  const parentItems = [
    { id: 'equipment', icon: 'package',      label: 'Un équipement',  sub: 'Chaudière, frigo, climatisation…'  },
    { id: 'room',      icon: 'squares-four', label: 'Une pièce',      sub: 'Salon, chambre, cuisine, SDB…'     },
    { id: 'doc',       icon: 'file-text',    label: 'Un document',    sub: 'Facture, garantie, DPE, plan PDF…' },
  ];

  // Equipment sub-options
  const equipItems = [
    { icon: 'qr-code',       t: 'Scanner un code-barres', s: 'Reconnaissance auto-complète'  },
    { icon: 'camera',        t: 'Prendre une photo',      s: "L'IA identifie le modèle"      },
    { icon: 'pencil-simple', t: 'Saisie manuelle',        s: 'Nom, marque, année, prix…'     },
  ];

  // Room sub-options
  const roomItems = [
    { icon: 'pen-tool',      t: 'Placer ma pièce sur le plan',  s: "Quelques clics et c'est prêt — l'éditeur vous guide", nav: 'plan' },
    { icon: 'pencil-simple', t: 'Saisie rapide',                s: 'Nom + surface, sans plan'                                         },
  ];

  function SheetRow({ icon, title, sub, onClick, badge }) {
    return (
      <button onClick={onClick} style={{
        display: 'flex', alignItems: 'center', gap: 12,
        padding: 14, background: TOK.muted, borderRadius: 12, border: 0,
        cursor: 'pointer', textAlign: 'left', fontFamily: TOK.font,
        width: '100%',
      }}>
        <div style={{
          width: 40, height: 40, borderRadius: 10, background: TOK.primary100,
          color: TOK.primary, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          flexShrink: 0,
        }}><Ic name={icon}/></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: TOK.text }}>{title}</div>
          <div style={{ fontSize: 11, color: TOK.t2, marginTop: 1 }}>{sub}</div>
        </div>
        {badge && <Badge kind={badge.kind} icon={badge.icon}>{badge.label}</Badge>}
        <Ic name="chevron-right" style={{ color: TOK.t3 }}/>
      </button>
    );
  }

  // Back header when in a sub-level
  function BackHeader({ label }) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 14 }}>
        <button onClick={() => onStep('parent')} style={{
          width: 30, height: 30, borderRadius: 8, background: TOK.muted, border: 0,
          color: TOK.text, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Ic name="chevron-left" style={{ fontSize: 18 }}/></button>
        <span style={{ fontSize: 17, fontWeight: 700 }}>{label}</span>
      </div>
    );
  }

  return (
    <Sheet open={open} onClose={onClose} title={step === 'parent' ? 'Que souhaitez-vous ajouter ?' : null}>

      {/* Level 1 — parent */}
      {step === 'parent' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          {parentItems.map(o => (
            <SheetRow
              key={o.id}
              icon={o.icon}
              title={o.label}
              sub={o.sub}
              onClick={() => o.id === 'doc' ? onClose() : onStep(o.id)}
            />
          ))}
        </div>
      )}

      {/* Level 2 — equipment methods */}
      {step === 'equipment' && (
        <div>
          <BackHeader label="Ajouter un équipement"/>
          <div style={{ fontSize: 13, color: TOK.t2, marginBottom: 12 }}>
            Comment souhaitez-vous l'ajouter ?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
            {equipItems.map(o => (
              <SheetRow
                key={o.t} icon={o.icon} title={o.t} sub={o.s}
                badge={o.icon === 'camera' ? { kind: 'ai', icon: 'sparkles', label: 'IA' } : null}
                onClick={onClose}
              />
            ))}
          </div>
        </div>
      )}

      {/* Level 2 — room methods */}
      {step === 'room' && (
        <div>
          <BackHeader label="Ajouter une pièce"/>
          <div style={{ fontSize: 13, color: TOK.t2, marginBottom: 12 }}>
            Comment souhaitez-vous l'ajouter ?
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginBottom: 14 }}>
            {roomItems.map(o => (
              <SheetRow
                key={o.t} icon={o.icon} title={o.t} sub={o.s}
                onClick={() => { onClose(); if (o.nav) onNavigate(o.nav); }}
              />
            ))}
          </div>
          <div style={{
            padding: '10px 12px', borderRadius: 8, background: TOK.aiBg,
            fontSize: 11, color: TOK.aiTx, display: 'flex', gap: 8, alignItems: 'center',
          }}>
            <Ic name="sparkles" style={{ fontSize: 14, flexShrink: 0 }}/>
            Nommez la pièce et l'IA suggère les équipements typiques à ajouter.
          </div>
        </div>
      )}

    </Sheet>
  );
}

/* ─────────────────────────────────────────────────────────
   Supporting screens (unchanged from original)
   ───────────────────────────────────────────────────────── */
function ReportPlaceholder() {
  return (
    <div style={{ padding: 20 }}>
      <div style={{
        background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 16,
        padding: 20, boxShadow: TOK.shadowSm,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: TOK.primary100, color: TOK.primary,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}><Ic name="file-text"/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 15, fontWeight: 700 }}>Rapport patrimoine</div>
            <div style={{ fontSize: 11, color: TOK.t2 }}>PDF · 12 pages · à jour</div>
          </div>
          <Badge kind="premium" icon="crown">Premium</Badge>
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 14 }}>
          <Btn variant="secondary" size="sm" icon="eye">Aperçu</Btn>
          <Btn variant="primary"   size="sm" icon="download-simple">Télécharger</Btn>
          <Btn variant="outline"   size="sm" icon="share-network">Notaire</Btn>
        </div>
      </div>
      <div style={{
        marginTop: 14, padding: 16,
        background: TOK.proBg, borderRadius: 12, border: `1px solid #86EFAC`,
      }}>
        <div style={{ fontSize: 12, fontWeight: 700, color: TOK.proTx }}>
          <Ic name="badge-check"/> Données chiffrées et stockées en France
        </div>
        <div style={{ fontSize: 11, color: TOK.proTx, opacity: 0.85, marginTop: 4 }}>
          Conforme RGPD · Hébergement OVH Roubaix
        </div>
      </div>
    </div>
  );
}

function UpgradeModal({ onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 300,
      background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(20px)', WebkitBackdropFilter: 'blur(20px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24,
      animation: 'fadeIn 200ms ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: TOK.surface, borderRadius: 20,
        padding: 20, animation: 'scaleIn 200ms ease',
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14,
          background: 'linear-gradient(135deg, #F59E0B, #DC2626)', color: '#FFF',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 26, marginBottom: 12,
        }}><Ic name="crown"/></div>
        <div style={{ fontSize: 20, fontWeight: 700, letterSpacing: '-0.01em' }}>Passez en Premium</div>
        <div style={{ fontSize: 13, color: TOK.t2, marginTop: 4 }}>
          Estimation IA, export PDF illimité, partage sécurisé avec votre notaire.
        </div>
        <div style={{ marginTop: 14, display: 'flex', flexDirection: 'column', gap: 6 }}>
          {['Équipements illimités','Estimation IA mise à jour mensuelle','Export PDF notaire','Partage sécurisé par lien'].map(s => (
            <div key={s} style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 12 }}>
              <Ic name="circle-check-big" style={{ color: TOK.success, fontSize: 16 }}/>
              <span>{s}</span>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8, marginTop: 16 }}>
          <Btn variant="ghost" onClick={onClose} full>Plus tard</Btn>
          <Btn variant="primary" full>9,99 € / mois</Btn>
        </div>
        <style>{`
          @keyframes fadeIn  { from { opacity:0 } to { opacity:1 } }
          @keyframes scaleIn { from { transform:scale(0.95); opacity:0 } to { transform:scale(1); opacity:1 } }
        `}</style>
      </div>
    </div>
  );
}

function EquipmentDetail({ item, onClose }) {
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 250, background: 'rgba(0,0,0,0.5)',
      display: 'flex', alignItems: 'flex-end', animation: 'fadeIn 200ms ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: TOK.surface, borderRadius: '24px 24px 0 0',
        padding: '10px 20px 30px', maxHeight: '85%', overflowY: 'auto',
        animation: 'slideUp 250ms ease',
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: '#D1D5DB', margin: '0 auto 14px' }}/>
        <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 14,
            background: item.kind === 'fixed' ? TOK.fixedBg : TOK.movableBg,
            color:      item.kind === 'fixed' ? TOK.fixedTx : TOK.movableTx,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 28,
          }}><Ic name={item.icon}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 17, fontWeight: 700 }}>{item.name}</div>
            <div style={{ fontSize: 12, color: TOK.t2 }}>{item.meta}</div>
          </div>
          <div style={{ textAlign: 'right' }}>
            <div style={{ fontSize: 18, fontWeight: 800 }}>{item.price}</div>
            <Badge kind={item.kind}>{item.kind === 'fixed' ? 'Fixe' : 'Mobilier'}</Badge>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 10, marginBottom: 14 }}>
          {[
            { k: 'Marque',   v: item.name.split(' ')[1] || '—' },
            { k: 'Année',    v: '2022' },
            { k: 'Garantie', v: 'Jusqu\'au 12 mars 2027' },
            { k: 'Facture',  v: 'Disponible' },
          ].map(r => (
            <div key={r.k} style={{ padding: 12, background: TOK.muted, borderRadius: 10 }}>
              <div style={{ fontSize: 10, color: TOK.t3, textTransform: 'uppercase', letterSpacing: '0.05em' }}>{r.k}</div>
              <div style={{ fontSize: 13, fontWeight: 600, marginTop: 2 }}>{r.v}</div>
            </div>
          ))}
        </div>
        <div style={{ display: 'flex', gap: 8 }}>
          <Btn variant="secondary" full icon="pencil-simple">Modifier</Btn>
          <Btn variant="primary"   full icon="share-network">Partager</Btn>
        </div>
        <style>{`
          @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        `}</style>
      </div>
    </div>
  );
}

Object.assign(window, { App, MainApp, FirstVisitHome, ReportPlaceholder, UpgradeModal, EquipmentDetail });

ReactDOM.createRoot(document.getElementById('root')).render(<App/>);
