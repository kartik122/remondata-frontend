
'use client'
import { UserButton } from "@clerk/nextjs";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";

export default async function DashboardPage() {
  const { userId } = useAuth();
  
  if (!userId) {
    redirect("/sign-in");
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <UserButton afterSignOutUrl="/" />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-xl font-semibold mb-4">Welcome to your dashboard!</h2>
        <p>This is a protected page, only visible after authentication.</p>
      </div>
    </div>
  );
}