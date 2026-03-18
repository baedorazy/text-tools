export function HomePage() {
	return (
		<section>
			<h2 className="text-2xl font-bold my-4 ">무료 텍스트 도구 모음</h2>
			
			<div className="grid gap-4 sm:grid-cols-2">
				<a href="/remove-line-breaks" className="border rounded-xl p-4 bg-white">
					줄바꿈 제거
				</a>
				<a href="/json-formatter" className="border rounded-xl p-4 bg-white">
					JSON Formatter
				</a>
			</div>
			
			
		</section>
	)
}