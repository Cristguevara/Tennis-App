import { NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import User from "@/models/users";
import Subscription from "@/models/subscriptions";

export async function GET(request, { params }) {
  connectDB();
  try {
    console.log(params.id)
    const user = await User.findById(params.id);

    if (!user)
      return NextResponse.json(
        { 
            ok: false,
            message: "usuario no encontrado.",
        },
        {status: 404,}
      );

    return NextResponse.json(
        {ok:true, user:user},
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
    const { name } = body
    console.log(name)

    const userModified = await User.findByIdAndUpdate(params.id, body, {
      new: true,
    });
    console.log(userModified)
    if (!userModified)
      return NextResponse.json(
        { 
            ok: false,
            message: "Usuario no encontrado.",
        },
        {status: 404,}
      );

    return NextResponse.json(
        {ok:true, msg:'Usuario actualizado'},
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
    const userFound = await User.findByIdAndDelete(params.id);
    const suscriptionsDeleted = await Subscription.deleteMany({'player.id':params.id})
    if (!userFound)
      return NextResponse.json(
        { 
            ok: false,
            msg: "Usuario no encontrado.",
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