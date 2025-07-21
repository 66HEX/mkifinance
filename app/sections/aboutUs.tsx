"use client";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function AboutUs() {
	const sectionRef = useRef(null);
	const imageWrapperRef = useRef(null);
	const imageRef = useRef(null);
	const headingRef = useRef(null);
	const paragraphsRef = useRef<(HTMLElement | null)[]>([]);
	paragraphsRef.current = [];

	const addToParagraphsRef = (el: HTMLElement | null) => {
		if (el && !paragraphsRef.current.includes(el)) {
			paragraphsRef.current.push(el);
		}
	};

	useEffect(() => {
		const initAnimation = async () => {
			await document.fonts.ready;

			const isMobile = window.innerWidth < 768;

			const ctx = gsap.context(() => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
					},
				});

				gsap.set(headingRef.current, { opacity: 1 });
				gsap.set(paragraphsRef.current, { opacity: 1 });
				gsap.set(imageWrapperRef.current, { opacity: 1 });

				tl.fromTo(
					imageWrapperRef.current,
					{
						clipPath: isMobile
							? "inset(100% 0% 0% 0%)"
							: "inset(0% 100% 0% 0%)",
					},
					{
						clipPath: "inset(0% 0% 0% 0%)",
						duration: 1.5,
						ease: "power2.out",
					},
				);

				tl.fromTo(
					imageRef.current,
					isMobile ? { y: 100, scale: 1.05 } : { x: -100, scale: 1.05 },
					{ x: 0, y: 0, scale: 1, duration: 2, ease: "power3.out" },
					"<",
				);

				const headingSplit = new SplitText(headingRef.current, {
					type: "words",
					charsClass: "mx-2",
				});
				tl.fromTo(
					headingSplit.words,
					{ y: 50, opacity: 0 },
					{ y: 0, opacity: 1, duration: 1, ease: "power2.out" },
					"-=2",
				);

				const paragraphSplits: SplitText[] = [];
				paragraphsRef.current.forEach((el) => {
					if (!el) return;

					if (el.tagName === "H3") {
						const headingSplit = new SplitText(el, {
							type: "lines",
						});
						tl.fromTo(
							headingSplit.lines,
							{ y: 30, opacity: 0 },
							{
								y: 0,
								opacity: 1,
								stagger: 0.1,
								duration: 0.8,
								ease: "power2.out",
							},
							"-=0.6",
						);
						paragraphSplits.push(headingSplit);
					} else if (el.tagName === "P") {
						const split = new SplitText(el, {
							type: "lines",
						});
						tl.fromTo(
							split.lines,
							{ y: 30, opacity: 0 },
							{
								y: 0,
								opacity: 1,
								stagger: 0.1,
								duration: 0.8,
								ease: "power2.out",
							},
							"-=0.6",
						);
						paragraphSplits.push(split);
					} else {
						tl.fromTo(
							el,
							{ y: 20, opacity: 0 },
							{
								y: 0,
								opacity: 1,
								stagger: 0.1,
								duration: 0.5,
								ease: "power2.out",
							},
							"-=0.6",
						);
					}
				});

				return () => {
					tl.kill();
					headingSplit.revert();
					paragraphSplits.forEach((split) => split.revert());
				};
			}, sectionRef);

			return () => ctx.revert();
		};

		initAnimation();
	}, []);

	return (
		<section
			id="aboutus"
			ref={sectionRef}
			className="w-screen bg-background grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 overflow-hidden"
		>
			<div
				ref={imageWrapperRef}
				style={{ opacity: 0 }}
				className="col-span-1 order-2 lg:order-1 overflow-hidden"
			>
				<img
					ref={imageRef}
					src={"/images/webp/about-image.webp"}
					alt="O nas"
					className="w-full h-full object-cover object-center"
				/>
			</div>
			<div className="order-1 lg:order-2 col-span-1 flex flex-col justify-start gap-6 p-8 lg:p-16">
				<h2
					ref={headingRef}
					style={{ opacity: 0 }}
					className="text-header text-4xl lg:text-6xl font-serif flex gap-3"
				>
					Nasza
					<span className="italic text-header/80">historia</span>
				</h2>
				<p
					ref={addToParagraphsRef}
					style={{ opacity: 0 }}
					className="text-paragraph text-base lg:text-xl font-sans mb-6"
				>
					Jesteśmy zespołem ekspertów finansowych z wieloletnim doświadczeniem w
					branży bankowej i inwestycyjnej. Nasza firma powstała z pasji do
					pomagania ludziom w osiąganiu stabilności finansowej i realizacji
					marzeń.
				</p>

				<div className="flex flex-col gap-6">
					<div>
						<h3
							ref={addToParagraphsRef}
							style={{ opacity: 0 }}
							className="text-header text-xl font-serif mb-3"
						>
							Nasze doświadczenie
						</h3>
						<p
							ref={addToParagraphsRef}
							style={{ opacity: 0 }}
							className="text-paragraph font-sans text-sm lg:text-base"
						>
							Ponad 15 lat na rynku finansowym, obsłużyliśmy ponad 5000
							klientów, realizując projekty o łącznej wartości przekraczającej
							500 milionów złotych. Nasz zespół składa się z certyfikowanych
							doradców finansowych, analityków i specjalistów ds. kredytów.
						</p>
					</div>

					<div>
						<h3
							ref={addToParagraphsRef}
							style={{ opacity: 0 }}
							className="text-header text-xl font-serif mb-3"
						>
							Nasze wartości
						</h3>
						<p
							ref={addToParagraphsRef}
							style={{ opacity: 0 }}
							className="text-paragraph font-sans text-sm lg:text-base"
						>
							Transparentność, uczciwość i profesjonalizm to fundamenty naszej
							działalności. Wierzymy, że każdy klient zasługuje na indywidualne
							podejście i rozwiązania dostosowane do jego unikalnej sytuacji
							finansowej.
						</p>
					</div>

					<div>
						<h3
							ref={addToParagraphsRef}
							style={{ opacity: 0 }}
							className="text-header text-xl font-serif mb-3"
						>
							Dlaczego my?
						</h3>
						<div className="flex flex-col gap-2">
							{[
								"Bezpłatne konsultacje i wyceny",
								"Współpraca z ponad 20 bankami",
								"Obsługa w całej Polsce",
								"Gwarancja najlepszych warunków",
							].map((item, i) => (
								<div
									key={i}
									ref={addToParagraphsRef}
									style={{ opacity: 0 }}
									className="flex items-center gap-3"
								>
									<div className="w-2 h-2 bg-header rounded-full"></div>
									<span className="text-paragraph font-sans text-sm lg:text-base">
										{item}
									</span>
								</div>
							))}
						</div>
					</div>
				</div>
			</div>
		</section>
	);
}
