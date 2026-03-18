import { createBrowserRouter } from 'react-router-dom'
import App from './App'
import { HomePage } from './pages/HomePage'
import { RemoveLineBreaksPage } from './pages/RemoveLineBreaksPage'
import { JsonFormatterPage } from './pages/JsonFormatterPage'

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true, element: <HomePage /> },
			{ path: 'remove-line-breaks', element: <RemoveLineBreaksPage /> },
			{ path: 'json-formatter', element: <JsonFormatterPage /> },
		],
	},
])