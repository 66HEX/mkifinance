import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Footer from "@/app/components/footer";
import Navbar from "@/app/components/navbar";

const PPEditorialNew = localFont({
	src: [
		{
			path: "./assets/fonts/PPEditorialNew/PPEditorialNew-Variable.woff2",
			style: "normal",
		},
		{
			path: "./assets/fonts/PPEditorialNew/PPEditorialNew-ItalicVariable.woff2",
			style: "italic",
		},
	],
	variable: "--font-pp-editorial-new",
	display: "swap",
});

const PublicSans = localFont({
	src: [
		{
			path: "./assets/fonts/PublicSans/PublicSans[wght].woff2",
			style: "normal",
		},
		{
			path: "./assets/fonts/PublicSans/PublicSans-Italic[wght].woff2",
			style: "italic",
		},
	],
	variable: "--font-public-sans",
	display: "swap",
});

export const metadata: Metadata = {
	title: {
		default: "MKI Finance - Finanse i doradztwo finansowe",
		template: "%s | MKI Finance - Finanse i doradztwo finansowe",
	},
	description:
		"MKI Finance to firma doradztwa finansowego, która oferuje kompleksowe rozwiązania finansowe dla klientów indywidualnych i firm.",
	keywords: [
		"doradztwo finansowe",
		"zarządzanie portfelem",
		"finansowanie korporacyjne",
		"planowanie finansowe",
		"private banking",
		"finanse indywidualne",
		"IAM architecture",
		"zarządzanie aktywami",
		"finanse korporacyjne",
		"finanse indywidualne",
		"finanse osobiste",
	],
	authors: [{ name: "MKI Finance" }],
	creator: "MKI Finance",
	publisher: "MKI Finance",
	formatDetection: {
		email: false,
		address: false,
		telephone: false,
	},
	metadataBase: new URL("https://mki-finance.pl"),
	alternates: {
		canonical: "/",
	},
	openGraph: {
		type: "website",
		locale: "pl_PL",
		url: "https://mki-finance.pl",
		siteName: "MKI Finance",
		title: "MKI Finance - Finanse i doradztwo finansowe",
		description:
			"MKI Finance to firma doradztwa finansowego, która oferuje kompleksowe rozwiązania finansowe dla klientów indywidualnych i firm.",
		images: [
			{
				url: "/images/og-image.jpg",
				width: 1200,
				height: 630,
				alt: "MKI Finance - Finanse i doradztwo finansowe",
				type: "image/jpeg",
			},
		],
	},
	twitter: {
		card: "summary_large_image",
		title: "MKI Finance - Finanse i doradztwo finansowe",
		description:
			"MKI Finance to firma doradztwa finansowego, która oferuje kompleksowe rozwiązania finansowe dla klientów indywidualnych i firm.",
		images: ["/images/og-image.jpg"],
		creator: "@mki-finance",
		site: "@mki-finance",
	},
	robots: {
		index: true,
		follow: true,
		googleBot: {
			index: true,
			follow: true,
			"max-video-preview": -1,
			"max-image-preview": "large",
			"max-snippet": -1,
		},
	},
	icons: {
		icon: [
			{ url: "/favicon.ico" },
			{ url: "/favicon-96x96.png", sizes: "96x96", type: "image/png" },
			{ url: "/favicon.svg", type: "image/svg+xml" },
		],
		apple: [
			{ url: "/apple-touch-icon.png", sizes: "180x180", type: "image/png" },
		],
	},
	manifest: "/site.webmanifest",
	category: "finance",
	other: {
		"contact:phone_number": "+48 793 788 388",
		"contact:email": "biuro@mki-finance.pl",
		"contact:country_name": "Polska",
		"contact:region": "Wielkopolskie",
		"business:contact_data:street_address": "Góra Przemysła 4",
		"business:contact_data:locality": "Poznań, Wielkopolskie",
		"business:contact_data:postal_code": "61-000",
		"business:contact_data:country_name": "Polska",
		"business:contact_data:email": "biuro@mki-finance.pl",
		"business:contact_data:phone_number": "+48 793 788 388",
		"business:contact_data:website": "https://mki-finance.pl",
		"service:specialization":
		"Doradztwo finansowe, Zarządzanie portfelem, Finansowanie korporacyjne, Planowanie finansowe",
		"service:certification": "MKI Finance",
	},
	applicationName: "MKI Finance",
	referrer: "origin-when-cross-origin",
	appLinks: {
		web: {
			url: "https://mki-finance.pl",
			should_fallback: true,
		},
	},
	archives: ["https://mki-finance.pl"],
	assets: ["https://mki-finance.pl"],
	bookmarks: ["https://mki-finance.pl"],
	generator: "Next.js",
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="pl">
			<body
				className={`${PPEditorialNew.variable} ${PublicSans.variable} antialiased`}
			>
				<Navbar />
				{children}
				<Footer />
			</body>
		</html>
	);
}
