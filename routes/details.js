import express from 'express' ;
import { save_Details , getDetails, getDetailsbyid} from '../controllers/details.js';
import {fetchuser} from '../middleware/fetchuser.js'; 
import singleUpload from '../middleware/multer.js';

const router = express.Router();

router.post('/save' ,singleUpload ,  fetchuser ,save_Details);
router.get('/getDetails' , fetchuser ,getDetails);
router.get('/getDetailsbyid/:id'  ,getDetailsbyid);


export default router ;