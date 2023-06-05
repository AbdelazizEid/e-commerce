import Link from "next/link";
import { useUser } from "@auth0/nextjs-auth0/client";

type LayoutProps = {
  children: React.ReactNode;
};

const Layout = ({ children }: LayoutProps) => {
  const { user, isLoading } = useUser();
  if (isLoading) return <div>loading...</div>;
  return (
    <div className="min-h-[100vh]">
      <header className="flex h-20 w-full items-center border-b px-6 shadow-xl">
        <div className="grow ">Logo</div>
        {!user?.nickname ? (
          <Link
            href="/api/auth/login"
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
          >
            Login
          </Link>
        ) : (
          <div className="">
            <span>
              Hi
              <Link
                className="mx-2 underline"
                href={`${user?.sub || "profile"}`}
              >
                {user?.nickname}!
              </Link>
            </span>
            <Link
              href="/api/auth/logout"
              className="rounded bg-red-500 px-4 py-2 font-bold text-white hover:bg-red-700"
            >
              Logout
            </Link>
          </div>
        )}
      </header>
      {children}
    </div>
  );
};

export default Layout;
