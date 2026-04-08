'use client';

import * as React from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

interface FounderCardProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  index: number;
}

export function FounderCard({ name, role, image, bio, index }: FounderCardProps) {
  return (
    <Card className="relative rounded-xl overflow-hidden border border-zinc-800/80 hover:border-primary/40 transition-all duration-500 group bg-zinc-900/30">
      {/* 3:4 Aspect Ratio Image Container */}
      <div className="relative aspect-[3/4] overflow-hidden">
        <Image
          src={image}
          alt={name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-700"
        />
        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/20 to-transparent opacity-80" />
        
        {/* Role chip */}
        <div className="absolute top-4 right-4 z-10">
          <Badge variant="outline" className="bg-black/60 border-primary/40 text-primary backdrop-blur-sm uppercase text-[10px] tracking-widest px-2.5 py-1">
            {role.split(" ")[0]}
          </Badge>
        </div>
      </div>

      <CardHeader className="p-5 pb-1">
        <div className="flex items-center gap-3">
          <Avatar className="w-8 h-8 border border-primary/20">
            <AvatarImage src={image} alt={name} className="object-cover" />
            <AvatarFallback className="bg-zinc-800 text-xs text-primary font-bold">
              {name.split(' ').map(n => n[0]).join('')}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-bold text-white text-sm tracking-wide leading-none">
              {name}
            </h3>
            <p className="text-primary text-[11px] mt-1 font-medium leading-none">
              {role}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className="p-5 pt-2">
        <p className="text-zinc-500 text-xs line-clamp-3 leading-relaxed">
          {bio}
        </p>
      </CardContent>

      {/* Bottom hover accent */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-400" />
    </Card>
  );
}
