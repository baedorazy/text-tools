// export function HomePage() {
// 	return (
// 		<section>
// 			<h2 className="text-2xl font-bold my-4 ">무료 텍스트 도구 모음</h2>
//
// 			<div className="grid gap-4 sm:grid-cols-2">
// 				<a href="/remove-line-breaks" className="border rounded-xl p-4 bg-white">
// 					줄바꿈 제거
// 				</a>
// 				<a href="/json-formatter" className="border rounded-xl p-4 bg-white">
// 					JSON Formatter
// 				</a>
// 			</div>
//
//
// 		</section>
// 	)
// }
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TOOLS } from '../constants/tools';
import { Icon } from '../components/ToolLayout';

function ToolCard({ tool, index }: { tool: typeof TOOLS[0]; index: number }) {
	const navigate = useNavigate();
	return (
		<button
			className="tool-card"
			style={{
				'--card-color': tool.color,
				'--card-bg': tool.bg,
				'--card-shadow': tool.shadow,
				animationDelay: `${index * 0.05}s`,
			} as React.CSSProperties}
			onClick={() => navigate(tool.path)}
		>
			<div className="card-top-bar" />
			{tool.badge && (
				<span className="card-badge" style={{ background: tool.bg, color: tool.color }}>
          {tool.badge}
        </span>
			)}
			<div className="card-icon-wrap">
				<Icon d={tool.icon} size={23} stroke={tool.color} />
			</div>
			<div>
				<div className="card-name">{tool.name}</div>
				<div className="card-desc">{tool.desc}</div>
			</div>
		</button>
	);
}

export default function HomePage() {
	const [query, setQuery] = useState('');
	const filtered = query.trim()
		? TOOLS.filter(t =>
			t.name.includes(query) || t.desc.includes(query) || t.keywords.includes(query)
		)
		: TOOLS;
	
	return (
		<div className="home">
			{/* Hero */}
			<section className="hero">
				<div className="hero-blob hero-blob1" />
				<div className="hero-blob hero-blob2" />
				
				<div className="hero-chip">
					<span className="chip-dot" />
					무료 · 브라우저 전용 · 설치 불필요
				</div>
				
				<h1 className="hero-h1">
					텍스트 작업,<br />
					<em>한 번에</em> 깔끔하게
				</h1>
				<p className="hero-p">
					PDF·웹·이메일에서 복사한 텍스트의 줄바꿈, 공백, 특수문자를 즉시 정리하세요.
					블로거·마케터·개발자를 위한 10가지 무료 도구.
				</p>
				
				{/* Search */}
				<div className="hero-search">
					<Icon d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" size={15} stroke="var(--text3)" />
					<input
						type="text"
						value={query}
						onChange={e => setQuery(e.target.value)}
						placeholder="도구 검색... (예: 줄바꿈, 공백)"
					/>
					{query && (
						<button className="search-clear" onClick={() => setQuery('')}>
							<Icon d="M18 6L6 18M6 6l12 12" size={13} stroke="var(--text3)" />
						</button>
					)}
				</div>
			</section>
			
			{/* Demo strip */}
			<DemoStrip />
			
			{/* Tools grid */}
			<section className="grid-section">
				<p className="section-label">
					{query ? `검색 결과 (${filtered.length})` : `모든 도구 (${TOOLS.length})`}
				</p>
				{filtered.length === 0 ? (
					<div className="no-results">
						<span>🔍</span>
						<p>"{query}"에 해당하는 도구를 찾을 수 없습니다.</p>
					</div>
				) : (
					<div className="tools-grid">
						{filtered.map((tool, i) => (
							<ToolCard key={tool.id} tool={tool} index={i} />
						))}
					</div>
				)}
			</section>
			
			{/* Features */}
			<section className="features-section">
				<p className="section-label">왜 TextTools인가?</p>
				<div className="features-grid">
					{[
						{ icon: '⚡', title: '즉시 변환', desc: '타이핑하는 순간 실시간으로 변환됩니다. 버튼을 누를 필요가 없습니다.' },
						{ icon: '🔒', title: '완전한 프라이버시', desc: '모든 처리는 브라우저에서만 이루어집니다. 텍스트가 서버로 전송되지 않습니다.' },
						{ icon: '📱', title: '모바일 최적화', desc: '스마트폰·태블릿·데스크톱 어디서나 동일한 경험을 제공합니다.' },
					].map((f, i) => (
						<div key={i} className="feat-card" style={{ animationDelay: `${i * 0.08}s` }}>
							<div className="feat-icon">{f.icon}</div>
							<div className="feat-title">{f.title}</div>
							<div className="feat-desc">{f.desc}</div>
						</div>
					))}
				</div>
			</section>
			
			<footer className="site-footer">
				<p>TextTools · 무료 텍스트 정리 도구</p>
				<p>React + TypeScript · Tailwind CSS · Vercel · 서버 전송 없음</p>
			</footer>
		</div>
	);
}

