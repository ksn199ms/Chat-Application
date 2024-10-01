import {Router} from 'express'
import {verifyToken} from '../middlewares/AuthMiddleware.js'
import {searchContacts} from '../controllers/ContactController.js'

const contactRouter = Router()


contactRouter.post('/search',verifyToken, searchContacts)

export default contactRouter