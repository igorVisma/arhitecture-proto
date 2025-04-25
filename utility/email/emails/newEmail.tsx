import { Body, Button, Container, Heading, Html, Img, Section, Text } from "@react-email/components";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { initializeI18n, Language } from "../i18n";
import { useTwigVariables } from "../hooks";

interface EmailProps {
	href?: string;
	timeToExpire?: string;
	[key: string]: any; // Allow additional props
}

const baseLogoPath =
	"https://ci3.googleusercontent.com/meips/ADKq_NajymaeAAfbXH_FHTjNORl3zHGbWPpK8X8xLDtwn967spSmbe-LRdbiiQthRAux9PqAD-Y4WsjPojcdgEzJ37qHX8jqaQ_AZ66wDwZvv1FrwznurzKhMox0QAqZA2fAKxzxFaPO4zbuaCavhg=s0-d-e1-ft#https://vismasign.frakt.io/api/v1/invitation/20eeab43-44ed-40f0-b0ba-ab29d91fc318/logo";

initializeI18n("en");

export const MyEmail = (props: EmailProps) => {
	const { href = "https://www.google.com/imghp?hl=fi&ogbl", timeToExpire } = props;

	const { t, i18n } = useTranslation();
	const { language } = i18n;

	return (
		<Html lang={language} dir="ltr">
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
							{t("email.document.title")}
						</Heading>
					</Section>
					<Section style={{ marginBottom: "16px", textAlign: "center" }}>
						<Text style={{ fontSize: "16px", lineHeight: 1.5, margin: 0 }}>{t("email.document.signedMessage")}</Text>
					</Section>
					<Section style={{ marginBottom: "16px", textAlign: "center" }}>
						<Heading as="h2" style={{ margin: 0, fontSize: "36px", fontWeight: 300, lineHeight: 1.2 }}>
							{t("email.document.findTitle")}
						</Heading>
					</Section>
					<Section style={{ marginBottom: "4px", textAlign: "center" }}>
						<Text style={{ fontSize: "16px", lineHeight: 1.5, margin: 0 }}>{t("email.document.downloadInfo")}</Text>
					</Section>
					<Section style={{ marginBottom: "16px", paddingLeft: "5%" }}>
						<Text style={{ fontSize: "16px", lineHeight: 1.5, margin: 0 }} role="listitem">
							- {t("email.document.availability")}
						</Text>
						<Text style={{ fontSize: "16px", lineHeight: 1.5, margin: 0 }} role="listitem">
							- {t("email.document.availability")}
						</Text>
						<Text style={{ fontSize: "16px", lineHeight: 1.5, margin: 0 }} role="listitem">
							{timeToExpire}
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
							{t("email.document.buttonText")}
						</Button>
					</Section>
				</Container>
			</Body>
		</Html>
	);
};

export default MyEmail;
