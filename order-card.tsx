"use client"

import { Order } from "@/lib/firebase/orders";
import { Badge } from "@/components/ui/badge";
import { Calendar, ChevronRight } from "lucide-react";
import { format } from "date-fns";

export function OrderCard({ order }: { order: Order }) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Pending': return 'bg-white/5 text-muted-foreground border-white/10';
      case 'In Progress': return 'bg-primary/5 text-primary border-primary/20';
      case 'Completed': return 'bg-accent/5 text-accent border-accent/20';
      default: return 'bg-muted text-muted-foreground';
    }
  };

  const formattedDate = order.createdAt?.seconds 
    ? format(new Date(order.createdAt.seconds * 1000), 'MMM d, yyyy')
    : 'Initializing...';

  return (
    <div className="group relative flex flex-col p-8 bg-card border border-white/5 rounded-[2.5rem] card-hover cursor-pointer overflow-hidden">
      {/* Decorative Blur Background */}
      <div className="absolute -top-24 -right-24 h-48 w-48 bg-primary/5 blur-[80px] rounded-full pointer-events-none group-hover:bg-primary/10 transition-all duration-700" />
      
      <div className="flex items-start justify-between mb-8 relative z-10">
        <div className="space-y-2">
          <h3 className="text-2xl font-bold tracking-tight group-hover:text-primary transition-colors text-white">
            {order.projectName}
          </h3>
          <div className="flex items-center gap-3">
            <Calendar className="h-3 w-3 text-muted-foreground" />
            <span className="text-[10px] text-muted-foreground font-bold uppercase tracking-[0.1em]">
              {formattedDate}
            </span>
          </div>
        </div>
        <Badge variant="outline" className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest border transition-all duration-500 ${getStatusColor(order.status)}`}>
          {order.status}
        </Badge>
      </div>

      <p className="text-sm text-secondary-foreground line-clamp-2 mb-10 leading-relaxed font-light h-10 relative z-10">
        {order.projectDescription}
      </p>

      <div className="flex items-center justify-between mt-auto relative z-10">
        <div className="px-4 py-1.5 rounded-full bg-white/5 border border-white/5 text-[9px] uppercase tracking-[0.2em] text-muted-foreground font-black">
          {order.projectType}
        </div>
        <div className="h-11 w-11 rounded-full bg-white/5 border border-white/5 flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-primary-foreground group-hover:border-primary transition-all duration-500 transform group-hover:scale-110">
          <ChevronRight className="h-5 w-5" />
        </div>
      </div>
    </div>
  );
}