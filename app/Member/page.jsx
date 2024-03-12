import { getServerSession } from "next-auth";
import { options } from "../api/auth/[...nextauth]/options";
import { redirect } from "next/navigation";


const Member = async() => {
  const session = await getServerSession(options)

  if(!session){
    redirect("/api/auth/signin?callbackUrl=/Member");
  }
  
  return (
    <div>
      <h1>Member server session</h1>
      <p>email: {session?.user?.email ? session?.user?.email : null}</p>
      <p>role: {session?.user?.role ? session.user.role : null}</p>

    </div>
  );
};

export default Member;
