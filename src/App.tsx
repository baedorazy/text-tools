import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInout] = useState("");
	const [output, setOutput] = useState("");
	
	const removeLineBreaks = () => {
		const cleaned = input.replace(/\n/g, " ");
		setOutput(cleaned);
	}
	
  return (
		<>
			<div style={{maxWidth: 700, margin: "40px auto", fontFamily:"sans-serif"}}>
				<h1>텍스트 줄바꿈 제거 툴</h1>
				<textarea
					placeholder={"텍스트를 붙여 넣으세요"}
					value={input}
					style={{ width: "100%", marginBottom: 10 }}
					rows={8}
					onChange={(e) => setInout(e.target.value)}
				/>
				<button onClick={ removeLineBreaks }>줄바꿈 제거</button>
				
				<textarea placeholder={"결과"}
									value={output}
									readOnly={true}
									rows={8}
									style={{ width: "100%", marginBottom: 10 }} />
				
			</div>
			
			<section style={{marginTop: 32 }} >
				<h2>텍스트 줄바꿈 제거란??</h2>
				<p> 이 독는 줄바꿈이 포함된 텍스트를 공백으로 바꿔 한 줄 문장으로 정리해줍니다.
					문서 정리, 게시글 작성, 데이터 가공 시 유리하게 사용할 수 있습니다.
				</p>
				
				<h2> 이런 경우 사용할 수 있어요</h2>
				<ul>
					<li>복사한 문장은 한줄로 붙이고 싶을 때</li>
					<li>엑셀이나 문서용 텍스트를 정리할 떄</li>
					<li>불필요한 줄바꿈을 제거하고 싶을 때</li>
				</ul>
			</section>
			
		</>
  )
}

export default App
