'use client';
import Link from "next/link";
import { useAuth } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Home = () => {
  const { userId } = useAuth();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-6">
          Welcome to Our App
        </h1>
        <p className="text-lg mb-8">
          Built with Next.js, TanStack Query, shadcn UI, Clerk Auth, and Tailwind CSS
        </p>
        
        {isClient && (
          <div className="flex gap-4 justify-center">
            {userId ? (
              <Link 
                href="/dashboard"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
              >
                Go to Dashboard
              </Link>
            ) : (
              <>
                <Link 
                  href="/sign-in"
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md"
                >
                  Sign In
                </Link>
                <Link 
                  href="/sign-up"
                  className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-md"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </main>
  );
}

export default Home;