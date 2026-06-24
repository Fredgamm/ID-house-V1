/* global React, TOK, Ic, Btn, Badge */

/* ── Pro mock data ────────────────────────────────── */
const PROS = [
  {
    id: 1, logo: 'MD', color: '#F0EFFB',
    name: 'Maxime Durand', spec: 'Plomberie · Chauffage',
    rating: '4.9', reviews: 142, distance: '450 m',
    verified: true, premium: true,
    responseTime: 'Répond en moins de 1 h',
    tags: ['RGE', 'Qualibat', 'Urgences 7j/7'],
    desc: "Plombier-chauffagiste certifié RGE avec 15 ans d'expérience. Spécialisé dans l'installation et la rénovation de systèmes de chauffage, chauffe-eau et sanitaires. Intervention rapide en Île-de-France.",
    services: [
      { name: 'Dépannage plomberie',    price: 'Dès 90 €/h'  },
      { name: 'Installation chaudière', price: 'Sur devis'    },
      { name: 'Remplacement ballon',    price: 'Dès 350 €'    },
    ],
    reviews: [
      { author: 'Marie T.',  stars: 5, text: "Très professionnel, rapide et propre. Je recommande vivement !", date: '15 avr.' },
      { author: 'Jean P.',   stars: 5, text: "Intervention en urgence le weekend, tarif raisonnable.",           date: '2 avr.'  },
    ],
  },
  {
    id: 2, logo: 'EP', color: '#FEE2E2',
    name: 'Élise Perret Peinture', spec: 'Peinture · Revêtements',
    rating: '4.8', reviews: 87, distance: '1,2 km',
    verified: true, premium: false,
    responseTime: 'Répond en moins de 3 h',
    tags: ['Qualibat', 'Éco-peintures'],
    desc: "Artisane peintre qualifiée spécialisée en peinture intérieure et revêtements muraux haut de gamme. Finitions soignées, conseils couleurs personnalisés.",
    services: [
      { name: 'Peinture intérieure', price: 'Dès 25 €/m²' },
      { name: 'Papier peint',        price: 'Dès 35 €/m²' },
      { name: 'Ravalement façade',   price: 'Sur devis'    },
    ],
    reviews: [
      { author: 'Sophie D.', stars: 5, text: "Superbe travail, Élise est minutieuse et de bon conseil.", date: '20 mai' },
      { author: 'Pierre L.', stars: 4, text: "Bonne prestation, délai respecté.",                         date: '10 mai' },
    ],
  },
  {
    id: 3, logo: 'AL', color: '#FEF3C7',
    name: 'Atelier Lumière', spec: 'Électricité · Domotique',
    rating: '4.7', reviews: 56, distance: '2,1 km',
    verified: true, premium: false,
    responseTime: 'Répond en moins de 2 h',
    tags: ['Qualifelec', 'Consuel', 'Home Automation'],
    desc: "Électricien certifié Qualifelec, spécialiste en installation domotique et mise aux normes NF C 15-100. Intervention sur appartements, maisons et locaux professionnels.",
    services: [
      { name: 'Mise aux normes électriques', price: 'Sur devis'    },
      { name: 'Installation domotique',      price: 'Dès 200 €'    },
      { name: 'Dépannage électrique',        price: 'Dès 80 €/h'   },
    ],
    reviews: [
      { author: 'Alain M.',  stars: 5, text: "Installation domotique parfaite, très pédagogue.", date: '8 mai' },
      { author: 'Claire B.', stars: 4, text: "Bon travail, prix correct.",                        date: '2 mai' },
    ],
  },
  {
    id: 4, logo: 'ML', color: '#F0EFFB',
    name: 'Marc Lavigne', spec: 'Multiservice',
    rating: '4.6', reviews: 34, distance: '3,4 km',
    verified: false, premium: false,
    responseTime: 'Répond en moins de 4 h',
    tags: ['Montage meubles', 'Petits travaux'],
    desc: "Artisan multiservice pour tous vos petits travaux du quotidien : montage de meubles, fixations, réparations diverses, retouches peinture.",
    services: [
      { name: 'Montage meubles',  price: 'Dès 60 €'   },
      { name: 'Petits travaux',   price: 'Dès 50 €/h' },
      { name: 'Sur mesure',       price: 'Sur devis'   },
    ],
    reviews: [
      { author: 'Lucie V.', stars: 5, text: "Très efficace pour le montage IKEA ! Rapide et soigné.", date: '14 mai' },
    ],
  },
];

