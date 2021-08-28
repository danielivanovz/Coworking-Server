import { Router } from 'express'
import { WorkspaceController } from '../../controllers/workspaces.c'

export class WorkspaceLayer extends WorkspaceController {
	router: Router = Router()

	constructor() {
		super()
		this.layer
	}

	public layer() {
		this.router.get('/', this.getWorkspaces)
		this.router.post('/', this.addWorkspace)
		this.router.put('/', this.updateWorkspace)
		this.router.delete('/', this.deleteWorkspace)
		this.router.get('/retrieve', this.getWorkspacesIDByName)
		this.router.get('/:query', this.getWorkspacesByQuery)
		this.router.get('/:location/:name', this.getWorkspacesByCityAndName)
	}
}

export const workspace = new WorkspaceLayer()
