// emails/preview/MyEmailPreview.tsx
import React, { useState } from "react";
import { MyEmail } from "./../newEmail"; // Import your actual email template

const PreviewWrapper = () => {
	// State for dynamic props
	const [lang, setLang] = useState<"en" | "fi">("en");
	const [userName, setUserName] = useState("Ada Lovelace");

	// Basic styling for the controls (optional)
	const controlStyles: React.CSSProperties = {
		padding: "10px",
		border: "1px solid #ccc",
		marginBottom: "20px",
		fontFamily: "sans-serif",
		display: "flex",
		gap: "10px",
		alignItems: "center",
		flexWrap: "wrap", // Allow controls to wrap
	};

	const buttonStyles: React.CSSProperties = {
		padding: "5px 10px",
		cursor: "pointer",
	};

	const inputStyles: React.CSSProperties = {
		padding: "5px",
	};

	return (
		// Render the controls *above* or *around* the email preview
		<div>
			{/* --- Control Panel --- */}
			<div style={controlStyles}>
				<strong>Controls:</strong>
				{/* Language Switcher */}
				<div>
					<label>Language: </label>
					<select value={lang} onChange={(e) => setLang(e.target.value as "en" | "fi")} style={inputStyles}>
						<option value="en">English</option>
						<option value="fi">Finnish</option>
					</select>
					{/* Alternative Button Style
           <button style={buttonStyles} onClick={() => setLang('en')} disabled={lang === 'en'}>EN</button>
           <button style={buttonStyles} onClick={() => setLang('es')} disabled={lang === 'es'}>ES</button>
           <button style={buttonStyles} onClick={() => setLang('fi')} disabled={lang === 'fi'}>FI</button>
            */}
				</div>

				{/* Custom Prop Input */}
				<div>
					<label>User Name: </label>
					<input type="text" value={userName} onChange={(e) => setUserName(e.target.value)} style={inputStyles} />
				</div>
				{/* Add more controls here for other props */}
			</div>

			{/* --- Email Template --- */}
			{/* Render the actual email template with the current state values */}
			<MyEmail lang={lang} userName={userName} />
		</div>
	);
};

// Export the wrapper component as the default export for React Email to pick up
export default PreviewWrapper;