/* ── StarRow ──────────────────────────────────────── */
function StarRow({ n }) {
  return (
    <span style={{ color: '#F59E0B', fontSize: 12, letterSpacing: 1 }}>
      {'★'.repeat(n)}{'☆'.repeat(5 - n)}
    </span>
  );
}

/* ── Quote sheet ──────────────────────────────────── */
function QuoteSheet({ pro, onClose, onSend }) {
  const types = ['Dépannage', 'Rénovation', 'Installation', 'Devis gratuit'];
  const contacts = ['Téléphone', 'Email', 'Peu importe'];
  const [type,    setType]    = React.useState(null);
  const [desc,    setDesc]    = React.useState('');
  const [contact, setContact] = React.useState('Peu importe');

  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.45)',
      display: 'flex', alignItems: 'flex-end',
      animation: 'fadeIn 200ms ease',
    }}>
      <div onClick={e => e.stopPropagation()} style={{
        width: '100%', background: TOK.surface,
        borderRadius: '24px 24px 0 0', padding: '10px 20px 40px',
        animation: 'slideUp 250ms ease', maxHeight: '85%', overflowY: 'auto',
      }}>
        <div style={{ width: 36, height: 4, borderRadius: 2, background: '#D1D5DB', margin: '0 auto 16px' }}/>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 14 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>Demander un devis</div>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: 14, background: TOK.muted, border: 0,
            cursor: 'pointer', color: TOK.t2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Ic name="x" style={{ fontSize: 14 }}/></button>
        </div>

        {/* Pro preview */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10, padding: '8px 12px',
          background: TOK.muted, borderRadius: 10, marginBottom: 16,
        }}>
          <div style={{
            width: 36, height: 36, borderRadius: 9, background: pro.color,
            color: TOK.primary700, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 13, fontWeight: 700, flexShrink: 0,
          }}>{pro.logo}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: TOK.text }}>{pro.name}</div>
            <div style={{ fontSize: 11, color: TOK.t2 }}>{pro.spec}</div>
          </div>
          {pro.verified && <Badge kind="pro" icon="seal-check">Pro</Badge>}
        </div>

        {/* Type de prestation */}
        <div style={{ marginBottom: 16 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: TOK.textDeep, marginBottom: 8 }}>Type de prestation</div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
            {types.map(t => {
              const sel = type === t;
              return (
                <button key={t} onClick={() => setType(t)} style={{
                  padding: '7px 14px', borderRadius: 20,
                  border: `1.5px solid ${sel ? TOK.primary : TOK.border}`,
                  background: sel ? TOK.primary100 : TOK.surface,
                  color: sel ? TOK.primary700 : TOK.t2,
                  fontSize: 12, fontWeight: sel ? 700 : 500,
                  cursor: 'pointer', fontFamily: TOK.font,
                }}>{t}</button>
              );
            })}
          </div>
        </div>

        {/* Description */}
        <div style={{ marginBottom: 16 }}>
          <label style={{ fontSize: 12, fontWeight: 700, color: TOK.textDeep, display: 'block', marginBottom: 6 }}>
            Décrivez votre projet
          </label>
          <textarea
            value={desc}
            onChange={e => setDesc(e.target.value)}
            placeholder="Ex. : fuite sous l'évier cuisine, intervention urgente..."
            rows={3}
            style={{
              width: '100%', padding: '10px 12px',
              border: `1.5px solid ${TOK.border}`, borderRadius: 10,
              fontSize: 13, fontFamily: TOK.font, color: TOK.text,
              background: TOK.input, outline: 'none', boxSizing: 'border-box',
              resize: 'none', lineHeight: 1.5,
            }}
          />
        </div>

        {/* Contact préférence */}
        <div style={{ marginBottom: 20 }}>
          <div style={{ fontSize: 12, fontWeight: 700, color: TOK.textDeep, marginBottom: 8 }}>Moyen de contact préféré</div>
          <div style={{ display: 'flex', gap: 8 }}>
            {contacts.map(c => {
              const sel = contact === c;
              return (
                <button key={c} onClick={() => setContact(c)} style={{
                  flex: 1, padding: '8px 4px', borderRadius: 8,
                  border: `1.5px solid ${sel ? TOK.primary : TOK.border}`,
                  background: sel ? TOK.primary100 : TOK.surface,
                  color: sel ? TOK.primary700 : TOK.t2,
                  fontSize: 11, fontWeight: sel ? 700 : 500,
                  cursor: 'pointer', fontFamily: TOK.font,
                }}>{c}</button>
              );
            })}
          </div>
        </div>

        <Btn variant="primary" size="lg" full onClick={onSend} icon="send">
          Envoyer la demande
        </Btn>

        <style>{`
          @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
          @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        `}</style>
      </div>
    </div>
  );
}

