"use client"

import Link from "next/link";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function PortalHeader({ clientName }: { clientName: string }) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/5 luxury-blur">
      <div className="container mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/" className="group flex items-center gap-1">
            <span className="font-headline font-bold text-lg tracking-tighter">BLACKNOVA</span>
            <span className="font-headline font-extralight text-lg tracking-tighter text-secondary-foreground group-hover:text-foreground transition-colors">STUDIO</span>
          </Link>
        </div>

        <div className="flex items-center gap-5">
          <div className="hidden sm:block text-right">
            <p className="text-sm font-semibold text-white tracking-tight">{clientName}</p>
            <p className="text-[10px] uppercase tracking-[0.15em] font-bold text-muted-foreground/80">Premium Partner</p>
          </div>
          
          <div className="relative">
            <Avatar className="h-10 w-10 border border-white/10 shadow-lg cursor-default">
              <AvatarImage src={`https://api.dicebear.com/7.x/initials/svg?seed=${clientName}`} />
              <AvatarFallback className="bg-white/5 text-[10px] font-bold">{clientName.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 bg-primary border-2 border-background rounded-full" />
          </div>
        </div>
      </div>
    </header>
  );
}