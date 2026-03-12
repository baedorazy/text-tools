import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInout] = useState("");
	const [output, setOutput] = useState("");
	
	const removeLineBreaks = () => {
		const cleaned = input.replace(/\n/g, " ");
		setOutput(cleaned);
	}
	
	const copyText = async () => {
		await navigator.clipboard.writeText(output);
		alert("copied!");
	}
	
  return (
		<div className="min-h-screen bg-gray-50">
			{/* Header */}
			<header className="border-b bg-white sticky top-0">
				<div className="max-w-4xl mx-auto px-6 py-4 flex justify-between">
					<h1 className="font-semibold text-lg">Text Tools</h1>
				</div>
			</header>
			
			<main className="max-w-3xl mx-auto p-6">
				<h1 className={"ext-2xl font-bold mb-2"}>텍스트 줄바꿈 제거</h1>
				
				<p className="text-gray-500 mb-6">
					줄바꿈이 포함된 텍스트를 한 줄로 정리하는 무료 온라인 도구입니다.
				</p>
				
				<textarea
					placeholder={"텍스트를 붙여 넣으세요"}
					value={input}
					className="w-full border border-gray-200 rounded-xl p-4 mb-4 focus:outline-none focus:ring-blue-500 text-black"
					rows={6}
					onChange={(e) => setInout(e.target.value)}
				/>
				<button
					onClick={removeLineBreaks}
					className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-xl"
				> 줄바꿈 제거
				</button>
				
				{/* output */}
				<textarea
					className="w-full border border-gray-200 rounded-xl p-4 mt-4  text-black"
					rows={6}
					value={output}
					readOnly
					placeholder="결과가 여기에 표시됩니다"
				/>
				
				<button onClick={copyText} className={"mt-3 bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-xl"}
				>결과 복사
				</button>
			</main>
			
			<section className="mt-10 text-gray-700 text-left p-3" >
				<h3 className="text-lg font-semibold mb-2">
					텍스트 줄바꿈 제거란?
				</h3>
				<p className="mb-4 text-sm text-gray-500">
					줄바꿈 제거는 여러 줄로 나뉘어 있는 텍스트를 한 줄로 정리하는 작업입니다. <br/>
					웹페이지나 문서에서 복사한 텍스트에는 불필요한 줄바꿈이 포함되는 경우가 많습니다. <br/>
					이 도구를 사용하면 줄바꿈 문자를 공백으로 바꿔 한 줄 문장으로 쉽게 정리할 수 있습니다. <br/>
				</p>
				
				<h3 className="text-lg font-semibold mb-2">
					언제 사용하나요?
				</h3>
				
				<ul className="mb-4 text-sm text-gray-500 text-left">
					<li>1. 웹페이지에서 복사한 텍스트를 정리할 때</li>
					<li>2. 문서 내용을 한 줄 문장으로 만들 때</li>
					<li>3. 데이터나 게시글을 정리할 때</li>
				</ul>
				
				<h3 className="text-lg font-semibold mb-2">
					사용 방법
				</h3>
				
				<ol className=" mb-4 text-sm text-gray-500 text-left">
					<li>1. 텍스트를 입력창에 붙여넣습니다.</li>
					<li>2. 줄바꿈 제거 버튼을 클릭합니다.</li>
					<li>3. 결과를 복사하여 사용합니다.</li>
				</ol>
			
			</section>
		
		</div>
	)
}

export default App
