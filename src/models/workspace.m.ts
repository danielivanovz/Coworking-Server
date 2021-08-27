import { Review, Space, ObjectId, Course, Partner } from '.'

export interface Workspace {
	_id?: ObjectId
	name: string
	owner: string
	email: string
	space: Array<Space>
	review: Array<Review>
	address: {
		street: string
		street_number: string
		city: string
		country: string
		post_code: string
		location: {
			lat: string
			lon: string
		}
	}
	phone_number: string
	description: string
	media: string
	timetable: {
		open: string
		close: string
	}
	course: Array<Course>
	partner_id: Array<Partner>
	average_review: string
}
