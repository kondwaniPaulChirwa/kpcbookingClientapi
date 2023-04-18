import  Jwt  from "jsonwebtoken";

export const verifyToken = (req,res,next)=>{
    const token = req.cookies.access_token

    if(!token){
        return next("no token")
    }

    Jwt.verify(token,process.env.JWT, (err,user)=>{
        if(err) return next("no token")

        req.user = user
        next()
    })

}

export const verifyUser = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.id === req.params.id || req.user.isAdmin){
            next()
        }else{
            next("eror man")
        }
    })
}

export const verifyAdmin = (req,res,next)=>{
    verifyToken(req,res,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            next("eror man")
        }
    })
}