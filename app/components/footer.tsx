import Content from "@/app/sections/content";

export default function Footer() {
	return (
		<div
			className="relative h-[800px] lg:h-[400px]"
			style={{ clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)" }}
		>
			<div className="relative h-[calc(100vh+800px)] lg:h-[calc(100vh+400px)] -top-[100vh]">
				<div className="h-[800px] lg:h-[400px] sticky top-[calc(100vh-800px)] lg:top-[calc(100vh-400px)] flex items-end">
					<Content />
				</div>
			</div>
		</div>
	);
}
