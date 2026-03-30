import { IconPlus, IllustrationTree } from '../icons';
import { useState } from 'react';

export default function EmptyState({ onAddRoot }) {
  const [hov, setHov] = useState(false);

  return (
    <div style={{
      display: 'flex', flexDirection: 'column',
      alignItems: 'center', justifyContent: 'center',
      height: '100%', gap: 24,
      animation: 'fadeIn 0.4s ease',
    }}>

      <div style={{ textAlign: 'center' }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 22, fontWeight: 800,
          color: '#2C2018', marginBottom: 6,
          letterSpacing: '-0.02em',
        }}>
          No logic yet
        </div>
        <div style={{ fontSize: 13, color: '#9E9181', maxWidth: 280, lineHeight: 1.6 }}>
          Start building your IF-THEN condition tree.
          Add a root node and nest conditions infinitely deep.
        </div>
      </div>

      <button
        onClick={onAddRoot}
        onMouseEnter={() => setHov(true)}
        onMouseLeave={() => setHov(false)}
        style={{
          display: 'flex', alignItems: 'center', gap: 8,
          fontFamily: 'var(--font-body)', fontSize: 14, fontWeight: 600,
          color: hov ? '#FEF9F6' : '#FEF9F6',
          background: hov ? '#3D2E22' : '#2C2018',
          border: 'none', borderRadius: 10,
          padding: '11px 22px', cursor: 'pointer',
          boxShadow: hov ? '0 4px 16px rgba(44,32,24,0.25)' : '0 2px 8px rgba(44,32,24,0.15)',
          transition: 'all 0.18s',
          transform: hov ? 'translateY(-1px)' : 'none',
        }}
      >
        <IconPlus size={14} /> Add Root Node
      </button>

      {/* Tips */}
      <div style={{
        display: 'flex', gap: 10, flexWrap: 'wrap',
        justifyContent: 'center', maxWidth: 380,
      }}>
        {[
          { icon: '🌿', text: 'Nest conditions infinitely' },
          { icon: '🔗', text: 'Link nodes across branches' },
          { icon: '⚡', text: 'Real-time cycle detection' },
        ].map(({ icon, text }) => (
          <div key={text} style={{
            display: 'flex', alignItems: 'center', gap: 5,
            fontSize: 11, color: '#9E9181',
            background: '#EDE8DF', borderRadius: 20,
            padding: '4px 10px',
          }}>
            <span>{icon}</span> {text}
          </div>
        ))}
      </div>
    </div>
  );
}
