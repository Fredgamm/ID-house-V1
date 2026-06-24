/* global React, TOK, Ic, Btn */

function AuthScreen({ onBack, onSuccess }) {
  const [email, setEmail] = React.useState('');
  const [sent,  setSent]  = React.useState(false);

  if (sent) {
    return (
      <div style={{
        height: '100%', display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        padding: '0 24px 44px', textAlign: 'center',
        animation: 'fadeInUp 300ms ease',
      }}>
        <div style={{
          width: 72, height: 72, borderRadius: 20,
          background: TOK.proBg, color: TOK.success,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontSize: 34, marginBottom: 20,
        }}>
          <Ic name="circle-check-big"/>
        </div>

        <div style={{ fontSize: 26, fontWeight: 800, color: TOK.textDeep, letterSpacing: '-0.02em', lineHeight: 1.2, marginBottom: 12 }}>
          Lien envoyé !
        </div>
        <div style={{ fontSize: 14, color: TOK.t2, lineHeight: 1.55, marginBottom: 8 }}>
          Consultez votre boîte mail à
        </div>
        <div style={{
          padding: '8px 18px', background: TOK.muted, borderRadius: 8,
          fontSize: 14, fontWeight: 600, color: TOK.primary, marginBottom: 28,
        }}>
          {email || 'vous@exemple.fr'}
        </div>
        <div style={{ fontSize: 12, color: TOK.t3, lineHeight: 1.6, marginBottom: 32 }}>
          Le lien est valable 15 minutes.<br/>Vérifiez vos spams si nécessaire.
        </div>

        {/* Prototype: simulate clicking the magic link */}
        <Btn variant="primary" full onClick={() => onSuccess({ email })} icon="chevron-right">
          Simuler le clic sur le lien
        </Btn>
        <button onClick={() => setSent(false)} style={{
          marginTop: 10, background: 'transparent', border: 0,
          color: TOK.t2, fontSize: 13, cursor: 'pointer',
          fontFamily: TOK.font, padding: 8,
        }}>
          Changer d'adresse
        </button>

        <style>{`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(16px); }
            to   { opacity: 1; transform: translateY(0);    }
          }
        `}</style>
      </div>
    );
  }

  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', padding: '0 24px' }}>

      {/* Back */}
      <button onClick={onBack} style={{
        marginTop: 8, marginBottom: 28, background: 'transparent', border: 0, padding: 0,
        display: 'inline-flex', alignItems: 'center', gap: 6,
        color: TOK.t2, fontSize: 14, cursor: 'pointer', fontFamily: TOK.font,
      }}>
        <Ic name="chevron-left" style={{ fontSize: 18 }}/> Retour
      </button>

      {/* Icon */}
      <div style={{
        width: 52, height: 52, borderRadius: 14,
        background: TOK.primary100, color: TOK.primary,
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontSize: 26, marginBottom: 16,
      }}>
        <Ic name="mail"/>
      </div>

      {/* Headline */}
      <div style={{ fontSize: 28, fontWeight: 800, color: TOK.textDeep, letterSpacing: '-0.02em', lineHeight: 1.15, marginBottom: 10 }}>
        Connexion<br/>sans mot de passe
      </div>
      <div style={{ fontSize: 14, color: TOK.t2, lineHeight: 1.55, marginBottom: 28 }}>
        Saisissez votre adresse e-mail — nous vous envoyons un lien de connexion sécurisé, valable 15 minutes.
      </div>

      {/* Email input */}
      <div style={{ marginBottom: 16 }}>
        <label style={{ fontSize: 12, fontWeight: 600, color: TOK.t2, display: 'block', marginBottom: 6 }}>
          Adresse e-mail
        </label>
        <input
          type="email"
          placeholder="vous@exemple.fr"
          value={email}
          onChange={e => setEmail(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && setSent(true)}
          style={{
            width: '100%', padding: '13px 16px',
            border: `1.5px solid ${TOK.border}`, borderRadius: 10,
            fontSize: 15, fontFamily: TOK.font, color: TOK.text,
            background: TOK.input, outline: 'none', boxSizing: 'border-box',
          }}
        />
      </div>

      <Btn variant="primary" size="lg" full onClick={() => setSent(true)} icon="send">
        Recevoir mon lien
      </Btn>

      {/* Footer trust */}
      <div style={{ marginTop: 'auto', paddingBottom: 40, paddingTop: 24, textAlign: 'center' }}>
        <div style={{
          display: 'inline-flex', alignItems: 'center', gap: 6,
          fontSize: 11, color: TOK.t3,
        }}>
          <Ic name="lock" style={{ fontSize: 13 }}/>
          Données chiffrées · OVH France · Conforme RGPD
        </div>
      </div>

    </div>
  );
}

Object.assign(window, { AuthScreen });
