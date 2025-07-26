"use client";

import { Envelope, MapPin, Phone } from "@phosphor-icons/react";

export default function Content() {
	const currentYear = new Date().getFullYear();

	const navigationLinks = [
		{ id: "home", name: "Strona główna", href: "#home" },
		{ id: "aboutus", name: "O nas", href: "#aboutus" },
		{ id: "services", name: "Oferta", href: "#services" },
		{ id: "contact", name: "Kontakt", href: "#contact" },
	];



	const contactInfo = [
		{
			id: "phone",
			icon: Phone,
			label: "Telefon",
			content: "+48 793 788 388",
			subtitle: "Dostępny codziennie",
		},
		{
			id: "email",
			icon: Envelope,
			label: "Email",
			content: "biuro@mki-finance.pl",
			subtitle: "Odpowiedź w 24h",
		},
		{
			id: "address",
			icon: MapPin,
			label: "Adres",
			content: "Góra Przemysła 4",
			subtitle: "Poznań",
		},
	];

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
	};

	return (
			<footer className="w-screen bg-background">
				<div className="p-6 lg:p-12">
					<div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
					<div className="lg:col-span-5">
						<h3
							className="text-header text-3xl lg:text-4xl font-serif mb-6 flex gap-2"
							aria-level={3}
						>
							MKI
							<span className="italic text-header/80">Finance</span>
						</h3>
						<p
								className="text-paragraph font-sans text-base lg:text-lg leading-relaxed mb-6 max-w-md"
								id="footer-description"
							>
								Twój zaufany partner w zarządzaniu finansami.
								<br />
								Transparentność, która buduje relacje.
							</p>
					</div>

					<div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
						<nav aria-label="Nawigacja w stopce">
							<h4
										className="text-header text-xl font-serif mb-4"
										aria-level={4}
									>
										Nawigacja
									</h4>
							<ul className="space-y-3">
								{navigationLinks.map((link) => (
								<li key={link.id}>
										<a
											href={link.href}
											onClick={(e) => {
												e.preventDefault();
												handleScrollTo(link.href.replace("#", ""));
											}}
											className="text-paragraph font-sans text-sm hover:text-header transition-colors duration-300 flex items-center gap-2 group"
											aria-label={`Przejdź do sekcji ${link.name}`}
										>
											<div
												className="w-1 h-1 bg-paragraph rounded-full group-hover:bg-header transition-colors duration-300"
												aria-hidden="true"
											></div>
											{link.name}
										</a>
									</li>
								))}
							</ul>
						</nav>

						<section aria-labelledby="contact-info-title">
							<h4
									id="contact-info-title"
									className="text-header text-xl font-serif mb-4"
									aria-level={4}
								>
									Kontakt
								</h4>
							<div className="space-y-4">
								{contactInfo.map((info) => {
							const IconComponent = info.icon;
							return (
								<div
									key={info.id}
									className="flex items-start gap-3"
								>
											<div
												className="flex items-center justify-center w-8 h-8 rounded-lg bg-background-secondary shadow-lg"
												aria-hidden="true"
											>
												<IconComponent
													size={16}
													className="text-header"
													weight="regular"
													aria-hidden="true"
												/>
											</div>
											<div>
												<p className="text-header font-sans text-sm font-medium mb-1">
													{info.content}
												</p>
												<p className="text-paragraph/80 font-sans text-xs">
													{info.subtitle}
												</p>
											</div>
										</div>
									);
								})}
							</div>
						</section>
					</div>
				</div>
					<div className="mt-8 text-center">
						<p className="text-header/60 font-sans text-sm">
							© {currentYear} MKI Finance. Wszystkie prawa zastrzeżone. • NIP: 6030034857
						</p>
					</div>
			</div>
		</footer>
	);
}
