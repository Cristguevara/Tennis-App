import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Tournament from "@/models/tournaments";

export async function GET(){
    connectDB()
    const tournaments = await Tournament.find()
    return NextResponse.json({
        ok:true,
        tournaments
    }, { status: 200 })
}

export async function POST(req){
    connectDB()
    const body = await req.json()

    const {name, details} = body

    if(!name || !details){
        return NextResponse.json(
            { ok:false, message: 'Faltan datos.' },
            { status: 400 }
          );
    }

    const tournamentFind = await Tournament.findOne({ name });

    if(tournamentFind){
        return NextResponse.json(
            {  message: 'El nombre ya existe.' },
            { status: 200 }
          );
    }

    const newTournament = new Tournament(body)
    const savedTournament = await newTournament.save()
    // console.log(savedTournament)
    return NextResponse.json(
        { ok:true, message: 'El torneo se guardó correctamente.'},
        {status: 200}
    )
}