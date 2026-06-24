/* global React, TOK, Ic, Badge */

/* ── Mock conversation data ───────────────────────── */
const CONVOS = [
  {
    id: 1, icon: 'sofa',
    name: 'Canapé Roche Bobois', price: '3 200 €',
    with: 'Pauline D.', preview: "Bien sûr, samedi 14h c'est possible.",
    time: 'Hier', unread: 2,
    messages: [
      { me: true,  text: "Bonjour, je suis intéressé(e) par votre canapé. Toujours disponible ?", time: '27 mai · 10h32' },
      { me: false, text: "Oui bonjour ! Il est toujours disponible.",                               time: '10h45' },
      { me: true,  text: "Super ! Je pourrais venir le voir ce weekend ?",                         time: '11h02' },
      { me: false, text: "Bien sûr, samedi 14h c'est possible.",                                   time: '11h05' },
    ],
  },
  {
    id: 2, icon: 'flame',
    name: 'Radiateur Atlantic 1500W', price: '180 €',
    with: 'Nicolas B.', preview: 'Merci, je confirme vendredi.',
    time: '3 mai', unread: 0,
    messages: [
      { me: true,  text: "Bonjour, votre radiateur est-il encore disponible ?", time: '3 mai · 09h12' },
      { me: false, text: "Oui ! Je vous le réserve. On se retrouve vendredi ?", time: '09h30' },
      { me: true,  text: "Parfait. Merci, je confirme vendredi.",               time: '09h45' },
    ],
  },
  {
    id: 3, icon: 'refrigerator',
    name: 'Réfrigérateur Bosch', price: '420 €',
    with: 'Sophie L.', preview: 'Oui, venez le voir samedi à 14h !',
    time: '28 avr.', unread: 0,
    messages: [
      { me: true,  text: "Bonjour Sophie, votre réfrigérateur est-il disponible ?", time: '28 avr. · 14h00' },
      { me: false, text: "Oui, venez le voir samedi à 14h !",                       time: '14h20' },
    ],
  },
];

/* ── Chat view (full-screen overlay) ─────────────── */
function ChatView({ convo, onClose }) {
  const [msgs,  setMsgs] = React.useState(convo.messages);
  const [input, setInput] = React.useState('');

  function send() {
    if (!input.trim()) return;
    setMsgs(m => [...m, { me: true, text: input, time: 'maintenant' }]);
    setInput('');
  }

  return (
    <div style={{
      position: 'absolute', inset: 0, zIndex: 300,
      background: TOK.bg, display: 'flex', flexDirection: 'column',
      animation: 'slideInRight 280ms ease',
    }}>

      <div style={{ height: 47, background: TOK.surface, flexShrink: 0 }}/>

      {/* Header */}
      <div style={{
        background: TOK.surface, padding: '8px 20px 10px',
        display: 'flex', alignItems: 'center', gap: 10, flexShrink: 0,
        borderBottom: `1px solid ${TOK.border}`,
      }}>
        <button onClick={onClose} style={{
          width: 32, height: 32, borderRadius: 16, background: TOK.muted, border: 0,
          color: TOK.text, cursor: 'pointer',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Ic name="chevron-left" style={{ fontSize: 18 }}/></button>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 15, fontWeight: 700, color: TOK.textDeep }}>{convo.with}</div>
          <div style={{ fontSize: 11, color: TOK.t2, marginTop: 1 }}>{convo.name} · {convo.price}</div>
        </div>
        <div style={{ width: 8, height: 8, borderRadius: 4, background: TOK.success, flexShrink: 0 }}/>
        <span style={{ fontSize: 11, color: TOK.success, fontWeight: 600 }}>En ligne</span>
      </div>

      {/* Product context bar */}
      <div style={{
        background: TOK.muted, padding: '8px 16px',
        display: 'flex', alignItems: 'center', gap: 10,
        flexShrink: 0, borderBottom: `1px solid ${TOK.border}`, cursor: 'pointer',
      }}>
        <div style={{
          width: 36, height: 36, borderRadius: 8,
          background: TOK.primary100, color: TOK.primary400,
          display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
        }}><Ic name={convo.icon} style={{ fontSize: 18 }}/></div>
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 12, fontWeight: 600, color: TOK.text }}>{convo.name}</div>
          <div style={{ fontSize: 11, color: TOK.t2 }}>{convo.price}</div>
        </div>
        <span style={{ fontSize: 11, color: TOK.primary, fontWeight: 600 }}>Voir l'annonce ›</span>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1, overflowY: 'auto', padding: '14px 16px',
        display: 'flex', flexDirection: 'column', gap: 2,
      }}>
        {msgs.map((m, i) => (
          <div key={i}>
            <div style={{
              fontSize: 10, color: TOK.t3, margin: '8px 0 3px',
              textAlign: m.me ? 'right' : 'left',
            }}>{m.time}</div>
            <div style={{ display: 'flex', justifyContent: m.me ? 'flex-end' : 'flex-start' }}>
              <div style={{
                maxWidth: '75%', padding: '10px 14px',
                fontSize: 14, lineHeight: 1.45,
                background: m.me ? TOK.primary : TOK.surface,
                color: m.me ? '#FFF' : TOK.text,
                border: m.me ? 'none' : `1px solid ${TOK.border}`,
                borderRadius: 18,
                borderBottomRightRadius: m.me ? 4 : 18,
                borderBottomLeftRadius: m.me ? 18 : 4,
              }}>{m.text}</div>
            </div>
          </div>
        ))}
        <div style={{ height: 4 }}/>
      </div>

      {/* Input bar */}
      <div style={{
        background: TOK.surface, borderTop: `1px solid ${TOK.border}`,
        padding: '8px 16px 30px',
        display: 'flex', gap: 8, alignItems: 'center', flexShrink: 0,
      }}>
        <input
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === 'Enter') send(); }}
          placeholder="Message..."
          style={{
            flex: 1, padding: '10px 16px',
            border: `1.5px solid ${TOK.border}`, borderRadius: 22,
            fontSize: 14, fontFamily: TOK.font, color: TOK.text,
            background: TOK.muted, outline: 'none',
          }}
        />
        <button onClick={send} style={{
          width: 40, height: 40, borderRadius: 20, background: TOK.primary, border: 0,
          cursor: 'pointer', color: '#FFF', flexShrink: 0,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}><Ic name="send" style={{ fontSize: 17 }}/></button>
      </div>

      <style>{`@keyframes slideInRight { from { transform: translateX(100%) } to { transform: translateX(0) } }`}</style>
    </div>
  );
}

