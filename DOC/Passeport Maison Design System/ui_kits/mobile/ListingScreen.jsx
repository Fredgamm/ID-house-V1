/* global React, TOK, Ic, Btn, Badge */

/* ── Shared mock data ─────────────────────────────────── */
const LISTINGS = [
  {
    id: 1, icon: 'sofa', name: 'Canapé Roche Bobois', price: '3 200 €',
    condition: 'Très bon état', room: 'Salon', seller: 'Pauline D.',
    rating: '4.8', distance: '450 m', year: 2021, original: '3 600 €',
    desc: "Canapé 3 places en cuir naturel beige. Aucune déchirure, légère usure normale. Appartement non-fumeur, sans animaux.",
  },
  {
    id: 2, icon: 'tv', name: 'Télévision Samsung 55"', price: '750 €',
    condition: 'Bon état', room: 'Salon', seller: 'Rémi B.',
    rating: '4.6', distance: '1,2 km', year: 2020, original: '1 200 €',
    desc: "TV Samsung QLED 55 pouces. Télécommande et câbles inclus. Quelques micro-rayures invisibles à l'usage.",
  },
  {
    id: 3, icon: 'cooking-pot', name: 'Lave-vaisselle Bosch', price: '420 €',
    condition: 'Bon état', room: 'Cuisine', seller: 'Marie L.',
    rating: '4.9', distance: '800 m', year: 2022, original: '680 €',
    desc: "Lave-vaisselle Bosch Serie 4, 60 cm, 14 couverts. Fonctionne parfaitement. Vendu suite à déménagement.",
  },
];

