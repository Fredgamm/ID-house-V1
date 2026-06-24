/* global React, TOK, EquipmentItem, FilterChips, SectionTitle */
const { useState: useStateE } = React;

function EquipmentScreen({ onOpen }) {
  const [filter, setFilter] = useStateE('all');
  const ALL = [
    { id: 1, icon: 'snowflake', name: 'Climatisation Daikin', meta: 'Salon · 2022', price: '1 850 €', kind: 'fixed' },
    { id: 2, icon: 'couch', name: 'Canapé Roche Bobois', meta: 'Salon · 2021', price: '3 200 €', kind: 'movable' },
    { id: 3, icon: 'cooking-pot', name: 'Plaque induction Siemens', meta: 'Cuisine · 2023', price: '980 €', kind: 'fixed' },
    { id: 4, icon: 'fan', name: 'Hotte aspirante Falmec', meta: 'Cuisine · 2023', price: '650 €', kind: 'fixed' },
    { id: 5, icon: 'bed', name: 'Lit Treca queen', meta: 'Chambre principale · 2022', price: '2 400 €', kind: 'movable' },
    { id: 6, icon: 'television-simple', name: 'TV LG OLED 55"', meta: 'Salon · 2024', price: '1 290 €', kind: 'movable' },
    { id: 7, icon: 'bathtub', name: 'Baignoire Jacob Delafon', meta: 'Salle de bain · 2020', price: '1 100 €', kind: 'fixed' },
    { id: 8, icon: 'desk', name: 'Bureau Hartô', meta: 'Bureau · 2023', price: '680 €', kind: 'movable' },
  ];
  const items = filter === 'all' ? ALL : ALL.filter(i => i.kind === filter);
  return (
    <div style={{ paddingBottom: 110 }}>
      <FilterChips
        active={filter}
        onChange={setFilter}
        items={[
          { id: 'all', label: 'Tout' },
          { id: 'fixed', label: 'Fixe' },
          { id: 'movable', label: 'Mobilier' },
          { id: 'kitchen', label: 'Cuisine' },
          { id: 'living', label: 'Salon' },
        ]}
      />
      <SectionTitle>{items.length} équipement{items.length>1?'s':''}</SectionTitle>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8, padding: '0 20px' }}>
        {items.map(i => (
          <EquipmentItem key={i.id}
            icon={i.icon} name={i.name} meta={i.meta} price={i.price} badge={i.kind}
            onClick={() => onOpen(i)}/>
        ))}
      </div>
    </div>
  );
}

Object.assign(window, { EquipmentScreen });
