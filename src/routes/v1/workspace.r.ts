import { Router } from 'express'
import * as workspaceController from '../../controllers/workspaces.c'

const router = Router()

router.get('/', workspaceController.getWorkspaces)
router.post('/', workspaceController.addWorkspace)
router.put('/', workspaceController.updateWorkspace)
router.delete('/', workspaceController.deleteWorkspace)

router.get('/retrieve', workspaceController.getWorkspacesIDByName)
router.get('/:query', workspaceController.getWorkspacesByQuery)
router.get('/:location/:name', workspaceController.getWorkspacesByCityAndName)

export default router
