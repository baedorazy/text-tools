import { useState } from 'react';
import { TOOLS } from '../constants/tools';

// ─── Tiny SVG Icon ────────────────────────────────────────────────────────────
interface IconProps { d: string; size?: number; stroke?: string; }
export function Icon({ d, size = 16, stroke = 'currentColor' }: IconProps) {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none"
      stroke={stroke} strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round"
      style={{ flexShrink: 0 }}>
      {d.split('M').filter(Boolean).map((seg, i) => (
        <path key={i} d={'M' + seg} />
      ))}
    </svg>
  );
}

// ─── Stats Bar ────────────────────────────────────────────────────────────────
export function StatsBar({ text }: { text: string }) {
  const chars = text.length;
  const words = text.trim() ? text.trim().split(/\s+/).length : 0;
  const lines = text ? text.split('\n').length : 0;
  const bytes = new TextEncoder().encode(text).length;
  return (
    <div className="stats-bar">
      {([['글자', chars], ['단어', words], ['줄', lines], ['바이트', bytes]] as const).map(([k, v]) => (
        <span key={k} className="stat-item">
          {k} <strong>{v.toLocaleString()}</strong>
        </span>
      ))}
    </div>
  );
}

// ─── Copy Button ─────────────────────────────────────────────────────────────
interface CopyButtonProps { text: string; }
export function CopyButton({ text }: CopyButtonProps) {
  const [copied, setCopied] = useState(false);
  const handleCopy = () => {
    navigator.clipboard.writeText(text).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return (
    <button onClick={handleCopy} className={`copy-btn ${copied ? 'ok' : ''}`}>
      {copied ? (
        <><Icon d="M20 6L9 17l-5-5" size={13} stroke="#fff" /> 복사됨!</>
      ) : (
        <><Icon d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" size={13} stroke="#fff" /> 복사</>
      )}
    </button>
  );
}

// ─── Option Chip (라디오형) ───────────────────────────────────────────────────
interface ChipProps {
  label: string;
  active: boolean;
  color: string;
  bg: string;
  onClick: () => void;
}
export function Chip({ label, active, color, bg, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className="opt-chip"
      style={active
        ? { borderColor: color, background: bg, color, fontWeight: 700 }
        : undefined
      }
    >
      {label}
    </button>
  );
}

// ─── Toggle Checkbox ─────────────────────────────────────────────────────────
interface ToggleProps {
  label: string;
  checked: boolean;
  color: string;
  bg: string;
  onChange: () => void;
}
export function Toggle({ label, checked, color, bg, onChange }: ToggleProps) {
  return (
    <button
      onClick={onChange}
      className="opt-toggle"
      style={checked
        ? { borderColor: color, background: bg, color, fontWeight: 700 }
        : undefined
      }
    >
      <span className="toggle-box" style={checked ? { borderColor: color, background: color } : undefined} />
      {label}
    </button>
  );
}

// ─── Tool Layout (공통 2-col 에디터 래퍼) ────────────────────────────────────
interface ToolLayoutProps {
  toolId: string;
  options: React.ReactNode;
  input: string;
  output: string;
  onInputChange: (val: string) => void;
  onClear: () => void;
  onDownload: () => void;
  /** 글자 수 세기처럼 output 영역 없이 stats만 쓸 때 */
  singlePane?: boolean;
  children?: React.ReactNode; // singlePane=true일 때 오른쪽 대신 렌더
}

export function ToolLayout({
  toolId, options, input, output,
  onInputChange, onClear, onDownload,
  singlePane = false, children,
}: ToolLayoutProps) {
  const tool = TOOLS.find(t => t.id === toolId)!;

  return (
    <div className="tool-layout">
      {/* Options */}
      <div className="tool-options-box">
        <p className="box-label">옵션</p>
        {options}
      </div>

      {/* Editor */}
      <div className={`editor-grid ${singlePane ? 'single' : ''}`}>
        {/* Input pane */}
        <div className="editor-pane">
          <div className="pane-header">
            <span className="box-label" style={{ marginBottom: 0 }}>입력</span>
            {input && (
              <button className="clear-btn" onClick={onClear}>
                <Icon d="M18 6L6 18M6 6l12 12" size={12} /> 지우기
              </button>
            )}
          </div>
          <textarea
            className="editor-ta"
            value={input}
            onChange={e => onInputChange(e.target.value)}
            placeholder="여기에 텍스트를 붙여넣으세요..."
            style={{ '--focus-color': tool.color } as React.CSSProperties}
          />
          <StatsBar text={input} />
        </div>

        {/* Output pane or custom children */}
        {singlePane ? (
          <div className="editor-pane">{children}</div>
        ) : (
          <div className="editor-pane">
            <div className="pane-header">
              <span className="box-label" style={{ marginBottom: 0 }}>결과</span>
              <div style={{ display: 'flex', gap: 8 }}>
                {output && (
                  <button className="download-btn" onClick={onDownload}>
                    <Icon d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" size={13} />
                  </button>
                )}
                <CopyButton text={output} />
              </div>
            </div>
            <textarea
              className="editor-ta output"
              value={output}
              readOnly
              placeholder="변환된 결과가 여기에 표시됩니다..."
            />
            <StatsBar text={output} />
          </div>
        )}
      </div>

      {/* SEO description */}
      <div className="tool-seo-box">
        <h2>{tool.name}란?</h2>
        <p>{tool.name} 도구는 {tool.desc}를 도와줍니다. PDF, 이메일, 웹페이지에서 복사한 텍스트를 붙여넣기만 하면 즉시 변환됩니다. 모든 처리는 브라우저에서 직접 이루어져 텍스트가 서버로 전송되지 않습니다.</p>
        <p className="keywords">관련 검색어: {tool.keywords}</p>
      </div>
    </div>
  );
}

// ─── Page Header (각 도구 페이지 상단) ───────────────────────────────────────
interface PageHeaderProps { toolId: string; }
export function PageHeader({ toolId }: PageHeaderProps) {
  const tool = TOOLS.find(t => t.id === toolId)!;
  return (
    <div className="page-header">
      <div className="page-header-icon" style={{ background: tool.bg }}>
        <Icon d={tool.icon} size={24} stroke={tool.color} />
      </div>
      <div>
        <h1 className="page-title">{tool.name}</h1>
        <p className="page-sub">{tool.desc}</p>
      </div>
    </div>
  );
}
