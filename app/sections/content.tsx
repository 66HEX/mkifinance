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

	const companyData = [
		{ id: "company-name", text: "MKI Finance Sp. z o.o." },
		{ id: "address", text: "ul. Finansowa 123, 00-001 Warszawa" },
		{ id: "krs", text: "KRS: 0000123456" },
		{ id: "regon", text: "REGON: 123456789" },
		{ id: "nip", text: "NIP: 123-456-78-90" },
	];

	const contactInfo = [
		{
			id: "phone",
			icon: Phone,
			label: "Telefon",
			content: "+48 22 123 45 67",
			subtitle: "Pon-Pt 8:00-18:00",
		},
		{
			id: "email",
			icon: Envelope,
			label: "Email",
			content: "kontakt@finanse.pl",
			subtitle: "Odpowiedź w 24h",
		},
		{
			id: "address",
			icon: MapPin,
			label: "Adres",
			content: "ul. Finansowa 123",
			subtitle: "00-001 Warszawa",
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
			<div className="p-8 lg:p-16">
				<div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
					<div className="lg:col-span-5">
						<h3
							className="text-header text-3xl lg:text-4xl font-serif mb-6 flex gap-2"
							aria-level={3}
						>
							MKI
							<span className="italic text-header/80">Finance</span>
						</h3>
						<p
							className="text-paragraph font-sans text-base lg:text-lg leading-relaxed mb-8 max-w-md"
							id="footer-description"
						>
							Twój zaufany partner w zarządzaniu finansami.
							<br />
							Transparentność, która buduje relacje.
						</p>
					</div>

					<div className="lg:col-span-7 grid grid-cols-1 lg:grid-cols-3 gap-8 lg:gap-12">
						<nav aria-label="Nawigacja w stopce">
							<h4
								className="text-header text-xl font-serif mb-6"
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

						<section aria-labelledby="company-data-title">
							<h4
								id="company-data-title"
								className="text-header text-xl font-serif mb-6"
								aria-level={4}
							>
								Dane firmy
							</h4>
							<ul className="space-y-3">
								{companyData.map((data) => (
							<li key={data.id}>
								<span className="text-paragraph font-sans text-sm flex items-center gap-2">
									<div
										className="w-1 h-1 bg-paragraph rounded-full"
										aria-hidden="true"
									></div>
									{data.text}
								</span>
							</li>
						))}
							</ul>
						</section>

						<section aria-labelledby="contact-info-title">
							<h4
								id="contact-info-title"
								className="text-header text-xl font-serif mb-6"
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
				<div className="mt-12 text-center">
					<p className="text-header/60 font-sans text-sm">
						© {currentYear} MKI Finance. Wszystkie prawa zastrzeżone.
					</p>
				</div>
			</div>
		</footer>
	);
}