/* ── Product card (horizontal scroll) ─────────────────── */
function ProductCard({ listing, onPress }) {
  return (
    <button onClick={() => onPress(listing)} style={{
      width: 156, flexShrink: 0, background: TOK.surface,
      border: `1.5px solid ${TOK.border}`, borderRadius: 14,
      overflow: 'hidden', cursor: 'pointer', textAlign: 'left',
      fontFamily: TOK.font, boxShadow: TOK.shadowSm,
      display: 'flex', flexDirection: 'column',
    }}>
      {/* Photo placeholder */}
      <div style={{
        height: 100,
        background: `linear-gradient(135deg, ${TOK.primary100}, ${TOK.primary200})`,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        position: 'relative',
      }}>
        <Ic name={listing.icon} size={46} style={{ color: TOK.primary400, opacity: 0.65 }}/>
        <div style={{ position: 'absolute', top: 7, right: 7 }}>
          <Badge kind="movable">{listing.condition}</Badge>
        </div>
      </div>
      {/* Info */}
      <div style={{ padding: '10px 10px 12px', flex: 1 }}>
        <div style={{
          fontSize: 12, fontWeight: 700, color: TOK.text, marginBottom: 2,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{listing.name}</div>
        <div style={{ fontSize: 16, fontWeight: 800, color: TOK.primary700, marginBottom: 4, letterSpacing: '-0.01em' }}>
          {listing.price}
        </div>
        <div style={{ fontSize: 10, color: TOK.t3, display: 'flex', alignItems: 'center', gap: 3 }}>
          <Ic name="map-pin" size={10}/> {listing.distance}
        </div>
      </div>
    </button>
  );
}

/* ── Contact sheet (message or offer) ─────────────────── */
function ContactSheet({ mode, listing, msgText, setMsg, offerPrice, setOffer, onClose, onSend }) {
  const isMessage = mode === 'message';
  return (
    <div onClick={onClose} style={{
      position: 'absolute', inset: 0, zIndex: 100,
      background: 'rgba(0,0,0,0.45)',
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

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
          <div style={{ fontSize: 17, fontWeight: 700 }}>
            {isMessage ? 'Envoyer un message' : 'Proposer un prix'}
          </div>
          <button onClick={onClose} style={{
            width: 28, height: 28, borderRadius: 14, background: TOK.muted,
            border: 0, cursor: 'pointer', color: TOK.t2,
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}><Ic name="x" style={{ fontSize: 14 }}/></button>
        </div>

        {/* Recipient preview */}
        <div style={{
          display: 'flex', alignItems: 'center', gap: 10,
          padding: '8px 12px', background: TOK.muted, borderRadius: 10, marginBottom: 14,
        }}>
          <div style={{
            width: 32, height: 32, borderRadius: 16, background: TOK.primary100,
            color: TOK.primary, display: 'flex', alignItems: 'center', justifyContent: 'center',
            fontSize: 14, fontWeight: 700, flexShrink: 0,
          }}>{listing.seller[0]}</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 12, fontWeight: 600, color: TOK.text }}>{listing.seller}</div>
            <div style={{ fontSize: 10, color: TOK.t2 }}>{listing.name}</div>
          </div>
          <span style={{ fontSize: 11, color: TOK.success, fontWeight: 600 }}>Répond en &lt; 2 h</span>
        </div>

        {/* MESSAGE mode */}
        {isMessage && (
          <div>
            <label style={{ fontSize: 12, fontWeight: 600, color: TOK.t2, display: 'block', marginBottom: 6 }}>
              Votre message
            </label>
            <textarea
              value={msgText}
              onChange={e => setMsg(e.target.value)}
              rows={4}
              style={{
                width: '100%', padding: '12px 14px',
                border: `1.5px solid ${TOK.border}`, borderRadius: 10,
                fontSize: 14, fontFamily: TOK.font, color: TOK.text,
                background: TOK.input, outline: 'none', boxSizing: 'border-box',
                resize: 'none', lineHeight: 1.5,
              }}
            />
          </div>
        )}

        {/* OFFER mode */}
        {!isMessage && (
          <div>
            <div style={{ display: 'flex', gap: 10, marginBottom: 14 }}>
              <div style={{ flex: 1 }}>
                <label style={{ fontSize: 12, fontWeight: 600, color: TOK.t2, display: 'block', marginBottom: 6 }}>
                  Votre offre
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="number"
                    placeholder="ex. 2 800"
                    value={offerPrice}
                    onChange={e => setOffer(e.target.value)}
                    style={{
                      width: '100%', padding: '12px 36px 12px 14px',
                      border: `1.5px solid ${TOK.border}`, borderRadius: 10,
                      fontSize: 15, fontFamily: TOK.font, color: TOK.text,
                      background: TOK.input, outline: 'none', boxSizing: 'border-box',
                    }}
                  />
                  <span style={{
                    position: 'absolute', right: 12, top: '50%', transform: 'translateY(-50%)',
                    fontSize: 13, fontWeight: 600, color: TOK.t3, pointerEvents: 'none',
                  }}>€</span>
                </div>
              </div>
              <div style={{ paddingTop: 22 }}>
                <div style={{
                  padding: '12px 14px', background: TOK.muted, borderRadius: 10,
                  fontSize: 12, color: TOK.t2, textAlign: 'center',
                }}>
                  <div style={{ fontSize: 10, marginBottom: 2 }}>Prix vendeur</div>
                  <div style={{ fontWeight: 700, color: TOK.text }}>{listing.price}</div>
                </div>
              </div>
            </div>
          </div>
        )}

        <div style={{ marginTop: 14 }}>
          <Btn variant="primary" size="lg" full onClick={onSend} icon={isMessage ? 'send' : 'check'}>
            {isMessage ? 'Envoyer le message' : 'Envoyer mon offre'}
          </Btn>
        </div>

        <style>{`
          @keyframes fadeIn  { from { opacity: 0 } to { opacity: 1 } }
          @keyframes slideUp { from { transform: translateY(100%) } to { transform: translateY(0) } }
        `}</style>
      </div>
    </div>
  );
}

/* ── Sent confirmation bar ────────────────────────────── */
function SentBar({ mode, onGoToMessages }) {
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
          color: TOK.success, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 24,
          flexShrink: 0,
        }}><Ic name="circle-check-big"/></div>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: TOK.textDeep }}>
            {mode === 'message' ? 'Message envoyé !' : 'Offre envoyée !'}
          </div>
          <div style={{ fontSize: 12, color: TOK.t2, marginTop: 2 }}>
            {mode === 'message'
              ? 'Le vendeur vous répondra sous peu.'
              : "Le vendeur a reçu votre proposition de prix."}
          </div>
        </div>
      </div>
      <Btn variant="secondary" full onClick={onGoToMessages} icon="message-circle">
        Voir mes messages
      </Btn>
      <style>{`@keyframes slideUp { from { transform:translateY(100%) } to { transform:translateY(0) } }`}</style>
    </div>
  );
}

