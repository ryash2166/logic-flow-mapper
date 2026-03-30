import { simulateTrace } from '../utils/graph';
import { IconX, IconZap } from '../icons';

const typeStyles = {
  if:   { color: '#2C2018', fontWeight: 500 },
  then: { color: '#5C7A5E', fontWeight: 600 },
  link: { color: '#C4623A', fontWeight: 500 },
  ref:  { color: '#9E9181', fontStyle: 'italic' },
  end:  { color: '#A8C4A2', fontWeight: 600 },
};

const typePrefix = {
  if:   'IF  ',
  then: '  THEN',
  link: '  ↩ ',
  ref:  '  ⟳ ',
  end:  '  ✓ ',
};

export default function SimulatePanel({ nodes, roots, onClose }) {
  const lines = simulateTrace(nodes, roots);

  return (
    <div style={{
      width: 300, flexShrink: 0,
      borderLeft: '1.5px solid #EDE8DF',
      background: '#FAFAF8',
      display: 'flex', flexDirection: 'column',
      overflow: 'hidden',
      animation: 'slideIn 0.2s ease both',
    }}>
      {/* Header */}
      <div style={{
        padding: '14px 16px',
        borderBottom: '1px solid #EDE8DF',
        display: 'flex', alignItems: 'center', gap: 8,
      }}>
        <span style={{ color: '#C4623A' }}><IconZap size={14} /></span>
        <div style={{ flex: 1 }}>
          <div style={{
            fontFamily: 'var(--font-display)',
            fontSize: 13, fontWeight: 700, color: '#2C2018',
          }}>
            Logic Trace
          </div>
          <div style={{ fontSize: 10, color: '#9E9181' }}>
            {lines.length} steps · {roots.length} root path{roots.length !== 1 ? 's' : ''}
          </div>
        </div>
        <button
          onClick={onClose}
          style={{
            background: 'none', border: 'none', cursor: 'pointer',
            color: '#9E9181', display: 'flex', alignItems: 'center',
            padding: 4, borderRadius: 6, transition: 'background 0.1s',
          }}
          onMouseEnter={e => e.currentTarget.style.background = '#EDE8DF'}
          onMouseLeave={e => e.currentTarget.style.background = 'none'}
        >
          <IconX size={13} />
        </button>
      </div>

      {/* Trace output */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '12px 16px' }}>
        {lines.length === 0 ? (
          <div style={{ fontSize: 12, color: '#C4B89E', fontStyle: 'italic' }}>
            No nodes to trace.
          </div>
        ) : (
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, lineHeight: 2.0 }}>
            {lines.map((line, i) => (
              <div
                key={i}
                style={{
                  paddingLeft: line.depth * 16,
                  display: 'flex', alignItems: 'baseline', gap: 0,
                  animation: `fadeUp 0.15s ease ${i * 0.02}s both`,
                  borderLeft: line.depth > 0 ? '1.5px solid #EDE8DF' : 'none',
                  marginLeft: line.depth > 0 ? -1 : 0,
                  paddingLeft: line.depth > 0 ? (line.depth * 16) + 8 : 0,
                }}
              >
                <span style={{
                  fontSize: 10,
                  color: typeStyles[line.type]?.color || '#9E9181',
                  letterSpacing: '0.06em',
                  marginRight: 4,
                  flexShrink: 0,
                }}>
                  {typePrefix[line.type]}
                </span>
                <span style={typeStyles[line.type]}>
                  {line.text}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Legend */}
      <div style={{
        padding: '10px 16px',
        borderTop: '1px solid #EDE8DF',
        display: 'flex', gap: 12, flexWrap: 'wrap',
      }}>
        {[
          { label: 'IF', color: '#2C2018' },
          { label: 'THEN', color: '#5C7A5E' },
          { label: 'LINK', color: '#C4623A' },
          { label: 'PASS', color: '#A8C4A2' },
        ].map(({ label, color }) => (
          <div key={label} style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <div style={{ width: 6, height: 6, borderRadius: '50%', background: color }} />
            <span style={{ fontFamily: 'var(--font-mono)', fontSize: 9, color: '#9E9181', letterSpacing: '0.06em' }}>
              {label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
