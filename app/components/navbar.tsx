"use client";

import { List, X } from "@phosphor-icons/react";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

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
				}
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

		if (target && (window as any).lenis) {
			(window as any).lenis.scrollTo(target, {
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
				<div className="text-header text-xl lg:text-2xl font-serif font-bold">
					MKI Finance<span className="italic text-primary">.</span>
				</div>

				<ul className="hidden lg:flex gap-8 text-paragraph font-sans font-medium">
					<li onClick={() => handleScrollTo("aboutus")} className="hover:text-header transition-colors cursor-pointer">
						O nas
					</li>
					<li onClick={() => handleScrollTo("services")} className="hover:text-header transition-colors cursor-pointer">
						Oferta
					</li>
					<li onClick={() => handleScrollTo("contact")} className="hover:text-header transition-colors cursor-pointer">
						Kontakt
					</li>
				</ul>

				<div className="hidden lg:block">
					<button className="text-header border border-header font-sans font-medium px-6 py-2 rounded-full hover:opacity-90 transition-opacity duration-300">
						+48 22 123 45 67
					</button>
				</div>

				<button
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
				<ul className="flex flex-col gap-4 py-4 text-paragraph font-sans font-medium">
					<li onClick={() => handleScrollTo("aboutus")} className="hover:text-header transition-colors cursor-pointer">
						O nas
					</li>
					<li onClick={() => handleScrollTo("services")} className="hover:text-header transition-colors cursor-pointer">
						Oferta
					</li>
					<li onClick={() => handleScrollTo("contact")} className="hover:text-header transition-colors cursor-pointer">
						Kontakt
					</li>
					<li>
						<button onClick={() => handleScrollTo("contact")} className="mt-2 w-full border border-header text-header px-4 py-2 rounded-full hover:opacity-90 transition-opacity duration-300">
							+48 22 123 45 67
						</button>
					</li>
				</ul>
			</div>
		</header>
	);
}
