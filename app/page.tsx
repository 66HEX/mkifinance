"use client";

import Lenis from "lenis";
import "./globals.css";
import AboutUs from "@/app/sections/aboutUs";
import Contact from "@/app/sections/contact";
import Hero from "@/app/sections/hero";
import Services from "@/app/sections/services";
import { useRef, useEffect } from "react";

export default function Home() {
	const lenisRef = useRef<Lenis | null>(null);

	useEffect(() => {
		lenisRef.current = new Lenis({});
		
		window.lenis = lenisRef.current;

		function raf(time: number) {
			if (lenisRef.current) {
				lenisRef.current.raf(time);
			}
			requestAnimationFrame(raf);
		}

		requestAnimationFrame(raf);

		return () => {
			if (lenisRef.current) {
				lenisRef.current.destroy();
			}
		};
	}, []);

	return (
		<main>
			<Hero />
			<AboutUs />
			<Services />
			<Contact />
		</main>
	);
}
