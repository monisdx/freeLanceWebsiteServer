import express from 'express' ;
import {createJob , Apply_job , All_jobs_of_client , job_by_id, alljobs, deletejob, user_applied_jobs, Remove_job, filterbycategory} from '../controllers/jobs.js'
import {fetchuser} from '../middleware/fetchuser.js'; 

const router = express.Router();

router.post('/create_job' , fetchuser ,createJob);
router.post('/apply' ,fetchuser, Apply_job)
router.get('/revoke/:jobid' , fetchuser , Remove_job)
router.get('/jobs_of_client' ,fetchuser, All_jobs_of_client);
router.get('/alljobs' , alljobs);
router.get('/jobsbyid/:id', job_by_id);
router.delete('/deletejob/:id', deletejob);
router.get('/applied_job',fetchuser, user_applied_jobs);
router.post('/filterbycategory' , filterbycategory);

export default router ;