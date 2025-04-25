import { Body, Button, Container, Heading, Html, Img, Section, Text } from "@react-email/components";
import * as React from "react";

interface EmailProps {
	lang: "en" | "sv" | "no" | "fi";
	href: string;
}

const baseLogoPath =
	"https://ci3.googleusercontent.com/meips/ADKq_NajymaeAAfbXH_FHTjNORl3zHGbWPpK8X8xLDtwn967spSmbe-LRdbiiQthRAux9PqAD-Y4WsjPojcdgEzJ37qHX8jqaQ_AZ66wDwZvv1FrwznurzKhMox0QAqZA2fAKxzxFaPO4zbuaCavhg=s0-d-e1-ft#https://vismasign.frakt.io/api/v1/invitation/20eeab43-44ed-40f0-b0ba-ab29d91fc318/logo";

export const MyEmail = (props: EmailProps) => {
	const { lang, href = "https://www.google.com/imghp?hl=fi&ogbl" } = props;

	return (
		<Html lang={lang} dir="ltr">
			<Body style={{ padding: "20px", backgroundColor: "#f4f4f4", fontFamily: "'Open Sans', Arial, sans-serif;" }}>
				<Container
					style={{
						maxWidth: "800px",
						backgroundColor: "#fff",
						padding: "20px",
						color: "#212121",
					}}>
					<Section style={{ marginBottom: "16px" }}>
						<Img
							src={baseLogoPath}
							style={{
								display: "block",
								maxWidth: "100%",
								maxHeight: "100px",
								height: "auto",
								margin: "0 auto",
							}}
							alt="Company Logo"
						/>
					</Section>
					<Section style={{ marginBottom: "16px", textAlign: "center" }}>
						<Heading as="h1" style={{ margin: 0, fontSize: "42px", fontWeight: 300, lineHeight: 1.2 }}>
							Your document is ready
						</Heading>
					</Section>
					<Section style={{ marginBottom: "16px", textAlign: "center" }}>
						<Text style={{ fontSize: "16px", lineHeight: 1.5, margin: 0 }}>
							All invited parties have signed the document ääkköset sent by Evil corp, using the Visma Sign service.
						</Text>
					</Section>
					<Section style={{ marginBottom: "16px", textAlign: "center" }}>
						<Heading as="h2" style={{ margin: 0, fontSize: "36px", fontWeight: 300, lineHeight: 1.2 }}>
							Where can I find the document?
						</Heading>
					</Section>
					<Section style={{ marginBottom: "4px", textAlign: "center" }}>
						<Text style={{ fontSize: "16px", lineHeight: 1.5, margin: 0 }}>
							The signed document is available for download by clicking the link below. Please note the following:
						</Text>
					</Section>
					<Section style={{ marginBottom: "16px", paddingLeft: "5%" }}>
						<Text style={{ fontSize: "16px", lineHeight: 1.5, margin: 0 }} role="listitem">
							- The document is available for 30 days from the date of signing.
						</Text>
						<Text style={{ fontSize: "16px", lineHeight: 1.5, margin: 0 }} role="listitem">
							- The document is available for 30 days from the date of signing.
						</Text>
					</Section>
					<Section style={{ marginBottom: "16px", textAlign: "center" }}>
						<Button
							href={href}
							style={{
								backgroundColor: "#ca1b85",
								color: "#fff",
								padding: "10px 20px",
								borderRadius: "5px",
								textTransform: "uppercase",
								margin: "20px auto",
							}}>
							Download the document
						</Button>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default MyEmail;
