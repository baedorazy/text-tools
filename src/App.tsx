import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInout] = useState("");
	const [output, setOutput] = useState("");
	const [countTxt, setCountTxt] = useState(0);
	const [removeSpecial, setRemoveSpecial] = useState(false);
	
	const removeLineBreaks = () => {
		const cleaned = input.trim().replace(/\n{2,}/g, '\n');
		
		if (removeSpecial) {
			const res = cleaned.replace(/[^a-zA-Z0-9가-힣\s]/g, '');
			setOutput(res);
			setCountTxt(res.length);
		} else {
			setOutput(cleaned);
			setCountTxt(cleaned.length);
		}
	}
	
	const copyText = async () => {
		await navigator.clipboard.writeText(output);
		alert("copied!");
	}
	
	const resetBtn = () => {
		setInout("");
		setOutput("");
		setCountTxt(0);
	}
	
  return (
		<div className="min-h-screen bg-gray-50 text-black">
			{/* Header */}
			<header className="border-b bg-white sticky top-0 panel">
				<div className="max-w-4xl mx-auto px-6 py-4 flex justify-between">
					<h1 className="font-semibold text-2xl">Text Tools</h1>
				</div>
			</header>
			
			<main className="max-w-3xl mx-auto p-6">
				<h1 className={"text-2xl font-bold mb-2"}>텍스트 줄바꿈 제거</h1>
				
				<p className="text-gray-500 mb-6">
					한줄 이상 줄바꿈 글을 정리하는 무료 온라인 도구입니다.
				</p>
				
				<label className="flex items-center gap-2 mb-3">
					<input
						type="checkbox"
						checked={removeSpecial}
						onChange={(e) => setRemoveSpecial(e.target.checked)}
					/>
					특수문자 제거
				</label>
				<textarea
					placeholder={"텍스트를 붙여 넣으세요"}
					value={input}
					className="w-full border border-gray-200 rounded-xl p-4 mb-4 focus:outline-none focus:ring-blue-500 text-black bg-white"
					rows={6}
					onChange={(e) => setInout(e.target.value)}
				/>
				<button
					onClick={removeLineBreaks}
					className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-xl"
				> 줄바꿈 제거
				</button>
				
				<hr className={"my-6 border-gray-300"}/>
				{/* output */}
				<textarea
					className="w-full border border-gray-200 rounded-xl p-4 mt-4  text-black bg-white"
					rows={6}
					value={output}
					readOnly
					placeholder="결과가 여기에 표시됩니다"
				/>
				
				<div className={"flex flex-wrap justify-between mt-3"}>
					<div className={"ml-0"}>
						<button onClick={copyText} className={" bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-xl"}
						>결과 복사
						</button>
						&nbsp;
						<button onClick={resetBtn} className={" bg-red-600 text-white hover:bg-red-700 px-5 py-2 rounded-xl"}
						>내용 삭제
						</button>
					</div>
					<span className={"mr-0 text-gray-700 text-sm leading-[40px]"}>텍스트 숫자: {countTxt} </span>
				</div>
			</main>
			
			<section className="mt-10 text-gray-700 text-left max-w-3xl mx-auto p-6">
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
