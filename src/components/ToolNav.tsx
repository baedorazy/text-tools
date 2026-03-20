// export default function ToolNav() {
// 	return (
// 		<header className="border-b bg-white sticky top-0 z-10">
// 			<div className="max-w-4xl mx-auto px-6 py-4">
// 				<h1 className="font-semibold text-lg">Text Tools</h1>
// 			</div>
// 		</header>
// 	)
// }

import { useNavigate } from 'react-router-dom';
import { TOOLS } from '../constants/tools';
import { Icon } from './ToolLayout';

interface ToolNavProps {
	toolId: string;
}

export default function ToolNav({ toolId }: ToolNavProps) {
	const navigate = useNavigate();
	const tool = TOOLS.find(t => t.id === toolId);
	if (!tool) return null;
	
	return (
		<div className="tool-nav">
			<button className="back-btn" onClick={() => navigate('/')}>
				<Icon d="M19 12H5M12 19l-7-7 7-7" size={15} />
				모든 도구
			</button>
			
			<div className="tool-nav-title">
				<div className="tool-nav-icon" style={{ background: tool.bg }}>
					<Icon d={tool.icon} size={22} stroke={tool.color} />
				</div>
				<div>
					<h1 className="page-title">{tool.name}</h1>
					<p className="page-sub">{tool.keywords}</p>
				</div>
			</div>
		</div>
	);
}
