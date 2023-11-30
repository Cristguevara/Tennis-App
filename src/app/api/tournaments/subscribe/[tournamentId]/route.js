import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Subscription from "@/models/subscriptions";

export async function GET(request, { params }) {
  connectDB();
  try {
    //console.log(params.tournamentId)
    const subscriptionsFound = await Subscription.find({'tournament.id':params.tournamentId});
    //console.log(subscriptionsFound)
    if (!subscriptionsFound)
      return NextResponse.json(
        { 
            ok: false,
            message: "Suscripciones no encontradas.",
        },
        {status: 404,}
      );

    return NextResponse.json(
        {ok:true, subscriptions:subscriptionsFound},
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

