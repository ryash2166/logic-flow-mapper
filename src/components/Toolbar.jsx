import { useState } from 'react';
import { IconPlus, IconPlay, IconWarning, IconBranch, IconBrandLogo } from '../icons';

function Btn({ children, onClick, variant = 'default', disabled }) {
  const [hov, setHov] = useState(false);

  const styles = {
    primary: {
      base: { background: '#2C2018', color: '#F7F3ED', border: '1.5px solid #2C2018' },
      hov:  { background: '#3D2E22', borderColor: '#3D2E22' },
    },
    danger: {
      base: { background: '#FBF0EC', color: '#9B4828', border: '1.5px solid #E8896A' },
      hov:  { background: '#F4D5C8' },
    },
    outline: {
      base: { background: 'transparent', color: '#6B5E4E', border: '1.5px solid #C4B89E' },
      hov:  { background: '#EDE8DF' },
    },
    ghost: {
      base: { background: 'transparent', color: '#9E9181', border: '1.5px solid transparent' },
      hov:  { background: '#EDE8DF', borderColor: '#D9CEBC' },
    },
    sim: {
      base: { background: '#C4623A', color: '#FEF9F6', border: '1.5px solid #C4623A', boxShadow: '0 2px 8px rgba(196,98,58,0.25)' },
      hov:  { background: '#B05534', borderColor: '#B05534' },
    },
  };

  const v = styles[variant] || styles.default;
  const merged = { ...v.base, ...(hov && !disabled ? v.hov : {}), ...(disabled ? { opacity: 0.45, cursor: 'not-allowed' } : {}) };

  return (
    <button
      onClick={disabled ? undefined : onClick}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: 'flex', alignItems: 'center', gap: 6,
        fontFamily: 'var(--font-body)', fontSize: 13, fontWeight: 500,
        padding: '7px 14px', borderRadius: 8, cursor: disabled ? 'not-allowed' : 'pointer',
        transition: 'all 0.15s', outline: 'none',
        ...merged,
      }}
    >
      {children}
    </button>
  );
}

export default function Toolbar({
  hasCycle, nodeCount, simOpen,
  onAddRoot, onExpandAll, onCollapseAll, onSimulate,
}) {
  return (
    <header style={{
      display: 'flex', alignItems: 'center', gap: 0,
      padding: '0 24px',
      borderBottom: '1.5px solid #EDE8DF',
      background: '#F7F3ED',
      height: 60,
      flexShrink: 0,
      position: 'relative',
      zIndex: 10,
    }}>
      {/* Brand */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginRight: 28 }}>
        <div style={{
          width: 32, height: 32,
          background: '#2C2018',
          borderRadius: 8,
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          flexShrink: 0,
        }}>
          <IconBranch size={16} style={{ color: '#F7F3ED' }} />
          <IconBrandLogo />
        </div>
        <div>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 15, fontWeight: 800,
            color: '#2C2018', letterSpacing: '-0.01em',
          }}>
            Logic Flow
          </div>
          <div style={{ fontSize: 10, color: '#9E9181', letterSpacing: '0.05em', marginTop: -2 }}>
            IF-THEN MAPPER
          </div>
        </div>
      </div>

      {/* Divider */}
      <div style={{ width: 1, height: 28, background: '#EDE8DF', marginRight: 20 }} />

      {/* Actions */}
      <div style={{ display: 'flex', gap: 6 }}>
        <Btn variant="primary" onClick={onAddRoot}>
          <IconPlus size={13} /> Add Root Node
        </Btn>
        <Btn variant="ghost" onClick={onExpandAll}>Expand All</Btn>
        <Btn variant="ghost" onClick={onCollapseAll}>Collapse All</Btn>
      </div>

      <div style={{ flex: 1 }} />

      {/* Status badge */}
      {nodeCount > 0 && (
        <div style={{
          display: 'flex', alignItems: 'center', gap: 6,
          padding: '5px 12px', borderRadius: 20,
          background: hasCycle ? '#FBF0EC' : '#EEF4EE',
          border: `1px solid ${hasCycle ? '#E8896A' : '#A8C4A2'}`,
          color: hasCycle ? '#9B4828' : '#3A5E3C',
          fontSize: 12, fontWeight: 500,
          marginRight: 12,
          animation: hasCycle ? 'shake 0.4s ease' : 'none',
        }}>
          {hasCycle ? (
            <><IconWarning size={12} /> Cycle Detected</>
          ) : (
            <>
              <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#5C7A5E' }} />
              Logic Valid
            </>
          )}
        </div>
      )}

      {/* Simulate */}
      <Btn
        variant="sim"
        disabled={hasCycle || nodeCount === 0}
        onClick={onSimulate}
      >
        <IconPlay size={12} />
        {simOpen ? 'Close Trace' : 'Simulate'}
      </Btn>
    </header>
  );
}
