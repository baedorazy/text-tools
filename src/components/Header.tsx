import {Link} from "react-router-dom";

export default function Header() {
	return (
		<header className="border-b sticky top-0 panel z-10 bg-gray-50">
			<div className=" mx-auto px-2 py-4 flex justify-between">
				<h1 className="font-semibold text-2xl"><Link to="/" className="">Text Tools </Link></h1>
				<div className={"ml-0"}>
				<Link to="/remove-line-breaks" className="">2줄이상 줄바꿈 제거 </Link>
				<span className={"mx-6"}> | </span>
				<Link to="/json-formatter" className="">json formatter</Link>
				</div>
			</div>
		</header>
	)
}