import {useState} from "react";

export function JsonFormatterPage() {
	const [input, setInput] = useState('')
	const [output, setOutput] = useState('')
	const [error, setError] = useState('')
	
	function formatJson(input: string) {
		try {
			const parsed = JSON.parse(input)
			return {
				success: true,
				result: JSON.stringify(parsed, null, 2),
				error: '',
			}
		} catch (error) {
			return {
				success: false,
				result: '',
				error: error instanceof Error ? error.message : 'Invalid JSON',
			}
		}
	}
	
	const handleFormat = () => {
			const { success, result, error } = formatJson(input)
			
			if (success) {
				setOutput(result)
				setError('')
			} else {
				setOutput('')
				setError(error)
			}
		}
	
	const resetBtn = () => {
		setInput("");
		setOutput("");
	}
	
	const copyText = async () => {
		await navigator.clipboard.writeText(output);
		alert("copied!");
	}
		
	return (
		<>
			<div className="max-w-3xl mx-auto p-6 ">
				<h1 className={"text-2xl font-bold mb-2"}> JsonFormatterPage 정렬</h1>
				<p className="text-gray-500 mb-6">
					json 타입을 정렬하는 무료 온라인 도구 입니다.
				</p>
			</div>
			<section className=" text-gray-700 text-left max-w-3xl mx-auto p-6">
				<textarea
					onChange={(e) => setInput(e.target.value)}
					placeholder="Paste JSON here..."
					value={input}
					className="w-full border border-gray-200 rounded-xl p-4 mb-4 focus:outline-none focus:ring-blue-500 text-black bg-white"
					rows={6}
				/>
				<div className={"text-center  mt-3"}>
					<button
						onClick={handleFormat}
						className="bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-xl"
					> json 스타일정렬
					</button>
				</div>
			</section>
			
			<div className={"text-left  text-gray-700 text-left max-w-3xl mx-auto p-6"}>
				{error && (
					<p className="mt-4 text-red-600 font-medium">
						{error}
					</p>
				)}
				
				{output && (
					<>
						<div className={""}>
							<pre className="my-4 p-4  border border-gray-200 bg-white rounded overflow-auto whitespace-pre-wrap">
								{output}
							</pre>
						</div>
						<div className={"flex flex-wrap justify-between mt-3"}>
							<button onClick={copyText} className={" bg-blue-600 text-white hover:bg-blue-700 px-5 py-2 rounded-xl"}
							>결과 복사</button>
							<button onClick={resetBtn} className={" bg-red-600 text-white hover:bg-red-700 px-5 py-2 rounded-xl"}
							>내용 삭제
							</button>
						</div>
					</>
				)
			}
		</div>
	
		<section className="text-gray-700 text-left max-w-3xl mx-auto p-6">
			<div className={" bg-white"}>
					<h3 className="text-lg font-semibold mb-2">
						Json formats 란?
					</h3>
					<p className="mb-4 text-sm text-gray-500">
						포맷팅이 되어 있지 않은 json 타입의 데이터를 정렬해 줍니다.
					</p>
					
					<h3 className="text-lg font-semibold mb-2">
						언제 사용하나요?
					</h3>
					
					<ul className="mb-4 text-sm text-gray-500 text-left">
						<li>1. 웹브라우저 내 데이터 출력시</li>
						<li>2. 데이터가 정렬이 되어 있지 않을때</li>
						<li>3. 기타 필요한 시기에</li>
					</ul>
					
					<h3 className="text-lg font-semibold mb-2">
						사용 방법
					</h3>
					
					<ol className=" mb-4 text-sm text-gray-500 text-left">
						<li>1. 텍스트를 입력창에 붙여넣습니다.</li>
						<li>2. json 스타일링 버튼을 클릭합니다.</li>
						<li>3. 결과를 복사하여 사용합니다.</li>
					</ol>
				</div>
		</section>
	</>
	)
}