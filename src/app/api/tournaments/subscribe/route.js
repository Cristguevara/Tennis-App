import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Subscription from "@/models/subscriptions";
import Tournament from "@/models/tournaments";
import User from "@/models/users";

export async function GET(){
    try{
        connectDB()
        const tournaments = await Tournament.find()
        return NextResponse.json({
            tournaments
        })
    }catch(err){
        console.log('Error: ',err)
        return NextResponse.json(
            {ok:false,  message: err},
            {status: 400}
        )
    }
}

export async function POST(req){

    try{
        connectDB()
        const body = await req.json()
    
        const {tournamentId, userId} = body
    
        if(!tournamentId || !userId){
            NextResponse.json(
                {ok:false,  message: 'Debe existir el id del jugador y del torneo'},
                {status: 400}
            )
        }
    
        const tournamentFind = await Tournament.findOne({_id:tournamentId});
        const userFind = await User.findOne({_id:userId});
        console.log(tournamentFind)
        console.log(userFind)
    
        if(!tournamentFind || !userFind){
            return NextResponse.json(
                { message: 'El torneo o el jugador no existen' },
                { status: 200 }
              );
        }
    
        const newSubscription = new Subscription({
            tournament:{
                id: tournamentId,
                name: tournamentFind.name,
            } ,
            player:{
                id: userId,
                email: userFind.email,
            }
        })
        const savedSubscription = await newSubscription.save()
        console.log(savedSubscription)
        return NextResponse.json(
            {ok:true, message: 'El jugador se inscribió correctamente.'},
            {status: 200}
        )
    }catch(err){
        console.log('Error: ',err)
        return NextResponse.json(
            {ok:false,  message: err},
            {status: 400}
        )
    }
    
}

export async function DELETE(req) {
    connectDB();
    try {
      const body = await req.json()
      const { id } = body 
      const subscriptionsFound = await Subscription.findByIdAndDelete(id);
      console.log(subscriptionsFound)
      if (!subscriptionsFound)
        return NextResponse.json(
          { 
              ok: false,
              message: "Suscripción no encontrada.",
          },
          {status: 404,}
        );
  
      return NextResponse.json(
          {ok:true, message: 'Suscripción eliminada.' },
          {status:200}
      );
    } catch (error) {
      return NextResponse.json(
          { 
              ok: false,
              message: "Error al encontrar la suscripción",
          }
          , {status: 400,}
      );
    }
  }