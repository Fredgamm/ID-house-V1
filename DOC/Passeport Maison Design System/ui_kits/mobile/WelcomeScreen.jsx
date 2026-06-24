/* global React, TOK, Ic, Btn, Badge */

function WelcomeScreen({ onStart, onLogin }) {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>

      {/* HERO */}
      <div style={{
        flex: 1,
        background: 'linear-gradient(180deg, #E0DEF7 0%, #F0EFFB 60%, #FFFFFF 100%)',
        padding: '24px 24px 20px',
        display: 'flex', flexDirection: 'column',
      }}>

        {/* Logotype */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 40 }}>
          <div style={{
            width: 38, height: 38, borderRadius: 11,
            background: 'linear-gradient(135deg, #7065F0, #5245ED)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
          }}>
            <Ic name="house" style={{ color: '#FFF', fontSize: 20 }}/>
          </div>
          <span style={{
            fontSize: 17, fontWeight: 800, color: TOK.textDeep,
            letterSpacing: '-0.02em', fontFamily: TOK.display,
          }}>
            Passeport <span style={{ color: TOK.primary }}>Maison</span>
          </span>
        </div>

        {/* Main content — centered */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>

          {/* Headline */}
          <div style={{
            fontSize: 34, fontWeight: 800, color: TOK.textDeep,
            lineHeight: 1.1, letterSpacing: '-0.025em', marginBottom: 14,
          }}>
            Le carnet de santé<br/>de votre bien.
          </div>

          <div style={{ fontSize: 15, color: TOK.t2, lineHeight: 1.55, marginBottom: 24 }}>
            Cataloguez vos équipements, valorisez votre patrimoine et partagez une fiche certifiée avec votre notaire ou acheteur.
          </div>

          {/* Stat cards */}
          <div style={{ display: 'flex', gap: 10, marginBottom: 18 }}>
            {[
              { v: '428 500 €', l: 'Valeur moy. documentée' },
              { v: '2 400+',   l: 'Propriétaires actifs' },
            ].map(s => (
              <div key={s.l} style={{
                flex: 1, background: TOK.surface,
                border: `1.5px solid ${TOK.border}`,
                borderRadius: 12, padding: '12px 14px',
                boxShadow: TOK.shadowSm,
              }}>
                <div style={{ fontSize: 20, fontWeight: 800, color: TOK.textDeep, letterSpacing: '-0.02em', marginBottom: 2 }}>
                  {s.v}
                </div>
                <div style={{ fontSize: 11, color: TOK.t2 }}>{s.l}</div>
              </div>
            ))}
          </div>

          {/* Trust badges */}
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <Badge kind="primary" icon="shield-check">Hébergé en France</Badge>
            <Badge kind="pro"     icon="badge-check">Pros vérifiés</Badge>
            <Badge kind="ai"      icon="sparkles">IA intégrée</Badge>
          </div>
        </div>
      </div>

      {/* CTAs */}
      <div style={{
        padding: '16px 24px 44px',
        background: '#FFFFFF',
        display: 'flex', flexDirection: 'column', gap: 10,
      }}>
        <Btn variant="primary" size="lg" full onClick={onStart} icon="chevron-right">
          Créer mon passeport
        </Btn>
        <button onClick={onLogin} style={{
          background: 'transparent', border: 0, padding: 10,
          fontFamily: TOK.font, fontSize: 14, color: TOK.t2, cursor: 'pointer',
        }}>
          Déjà membre ?{' '}
          <span style={{ color: TOK.primary, fontWeight: 600 }}>Se connecter</span>
        </button>
      </div>

    </div>
  );
}

Object.assign(window, { WelcomeScreen });