/* ── Inbox screen ─────────────────────────────────── */
function MessagesScreen({ onOpenChat }) {
  const totalUnread = CONVOS.reduce((s, c) => s + c.unread, 0);

  return (
    <div style={{ paddingBottom: 110 }}>

      {totalUnread > 0 && (
        <div style={{
          margin: '8px 20px 0', padding: '10px 14px',
          background: TOK.primary100, border: `1.5px solid ${TOK.primary200}`,
          borderRadius: 10, display: 'flex', alignItems: 'center', gap: 10,
        }}>
          <Badge kind="primary">{totalUnread} non lu{totalUnread > 1 ? 's' : ''}</Badge>
          <span style={{ fontSize: 12, color: TOK.primary700 }}>En attente de réponse</span>
        </div>
      )}

      <div style={{ marginTop: 12 }}>
        {CONVOS.map(c => (
          <button key={c.id} onClick={() => onOpenChat(c)} style={{
            display: 'flex', alignItems: 'center', gap: 12, width: '100%',
            padding: '14px 20px',
            background: c.unread ? TOK.primary100 : TOK.surface,
            border: 0, borderBottom: `1px solid ${TOK.border}`,
            cursor: 'pointer', textAlign: 'left', fontFamily: TOK.font,
          }}>
            {/* Avatar with unread badge */}
            <div style={{ position: 'relative', flexShrink: 0 }}>
              <div style={{
                width: 48, height: 48, borderRadius: 13,
                background: TOK.primary100, color: TOK.primary400,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
              }}><Ic name={c.icon} size={24}/></div>
              {c.unread > 0 && (
                <div style={{
                  position: 'absolute', top: -4, right: -4,
                  width: 18, height: 18, borderRadius: 9,
                  background: TOK.primary, color: '#FFF',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: 10, fontWeight: 700,
                }}>{c.unread}</div>
              )}
            </div>

            {/* Text */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 14, fontWeight: c.unread ? 700 : 600, color: TOK.textDeep, marginBottom: 1 }}>
                {c.with}
              </div>
              <div style={{ fontSize: 11, color: TOK.t3, marginBottom: 2 }}>{c.name} · {c.price}</div>
              <div style={{
                fontSize: 13, color: c.unread ? TOK.text : TOK.t2,
                overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
              }}>{c.preview}</div>
            </div>

            {/* Time + chevron */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4, flexShrink: 0 }}>
              <span style={{ fontSize: 11, color: TOK.t3 }}>{c.time}</span>
              <Ic name="chevron-right" style={{ color: TOK.t3, fontSize: 14 }}/>
            </div>
          </button>
        ))}
      </div>

      <div style={{ padding: '24px', textAlign: 'center', fontSize: 12, color: TOK.t3 }}>
        — Fin des messages —
      </div>
    </div>
  );
}

Object.assign(window, { CONVOS, MessagesScreen, ChatView });
