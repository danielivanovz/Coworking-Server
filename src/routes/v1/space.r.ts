import { Router } from 'express'
import { SpaceController } from '../../controllers/space.c'


export class SpaceLayer extends SpaceController {
	router: Router = Router()

	constructor() {
		super()
		this.layer()
	}

	public layer() {
		this.router.get('/', this.getSpace)
		this.router.post('/', this.addSpace)
		this.router.put('/', this.updateSpace)
		this.router.delete('/', this.deleteSpace)
		this.router.get('/retrieve', this.getSpaceByID)
	}
}

export const space = new SpaceLayer()
