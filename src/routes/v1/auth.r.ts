import { Router } from 'express'
import { AuthController } from '../../controllers/auth.c'

export class AuthLayer extends AuthController{
	router: Router = Router()
	
	constructor() {
		super()
		this.layer()
	}

	public layer() {
		this.router.post('/login', this.login)
		this.router.post('/signup', this.signup)
		this.router.post('/logout', this.logout)
	} 
	
}

export const auth = new AuthLayer()
