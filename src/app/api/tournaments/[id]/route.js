import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Tournament from "@/models/tournaments";
import Subscription from "@/models/subscriptions";

export async function GET(request, { params }) {
  connectDB();
  try {
    //console.log(params.id)
    const tournamentFound = await Tournament.findById(params.id);
    //console.log(tournamentFound)
    if (!tournamentFound)
      return NextResponse.json(
        { 
            ok: false,
            message: "Torneo no encontrado.",
        },
        {status: 404,}
      );

    return NextResponse.json(
        {ok:true, tournament:tournamentFound},
        {status:200}
    );
  } catch (error) {
    return NextResponse.json(
        { 
            ok: false,
            message: "Id inválido.",
        }
        , {status: 400,}
    );
  }
}

export async function PUT(req, { params }) {
  connectDB();
  try {
    const body = await req.json()
    //console.log(params.id)
    const tournamentUpdated = await Tournament.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    //console.log(tournamentFound)
    if (!tournamentUpdated)
      return NextResponse.json(
        { 
            ok: false,
            message: "Torneo no encontrado.",
        },
        {status: 404,}
      );

    return NextResponse.json(
        {ok:true, msg:'Torneo actualizado'},
        {status:200}
    );
  } catch (error) {
    return NextResponse.json(
        { 
            ok: false,
            message: error,
        }
        , {status: 400,}
    );
  }
}

export async function DELETE(request, { params }) {
  connectDB();

  try {
    console.log(params.id)
    const tournamentFound = await Tournament.findByIdAndDelete(params.id);
    const suscriptionsDeleted = await Subscription.deleteMany({'tournament.id':params.id})
    //console.log(tournamentFound)
    if (!tournamentFound)
      return NextResponse.json(
        { 
            ok: false,
            msg: "Torneo no encontrado.",
        },
        {status: 404,}
      );

    return NextResponse.json(
        {ok:true, msg:'Eliminado correctamente'},
        {status:200}
    );
  } catch (error) {
    return NextResponse.json({ok:false, msg:'Error catch'}, {
      status: 400,
    });
  }
}