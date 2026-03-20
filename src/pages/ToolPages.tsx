// ─── RemoveSpecialCharsPage.tsx ───────────────────────────────────────────────
import ToolNav from '../components/ToolNav';
import { Toggle, ToolLayout } from '../components/ToolLayout';
import { useTextTool } from '../hooks/useTextTool';
import { transformSpecialChars } from '../utils/transforms';

const SC = { color: '#F59E0B', bg: '#FFFBEB' };

export function RemoveSpecialCharsPage() {
  const { input, setInput, output, options, setOption, clearInput, downloadOutput } =
    useTextTool({ initialOptions: { emoji: true, punct: false, brackets: false, numbers: false }, transform: transformSpecialChars });
  return (
    <div className="page-wrapper">
      <ToolNav toolId="special-chars" />
      <ToolLayout toolId="special-chars" input={input} output={output}
        onInputChange={setInput} onClear={clearInput} onDownload={() => downloadOutput('special-chars.txt')}
        options={<div className="chips-row">
          {([['emoji','이모지'],['punct','특수기호'],['brackets','괄호'],['numbers','숫자']] as const).map(([k,l]) => (
            <Toggle key={k} label={l} checked={options[k as keyof typeof options] as boolean}
              color={SC.color} bg={SC.bg} onChange={() => setOption(k as any, !options[k as keyof typeof options])} />
          ))}
        </div>}
      />
    </div>
  );
}

// ─── RemoveHtmlTagsPage.tsx ───────────────────────────────────────────────────
import { transformHtmlTags } from '../utils/transforms';
const HT = { color: '#8B5CF6', bg: '#F5F3FF' };

export function RemoveHtmlTagsPage() {
  const { input, setInput, output, options, setOption, clearInput, downloadOutput } =
    useTextTool({ initialOptions: { decode: true, brToLn: true }, transform: transformHtmlTags });
  return (
    <div className="page-wrapper">
      <ToolNav toolId="html-tags" />
      <ToolLayout toolId="html-tags" input={input} output={output}
        onInputChange={setInput} onClear={clearInput} onDownload={() => downloadOutput('html-clean.txt')}
        options={<div className="chips-row">
          <Toggle label="엔티티 디코딩 (&amp; → &)" checked={options.decode} color={HT.color} bg={HT.bg} onChange={() => setOption('decode', !options.decode)} />
          <Toggle label="<br> → 줄바꿈" checked={options.brToLn} color={HT.color} bg={HT.bg} onChange={() => setOption('brToLn', !options.brToLn)} />
        </div>}
      />
    </div>
  );
}

// ─── CaseConverterPage.tsx ────────────────────────────────────────────────────
import { transformCase, type CaseMode } from '../utils/transforms';
const CC = { color: '#F97316', bg: '#FFF7ED' };
const CASE_MODES: { value: CaseMode; label: string }[] = [
  { value: 'lower',    label: '소문자' },
  { value: 'upper',    label: '대문자' },
  { value: 'title',    label: '단어 첫 대문자' },
  { value: 'sentence', label: '문장 첫 대문자' },
  { value: 'camel',    label: 'camelCase' },
];
import { Chip } from '../components/ToolLayout';

export function CaseConverterPage() {
  const { input, setInput, output, options, setOption, clearInput, downloadOutput } =
    useTextTool({ initialOptions: { mode: 'lower' as CaseMode }, transform: (t, o) => transformCase(t, o.mode) });
  return (
    <div className="page-wrapper">
      <ToolNav toolId="case-convert" />
      <ToolLayout toolId="case-convert" input={input} output={output}
        onInputChange={setInput} onClear={clearInput} onDownload={() => downloadOutput('case-converted.txt')}
        options={<div className="chips-row">
          {CASE_MODES.map(m => (
            <Chip key={m.value} label={m.label} active={options.mode === m.value}
              color={CC.color} bg={CC.bg} onClick={() => setOption('mode', m.value)} />
          ))}
        </div>}
      />
    </div>
  );
}

