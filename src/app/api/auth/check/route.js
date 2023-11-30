import { NextResponse } from "next/server";
import { headers } from "next/headers";
import jwt from "jsonwebtoken";
import generarJWT from "@/utils/generateJWT";
import User from "@/models/users";
import { connectDB } from "@/utils/mongoose";

export async function GET(){
    try{
        connectDB()

        const headersList = headers();
        const token = headersList.get("token");
        //console.log(token)
        
        if(!token){
            return NextResponse.json({
                ok:false
            })
        }

        const { uid, email, isAdmin } = jwt.verify( token, process.env.SECRET_JWT_SEED );

        const newToken = await generarJWT(uid,email,isAdmin)

        const userFind = await User.findOne({ email });
        //console.log(userFind)
    
        return NextResponse.json(
            {
                ok: true,
                email:email,
                id: userFind._id,
                isAdmin : userFind.isAdmin,
                newToken
            },
            {status: 200}
        )

    }catch(err){
        console.log('Error: ',err)
        return NextResponse.json({
            ok:false,
            msg: 'Token no válido'
        })
    }
    
}