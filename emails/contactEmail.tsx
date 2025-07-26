import {
	Body,
	Container,
	Head,
	Heading,
	Hr,
	Html,
	Preview,
	Section,
	Text,
} from "@react-email/components";

interface ContactEmailProps {
	name: string;
	email: string;
	subject: string;
	message: string;
}

export const ContactEmail = ({
	name,
	email,
	subject,
	message,
}: ContactEmailProps) => {
	return (
		<Html>
			<Head />
			<Preview>New Contact Form Submission from {name}</Preview>
			<Body style={main}>
				<Container style={container}>
					<Heading style={h1}>New Contact Form Submission</Heading>
					<Text style={text}>
						You have received a new message from your website contact form.
					</Text>

					<Section style={section}>
						<Text style={label}>From:</Text>
						<Text style={content}>{name}</Text>

						<Text style={label}>Email:</Text>
						<Text style={content}>{email}</Text>

						<Text style={label}>Subject:</Text>
						<Text style={content}>{subject}</Text>

						<Hr style={hr} />

						<Text style={label}>Message:</Text>
						<Text style={content}>{message}</Text>
					</Section>

					<Hr style={hr} />

					<Text style={footer}>
						This email was sent from your website contact form at ID Zero.
					</Text>
				</Container>
			</Body>
		</Html>
	);
};

const main = {
	backgroundColor: "#ffffff",
	fontFamily:
		'-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen-Sans,Ubuntu,Cantarell,"Helvetica Neue",sans-serif',
};

const container = {
	margin: "0 auto",
	padding: "20px 0 48px",
	maxWidth: "580px",
};

const h1 = {
	fontSize: "24px",
	fontWeight: "600",
	lineHeight: "1.3",
	margin: "0 0 24px",
};

const text = {
	fontSize: "16px",
	lineHeight: "1.5",
	margin: "0 0 16px",
	color: "#484848",
};

const section = {
	padding: "24px",
	backgroundColor: "#f6f6f6",
	borderRadius: "12px",
	margin: "24px 0",
};

const label = {
	fontSize: "14px",
	fontWeight: "600",
	color: "#666666",
	margin: "8px 0 4px",
};

const content = {
	fontSize: "16px",
	color: "#484848",
	margin: "0 0 16px",
};

const hr = {
	borderColor: "#e6e6e6",
	margin: "20px 0",
};

const footer = {
	fontSize: "13px",
	color: "#888888",
	margin: "24px 0 0",
	textAlign: "center" as const,
};

export default ContactEmail;
