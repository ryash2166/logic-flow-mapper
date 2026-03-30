import {
  Plus,
  Link,
  Trash2,
  ChevronRight,
  Play,
  AlertTriangle,
  X,
  CircleDot,
  GitBranch,
  Zap
} from 'lucide-react';

export const IconPlus = ({ size = 14, ...props }) => <Plus size={size} {...props} />;
export const IconLink = ({ size = 14, ...props }) => <Link size={size} {...props} />;
export const IconTrash = ({ size = 14, ...props }) => <Trash2 size={size} {...props} />;
export const IconChevron = ({ size = 12, open, ...props }) => (
  <ChevronRight
    size={size}
    style={{ transform: open ? 'rotate(90deg)' : 'rotate(0)', transition: 'transform 0.2s ease', ...props.style }}
    {...props}
  />
);
export const IconPlay = ({ size = 14, ...props }) => <Play size={size} {...props} fill="currentColor" />;
export const IconWarning = ({ size = 14, ...props }) => <AlertTriangle size={size} {...props} />;
export const IconX = ({ size = 12, ...props }) => <X size={size} {...props} />;
export const IconNode = ({ size = 14, ...props }) => <CircleDot size={size} {...props} />;
export const IconBranch = ({ size = 14, ...props }) => <GitBranch size={size} {...props} />;
export const IconZap = ({ size = 14, ...props }) => <Zap size={size} {...props} fill="currentColor" fillOpacity="0.15" />;

export const IconLoopAlert = ({ ...props }) => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" {...props}>
    <path d="M7 1L13 12H1L7 1z" stroke="#C4623A" strokeWidth="1.4" strokeLinejoin="round" />
    <path d="M7 5.5v3M7 10v.5" stroke="#C4623A" strokeWidth="1.4" strokeLinecap="round" />
  </svg>
);

export const IconAddRoot = ({ ...props }) => (
  <svg width="13" height="13" viewBox="0 0 13 13" fill="none" {...props}>
    <path d="M6.5 1.5v10M1.5 6.5h10" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
  </svg>
);

export const IllustrationTree = ({ opacity = 0.7, ...props }) => (
  <svg width="120" height="100" viewBox="0 0 120 100" fill="none" style={{ opacity, ...props.style }} {...props}>
    <rect x="40" y="8" width="40" height="22" rx="6" fill="#EDE8DF" stroke="#C4B89E" strokeWidth="1.5" />
    <text x="60" y="23" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#9E9181">N01</text>
    <line x1="60" y1="30" x2="35" y2="52" stroke="#D9CEBC" strokeWidth="1.5" strokeDasharray="3 2" />
    <line x1="60" y1="30" x2="85" y2="52" stroke="#D9CEBC" strokeWidth="1.5" strokeDasharray="3 2" />
    <rect x="10" y="52" width="50" height="22" rx="6" fill="#F7F3ED" stroke="#D9CEBC" strokeWidth="1.5" />
    <text x="35" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#C4B89E">N02</text>
    <rect x="68" y="52" width="50" height="22" rx="6" fill="#F7F3ED" stroke="#D9CEBC" strokeWidth="1.5" />
    <text x="93" y="67" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="8" fill="#C4B89E">N03</text>
    <line x1="35" y1="74" x2="35" y2="86" stroke="#EDE8DF" strokeWidth="1.5" />
    <rect x="15" y="86" width="40" height="12" rx="4" fill="#EDE8DF" stroke="#D9CEBC" strokeWidth="1" />
    <text x="35" y="95" textAnchor="middle" fontFamily="var(--font-mono)" fontSize="7" fill="#C4B89E">N04</text>
  </svg>
);

export const IconBrandLogo = ({ ...props }) => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" {...props}>
    <circle cx="4" cy="4" r="2" fill="#EDE8DF" />
    <circle cx="12" cy="8" r="2" fill="#C4B89E" />
    <circle cx="4" cy="12" r="2" fill="#EDE8DF" />
    <path d="M6 4h2a2 2 0 012 2v4a2 2 0 01-2 2H6" stroke="#9E9181" strokeWidth="1.2" />
  </svg>
);
