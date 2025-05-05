'use client';

import { useTheme } from 'next-themes';
import { Moon, Sun } from 'lucide-react';
import Link from "next/link";
import { useAuth, useUser } from "@clerk/nextjs";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Menu } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { useState } from "react";

export function Navbar() {
  const { userId } = useAuth();
  const { user } = useUser();
  const [isOpen, setIsOpen] = useState(false);

  const teamsDropdown = [
    { title: "Premier League Teams", href: "/teams/premier-league" },
    { title: "La Liga Teams", href: "/teams/la-liga" },
    { title: "Bundesliga Teams", href: "/teams/bundesliga" },
    { title: "Serie A Teams", href: "/teams/serie-a" },
  ];

  const leaguesDropdown = [
    { title: "Premier League", href: "/leagues/premier-league" },
    { title: "La Liga", href: "/leagues/la-liga" },
    { title: "Bundesliga", href: "/leagues/bundesliga" },
    { title: "Serie A", href: "/leagues/serie-a" },
  ];

  const matchesDropdown = [
    { title: "Live Matches", href: "/matches/live" },
    { title: "Today's Matches", href: "/matches/today" },
    { title: "Upcoming Matches", href: "/matches/upcoming" },
    { title: "Results", href: "/matches/results" },
  ];

  const { theme, setTheme } = useTheme();
  return (
    <nav className="border-b">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex-shrink-0">
            <h1 className="text-xl font-bold">RemonData</h1>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <NavigationMenu>
              <NavigationMenuList>
                <NavigationMenuItem>
                  <NavigationMenuTrigger>Teams</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {teamsDropdown.map((team) => (
                        <li key={team.href}>
                          <Link
                            href={team.href}
                            className="block p-2 hover:bg-accent rounded-md"
                          >
                            {team.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Leagues</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {leaguesDropdown.map((league) => (
                        <li key={league.href}>
                          <Link
                            href={league.href}
                            className="block p-2 hover:bg-accent rounded-md"
                          >
                            {league.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                <NavigationMenuItem>
                  <NavigationMenuTrigger>Matches</NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <ul className="grid w-[400px] gap-3 p-4">
                      {matchesDropdown.map((match) => (
                        <li key={match.href}>
                          <Link
                            href={match.href}
                            className="block p-2 hover:bg-accent rounded-md"
                          >
                            {match.title}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </NavigationMenuContent>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Section */}
          <div className="hidden md:flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
            >
              <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
              <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
              <span className="sr-only">Toggle theme</span>
            </Button>
            {userId ? (
              <Link href="/profile">
                <Avatar>
                  <AvatarImage src={user?.imageUrl} />
                  <AvatarFallback>
                    {user?.firstName?.charAt(0)}
                    {user?.lastName?.charAt(0)}
                  </AvatarFallback>
                </Avatar>
              </Link>
            ) : (
              <div className="flex gap-2">
                <Link href="/sign-in">
                  <Button variant="default">Sign In</Button>
                </Link>
                <Link href="/sign-up">
                  <Button variant="outline">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right">
                <div className="flex flex-col gap-4 pt-4">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">Teams</h2>
                    {teamsDropdown.map((team) => (
                      <Link
                        key={team.href}
                        href={team.href}
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-accent rounded-md"
                      >
                        {team.title}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">Leagues</h2>
                    {leaguesDropdown.map((league) => (
                      <Link
                        key={league.href}
                        href={league.href}
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-accent rounded-md"
                      >
                        {league.title}
                      </Link>
                    ))}
                  </div>
                  <div className="flex flex-col gap-2">
                    <h2 className="text-lg font-semibold">Matches</h2>
                    {matchesDropdown.map((match) => (
                      <Link
                        key={match.href}
                        href={match.href}
                        onClick={() => setIsOpen(false)}
                        className="p-2 hover:bg-accent rounded-md"
                      >
                        {match.title}
                      </Link>
                    ))}
                  </div>
                  {!userId && (
                    <div className="flex flex-col gap-2 mt-4">
                      <Link href="/sign-in">
                        <Button className="w-full" onClick={() => setIsOpen(false)}>
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/sign-up">
                        <Button variant="outline" className="w-full" onClick={() => setIsOpen(false)}>
                          Sign Up
                        </Button>
                      </Link>
                    </div>
                  )}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}