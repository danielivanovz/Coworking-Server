import { ObjectId } from '.'
import { Reservation, WorkspaceType } from '../types/commons'

export interface Space {
	_id: ObjectId
	reservation: Reservation
	type: WorkspaceType
	area: string
	max_seat: number
	media: string
}
