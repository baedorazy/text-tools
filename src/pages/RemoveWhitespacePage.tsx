import ToolNav from '../components/ToolNav';
import { Toggle, ToolLayout } from '../components/ToolLayout';
import { useTextTool } from '../hooks/useTextTool';
import { transformWhitespace } from '../utils/transforms';

const tool = { color: '#3B82F6', bg: '#EFF6FF' };

export default function RemoveWhitespacePage() {
  const { input, setInput, output, options, setOption, clearInput, downloadOutput } =
    useTextTool({
      initialOptions: { trim: true, tabs: true, multi: true },
      transform: transformWhitespace,
    });

  return (
    <div className="page-wrapper">
      <ToolNav toolId="whitespace" />
      <ToolLayout
        toolId="whitespace"
        input={input} output={output}
        onInputChange={setInput} onClear={clearInput}
        onDownload={() => downloadOutput('whitespace.txt')}
        options={
          <div className="chips-row">
            <Toggle label="앞뒤 공백 제거" checked={options.trim} color={tool.color} bg={tool.bg} onChange={() => setOption('trim', !options.trim)} />
            <Toggle label="연속 공백 → 1개" checked={options.multi} color={tool.color} bg={tool.bg} onChange={() => setOption('multi', !options.multi)} />
            <Toggle label="탭 → 공백" checked={options.tabs} color={tool.color} bg={tool.bg} onChange={() => setOption('tabs', !options.tabs)} />
          </div>
        }
      />
    </div>
  );
}
