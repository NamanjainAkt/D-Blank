'use client';

import { renderIcon } from '@/components/ui/Icons';

interface Category {
  id: string;
  label: string;
  icon: string;
}

interface CardNavProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (id: string) => void;
  className?: string;
}

export function CardNav({
  categories,
  activeCategory,
  onCategoryChange,
  className = '',
}: CardNavProps) {
  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {categories.map((category) => (
        <button
          key={category.id}
          onClick={() => onCategoryChange(category.id)}
          className={`relative px-6 py-3 text-sm font-display font-bold uppercase tracking-wider transition-all duration-300 rounded-none hover:scale-[1.02] hover:-translate-y-0.5 active:scale-95 ${
            activeCategory === category.id
              ? 'text-black'
              : 'text-white/70 bg-white/5 border border-white/10 hover:text-white hover:border-neon-purple/50 hover:bg-white/[0.08]'
          }`}
        >
          {activeCategory === category.id && (
            <div
              className="absolute inset-0 bg-laser-cyan transition-all duration-300"
            />
          )}
          <span className="relative z-10 flex items-center gap-2">
            {renderIcon(category.icon as Parameters<typeof renderIcon>[0], { className: 'w-4 h-4' })}
            <span>{category.label}</span>
          </span>
        </button>
      ))}
    </div>
  );
}

export default CardNav;