import { NextRequest, NextResponse } from "next/server";
import { db } from "@/lib/firebase";
import { doc, setDoc, deleteDoc } from "firebase/firestore";

export async function POST(request: NextRequest) {
  try {
    const { userId, subscription } = await request.json();
    if (!userId || !subscription) {
      return NextResponse.json(
        { error: "Missing userId or subscription" },
        { status: 400 }
      );
    }

    await setDoc(
      doc(db, "pushSubscriptions", userId),
      {
        subscription,
        updatedAt: new Date(),
      },
      { merge: true }
    );

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Subscribe error:", err);
    return NextResponse.json({ error: "Failed to save subscription" }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const { userId } = await request.json();
    if (!userId) {
      return NextResponse.json({ error: "Missing userId" }, { status: 400 });
    }

    await deleteDoc(doc(db, "pushSubscriptions", userId));
    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Unsubscribe error:", err);
    return NextResponse.json({ error: "Failed to remove subscription" }, { status: 500 });
  }
}
