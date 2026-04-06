import './App.css'
import { useState, useEffect} from "react";
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {
	
	const [dark, setDark] = useState(() => {
		// 시스템 다크모드 선호 또는 저장된 값
		if (typeof window !== 'undefined') {
			const saved = localStorage.getItem('tt-dark');
			if (saved !== null) return saved === 'true';
			return window.matchMedia('(prefers-color-scheme: dark)').matches;
		}
		return false;
	});
	
	useEffect(() => {
		document.documentElement.classList.toggle('dark', dark);
		localStorage.setItem('tt-dark', String(dark));
	}, [dark]);
	
	return (
		<div className="app-root">
			<Header dark={dark} onToggleDark={() => setDark(d => !d)}/>
			<main className="app-main">
				<Outlet/>
			</main>
		</div>
	);
}

export default App
