"use client";

import Link from "next/link";

import { useFavorite } from "@/context/FavoriteContext";
import { Button } from "@/components/ui/button";
import UserCard from "@/components/UserCard";

export default function FavoritesPage() {
  const { favorites } = useFavorite();

  return (
    <div className="mx-auto max-w-6xl px-6 py-20">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="text-sm font-semibold text-primary">Favorite</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight md:text-5xl">
            My Favorite Users 
            <p>
            <Button asChild className="rounded-full">
            <Link href="/users">Browse User Directory</Link>
            </Button>
            </p>
          </h1>
          <p className="mt-4 text-muted-foreground">
            Data ini diambil langsung dari FavoriteContext.
          </p>
        </div>

        
      </div>

      {favorites.length === 0 ? (
        <p className="mt-10 text-muted-foreground">
          Belum ada user yang ditambahkan ke favorite.
        </p>
      ) : (
        <div className="mt-10 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {favorites.map((user) => (
            <UserCard key={user.id} user={user} />
          ))}
        </div>
      )}
    </div>
  );
}