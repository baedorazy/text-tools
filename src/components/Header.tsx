import { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { TOOLS } from '../constants/tools';
import { Icon } from './ToolLayout';

const ICONS = {
	menu:  'M3 12h18M3 6h18M3 18h18',
	sun:   'M12 1v2M12 21v2M4.22 4.22l1.42 1.42M18.36 18.36l1.42 1.42M1 12h2M21 12h2M4.22 19.78l1.42-1.42M18.36 5.64l1.42-1.42M12 6a6 6 0 100 12A6 6 0 0012 6z',
	moon:  'M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z',
	chevD: 'M6 9l6 6 6-6',
	chevU: 'M18 15l-6-6-6 6',
};

interface HeaderProps {
	dark: boolean;
	onToggleDark: () => void;
}

export default function Header({ dark, onToggleDark }: HeaderProps) {
	const navigate     = useNavigate();
	const location     = useLocation();
	const [dropOpen, setDropOpen] = useState(false);
	const [mobileOpen, setMobileOpen] = useState(false);
	const dropRef = useRef<HTMLDivElement>(null);
	
	// Close dropdown on outside click
	useEffect(() => {
		const handler = (e: MouseEvent) => {
			if (dropRef.current && !dropRef.current.contains(e.target as Node)) {
				setDropOpen(false);
			}
		};
		document.addEventListener('mousedown', handler);
		return () => document.removeEventListener('mousedown', handler);
	}, []);
	
	// Close mobile menu on route change
	useEffect(() => {
		setMobileOpen(false);
	}, [location]);
	
	const goTo = (path: string) => {
		navigate(path);
		setDropOpen(false);
		setMobileOpen(false);
	};
	
	const NAV_QUICK = TOOLS.slice(0, 3); // 헤더에 고정 노출할 도구 3개
	
	return (
		<header className="header">
			{/* Logo */}
			<button className="logo" onClick={() => goTo('/')}>
				<div className="logo-mark">
					<svg width="17" height="17" viewBox="0 0 24 24" fill="none"
							 stroke="#fff" strokeWidth="2.5" strokeLinecap="round">
						<path d="M4 6h16M4 12h10M4 18h7" />
					</svg>
				</div>
				<span className="logo-text">TextTools</span>
			</button>
			
			{/* Nav pills (desktop) */}
			<nav className="nav-pills" aria-label="주요 도구">
				{NAV_QUICK.map(tool => (
					<button
						key={tool.id}
						className={`nav-pill ${location.pathname === tool.path ? 'active' : ''}`}
						onClick={() => goTo(tool.path)}
						style={location.pathname === tool.path
							? { color: tool.color, background: tool.bg } as React.CSSProperties
							: undefined}
					>
						{tool.name}
					</button>
				))}
			</nav>
			
			<div className="header-right">
				{/* Dark mode */}
				<button className="icon-btn" onClick={onToggleDark} title={dark ? '라이트 모드' : '다크 모드'}>
					<Icon d={dark ? ICONS.sun : ICONS.moon} size={16} />
				</button>
				
				{/* All tools dropdown */}
				<div className="dropdown" ref={dropRef}>
					<button
						className="all-tools-btn"
						onClick={() => setDropOpen(o => !o)}
						aria-expanded={dropOpen}
					>
						모든 도구
						<Icon d={dropOpen ? ICONS.chevU : ICONS.chevD} size={11} stroke="#fff" />
					</button>
					
					{dropOpen && (
						<div className="dropdown-menu" role="menu">
							{TOOLS.map(tool => (
								<button
									key={tool.id}
									className="dd-item"
									onClick={() => goTo(tool.path)}
									role="menuitem"
								>
									<div className="dd-icon" style={{ background: tool.bg }}>
										<Icon d={tool.icon} size={14} stroke={tool.color} />
									</div>
									<span className="dd-name">{tool.name}</span>
									{tool.badge && (
										<span className="dd-badge"
													style={{ background: tool.bg, color: tool.color }}>
                      {tool.badge}
                    </span>
									)}
								</button>
							))}
						</div>
					)}
				</div>
				
				{/* Mobile hamburger */}
				<button
					className="icon-btn mobile-menu-btn"
					onClick={() => setMobileOpen(o => !o)}
					aria-label="메뉴"
				>
					<Icon d={ICONS.menu} size={18} />
				</button>
			</div>
			
			{/* Mobile drawer */}
			{mobileOpen && (
				<div className="mobile-drawer" role="dialog" aria-label="도구 목록">
					<div className="mobile-drawer-inner">
						<p className="mobile-drawer-label">모든 도구</p>
						{TOOLS.map(tool => (
							<button
								key={tool.id}
								className="mobile-drawer-item"
								onClick={() => goTo(tool.path)}
							>
								<div className="dd-icon" style={{ background: tool.bg }}>
									<Icon d={tool.icon} size={14} stroke={tool.color} />
								</div>
								<span>{tool.name}</span>
								{tool.badge && (
									<span className="dd-badge" style={{ background: tool.bg, color: tool.color }}>
                    {tool.badge}
                  </span>
								)}
							</button>
						))}
					</div>
				</div>
			)}
		</header>
	);
}
