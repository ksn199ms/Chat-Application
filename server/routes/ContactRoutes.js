import {Router} from 'express'
import {verifyToken} from '../middlewares/AuthMiddleware.js'
import {getContactsForDMList, searchContacts} from '../controllers/ContactController.js'

const contactRouter = Router()


contactRouter.post('/search',verifyToken, searchContacts)
contactRouter.get('/get-contacts-for-dm',verifyToken, getContactsForDMList)

export default contactRouter