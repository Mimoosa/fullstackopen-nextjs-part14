import { NextRequest, NextResponse } from "next/server";

import { createTestUser } from "../../../services/users";
import { revalidatePath } from "next/cache";

export const POST = async (req: NextRequest) => {
  const body = await req.json();
  const { username, name, password } = body;

  await createTestUser(username, name, password);

  revalidatePath("/users");
  return NextResponse.json({ success: true }, { status: 201 });
};
