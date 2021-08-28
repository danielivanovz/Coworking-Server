import { Router } from 'express'

import pageRoot from './pages/pageRoot.c'
import page404 from './pages/page404.c'
import * as v1 from './v1/'

const router = Router()

router.use('/v1', new v1.RoutesLayer(router).router)

router.use(pageRoot)
router.use(page404)

export default router
