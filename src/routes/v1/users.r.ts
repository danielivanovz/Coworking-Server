import { Router } from 'express'
import { UserController } from '../../controllers/users.c'

export class UserLayer extends UserController {
	router: Router = Router()

	constructor() {
		super()
		this.layer()
	}

	public layer() {
		this.router.get('/', this.getUsers)
		this.router.post('/', this.addUser)
		this.router.put('/', this.updateUser)
		this.router.delete('/', this.deleteUser)

		this.router.get('/retrieve', this.getUserIDbyUsername)
		this.router.get('/id', this.getUserByID)
		this.router.get('/:query', this.getUserWithQuery)
	}
}

export const user = new UserLayer()
