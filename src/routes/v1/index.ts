import { Router } from 'express'
import { space, SpaceLayer } from './space.r'
import { auth, AuthLayer } from './auth.r'
import { workspace, WorkspaceLayer } from './workspace.r'
import { Mixin } from 'ts-mixer'
import { user, UserLayer } from './users.r'

export class RoutesLayer extends Mixin(AuthLayer, SpaceLayer, UserLayer, WorkspaceLayer) {
	router: Router

	constructor(router: Router) {
		super()
		this.router = router
		this.routes()
	}

	public routes() {
		this.router.use('/auth', auth.router)
		this.router.use('/space', space.router)
		this.router.use('/user', user.router)
		this.router.use('/workspace', workspace.router)
	}
}
