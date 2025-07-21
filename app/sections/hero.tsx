"use client";

import gsap from "gsap";
import SplitText from "gsap/SplitText";
import { useEffect, useRef } from "react";
import { SVGBackground1 } from "@/app/components/svgBackground";

gsap.registerPlugin(SplitText);

export default function Hero() {
	const imageWrapperRef = useRef(null);
	const imageRef = useRef(null);
	const headingRef = useRef(null);
	const paragraphRef = useRef(null);
	const buttonsRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const initAnimation = async () => {
			await document.fonts.ready;

			const isMobile = window.innerWidth < 768;
			const tl = gsap.timeline();

			gsap.set(headingRef.current, { opacity: 1 });
			gsap.set(paragraphRef.current, { opacity: 1 });
			gsap.set(imageWrapperRef.current, { opacity: 1 });
			gsap.set(buttonsRef.current, { opacity: 1 });

			tl.fromTo(
				imageWrapperRef.current,
				{
					clipPath: isMobile ? "inset(100% 0% 0% 0%)" : "inset(0% 0% 0% 100%)",
				},
				{
					clipPath: "inset(0% 0% 0% 0%)",
					duration: 1.5,
					ease: "power2.out",
				},
			);

			tl.fromTo(
				imageRef.current,
				isMobile ? { y: 100, scale: 1.05 } : { x: 100, scale: 1.05 },
				{ x: 0, y: 0, scale: 1, duration: 2, ease: "power3.out" },
				"<",
			);

			const headersplit = new SplitText(headingRef.current, { type: "lines" });
			tl.fromTo(
				headersplit.lines,
				{ y: 50, opacity: 0 },
				{ y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power2.out" },
				"-=2",
			);

			const paragraphsplit = new SplitText(paragraphRef.current, {
				type: "lines",
			});
			tl.fromTo(
				paragraphsplit.lines,
				{ y: 50, opacity: 0 },
				{ y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power2.out" },
				"-=1.8",
			);

			if (buttonsRef.current) {
				tl.fromTo(
					buttonsRef.current.children,
					{ y: 20, opacity: 0 },
					{ y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" },
					"-=1.2",
				);
			}

			return () => {
				tl.kill();
				headersplit.revert();
				paragraphsplit.revert();
			};
		};

		initAnimation();
	}, []);

	const handleScrollTo = (id: string) => {
		const target = document.getElementById(id);
		if (target && window.lenis) {
			window.lenis.scrollTo(target, {
				offset: -80,
				duration: 1.2,
			});
		}
	};

	return (
		<section
			id="home"
			aria-labelledby="hero-heading"
			className="h-svh w-screen bg-background-secondary grid grid-cols-1 lg:grid-cols-2 overflow-hidden"
		>
			<div className="flex flex-col justify-center gap-6 p-8 lg:p-16 relative">
				<div
					className="absolute inset-0 z-0 scale-250 top-100 lg:top-160"
					aria-hidden="true"
				>
					<SVGBackground1 color="rgba(0,0,0,0.1)" />
				</div>
				<h1
					ref={headingRef}
					id="hero-heading"
					style={{ opacity: 0 }}
					className="text-header text-4xl lg:text-6xl font-serif lg:leading-17 mt-20 md:mt-0"
					aria-level={1}
					aria-label="Twój zaufany partner w zarządzaniu finansami"
				>
					Twój zaufany partner
					<br />
					<span className="italic text-header/80">
						w zarządzaniu finansami.
					</span>
				</h1>
				<p
					ref={paragraphRef}
					style={{ opacity: 0 }}
					className="text-paragraph text-base lg:text-xl font-sans leading-relaxed"
					aria-describedby="hero-description"
					id="hero-description"
				>
					Stawiamy na długofalową współpracę, w której liczy się
					transparentność, elastyczność oraz pełne dopasowanie do indywidualnych
					oczekiwań.
				</p>
				<div
					style={{ opacity: 0 }}
					ref={buttonsRef}
					className="flex flex-col sm:flex-row gap-4"
					role="group"
					aria-label="Przyciski nawigacyjne sekcji głównej"
				>
					<button
						onClick={() => handleScrollTo("contact")}
						className="bg-header text-background font-sans font-medium px-4 py-2 rounded-sm hover:bg-header/90 transition-colors duration-300 text-sm lg:text-lg cursor-pointer"
						aria-label="Przejdź do formularza kontaktowego"
					>
						Złóż wniosek
					</button>
					<button
						onClick={() => handleScrollTo("aboutus")}
						className="border-2 border-header text-header font-sans font-medium px-4 py-2 rounded-sm hover:bg-header transition-colors duration-300 hover:text-background text-sm lg:text-lg cursor-pointer"
						aria-label="Dowiedz się więcej o nas"
					>
						Dowiedz się więcej
					</button>
				</div>
			</div>

			<div
				style={{ opacity: 0 }}
				ref={imageWrapperRef}
				className="col-span-1 h-full overflow-hidden"
				role="img"
				aria-label="Zadowolony klient korzystający z usług finansowych"
			>
				<img
					ref={imageRef}
					src={"/images/webp/hero-image.webp"}
					alt="Zadowolony klient korzystający z usług finansowych"
					className="w-full h-full object-cover object-center"
				/>
			</div>
		</section>
	);
}
