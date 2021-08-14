import { ObjectId } from ".";

export interface User {
	_id?: ObjectId;
	name: string;
	surname: string;
	address: {
		street: string;
		street_number: string;
		city: string;
		country: string;
		post_code: number;
	};
	email: string;
	num: number;
	age: number;
	gender?: "male" | "female" | null;
	username: string;
	password: string;
	title: string;
	media: string;
}
