import { NextRequest, NextResponse } from "next/server";
import Query from "@/lib/QueryApi";
import { adminDb } from "@/firebaseAdmin";
import admin from "firebase-admin";

export async function POST(request: NextRequest) {
  try {
    const { prompt, chatId, model, session } = await request.json();

    if (!prompt) {
      return NextResponse.json(
        { answer: "Your message was cutoff, please send again" },
        { status: 400 }
      );
    }

    if (!chatId) {
      return NextResponse.json({ answer: "No valid chat currently" }, { status: 400 });
    }

    const response = await Query(prompt, chatId, model);
    const message = {
      text: response || "No response",
      createdAt: admin.firestore.Timestamp.now(),
      user: {
        _id: "GROQ",
        name: "Llama_3:70b",
        avatar: "/assets/llama3_70b.png",
      },
    };

    await adminDb
      .collection("users")
      .doc(session?.user?.email)
      .collection("chats")
      .doc(chatId)
      .collection("messages")
      .add(message);

    return NextResponse.json({ answer: message.text }, { status: 200 });
  } catch (error:any) {
    return NextResponse.json({ answer: `Error: ${error.message}` }, { status: 500 });
  }
}
