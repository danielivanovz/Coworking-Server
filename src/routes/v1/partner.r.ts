import { Router } from 'express'
import { PartnerController } from '../../controllers/partner.c'

export class PartnerLayer extends PartnerController {
	router: Router = Router()

	constructor() {
		super()
		this.layer()
	}

	public layer() {
		this.router.get('/', this.getPartner)
		this.router.post('/', this.addPartner)
		this.router.put('/', this.updatePartner)
		this.router.delete('/', this.deletePartner)
		this.router.get('/retrieve', this.getPartnerByQuery)
	}
}

export const partner = new PartnerLayer()
