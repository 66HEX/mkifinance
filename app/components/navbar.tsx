"use client";

import { List, X } from "@phosphor-icons/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

export default function Navbar() {
	const navbarRef = useRef<HTMLDivElement>(null);
	const mobileMenuRef = useRef<HTMLDivElement>(null);
	const [menuOpen, setMenuOpen] = useState(false);
	const iconRef = useRef<"open" | "close">("open");

	useEffect(() => {
		const navbar = navbarRef.current;
		if (!navbar) return;

		let lastScroll = window.scrollY;

		const scrollTrigger = ScrollTrigger.create({
			start: 0,
			end: "max",
			onUpdate: () => {
				const scrollY = window.scrollY;

				if (scrollY > lastScroll && scrollY > 50) {
					gsap.to(navbar, {
						y: "-100%",
						duration: 1.2,
						ease: "power2.out",
					});
				} else {
					gsap.to(navbar, {
						y: "0%",
						duration: 1.2,
						ease: "power2.out",
					});
				}
				lastScroll = scrollY;
			},
		});

		return () => {
			scrollTrigger.kill();
		};
	}, []);

	useEffect(() => {
		const menu = mobileMenuRef.current;
		if (!menu) return;

		if (menuOpen) {
			menu.style.display = "block";
			gsap.fromTo(
				menu,
				{ height: 0, opacity: 0 },
				{
					height: "auto",
					opacity: 1,
					duration: 0.5,
					ease: "power2.out",
				},
			);
			iconRef.current = "close";
		} else {
			gsap.to(menu, {
				height: 0,
				opacity: 0,
				duration: 0.4,
				ease: "power2.inOut",
				onComplete: () => {
					menu.style.display = "none";
					iconRef.current = "open";
				},
			});
		}
	}, [menuOpen]);

	const toggleMobileMenu = () => {
		setMenuOpen((prev) => !prev);
	};

	const handleScrollTo = (id: string) => {
		const target = document.getElementById(id);

		if (
			target &&
			(
				window as Window & {
					lenis?: {
						scrollTo: (
							target: HTMLElement,
							options: { offset: number; duration: number },
						) => void;
					};
				}
			).lenis
		) {
			(
				window as Window & {
					lenis?: {
						scrollTo: (
							target: HTMLElement,
							options: { offset: number; duration: number },
						) => void;
					};
				}
			).lenis?.scrollTo(target, {
				offset: -80,
				duration: 1.2,
			});
		}
		if (menuOpen) setMenuOpen(false);
	};

	return (
		<header
			ref={navbarRef}
			className="w-full fixed top-0 left-0 z-50 bg-background shadow-xl"
		>
			<nav className="px-6 lg:px-16 py-4 flex items-center justify-between">
				<div className="text-header text-xl lg:text-2xl font-serif ">
					MKI<span className="ml-2 italic text-header/80">Finance</span>
				</div>

				<div className="hidden lg:flex gap-8 text-paragraph font-sans font-medium">
					<button
						type="button"
						onClick={() => handleScrollTo("aboutus")}
						className="hover:text-header transition-colors cursor-pointer focus:outline-none focus:ring-0 focus:ring-header rounded bg-transparent border-none p-0"
					>
						O nas
					</button>
					<button
						type="button"
						onClick={() => handleScrollTo("services")}
						className="hover:text-header transition-colors cursor-pointer focus:outline-none focus:ring-0 focus:ring-header rounded bg-transparent border-none p-0"
					>
						Oferta
					</button>
					<button
						type="button"
						onClick={() => handleScrollTo("contact")}
						className="hover:text-header transition-colors cursor-pointer focus:outline-none focus:ring-0 focus:ring-header rounded bg-transparent border-none p-0"
					>
						Kontakt
					</button>
				</div>

				<div className="hidden lg:block">
					<button
						type="button"
						className="text-header border border-header font-sans font-medium px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300"
					>
						+48 22 123 45 67
					</button>
				</div>

				<button
					type="button"
					className="lg:hidden text-header"
					onClick={toggleMobileMenu}
					aria-label={menuOpen ? "Zamknij menu" : "Otwórz menu"}
					aria-expanded={menuOpen}
				>
					{menuOpen ? <X size={24} /> : <List size={24} />}
				</button>
			</nav>

			<div
				ref={mobileMenuRef}
				className="lg:hidden bg-background overflow-hidden px-6"
				style={{ display: "none", height: 0, opacity: 0 }}
			>
				<div className="flex flex-col gap-4 py-4 text-paragraph font-sans font-medium">
					<button
						type="button"
						onClick={() => handleScrollTo("aboutus")}
						className="text-left hover:text-header transition-colors cursor-pointer focus:outline-none focus:ring-0 focus:ring-header rounded bg-transparent border-none p-0"
					>
						O nas
					</button>
					<button
						type="button"
						onClick={() => handleScrollTo("services")}
						className="text-left hover:text-header transition-colors cursor-pointer focus:outline-none focus:ring-0 focus:ring-header rounded bg-transparent border-none p-0"
					>
						Oferta
					</button>
					<button
						type="button"
						onClick={() => handleScrollTo("contact")}
						className="text-left hover:text-header transition-colors cursor-pointer focus:outline-none focus:ring-0 focus:ring-header rounded bg-transparent border-none p-0"
					>
						Kontakt
					</button>
					<button
						type="button"
						className="mt-2 w-full border border-header text-header px-4 py-2 rounded-full hover:opacity-90 transition-opacity duration-300"
					>
						+48 22 123 45 67
					</button>
				</div>
			</div>
		</header>
	);
}
