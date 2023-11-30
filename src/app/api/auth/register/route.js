import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import User from "@/models/users";
import generarJWT from "@/utils/generateJWT";
import validEmail from "@/utils/validEmail";
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
        connectDB()

        const body = await req.json()

        const {name, email, password, isAdmin} = body
    
        if (!email || !password) {
            return NextResponse.json(
                {ok:false, message: 'Se requiere email y contraseña'},
                {status: 400}
            );
        }
    
        if (!validEmail(email)) {
            return NextResponse.json(
                {ok:false,message: 'Email no válido'},
                {status: 400}
            );
        }
    
        const userFind = await User.findOne({ email });
    
        if(userFind){
            return NextResponse.json(
                {ok:false, message: 'El correo electrónico ya existe registrado.' },
                { status: 200 }
              );
        }
    
        const hashedPassword = await bcrypt.hash(password, 10);
        //console.log(isAdmin)
        const dbUser = new User({
            name: name ? name : '',
            email,
            password: hashedPassword,
            isAdmin: isAdmin?true:false
        })
        const userSaved = await dbUser.save()
        //console.log(userSaved)
        const token = await generarJWT(userSaved._id,userSaved.email, userSaved.isAdmin)
    
    
        return NextResponse.json(
            {
                ok: true,
                email:email,
                token
            },
            {status: 200}
        )

    }catch(err){
        //console.log('Error: ',err)
        return NextResponse.json(
            {
                ok: false,
            },
            {status: 400}
        )
    }
}