/* ── Sent confirmation bar ────────────────────────── */
function QuoteSentBar({ pro, onClose }) {
  return (
    <div style={{
      position: 'absolute', bottom: 0, left: 0, right: 0,
      background: TOK.surface, padding: '16px 20px 34px',
      borderTop: `1px solid ${TOK.border}`,
      animation: 'slideUp 250ms ease',
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 14 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: TOK.proBg,
          color: TOK.success, display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 24, flexShrink: 0,
        }}><Ic name="circle-check-big"/></div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: TOK.textDeep }}>Demande envoyée !</div>
          <div style={{ fontSize: 12, color: TOK.t2, marginTop: 2 }}>
            {pro.name} vous répondra bientôt ({pro.responseTime.replace('Répond en ', '')}).
          </div>
        </div>
      </div>
      <Btn variant="secondary" full onClick={onClose} icon="message-circle">
        Voir mes messages
      </Btn>
      <style>{`@keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }`}</style>
    </div>
  );
}

/* ── Pro detail page ──────────────────────────────── */
function ProDetailPage({ pro, onClose, onGoToMessages }) {
  const [quoteOpen, setQuote] = React.useState(false);
  const [sent,      setSent]  = React.useState(false);

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
        <span style={{ flex: 1, fontSize: 15, fontWeight: 700, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {pro.name}
        </span>
        <button style={{
          width: 32, height: 32, borderRadius: 16, background: TOK.muted, border: 0,
          color: TOK.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Ic name="share-2" style={{ fontSize: 16 }}/></button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 94 }}>

        {/* Hero identity card */}
        <div style={{ background: TOK.surface, padding: '20px', borderBottom: `1px solid ${TOK.border}` }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, marginBottom: 12 }}>
            <div style={{
              width: 64, height: 64, borderRadius: 16,
              background: pro.color, color: TOK.primary700,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 22, fontWeight: 700, flexShrink: 0,
            }}>{pro.logo}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 18, fontWeight: 700, color: TOK.textDeep, marginBottom: 2 }}>{pro.name}</div>
              <div style={{ fontSize: 13, color: TOK.t2, marginBottom: 8 }}>{pro.spec}</div>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {pro.verified && <Badge kind="pro"     icon="seal-check">Pro vérifié</Badge>}
                {pro.premium  && <Badge kind="premium" icon="crown">Premium</Badge>}
              </div>
            </div>
          </div>

          {/* Stats row */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 10 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
              <StarRow n={5}/>
              <span style={{ fontSize: 13, fontWeight: 700, color: TOK.textDeep }}>{pro.rating}</span>
              <span style={{ fontSize: 12, color: TOK.t2 }}>· {pro.reviews} avis</span>
            </div>
            <span style={{ fontSize: 12, color: TOK.t2, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Ic name="map-pin" size={12}/> {pro.distance}
            </span>
          </div>

          {/* Response time + tags */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <span style={{
              display: 'inline-flex', alignItems: 'center', gap: 4,
              padding: '4px 10px', borderRadius: 20, background: TOK.proBg,
              fontSize: 11, fontWeight: 600, color: TOK.success,
            }}>
              <div style={{ width: 6, height: 6, borderRadius: 3, background: TOK.success }}/>
              {pro.responseTime}
            </span>
            {pro.tags.map(t => (
              <span key={t} style={{
                padding: '4px 9px', borderRadius: 20, background: TOK.muted,
                fontSize: 11, color: TOK.t2, fontWeight: 500,
              }}>{t}</span>
            ))}
          </div>
        </div>

        {/* À propos */}
        <div style={{ margin: '10px 20px 0' }}>
          <div style={{ padding: '14px', background: TOK.surface, border: `1.5px solid ${TOK.border}`, borderRadius: 14, boxShadow: TOK.shadowSm }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: TOK.textDeep, marginBottom: 8 }}>À propos</div>
            <div style={{ fontSize: 13, color: TOK.t2, lineHeight: 1.65 }}>{pro.desc}</div>
          </div>
        </div>

        {/* Services */}
        <div style={{ margin: '10px 20px 0' }}>
          <div style={{ padding: '14px', background: TOK.surface, border: `1.5px solid ${TOK.border}`, borderRadius: 14, boxShadow: TOK.shadowSm }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: TOK.textDeep, marginBottom: 10 }}>Ses services</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
              {pro.services.map((s, i) => (
                <div key={s.name} style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  paddingTop: i === 0 ? 0 : 10, paddingBottom: 10,
                  borderBottom: i < pro.services.length - 1 ? `1px solid ${TOK.border}` : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                    <div style={{ width: 6, height: 6, borderRadius: 3, background: TOK.primary, flexShrink: 0 }}/>
                    <span style={{ fontSize: 13, color: TOK.text }}>{s.name}</span>
                  </div>
                  <span style={{ fontSize: 12, fontWeight: 700, color: TOK.primary700 }}>{s.price}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Avis */}
        <div style={{ margin: '10px 20px 16px' }}>
          <div style={{ padding: '14px', background: TOK.surface, border: `1.5px solid ${TOK.border}`, borderRadius: 14, boxShadow: TOK.shadowSm }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 12 }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: TOK.textDeep }}>Avis clients</div>
              <span style={{ fontSize: 12, color: TOK.primary, fontWeight: 600 }}>{pro.reviews} avis ›</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {pro.reviews.map((r, i) => (
                <div key={i} style={{
                  paddingBottom: i < pro.reviews.length - 1 ? 12 : 0,
                  borderBottom: i < pro.reviews.length - 1 ? `1px solid ${TOK.border}` : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 4 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ fontSize: 13, fontWeight: 600, color: TOK.text }}>{r.author}</span>
                      <StarRow n={r.stars}/>
                    </div>
                    <span style={{ fontSize: 11, color: TOK.t3 }}>{r.date}</span>
                  </div>
                  <div style={{ fontSize: 12, color: TOK.t2, lineHeight: 1.5 }}>{r.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Fixed CTA bar */}
      {!quoteOpen && !sent && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: TOK.surface, padding: '12px 20px 34px',
          borderTop: `1px solid ${TOK.border}`,
          display: 'flex', gap: 10,
        }}>
          <Btn variant="outline" full icon="phone">Appeler</Btn>
          <Btn variant="primary" full onClick={() => setQuote(true)} icon="send">
            Demander un devis
          </Btn>
        </div>
      )}

      {quoteOpen && !sent && (
        <QuoteSheet
          pro={pro}
          onClose={() => setQuote(false)}
          onSend={() => { setSent(true); setQuote(false); }}
        />
      )}

      {sent && (
        <QuoteSentBar
          pro={pro}
          onClose={onGoToMessages || onClose}
        />
      )}

      <style>{`@keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>
    </div>
  );
}

Object.assign(window, { PROS, ProDetailPage });
