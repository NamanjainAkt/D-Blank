import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface Course {
  _id: string;
  title: string;
  slug: string;
  shortDescription: string;
  fullDescription: string;
  duration: string;
  schedule: string;
  price: number;
  originalPrice?: number;
  category: string;
  tags?: string[];
  thumbnailUrl?: string;
  syllabusUrl?: string;
  totalSeats: number;
  enrolledCount: number;
  meetLink?: string;
  instructorName?: string;
  isPublished: boolean;
  createdAt?: Date;
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
  }).format(amount);
}

export function generateEnrollmentId(): string {
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `VL-${timestamp}-${random}`;
}

export function formatDate(date: Date | string): string {
  return new Intl.DateTimeFormat('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).format(new Date(date));
}

export function calculateSeatsLeft(totalSeats: number, enrolledCount: number): number {
  return Math.max(0, totalSeats - enrolledCount);
}
