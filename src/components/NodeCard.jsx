import { useState, useRef, useEffect } from 'react';
import { IconPlus, IconLink, IconTrash, IconChevron, IconX, IconWarning } from '../icons';

const s = {
  wrap: { position: 'relative', marginBottom: 8 },

  card: (isCycle, depth) => ({
    background: isCycle ? '#FDF0EE' : '#FFFFFF',
    border: `1.5px solid ${isCycle ? '#E8896A' : depth === 0 ? '#C4B89E' : '#D9CEBC'}`,
    borderRadius: 12,
    boxShadow: isCycle
      ? '0 2px 12px rgba(196,98,58,0.15), 0 0 0 3px rgba(196,98,58,0.08)'
      : '0 2px 8px rgba(44,32,24,0.06)',
    overflow: 'hidden',
    transition: 'border-color 0.2s, box-shadow 0.2s',
  }),

  header: {
    display: 'flex', alignItems: 'center', gap: 10,
    padding: '12px 14px', cursor: 'pointer', userSelect: 'none',
  },

  chevronWrap: (isCycle) => ({
    color: isCycle ? '#C4623A' : '#9E9181',
    flexShrink: 0, display: 'flex', alignItems: 'center',
    transition: 'color 0.15s',
  }),

  badge: (isCycle) => ({
    fontFamily: 'var(--font-mono)',
    fontSize: 10, fontWeight: 500,
    padding: '2px 7px', borderRadius: 6,
    background: isCycle ? '#C4623A' : '#2C2018',
    color: '#F7F3ED',
    flexShrink: 0,
    letterSpacing: '0.04em',
  }),

  ifLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10, color: '#9E9181',
    flexShrink: 0, letterSpacing: '0.05em',
  },

  condPreview: (hasVal, isCycle) => ({
    flex: 1, fontSize: 13, fontWeight: hasVal ? 500 : 400,
    color: isCycle ? '#9B4828' : hasVal ? '#2C2018' : '#C4B89E',
    fontStyle: hasVal ? 'normal' : 'italic',
    overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
  }),

  cycleTag: {
    display: 'flex', alignItems: 'center', gap: 4,
    fontSize: 10, fontWeight: 600,
    color: '#9B4828', background: '#F4C5B4',
    border: '1px solid #E8896A',
    padding: '2px 8px', borderRadius: 20, flexShrink: 0,
    animation: 'pulse 1.8s ease-in-out infinite',
  },

  body: (isCycle) => ({
    borderTop: `1px solid ${isCycle ? '#F0C4B8' : '#EDE8DF'}`,
    padding: '14px',
  }),

  fieldLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 10, fontWeight: 500,
    color: '#9E9181', letterSpacing: '0.08em',
    textTransform: 'uppercase', marginBottom: 6,
  },

  inputWrap: { position: 'relative', marginBottom: 12 },

  input: (isCycle) => ({
    width: '100%',
    fontFamily: 'var(--font-mono)',
    fontSize: 12,
    padding: '9px 12px',
    background: isCycle ? '#FEF7F5' : '#F7F3ED',
    border: `1.5px solid ${isCycle ? '#E8896A' : '#D9CEBC'}`,
    borderRadius: 8, color: '#2C2018',
    outline: 'none', transition: 'border-color 0.15s, box-shadow 0.15s',
    caretColor: '#C4623A',
  }),

  actions: { display: 'flex', gap: 6, flexWrap: 'wrap', marginTop: 2 },

  btn: (variant) => {
    const map = {
      add:    { color: '#5C7A5E', bg: '#EEF4EE', border: '#A8C4A2', hbg: '#DCE9DC' },
      link:   { color: '#6B5E4E', bg: '#F0EBE3', border: '#C4B89E', hbg: '#E3DBD0' },
      del:    { color: '#9B4828', bg: '#FBF0EC', border: '#E8896A', hbg: '#F4D5C8' },
    };
    const v = map[variant];
    return {
      display: 'flex', alignItems: 'center', gap: 5,
      fontSize: 12, fontWeight: 500,
      color: v.color, background: v.bg,
      border: `1px solid ${v.border}`,
      borderRadius: 8, padding: '6px 12px', cursor: 'pointer',
      transition: 'all 0.15s',
      fontFamily: 'var(--font-body)',
    };
  },

  linkSection: { marginTop: 10 },

  linkBadge: (isCycleLink) => ({
    display: 'inline-flex', alignItems: 'center', gap: 6,
    fontFamily: 'var(--font-mono)', fontSize: 11,
    padding: '4px 10px', borderRadius: 20,
    background: isCycleLink ? '#F4C5B4' : '#E8F0E8',
    border: `1px solid ${isCycleLink ? '#E8896A' : '#A8C4A2'}`,
    color: isCycleLink ? '#9B4828' : '#3A5E3C',
    marginTop: 4,
  }),

  linkRm: {
    cursor: 'pointer', display: 'flex', alignItems: 'center',
    color: 'inherit', opacity: 0.6, padding: '0 2px',
    background: 'none', border: 'none',
  },

  linkMsg: {
    display: 'flex', alignItems: 'center', gap: 5,
    fontSize: 11, color: '#9B4828', marginTop: 5,
  },

  selectWrap: { position: 'relative', marginTop: 6 },

  children: { paddingLeft: 24, borderLeft: '2px solid #EDE8DF', marginLeft: 18, marginTop: 8 },
  childrenCycle: { paddingLeft: 24, borderLeft: '2px solid #F0C4B8', marginLeft: 18, marginTop: 8 },

  thenLabel: {
    fontFamily: 'var(--font-mono)',
    fontSize: 9, color: '#9E9181', letterSpacing: '0.12em',
    textTransform: 'uppercase', marginBottom: 8, paddingTop: 4,
  },
};

