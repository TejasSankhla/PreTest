// ─────────────────────────────────────────────────────────────────────────────
// COMMON TYPES
// Shared type definitions used across multiple modules
// ─────────────────────────────────────────────────────────────────────────────

/**
 * Standard paginated response structure
 */
export interface PaginatedResult<T> {
  data: T[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNext: boolean;
    hasPrev: boolean;
  };
}
