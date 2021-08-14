import { ObjectId, Workspace } from ".";

export interface Course {
	_id: ObjectId;
	data: string;
	description: string;
	workspace_id: Workspace["_id"];
	is_certificated: boolean;
	is_online: boolean;
	is_public: boolean;
	max_participants: string;
	min_participants: string;
	name: string;
	price: string;
}
