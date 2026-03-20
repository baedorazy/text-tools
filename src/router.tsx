// import { createBrowserRouter } from 'react-router-dom'
// import App from './App'
// import { HomePage } from './pages/HomePage'
// import { RemoveLineBreaksPage } from './pages/RemoveLineBreaksPage'
// import { JsonFormatterPage } from './pages/JsonFormatterPage'
//
// export const router = createBrowserRouter([
// 	{
// 		path: '/',
// 		element: <App />,
// 		children: [
// 			{ index: true, element: <HomePage /> },
// 			{ path: 'remove-line-breaks', element: <RemoveLineBreaksPage /> },
// 			{ path: 'json-formatter', element: <JsonFormatterPage /> },
// 		],
// 	},
// ])


import { createBrowserRouter } from 'react-router-dom';
import App from './App';
import HomePage from './pages/HomePage';
import RemoveLineBreaksPage from './pages/RemoveLineBreaksPage';
import RemoveWhitespacePage from './pages/RemoveWhitespacePage';
import {
	RemoveSpecialCharsPage,
	RemoveHtmlTagsPage,
	CaseConverterPage,
	WordCountPage,
	RemoveDuplicatesPage,
	FindReplacePage,
	SortLinesPage,
	JsonCsvPage,
} from './pages/ToolPages';

export const router = createBrowserRouter([
	{
		path: '/',
		element: <App />,
		children: [
			{ index: true,              element: <HomePage /> },
			{ path: 'line-break',       element: <RemoveLineBreaksPage /> },
			{ path: 'whitespace',       element: <RemoveWhitespacePage /> },
			{ path: 'special-chars',    element: <RemoveSpecialCharsPage /> },
			{ path: 'html-tags',        element: <RemoveHtmlTagsPage /> },
			{ path: 'case-convert',     element: <CaseConverterPage /> },
			{ path: 'word-count',       element: <WordCountPage /> },
			{ path: 'duplicate',        element: <RemoveDuplicatesPage /> },
			{ path: 'find-replace',     element: <FindReplacePage /> },
			{ path: 'sort-lines',       element: <SortLinesPage /> },
			{ path: 'json-csv',         element: <JsonCsvPage /> },
		],
	},
]);
