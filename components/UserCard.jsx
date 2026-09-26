"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useFavorite } from "@/context/FavoriteContext";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function UserCard({ user }) {
  const { isFavorite, toggleFavorite } = useFavorite();
  const favorited = isFavorite(user.id);

  const initials = user.name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  return (
    <Card className="group border border-white/10 bg-foreground/[0.03] transition-all hover:-translate-y-1 hover:border-foreground/20 hover:shadow-xl hover:shadow-black/20">
      <CardHeader>
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-primary/40 to-primary/10 text-sm font-semibold">
              {initials}
            </div>
            <CardTitle>{user.name}</CardTitle>
          </div>

          <Button
            type="button"
            variant="ghost"
            size="icon"
            onClick={() => toggleFavorite(user)}
            aria-label={
              favorited ? "Remove from Favourite" : "Add to Favourite"
            }
            className="shrink-0 rounded-full"
          >
            <Heart
              className={
                favorited
                  ? "size-5 fill-destructive text-destructive"
                  : "size-5 text-muted-foreground"
              }
            />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <p className="text-sm text-muted-foreground">{user.email}</p>

        <p className="mt-1 text-sm text-muted-foreground">
          {user.company.name}
        </p>

        <Button className="mt-4 w-full rounded-full">View Profile</Button>
      </CardContent>
    </Card>
  );
}