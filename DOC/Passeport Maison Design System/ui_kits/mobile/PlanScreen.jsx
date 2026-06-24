/* global React, TOK, SectionTitle, Badge */

function FloorPlan() {
  // Schematic 2D plan, not a real renderer — placeholder per design system rules.
  return (
    <div style={{
      margin: '0 20px', height: 320,
      background: 'linear-gradient(180deg, #F7F7FD 0%, #F7F7FD 100%)',
      borderRadius: 16, border: `1px solid ${TOK.border}`,
      position: 'relative', overflow: 'hidden',
    }}>
      <svg viewBox="0 0 350 320" width="100%" height="100%" preserveAspectRatio="xMidYMid meet">
        {/* outer walls */}
        <rect x="20" y="20" width="310" height="280" fill="#FFFFFF" stroke="#374151" strokeWidth="3" rx="4"/>
        {/* internal walls */}
        <line x1="180" y1="20" x2="180" y2="170" stroke="#374151" strokeWidth="2"/>
        <line x1="20" y1="170" x2="330" y2="170" stroke="#374151" strokeWidth="2"/>
        <line x1="220" y1="170" x2="220" y2="300" stroke="#374151" strokeWidth="2"/>

        {/* room labels with dots */}
        <g>
          <circle cx="95" cy="80" r="14" fill="#7065F0"/>
          <text x="95" y="85" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="700">1</text>
          <text x="95" y="115" fontSize="11" fill="#000929" textAnchor="middle" fontWeight="600">Salon</text>
          <text x="95" y="129" fontSize="9" fill="#6B7280" textAnchor="middle">24 m² · 6 équip.</text>
        </g>
        <g>
          <circle cx="255" cy="80" r="14" fill="#DC2626"/>
          <text x="255" y="85" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="700">2</text>
          <text x="255" y="115" fontSize="11" fill="#000929" textAnchor="middle" fontWeight="600">Cuisine</text>
          <text x="255" y="129" fontSize="9" fill="#6B7280" textAnchor="middle">12 m² · 4 équip.</text>
        </g>
        <g>
          <circle cx="120" cy="230" r="14" fill="#6D28D9"/>
          <text x="120" y="235" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="700">3</text>
          <text x="120" y="265" fontSize="11" fill="#000929" textAnchor="middle" fontWeight="600">Chambre</text>
          <text x="120" y="279" fontSize="9" fill="#6B7280" textAnchor="middle">18 m² · 2 équip.</text>
        </g>
        <g>
          <circle cx="275" cy="230" r="14" fill="#0369A1"/>
          <text x="275" y="235" fontSize="14" fill="#FFFFFF" textAnchor="middle" fontWeight="700">4</text>
          <text x="275" y="265" fontSize="11" fill="#000929" textAnchor="middle" fontWeight="600">SDB</text>
          <text x="275" y="279" fontSize="9" fill="#6B7280" textAnchor="middle">6 m² · 2 équip.</text>
        </g>
      </svg>
      {/* view toggle */}
      <div style={{
        position: 'absolute', top: 10, right: 10,
        background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 8,
        display: 'flex', padding: 2, fontSize: 11, fontWeight: 600,
      }}>
        <span style={{ padding: '5px 10px', background: TOK.primary, color: '#FFF', borderRadius: 6 }}>2D</span>
        <span style={{ padding: '5px 10px', color: TOK.t2 }}>3D</span>
      </div>
    </div>
  );
}

function RoomList({ onRoom }) {
  const rooms = [
    { id: 1, name: 'Salon', icon: 'armchair', area: '24 m²', count: 6, c: '#FEE2E2', cc: '#B91C1C' },
    { id: 2, name: 'Cuisine', icon: 'cooking-pot', area: '12 m²', count: 4, c: '#FEF3C7', cc: '#B45309' },
    { id: 3, name: 'Chambre', icon: 'bed', area: '18 m²', count: 2, c: '#EDE9FE', cc: '#6D28D9' },
    { id: 4, name: 'Salle de bain', icon: 'bathtub', area: '6 m²', count: 2, c: '#E0F2FE', cc: '#075985' },
    { id: 5, name: 'Bureau', icon: 'desk', area: '8 m²', count: 3, c: '#DCFCE7', cc: '#15803D' },
  ];
  return (
    <div style={{ padding: '0 20px', display: 'flex', flexDirection: 'column', gap: 8 }}>
      {rooms.map(r => (
        <button key={r.id} onClick={() => onRoom && onRoom(r)} style={{
          background: TOK.surface, border: `1px solid ${TOK.border}`, borderRadius: 12,
          padding: 12, display: 'flex', alignItems: 'center', gap: 12, boxShadow: TOK.shadowSm,
          cursor: 'pointer', textAlign: 'left', fontFamily: TOK.font,
        }}>
          <div style={{
            width: 40, height: 40, borderRadius: 10, background: r.c, color: r.cc,
            display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 20,
          }}><Ic name={r.icon}/></div>
          <div style={{ flex: 1 }}>
            <div style={{ fontSize: 14, fontWeight: 600 }}>{r.name}</div>
            <div style={{ fontSize: 11, color: TOK.t3 }}>{r.area} · {r.count} équipements</div>
          </div>
          <Ic name="chevron-right" style={{ color: TOK.t3, fontSize: 18 }}/>
        </button>
      ))}
    </div>
  );
}

function PlanScreen() {
  return (
    <div style={{ paddingBottom: 110 }}>
      <FloorPlan/>
      <SectionTitle action="Ajouter">Pièces</SectionTitle>
      <RoomList/>
    </div>
  );
}

Object.assign(window, { PlanScreen, FloorPlan, RoomList });
