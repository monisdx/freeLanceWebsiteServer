import jwt from 'jsonwebtoken'

const JWT_SECRET = "idhgfuighuehgkjjg" ;

export const fetchuser = ( req , res , next ) =>{
      const token = req.header('token') ;
      if ( !token ) {
      console.log("No token");
       return res.status(500).send({error:'please authenticate with valid token '}) ;
      }
      try {
         const data = jwt.verify(token , JWT_SECRET) ;
         console.log(data) ;
         req.user_name = data ;
         next() ;
      } catch (error) {
       return res.status(401).send({error:'please authenticate with valid token '}) ;
      }
}