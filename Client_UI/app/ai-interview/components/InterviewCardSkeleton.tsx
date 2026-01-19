"use client";

import { Skeleton, SkeletonText } from "@/components/atoms";

export function InterviewCardSkeleton() {
  return (
    <div className="bg-white rounded-2xl border border-border p-5 sm:p-6 flex flex-col h-[340px]">
      {/* Header */}
      <div className="mb-3 pr-20">
        <Skeleton className="h-6 w-3/4 mb-2" />
        <div className="flex items-center gap-2">
          <Skeleton className="h-4 w-1/3" />
          <Skeleton className="h-5 w-14 rounded-full" />
        </div>
      </div>

      {/* Description - 3 lines */}
      <SkeletonText lines={3} className="mb-4" />

      {/* Focus Areas */}
      <div className="flex gap-1.5 mb-4">
        <Skeleton className="h-5 w-20 rounded-full" />
        <Skeleton className="h-5 w-16 rounded-full" />
        <Skeleton className="h-5 w-24 rounded-full" />
      </div>

      {/* Spacer */}
      <div className="flex-grow" />

      {/* Stats Row */}
      <div className="flex items-center gap-4 mb-4">
        <Skeleton className="h-4 w-16" />
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-10" />
      </div>

      {/* CTA */}
      <Skeleton className="h-10 w-full rounded-xl" />
    </div>
  );
}
