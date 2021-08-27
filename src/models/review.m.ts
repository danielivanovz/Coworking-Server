import { ObjectId, User } from '.'

export interface Review {
	id?: ObjectId
	user_id: User['_id']
	wordspace_id: User['_id']
	data: string
	comment: string
	rating: number
}
