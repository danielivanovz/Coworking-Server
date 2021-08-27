import { Router } from 'express'

import * as spaceController from '../../controllers/space.c'

const router = Router()

router.get('/', spaceController.getSpace)
router.post('/', spaceController.addSpace)
router.put('/', spaceController.updateSpace)
router.delete('/', spaceController.deleteSpace)

router.get('/retrieve', spaceController.getSpaceByID)

export default router
