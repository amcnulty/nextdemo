/* eslint-disable @typescript-eslint/no-misused-promises */
import Layout from "~/components/layout";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Account() {
  const { data: session } = useSession();

  return (
    <Layout>
      <div className="flex h-screen flex-col justify-center text-center">
        {session ? (
          <>
            <h1 className="text-xl mb-8 font-bold">
              Welcome {session.user.name}
            </h1>
            <span className="text-center">
              <button className="btn btn-warning" onClick={() => signOut()}>
                Sign Out
              </button>
            </span>
          </>
        ) : (
          <>
            <h1 className="text-xl mb-8 font-bold text-center">Account Login</h1>
            <span className="text-center">
              <button className="btn btn-primary" onClick={() => signIn()}>
                Sign In
              </button>
            </span>
          </>
        )}
      </div>
    </Layout>
  );
}
