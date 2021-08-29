import { ObjectId, User } from '.'
import { Workspace } from './workspace.m';

export interface Review {
	id?: ObjectId
	user_id: User['_id']
	workspace_id: Workspace['_id']
	data: string
	comment: string
	rating: number
}
