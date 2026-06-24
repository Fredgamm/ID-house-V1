/* global React, ReactDOM, TOK, Phone, StatusBar, Header, Ic,
   ProBottomNav, ProDashboard, ProCatalog, ProMessages, ProVitrine */
const { useState: useStatePro } = React;

function ProApp() {
  const [tab, setTab] = useStatePro('dash');
  const titles = {
    dash: { t: 'Dashboard', sub: 'Bienvenue, Maxime' },
    catalog: { t: 'Catalogue', sub: '12 services · 4 actifs' },
    messages: { t: 'Messages', sub: '3 non lus' },
    vitrine: { t: 'Vitrine publique', sub: 'Vue par 342 personnes ce mois' },
  };
  return (
    <Phone>
      <StatusBar/>
      <Header
        title={titles[tab].t}
        subtitle={titles[tab].sub}
        action={
          <button style={{
            width: 32, height: 32, borderRadius: 16, background: TOK.muted, border: 0,
            color: TOK.text, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
          }}><Ic name="settings" style={{ fontSize: 16 }}/></button>
        }
      />
      <div style={{ flex: 1, overflowY: 'auto', height: 'calc(844px - 47px - 60px)', background: TOK.bg }}>
        {tab === 'dash' && <ProDashboard/>}
        {tab === 'catalog' && <ProCatalog/>}
        {tab === 'messages' && <ProMessages/>}
        {tab === 'vitrine' && <ProVitrine/>}
      </div>
      <ProBottomNav active={tab} onChange={setTab}/>
    </Phone>
  );
}

Object.assign(window, { ProApp });
ReactDOM.createRoot(document.getElementById('root')).render(<ProApp/>);
