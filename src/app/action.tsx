"use server";

import { google } from "googleapis";
import { redirect } from "next/navigation";

export async function AttendFormAction(data: FormData) {

	const student_id = data.get("student_id");
	const verfication_code = data.get("verfication_code");

	if (typeof student_id !== "string" || typeof verfication_code !== "string") {
		throw new Error("Invalid form data");
	}

	const auth = new google.auth.GoogleAuth({
		keyFile: "./service_account_key.json",
		scopes: ["https://www.googleapis.com/auth/spreadsheets"],
	});

	const sheets = google.sheets({
		version: "v4",
		auth,
	});

	const keyData = await sheets.spreadsheets.values.get({
		spreadsheetId: process.env.SPREADSHEET_ID!,
		range: "Codes!B1:B1",
	});

	const key = keyData.data.values?.[0]?.[0];

	if (!key || verfication_code !== key) {

		redirect("/error?q=invalid_code");

	}

	await sheets.spreadsheets.values.append({
		spreadsheetId: process.env.SPREADSHEET_ID!,
		range: "Logs!A:B",
		valueInputOption: "USER_ENTERED",
		requestBody: {
			values: [[Date.now(), student_id, verfication_code]],
		},
	});

	redirect("/success");

}