// ─── WordCountPage.tsx ────────────────────────────────────────────────────────
import { useState } from 'react';
import { getWordCount } from '../utils/transforms';
const WC = { color: '#10B981', bg: '#ECFDF5' };

export function WordCountPage() {
  const [input, setInput] = useState('');
  const stats = getWordCount(input);
  const STAT_ITEMS = [
    ['글자 수 (전체)',    stats.charsAll],
    ['글자 수 (공백 제외)', stats.charsNoSpace],
    ['단어 수',          stats.words],
    ['문장 수',          stats.sentences],
    ['줄 수',            stats.lines],
    ['문단 수',          stats.paragraphs],
    ['바이트 (UTF-8)',   stats.bytes],
  ] as const;
  return (
    <div className="page-wrapper">
      <ToolNav toolId="word-count" />
      <div className="tool-layout">
        <div className="tool-options-box">
          <p className="box-label">옵션</p>
          <p style={{ fontSize: 13, color: 'var(--text2)' }}>텍스트를 입력하면 실시간으로 통계가 업데이트됩니다.</p>
        </div>
        <div className="editor-grid single">
          <div className="editor-pane">
            <p className="box-label">텍스트 입력</p>
            <textarea className="editor-ta" value={input} onChange={e => setInput(e.target.value)}
              placeholder="분석할 텍스트를 입력하세요..."
              style={{ '--focus-color': WC.color } as React.CSSProperties} />
          </div>
          <div className="editor-pane">
            <p className="box-label">통계</p>
            <div className="wc-grid">
              {STAT_ITEMS.map(([label, value]) => (
                <div key={label} className="wc-card" style={{ background: WC.bg }}>
                  <div className="wc-label" style={{ color: WC.color }}>{label}</div>
                  <div className="wc-value">{(value as number).toLocaleString()}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="tool-seo-box">
          <h2>글자 수 세기란?</h2>
          <p>텍스트의 글자 수, 단어 수, 문장 수, 바이트를 실시간으로 측정합니다. SNS 글자 수 제한 확인, 번역 견적, 원고량 확인 등에 활용하세요.</p>
        </div>
      </div>
    </div>
  );
}

// ─── RemoveDuplicatesPage.tsx ─────────────────────────────────────────────────
import { transformDuplicate } from '../utils/transforms';
const DUP = { color: '#14B8A6', bg: '#F0FDFA' };

export function RemoveDuplicatesPage() {
  const { input, setInput, output, options, setOption, clearInput, downloadOutput } =
    useTextTool({ initialOptions: { ignoreCase: false, keepEmpty: false }, transform: transformDuplicate });
  return (
    <div className="page-wrapper">
      <ToolNav toolId="duplicate" />
      <ToolLayout toolId="duplicate" input={input} output={output}
        onInputChange={setInput} onClear={clearInput} onDownload={() => downloadOutput('deduplicated.txt')}
        options={<div className="chips-row">
          <Toggle label="대소문자 무시" checked={options.ignoreCase} color={DUP.color} bg={DUP.bg} onChange={() => setOption('ignoreCase', !options.ignoreCase)} />
          <Toggle label="빈 줄 유지" checked={options.keepEmpty} color={DUP.color} bg={DUP.bg} onChange={() => setOption('keepEmpty', !options.keepEmpty)} />
        </div>}
      />
    </div>
  );
}

// ─── FindReplacePage.tsx ──────────────────────────────────────────────────────
import { transformFindReplace } from '../utils/transforms';
const FR = { color: '#EF4444', bg: '#FEF2F2' };

export function FindReplacePage() {
  const { input, setInput, output, options, setOption, clearInput, downloadOutput } =
    useTextTool({ initialOptions: { find: '', replace: '', regex: false, ignoreCase: false }, transform: transformFindReplace });
  return (
    <div className="page-wrapper">
      <ToolNav toolId="find-replace" />
      <ToolLayout toolId="find-replace" input={input} output={output}
        onInputChange={setInput} onClear={clearInput} onDownload={() => downloadOutput('replaced.txt')}
        options={
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              {([['find','찾을 텍스트','찾을 내용...'],['replace','바꿀 텍스트','바꿀 내용 (비우면 삭제)...']] as const).map(([k,label,ph]) => (
                <div key={k}>
                  <p className="box-label" style={{ marginBottom: 6 }}>{label}</p>
                  <input value={options[k]} onChange={e => setOption(k, e.target.value)}
                    placeholder={ph}
                    style={{ width:'100%', padding:'8px 12px', borderRadius:8, border:'1.5px solid var(--border)', fontSize:13, background:'var(--surface)', color:'var(--text)', outline:'none', fontFamily:'var(--mono)' }} />
                </div>
              ))}
            </div>
            <div className="chips-row">
              <Toggle label="정규식" checked={options.regex} color={FR.color} bg={FR.bg} onChange={() => setOption('regex', !options.regex)} />
              <Toggle label="대소문자 무시" checked={options.ignoreCase} color={FR.color} bg={FR.bg} onChange={() => setOption('ignoreCase', !options.ignoreCase)} />
            </div>
          </div>
        }
      />
    </div>
  );
}

// ─── SortLinesPage.tsx ────────────────────────────────────────────────────────
import { transformSortLines, type SortMode } from '../utils/transforms';
const SL = { color: '#6366F1', bg: '#EEF2FF' };
const SORT_MODES: { value: SortMode; label: string }[] = [
  { value: 'asc',     label: '가나다 오름차순' },
  { value: 'desc',    label: '가나다 내림차순' },
  { value: 'reverse', label: '역순' },
  { value: 'length',  label: '길이순' },
  { value: 'shuffle', label: '무작위' },
];

export function SortLinesPage() {
  const { input, setInput, output, options, setOption, clearInput, downloadOutput } =
    useTextTool({ initialOptions: { mode: 'asc' as SortMode }, transform: (t, o) => transformSortLines(t, o.mode) });
  return (
    <div className="page-wrapper">
      <ToolNav toolId="sort-lines" />
      <ToolLayout toolId="sort-lines" input={input} output={output}
        onInputChange={setInput} onClear={clearInput} onDownload={() => downloadOutput('sorted.txt')}
        options={<div className="chips-row">
          {SORT_MODES.map(m => (
            <Chip key={m.value} label={m.label} active={options.mode === m.value}
              color={SL.color} bg={SL.bg} onClick={() => setOption('mode', m.value)} />
          ))}
        </div>}
      />
    </div>
  );
}

// ─── JsonCsvPage.tsx ──────────────────────────────────────────────────────────
import { transformJsonCsv, type JsonCsvMode } from '../utils/transforms';
const JC = { color: '#22C55E', bg: '#F0FDF4' };
const JSON_MODES: { value: JsonCsvMode; label: string }[] = [
  { value: 'json-array', label: 'JSON 배열' },
  { value: 'csv-row',    label: 'CSV 1행' },
  { value: 'csv-col',    label: 'CSV 1열' },
  { value: 'numbered',   label: '번호 매기기' },
];

export function JsonCsvPage() {
  const { input, setInput, output, options, setOption, clearInput, downloadOutput } =
    useTextTool({ initialOptions: { mode: 'json-array' as JsonCsvMode, pretty: true }, transform: (t, o) => transformJsonCsv(t, o.mode, o.pretty) });
  return (
    <div className="page-wrapper">
      <ToolNav toolId="json-csv" />
      <ToolLayout toolId="json-csv" input={input} output={output}
        onInputChange={setInput} onClear={clearInput} onDownload={() => downloadOutput('converted.txt')}
        options={<div className="chips-row">
          {JSON_MODES.map(m => (
            <Chip key={m.value} label={m.label} active={options.mode === m.value}
              color={JC.color} bg={JC.bg} onClick={() => setOption('mode', m.value)} />
          ))}
          {options.mode === 'json-array' && (
            <Toggle label="들여쓰기" checked={options.pretty} color={JC.color} bg={JC.bg} onChange={() => setOption('pretty', !options.pretty)} />
          )}
        </div>}
      />
    </div>
  );
}
