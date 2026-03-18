import './App.css'
import Header from './components/Header'
import { Outlet } from 'react-router-dom'

function App() {
	return (
		<div className="min-h-screen text-black p-4 bg-gray-50">
			<Header/>
			<Outlet />
		</div>
	)
}

export default App
