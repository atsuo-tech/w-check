import { AttendFormAction } from "./action";

export default function Home() {

	return (
		<main>
			<h1>Welcome to W-Check!</h1>
			<form action={AttendFormAction}>
				<label htmlFor="student_id">
					Student ID:
				</label>
				<input type="text" id="student_id" name="student_id" required />
				<br />
				<label htmlFor="verfication_code">Code: </label>
				<input type="text" id="verfication_code" name="verfication_code" required />
				<br />
				<button type="submit">Check</button>
			</form>
		</main>
	)

}
