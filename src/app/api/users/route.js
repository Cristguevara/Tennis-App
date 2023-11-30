import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import User from "@/models/users";

export async function GET(){
    try{
        connectDB()
        const users = await User.find({isAdmin:false})
        return NextResponse.json({
            ok:true,
            users
        },{status: 200})
    }catch(err){
        return NextResponse.json({
            ok:false,
            msg:'Error al buscar los usuarios.'
        },{status: 400})
    }
}

// export async function DELETE(){
//     try{
//         connectDB()
//         const users = await User.find({isAdmin:false})
//         return NextResponse.json({
//             ok:true,
//             users
//         },{status: 200})
//     }catch(err){
//         return NextResponse.json({
//             ok:false,
//             msg:'Error al buscar los usuarios.'
//         },{status: 400})
//     }
// }