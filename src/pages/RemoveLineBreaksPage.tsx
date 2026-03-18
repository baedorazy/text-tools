import {useState} from "react";

export function RemoveLineBreaksPage() {
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
		<>
			<div className="max-w-3xl mx-auto p-6 ">
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
			</div>
			
			<section className="mt-10 text-gray-700 text-left max-w-3xl mx-auto p-6 bg-white">
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
					<li>1. 제품 한 줄 정의: 문서 작업자, 블로거, 마케터, 사무직 사용자가 복사/붙여넣기한 텍스트를 즉시 정리할 수 있는 모바일 대응 웹 툴.</li>
					<li>2. 목표 사용자:
						<ul>
							<li>블로그 글 작성자</li>
							<li>PDF/문서/메일에서 텍스트를 복붙해 정리하는 사람</li>
							<li>리스트, 문단, 제목, JSON 같은 텍스트를 빠르게 손봐야 하는 사람</li>
							<li>페이지를 켜두고 반복 작업하는 사용자</li>
						</ul>
					</li>
					<li>3. 핵심 사용자 문제
						<ul>
							<li>PDF/문서 복붙 시 줄바꿈이 엉망</li>
							<li>빈 줄이 과하게 들어감</li>
							<li>문단은 살리고 한 줄 개행만 제거하고 싶음</li>
							<li>제목/문장 케이스를 바꾸고 싶음</li>
							<li>목록 정렬, 중복 제거, 공백 정리가 자주 필요함</li>
							<li>글자 수/단어 수를 바로 보고 싶음</li>
						</ul>
					</li>
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
		</>
	)
}