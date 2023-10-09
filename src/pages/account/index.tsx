/* eslint-disable @typescript-eslint/no-misused-promises */
import Layout from "~/components/layout";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Account() {
  const { data: session } = useSession();

  return (
    <Layout>
      {session ? (
        <>
          <h1>Welcome {session.user.name}</h1>
          <button className="btn btn-warning" onClick={() => signOut()}>
            Sign In
          </button>
        </>
      ) : (
        <>
          <h1>Account Login</h1>
          <button className="btn btn-primary" onClick={() => signIn()}>
            Sign In
          </button>
        </>
      )}
    </Layout>
  );
}
