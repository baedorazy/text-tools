// RemoveLineBreaksPage.tsx
import ToolNav from '../components/ToolNav';
import { Chip, ToolLayout } from '../components/ToolLayout';
import { useTextTool } from '../hooks/useTextTool';
import { transformLineBreak, type LineBreakMode } from '../utils/transforms';

const MODES: { value: LineBreakMode; label: string }[] = [
  { value: 'single',     label: '연속→1개' },
  { value: 'remove-all', label: '전체 제거' },
  { value: 'to-space',   label: '공백으로 치환' },
  { value: 'normalize',  label: '3+줄→2줄' },
];

export default function RemoveLineBreaksPage() {
  const tool = { color: '#E8472A', bg: '#FEF0ED' };
  const { input, setInput, output, options, setOption, clearInput, downloadOutput } =
    useTextTool({
      initialOptions: { mode: 'single' as LineBreakMode },
      transform: (text, opts) => transformLineBreak(text, opts.mode),
    });

  return (
    <div className="page-wrapper">
      <ToolNav toolId="line-break" />
      <ToolLayout
        toolId="line-break"
        input={input} output={output}
        onInputChange={setInput} onClear={clearInput}
        onDownload={() => downloadOutput('line-break.txt')}
        options={
          <div className="chips-row">
            {MODES.map(m => (
              <Chip key={m.value} label={m.label} active={options.mode === m.value}
                color={tool.color} bg={tool.bg}
                onClick={() => setOption('mode', m.value)} />
            ))}
          </div>
        }
      />
    </div>
  );
}
