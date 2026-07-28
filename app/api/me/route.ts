import { NextResponse } from "next/server";
import { getUserByToken } from "../../services/users";

export const POST = async (request: Request) => {
  const authorization = request.headers.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    const token = authorization.replace("Bearer ", "");

    const user = await getUserByToken(token);

    if (user) {
      console.log(user);
      return NextResponse.json(user);
    } else {
      return NextResponse.json(
        { error: "Missing or invalid authorization header" },
        { status: 401 },
      );
    }
  } else {
    return NextResponse.json(
      { error: "Missing or invalid authorization header" },
      { status: 401 },
    );
  }
};