export default function NodeCard({
  id, nodes, cycleNodes, cycleEdges,
  onUpdate, onAddChild, onDelete, onLink, onRemoveLink, onToggleCollapse,
  depth = 0,
}) {
  const node = nodes[id];
  const [showLink, setShowLink] = useState(false);
  const [hovBtn, setHovBtn] = useState(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current && node?.condition === '' && depth > 0) {
      setTimeout(() => inputRef.current?.focus(), 80);
    }
  }, []);

  if (!node) return null;

  const isCycle = cycleNodes.has(id);
  const isLinkCycle = node.linkedTo && cycleEdges.has(`${id}→${node.linkedTo}`);
  const otherNodes = Object.keys(nodes).filter(nid => nid !== id);

  function btnStyle(variant) {
    const base = s.btn(variant);
    const hovered = hovBtn === variant;
    const map = { add: '#DCE9DC', link: '#E3DBD0', del: '#F4D5C8' };
    return { ...base, background: hovered ? map[variant] : base.background };
  }

  return (
    <div style={{ ...s.wrap, animation: 'fadeUp 0.25s ease both' }}>
      <div style={s.card(isCycle, depth)} id={`node-${id}`}>
        {/* Accent top strip */}
        <div style={{
          height: 3,
          background: isCycle
            ? 'linear-gradient(90deg, #C4623A, #E8896A, #C4623A)'
            : depth === 0
              ? 'linear-gradient(90deg, #2C2018, #6B5E4E)'
              : 'linear-gradient(90deg, #D9CEBC, #C4B89E)',
        }} />

        {/* Header row */}
        <div style={s.header} onClick={() => onToggleCollapse(id)}>
          <span style={s.chevronWrap(isCycle)}>
            <IconChevron open={!node.collapsed} />
          </span>
          <span style={s.badge(isCycle)}>{id}</span>
          <span style={s.ifLabel}>IF</span>
          <span style={s.condPreview(!!node.condition, isCycle)}>
            {node.condition || 'enter a condition…'}
          </span>
          {isCycle && (
            <span style={s.cycleTag}>
              <IconWarning size={10} /> LOOP
            </span>
          )}
        </div>

        {/* Expanded body */}
        {!node.collapsed && (
          <div style={s.body(isCycle)}>
            {/* Condition input */}
            <div style={s.fieldLabel}>Condition</div>
            <div style={s.inputWrap}>
              <input
                ref={inputRef}
                value={node.condition}
                onChange={e => onUpdate(id, e.target.value)}
                placeholder="e.g. user.age >= 18 && user.isVerified"
                style={s.input(isCycle)}
                onFocus={e => {
                  e.target.style.borderColor = isCycle ? '#C4623A' : '#C4623A';
                  e.target.style.boxShadow = '0 0 0 3px rgba(196,98,58,0.12)';
                }}
                onBlur={e => {
                  e.target.style.borderColor = isCycle ? '#E8896A' : '#D9CEBC';
                  e.target.style.boxShadow = 'none';
                }}
              />
            </div>

            {/* Link badge */}
            {node.linkedTo && nodes[node.linkedTo] && (
              <div style={s.linkSection}>
                <div style={s.fieldLabel}>Linked to</div>
                <div>
                  <span style={s.linkBadge(isLinkCycle)}>
                    {isLinkCycle ? '⚠ ' : '→ '}{node.linkedTo}
                    <span style={{ fontSize: 10, color: '#9E9181', fontStyle: 'italic' }}>
                      ({nodes[node.linkedTo].condition || 'untitled'})
                    </span>
                    <button style={s.linkRm} onClick={() => onRemoveLink(id)}>
                      <IconX size={10} />
                    </button>
                  </span>
                  {isLinkCycle && (
                    <div style={s.linkMsg}>
                      <IconWarning size={11} />
                      This link creates a logic loop
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Link select panel */}
            {showLink && otherNodes.length > 0 && (
              <div style={{ ...s.linkSection, animation: 'fadeUp 0.15s ease both' }}>
                <div style={s.fieldLabel}>Link to node</div>
                <div style={s.selectWrap}>
                  <select
                    defaultValue=""
                    onChange={e => {
                      if (e.target.value) { onLink(id, e.target.value); setShowLink(false); }
                    }}
                    style={{ background: '#F7F3ED', border: '1.5px solid #C4B89E', borderRadius: 8, padding: '8px 32px 8px 12px' }}
                  >
                    <option value="">— select a node to link —</option>
                    {otherNodes.map(nid => {
                      const wouldCycle = cycleEdges.has(`${id}→${nid}`);
                      return (
                        <option key={nid} value={nid}>
                          {wouldCycle ? '⚠ LOOP — ' : ''}{nid}: {nodes[nid]?.condition || 'untitled'}
                        </option>
                      );
                    })}
                  </select>
                </div>
              </div>
            )}

            {/* Action buttons */}
            <div style={s.actions}>
              <button
                style={btnStyle('add')}
                onMouseEnter={() => setHovBtn('add')}
                onMouseLeave={() => setHovBtn(null)}
                onClick={() => onAddChild(id)}
              >
                <IconPlus size={12} /> Then
              </button>

              {otherNodes.length > 0 && (
                <button
                  style={{ ...btnStyle('link'), background: showLink ? '#E3DBD0' : btnStyle('link').background }}
                  onMouseEnter={() => setHovBtn('link')}
                  onMouseLeave={() => setHovBtn(null)}
                  onClick={() => setShowLink(v => !v)}
                >
                  <IconLink size={12} /> Link to
                </button>
              )}

              <button
                style={btnStyle('del')}
                onMouseEnter={() => setHovBtn('del')}
                onMouseLeave={() => setHovBtn(null)}
                onClick={() => onDelete(id)}
              >
                <IconTrash size={12} /> Delete
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Children */}
      {!node.collapsed && node.children.length > 0 && (
        <div style={isCycle ? s.childrenCycle : s.children}>
          <div style={s.thenLabel}>→ then</div>
          {node.children.map(cid => (
            <NodeCard
              key={cid}
              id={cid}
              nodes={nodes}
              cycleNodes={cycleNodes}
              cycleEdges={cycleEdges}
              onUpdate={onUpdate}
              onAddChild={onAddChild}
              onDelete={onDelete}
              onLink={onLink}
              onRemoveLink={onRemoveLink}
              onToggleCollapse={onToggleCollapse}
              depth={depth + 1}
            />
          ))}
        </div>
      )}
    </div>
  );
}