/* ── Listing detail page (full-screen overlay) ─────────── */
function ListingDetailPage({ listing, onClose, onGoToMessages }) {
  const [contactMode, setContact]  = React.useState(null); // null | 'message' | 'offer'
  const [msgText,     setMsg]      = React.useState('Bonjour, je suis intéressé(e) par ce bien. Est-il toujours disponible ?');
  const [offerPrice,  setOffer]    = React.useState('');
  const [sent,        setSent]     = React.useState(null);  // null | 'message' | 'offer'

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 200,
      background: TOK.bg, display: 'flex', flexDirection: 'column',
      animation: 'slideInRight 280ms ease', overflow: 'hidden',
    }}>

      {/* Status bar spacer */}
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
        <span style={{
          flex: 1, fontSize: 15, fontWeight: 700,
          overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
        }}>{listing.name}</span>
        <button style={{
          width: 32, height: 32, borderRadius: 16, background: TOK.muted, border: 0,
          color: TOK.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Ic name="share-2" style={{ fontSize: 16 }}/></button>
      </div>

      {/* Scrollable body */}
      <div style={{ flex: 1, overflowY: 'auto', paddingBottom: 94 }}>

        {/* Photo placeholder */}
        <div style={{
          height: 220, position: 'relative',
          background: `linear-gradient(145deg, ${TOK.primary100} 0%, ${TOK.primary200} 100%)`,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <Ic name={listing.icon} size={80} style={{ color: TOK.primary400, opacity: 0.55 }}/>
          <div style={{ position: 'absolute', bottom: 12, left: 16 }}>
            <Badge kind="movable">{listing.condition}</Badge>
          </div>
          <div style={{
            position: 'absolute', bottom: 12, right: 16,
            background: 'rgba(255,255,255,0.9)', borderRadius: 6,
            padding: '4px 8px', fontSize: 11, fontWeight: 600, color: TOK.t2,
            display: 'flex', alignItems: 'center', gap: 4,
          }}>
            <Ic name="camera" style={{ fontSize: 11 }}/> 1 photo
          </div>
        </div>

        {/* Price + title */}
        <div style={{
          padding: '16px 20px', background: TOK.surface,
          borderBottom: `1px solid ${TOK.border}`,
        }}>
          <div style={{ fontSize: 30, fontWeight: 800, color: TOK.textDeep, letterSpacing: '-0.02em', marginBottom: 6 }}>
            {listing.price}
          </div>
          <div style={{ fontSize: 17, fontWeight: 700, color: TOK.text, marginBottom: 10 }}>
            {listing.name}
          </div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', alignItems: 'center' }}>
            <Badge kind="movable">{listing.room}</Badge>
            <Badge kind="neutral">{listing.condition}</Badge>
            <span style={{ fontSize: 11, color: TOK.t3, display: 'flex', alignItems: 'center', gap: 3 }}>
              <Ic name="map-pin" size={11}/> {listing.distance}
            </span>
          </div>
        </div>

        {/* Seller */}
        <div style={{ margin: '10px 20px 0' }}>
          <div style={{
            padding: '14px', background: TOK.surface,
            border: `1.5px solid ${TOK.border}`, borderRadius: 14, boxShadow: TOK.shadowSm,
            display: 'flex', alignItems: 'center', gap: 12,
          }}>
            <div style={{
              width: 46, height: 46, borderRadius: 23,
              background: TOK.primary100, color: TOK.primary,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, fontWeight: 800, flexShrink: 0,
            }}>{listing.seller[0]}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 14, fontWeight: 600, color: TOK.text }}>{listing.seller}</div>
              <div style={{ fontSize: 11, color: TOK.t2, marginTop: 2, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
                <span><Ic name="star" style={{ color: '#F59E0B', fontSize: 11 }}/> {listing.rating} · Particulier</span>
                <span style={{ color: TOK.success, fontWeight: 600 }}>Répond en moins de 2 h</span>
              </div>
            </div>
            <Ic name="chevron-right" style={{ color: TOK.t3, fontSize: 16 }}/>
          </div>
        </div>

        {/* Description */}
        <div style={{ margin: '10px 20px 0' }}>
          <div style={{
            padding: '14px', background: TOK.surface,
            border: `1.5px solid ${TOK.border}`, borderRadius: 14, boxShadow: TOK.shadowSm,
          }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: TOK.textDeep, marginBottom: 8 }}>Description</div>
            <div style={{ fontSize: 13, color: TOK.t2, lineHeight: 1.65 }}>{listing.desc}</div>
          </div>
        </div>

        {/* Passeport Maison data */}
        <div style={{ margin: '10px 20px 16px' }}>
          <div style={{
            padding: '14px', background: TOK.primary100,
            border: `1.5px solid ${TOK.primary200}`, borderRadius: 14,
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 12 }}>
              <div style={{
                width: 28, height: 28, borderRadius: 8,
                background: TOK.primary,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}>
                <Ic name="house" style={{ color: '#FFF', fontSize: 14 }}/>
              </div>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 12, fontWeight: 700, color: TOK.primary700 }}>Données Passeport Maison</div>
                <div style={{ fontSize: 10, color: TOK.primary400 }}>Vérifiées · Source propriétaire</div>
              </div>
              <Badge kind="primary" icon="badge-check">Certifié</Badge>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 8 }}>
              {[
                { k: 'Acheté en',      v: String(listing.year) },
                { k: "Prix d'achat",   v: listing.original     },
                { k: 'Pièce',          v: listing.room         },
                { k: 'Catégorie',      v: 'Mobilier'           },
              ].map(r => (
                <div key={r.k} style={{ padding: '8px 10px', background: TOK.primary200, borderRadius: 8 }}>
                  <div style={{ fontSize: 10, color: TOK.primary700, opacity: 0.65 }}>{r.k}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: TOK.primary700, marginTop: 1 }}>{r.v}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* Fixed CTA bar */}
      {!contactMode && !sent && (
        <div style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          background: TOK.surface, padding: '12px 20px 34px',
          borderTop: `1px solid ${TOK.border}`,
          display: 'flex', gap: 10,
        }}>
          <Btn variant="outline" full onClick={() => setContact('offer')}>Faire une offre</Btn>
          <Btn variant="primary" full onClick={() => setContact('message')} icon="message-circle">
            Contacter
          </Btn>
        </div>
      )}

      {/* Contact / offer sheet */}
      {contactMode && !sent && (
        <ContactSheet
          mode={contactMode} listing={listing}
          msgText={msgText} setMsg={setMsg}
          offerPrice={offerPrice} setOffer={setOffer}
          onClose={() => setContact(null)}
          onSend={() => { setSent(contactMode); setContact(null); }}
        />
      )}

      {/* Sent confirmation */}
      {sent && <SentBar mode={sent} onGoToMessages={onGoToMessages || onClose}/>}

      <style>{`
        @keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }
      `}</style>
    </div>
  );
}

Object.assign(window, { LISTINGS, ProductCard, ListingDetailPage });
