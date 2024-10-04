import {Router} from 'express'
import {verifyToken} from '../middlewares/AuthMiddleware.js'
import {getAllContacts, getContactsForDMList, searchContacts} from '../controllers/ContactController.js'

const contactRouter = Router()


contactRouter.post('/search',verifyToken, searchContacts)
contactRouter.get('/get-contacts-for-dm',verifyToken, getContactsForDMList)
contactRouter.get('/get-all-contacts',verifyToken, getAllContacts)

export default contactRouter