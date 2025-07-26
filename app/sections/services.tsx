"use client";

import { Bank, Briefcase, Calculator, TrendUp } from "@phosphor-icons/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import Image from "next/image";
import { useEffect, useRef } from "react";

gsap.registerPlugin(ScrollTrigger, SplitText);

export default function Services() {
	const sectionRef = useRef<HTMLElement>(null);
	const imageWrapperRef = useRef<HTMLDivElement>(null);
	const imageRef = useRef<HTMLDivElement>(null);
	const headingRef = useRef<HTMLHeadingElement>(null);
	const paragraphRef = useRef<HTMLParagraphElement>(null);
	const servicesRef = useRef<(HTMLElement | null)[]>([]);
	servicesRef.current = [];

	const addToServicesRef = (el: HTMLElement | null) => {
		if (el && !servicesRef.current.includes(el)) {
			servicesRef.current.push(el);
		}
	};

	const services = [
		{
			id: "mortgage-loan",
			icon: TrendUp,
			title: "Pożyczka pod hipotekę",
			description:
				"Rozwiązanie dedykowane przedsiębiorcom wymagającym większych sum finansowania.",
		},
		{
			id: "private-banking",
			icon: Briefcase,
			title: "Private Banking",
			description:
				"Ekskluzywne usługi finansowe dla klientów o wysokich wymaganiach.",
		},
		{
			id: "corporate-finance",
			icon: Bank,
			title: "Finansowanie korporacyjne",
			description:
				"Zaawansowane rozwiązania finansowe dla przedsiębiorstw i instytucji.",
		},
		{
			id: "financial-planning",
			icon: Calculator,
			title: "Planowanie finansowe",
			description:
				"Długoterminowe strategie finansowe dostosowane do Twoich celów.",
		},
	];

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
				gsap.set(paragraphRef.current, { opacity: 1 });
				gsap.set(servicesRef.current, { opacity: 1 });
				gsap.set(imageWrapperRef.current, { opacity: 1 });

				tl.fromTo(
					imageWrapperRef.current,
					{
						clipPath: isMobile
							? "inset(100% 0% 0% 0%)"
							: "inset(0% 0% 0% 100%)",
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

				const headingSplit = new SplitText(headingRef.current, {
					type: "words",
					linesClass: "mx-2",
				});
				tl.fromTo(
					headingSplit.words,
					{ y: 50, opacity: 0 },
					{ y: 0, opacity: 1, duration: 1, ease: "power2.out" },
					"-=2",
				);

				const paragraphSplit = new SplitText(paragraphRef.current, {
					type: "lines",
				});
				tl.fromTo(
					paragraphSplit.lines,
					{ y: 30, opacity: 0 },
					{ y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" },
					"-=1.5",
				);

				tl.fromTo(
					servicesRef.current,
					{ y: 20, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						stagger: 0.1,
						duration: 0.6,
						ease: "power2.out",
					},
					"-=1.3",
				);

				return () => {
					tl.kill();
					headingSplit.revert();
					paragraphSplit.revert();
				};
			}, sectionRef);

			return () => ctx.revert();
		};

		initAnimation();
	}, []);

	return (
		<section
			id="services"
			ref={sectionRef}
			className="w-screen bg-background grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-0 overflow-hidden"
			aria-labelledby="services-heading"
		>
			<div className="col-span-1 order-1 lg:order-1 flex flex-col justify-center gap-6 p-8 lg:p-16">
				<h2
					ref={headingRef}
					id="services-heading"
					style={{ opacity: 0 }}
					className="text-header text-4xl lg:text-6xl font-serif flex gap-3"
				>
					Nasze{" "}
					<span className="italic text-header/80" aria-hidden="true">
						usługi
					</span>
				</h2>

				<p
					ref={paragraphRef}
					style={{ opacity: 0 }}
					className="text-paragraph text-base lg:text-xl font-sans mb-6"
					id="services-description"
					aria-describedby="services-heading"
				>
					Oferujemy kompleksowe rozwiązania finansowe dostosowane do
					indywidualnych potrzeb naszych klientów. Nasze usługi opierają się na
					wieloletnim doświadczeniu i najnowszych trendach rynkowych.
				</p>

				<ul
					aria-label="Lista oferowanych usług"
					className="flex flex-col gap-6"
				>
					{services.map((service) => {
						const IconComponent = service.icon;
						return (
							<li
								key={service.id}
								ref={addToServicesRef}
								style={{ opacity: 0 }}
								className="flex items-start gap-4"
							>
								<div
									className="flex items-center justify-center w-12 h-12 rounded-lg bg-background-secondary shadow-lg aspect-square"
									aria-hidden="true"
								>
									<IconComponent
										size={24}
										className="text-header"
										weight="regular"
										aria-hidden="true"
									/>
								</div>
								<div>
									<h3 className="text-header text-lg font-serif mb-1">
										{service.title}
									</h3>
									<p className="text-paragraph font-sans text-sm">
										{service.description}
									</p>
								</div>
							</li>
						);
					})}
				</ul>
			</div>

			<div
				ref={imageWrapperRef}
				style={{ opacity: 0 }}
				className="col-span-1 order-2 lg:order-2 overflow-hidden"
				role="img"
				aria-label="Ilustracja przedstawiająca usługi finansowe"
			>
				<div ref={imageRef} className="w-full h-full relative">
					<Image
						src="/images/webp/services-image.webp"
						alt="Ilustracja przedstawiająca usługi finansowe"
						fill
						className="object-cover object-center"
						sizes="(max-width: 768px) 100vw, 50vw"
					/>
				</div>
			</div>
		</section>
	);
}