// ─── Demo strip (줄바꿈 정리 즉시 체험) ──────────────────────────────────────
type DemoMode = 'single' | 'remove-all' | 'to-space' | 'normalize';

function DemoStrip() {
	const [input, setInput]   = useState('');
	const [mode, setMode]     = useState<DemoMode>('single');
	const [copied, setCopied] = useState(false);
	
	const transform = (text: string, m: DemoMode) => {
		if (m === 'single')     return text.replace(/\n{2,}/g, '\n');
		if (m === 'remove-all') return text.replace(/\n+/g, '');
		if (m === 'to-space')   return text.replace(/\n+/g, ' ');
		if (m === 'normalize')  return text.replace(/\n{3,}/g, '\n\n');
		return text;
	};
	
	const output  = transform(input, mode);
	const removed = (input.match(/\n{2,}/g) ?? []).reduce((a, m) => a + m.length - 1, 0);
	
	const copy = () => {
		if (!output) return;
		navigator.clipboard.writeText(output).then(() => {
			setCopied(true);
			setTimeout(() => setCopied(false), 2000);
		});
	};
	
	const MODES: { value: DemoMode; label: string }[] = [
		{ value: 'single',     label: '연속→1개' },
		{ value: 'remove-all', label: '전체 제거' },
		{ value: 'to-space',   label: '공백으로' },
		{ value: 'normalize',  label: '3+→2개' },
	];
	
	return (
		<section className="demo-strip">
			<div className="demo-inner">
				<div className="demo-head">
          <span className="demo-title">
            <Icon d="M4 6h16M4 12h10M4 18h7M19 14v6M16 17l3 3 3-3" size={15} stroke="var(--red)" />
            줄바꿈 정리 — 바로 사용해보기
          </span>
					<span className="live-badge">실시간</span>
				</div>
				<p className="demo-sub">텍스트를 붙여넣으면 즉시 변환됩니다</p>
				
				<div className="demo-opts">
					{MODES.map(m => (
						<button
							key={m.value}
							className={`opt-chip ${mode === m.value ? 'active' : ''}`}
							onClick={() => setMode(m.value)}
						>
							{m.label}
						</button>
					))}
				</div>
				
				<div className="demo-cols">
					<div>
						<p className="box-label">입력</p>
						<textarea
							className="editor-ta"
							value={input}
							onChange={e => setInput(e.target.value)}
							placeholder={'여기에 텍스트를 붙여넣으세요...\n\n\n줄바꿈이 여러 번\n\n반복될 때\n\n\n한 번에 정리됩니다.'}
							style={{ height: 400, '--focus-color': 'var(--red)' } as React.CSSProperties}
						/>
					</div>
					<div style={{ position: 'relative' }}>
						<p className="box-label">결과</p>
						<textarea
							className={"editor-ta output "}
							value={output}
							readOnly
							placeholder="변환된 결과가 여기에 표시됩니다..."
							style={{ height: 400 }}
						/>
					</div>
				</div>
				
				<div className="demo-foot">
					<div className="demo-stats">
						<span>입력 <strong>{input.length}</strong>자</span>
						<span>출력 <strong>{output.length}</strong>자</span>
						<span>처리 <strong>{removed}</strong>개</span>
					</div>
					<button className={`copy-btn ${copied ? 'ok' : ''}`} onClick={copy}>
						<Icon d={copied ? 'M20 6L9 17l-5-5' : 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2'} size={13} stroke="#fff" />
						{copied ? '복사됨!' : '복사'}
					</button>
				</div>
			</div>
		</section>
	);
}
