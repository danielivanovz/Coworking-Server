import { ObjectId } from ".";

export interface Order {
	id: ObjectId;
	user_id: string;
	space_id: string;
	invoice: string;
}
