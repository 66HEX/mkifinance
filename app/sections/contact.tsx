"use client";

import {
	CircleNotchIcon,
	EnvelopeIcon,
	MapPinIcon,
	PhoneIcon,
} from "@phosphor-icons/react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import SplitText from "gsap/SplitText";
import { useEffect, useRef, useState } from "react";
import { ZodError, z } from "zod";
import { SVGBackground1 } from "@/app/components/svgBackground";

gsap.registerPlugin(ScrollTrigger, SplitText);

const contactFormSchema = z.object({
	name: z.string().min(2, "Imię i nazwisko musi mieć co najmniej 2 znaki"),
	email: z.string().email("Proszę wprowadzić poprawny adres email"),
	subject: z.string().min(5, "Temat musi mieć co najmniej 5 znaków"),
	message: z.string().min(10, "Wiadomość musi mieć co najmniej 10 znaków"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

export default function Contact() {
	const [isLoading, setIsLoading] = useState(false);
	const [formData, setFormData] = useState<ContactFormData>({
		name: "",
		email: "",
		subject: "",
		message: "",
	});
	const [errors, setErrors] = useState<
		Partial<Record<keyof ContactFormData, string>>
	>({});

	const handleChange = (
		e: React.ChangeEvent<
			HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
		>,
	) => {
		const { id, value } = e.target;
		setFormData((prev) => ({ ...prev, [id]: value }));
		if (errors[id as keyof ContactFormData]) {
			setErrors((prev) => ({ ...prev, [id]: undefined }));
		}
	};

	const validateForm = () => {
		try {
			contactFormSchema.parse(formData);
			setErrors({});
			return true;
		} catch (error) {
			if (error instanceof ZodError) {
				const newErrors: Partial<Record<keyof ContactFormData, string>> = {};
				error.issues.forEach((err) => {
					if (err.path[0]) {
						newErrors[err.path[0] as keyof ContactFormData] = err.message;
					}
				});
				setErrors(newErrors);
			}
			return false;
		}
	};

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();

		if (!validateForm()) {
			console.log("Please fix the form errors", {
				description: "Some fields need your attention",
			});
			return;
		}

		setIsLoading(true);

		try {
			const response = await fetch("/api/contact", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(formData),
			});

			const data = await response.json();

			if (!response.ok) {
				throw new Error(data.error || "Failed to send message");
			}

			setFormData({
				name: "",
				email: "",
				subject: "",
				message: "",
			});
			setErrors({});
		} catch (error) {
			console.log("Failed to send message", {
				description:
					error instanceof Error ? error.message : "Please try again later",
			});
		} finally {
			setIsLoading(false);
		}
	};

	const sectionRef = useRef(null);
	const headingRef = useRef(null);
	const paragraphRef = useRef(null);
	const contactInfoRef = useRef<(HTMLElement | null)[]>([]);
	const formRef = useRef(null);
	contactInfoRef.current = [];

	const addToContactInfoRef = (el: HTMLElement | null) => {
		if (el && !contactInfoRef.current.includes(el)) {
			contactInfoRef.current.push(el);
		}
	};

	useEffect(() => {
		const initAnimation = async () => {
			await document.fonts.ready;

			const ctx = gsap.context(() => {
				const tl = gsap.timeline({
					scrollTrigger: {
						trigger: sectionRef.current,
						start: "top 80%",
					},
				});

				gsap.set(
					[
						headingRef.current,
						paragraphRef.current,
						formRef.current,
						...contactInfoRef.current,
					],
					{ opacity: 1 },
				);

				const headingSplit = new SplitText(headingRef.current, {
					type: "lines",
				});
				tl.fromTo(
					headingSplit.lines,
					{ y: 50, opacity: 0 },
					{ y: 0, opacity: 1, stagger: 0.15, duration: 1, ease: "power2.out" },
				);

				const paragraphSplit = new SplitText(paragraphRef.current, {
					type: "lines",
				});
				tl.fromTo(
					paragraphSplit.lines,
					{ y: 30, opacity: 0 },
					{ y: 0, opacity: 1, stagger: 0.1, duration: 0.8, ease: "power2.out" },
					"-=0.6",
				);

				tl.fromTo(
					contactInfoRef.current,
					{ y: 20, opacity: 0 },
					{
						y: 0,
						opacity: 1,
						stagger: 0.1,
						duration: 0.6,
						ease: "power2.out",
					},
					"-=0.4",
				);

				tl.fromTo(
					formRef.current,
					{ y: 40, opacity: 0, scale: 0.95 },
					{
						y: 0,
						opacity: 1,
						scale: 1,
						duration: 0.8,
						ease: "power2.out",
					},
					"-=0.4",
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

	const subjects = [
		"Pożyczka pod hipotekę",
		"Finansowanie deweloperskie",
		"Finansowanie korporacyjne",
		"Planowanie finansowe",
		"Inne",
	];

	const contactInfo = [
		{
			id: "phone",
			icon: PhoneIcon,
			title: "Telefon",
			content: "+48 793 788 388",
			subtitle: "Dostępny codziennie",
		},
		{
			id: "email",
			icon: EnvelopeIcon,
			title: "Email",
			content: "biuro@mki-finance.pl",
			subtitle: "Odpowiedź w 24h",
		},
		{
			id: "address",
			icon: MapPinIcon,
			title: "Adres",
			content: "Góra Przemysła 4",
			subtitle: "Poznań",
		},
	];

	return (
		<section
			id="contact"
			ref={sectionRef}
			className="w-screen bg-background-secondary relative overflow-hidden"
		>
			<div className="absolute inset-0 z-0 scale-150 origin-top">
				<SVGBackground1 color="rgba(0,0,0,0.05)" />
			</div>
			<div className="grid grid-cols-1 lg:grid-cols-2 p-8 lg:p-16 gap-8 relative z-10">
				<div className="flex flex-col justify-center gap-8">
					<div className="">
						<h2
							ref={headingRef}
							style={{ opacity: 0 }}
							className="text-header text-4xl md:text-5xl lg:text-6xl font-serif mb-6 leading-tight"
						>
							Skontaktuj się
							<span className="italic block text-header/80">z ekspertami</span>
						</h2>
						<p
							ref={paragraphRef}
							style={{ opacity: 0 }}
							className="text-paragraph text-lg lg:text-xl font-sans leading-relaxed mb-8 max-w-md"
						>
							Jesteśmy gotowi odpowiedzieć na Twoje pytania i pomóc w realizacji
							celów finansowych.
						</p>
					</div>

					<div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
						{contactInfo.map((info) => {
							const IconComponent = info.icon;
							return (
								<div
									key={info.id}
									ref={addToContactInfoRef}
									style={{ opacity: 0 }}
									className="flex items-start gap-4"
								>
									<div className="flex items-center justify-center w-12 h-12 rounded-lg bg-background shadow-md">
										<IconComponent
											size={24}
											className="text-header"
											weight="regular"
										/>
									</div>
									<div>
										<h3 className="text-header text-lg font-serif mb-1">
											{info.title}
										</h3>
										<p className="text-paragraph font-sans text-sm mb-1">
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

					<div className="pt-6 border-t">
						<h3 className="text-header text-xl font-serif mb-3">
							Bezpłatna konsultacja
						</h3>
						<p className="text-paragraph font-sans text-sm leading-relaxed">
							Umów się na bezpłatną konsultację z naszym ekspertem
							finansowym.
						</p>
					</div>
				</div>

				<div className="flex flex-col justify-center p-0 lg:p-16">
					<div
						ref={formRef}
						style={{ opacity: 0 }}
						className="max-w-lg mx-auto w-full bg-background shadow-xl p-6 rounded-xl"
					>
						<h3 className="text-header text-2xl font-serif mb-6">
							Wyślij wiadomość
						</h3>

						<form onSubmit={handleSubmit} className="space-y-4">
							<div>
								<label
									htmlFor="name"
									className="block text-paragraph font-sans text-sm mb-2"
								>
									Imię i nazwisko *
								</label>
								<input
									type="text"
									id="name"
									name="name"
									value={formData.name}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 border border-paragraph/20 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-header font-sans"
									placeholder="Jan Kowalski"
								/>
							</div>

							<div>
								<label
									htmlFor="email"
									className="block text-paragraph font-sans text-sm mb-2"
								>
									Email *
								</label>
								<input
									type="email"
									id="email"
									name="email"
									value={formData.email}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 border border-paragraph/20 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-header font-sans"
									placeholder="jan.kowalski@email.com"
								/>
							</div>

							<div>
								<label
									htmlFor="subject"
									className="block text-paragraph font-sans text-sm mb-2"
								>
									Temat *
								</label>
								<select
									id="subject"
									name="subject"
									value={formData.subject}
									onChange={handleChange}
									required
									className="w-full px-4 py-3 border border-paragraph/20 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-header font-sans"
								>
									<option value="">Wybierz temat</option>
									{subjects.map((subject) => (
										<option key={subject} value={subject}>
											{subject}
										</option>
									))}
								</select>
							</div>

							<div>
								<label
									htmlFor="message"
									className="block text-paragraph font-sans text-sm mb-2"
								>
									Wiadomość *
								</label>
								<textarea
									id="message"
									name="message"
									value={formData.message}
									onChange={handleChange}
									required
									rows={4}
									className="w-full px-4 py-3 border border-paragraph/20 rounded-lg focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/20 transition-all duration-300 text-header font-sans resize-none"
									placeholder="Opisz swoje potrzeby finansowe..."
								/>
							</div>

							<button
								type="submit"
								className="w-full bg-header flex gap-3 items-center justify-center text-background font-sans font-medium py-3 px-6 rounded-lg hover:opacity-90 transition-opacity duration-300"
							>
								{isLoading ? (
									<>
										<CircleNotchIcon className="mr-2 h-4 w-4 animate-spin" />
										Wysyłanie...
									</>
								) : (
									"Wyślij wiadomość"
								)}
							</button>
						</form>
					</div>
				</div>
			</div>
		</section>
	);
}
