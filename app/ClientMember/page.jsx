"use client";

import { useSession } from "next-auth/react";
import { redirect } from "next/dist/server/api-utils";

const Member = () => {
  const { data: session } = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/ClientMember");
    },
  });
  return (
    <div>
      <h1>Member Client Session</h1>
      <p>email: {session?.user?.email ? session?.user?.email : null}</p>
      <p>role: {session?.user?.role ? session.user.role : null}</p>
    </div>
  );
};

export default Member;
