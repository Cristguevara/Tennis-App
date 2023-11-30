import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import User from "@/models/users";
import generarJWT from "@/utils/generateJWT";
import validEmail from "@/utils/validEmail";
import bcrypt from "bcryptjs";

export async function POST(req){
    try{
        await connectDB()

        const body = await req.json()
        //console.log(body)
        const {email, password} = body

        if (!email || !password) {
            return NextResponse.json(
                {ok:false, message: 'Se requiere email y contraseña'},
                {status: 400}
            );
        }

        if (!validEmail(email)) {
            return NextResponse.json(
                {ok:false, message: 'Email no válido'},
                {status: 400}
            );
        }

        const userFind = await User.findOne({ email });
    
        if(!userFind){
            return NextResponse.json(
                {ok:false, message: 'El email no está registrado.' },
                { status: 400 }
              );
        }

        const isCorrect = await bcrypt.compare(
            password,
            userFind.password
        );

        if (!isCorrect) {
            return NextResponse.json(
                { ok:false, message: 'La contraseña es incorrecta.' },
                { status: 400 }
            );
        }

        //console.log(userSaved)
        const token = await generarJWT(userFind._id,userFind.email, userFind.isAdmin)
    
    
        return NextResponse.json(
            {
                ok: true,
                email:email,
                token
            },
            {status: 200}
        )

    }catch(err){
        console.log(err)
        return NextResponse.json(
            {ok: false},
            {status: 400}
        )
    }
}

