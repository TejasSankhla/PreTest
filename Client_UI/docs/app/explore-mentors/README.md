# Explore Mentors

## Overview

Mentor discovery feature allowing users to browse and search for available mentors. Uses server-side data fetching with client-side filtering.

## Routes

| Route | File | Description |
|-------|------|-------------|
| `/explore-mentors` | [page.tsx](./page.md) | Main explore page |

## Components

| Component | File | Description |
|-----------|------|-------------|
| SearchMentors | [components/SearchMentors.tsx](./components/SearchMentors.md) | Search and filter UI |

## Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Server Component                              │
│                   (app/explore-mentors/page.tsx)                │
│                                                                  │
│    ┌─────────────────────────────────────────────────────────┐  │
│    │              fetchMentors()                              │  │
│    │         GET /api/mentor/ (server-side)                  │  │
│    └──────────────────────┬──────────────────────────────────┘  │
│                           │                                      │
│                           ▼                                      │
│                    initialMentors[]                              │
│                           │                                      │
└───────────────────────────┼──────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────────┐
│                    Client Component                              │
│               (components/SearchMentors.tsx)                     │
│                                                                  │
│    ┌─────────────────────────────────────────────────────────┐  │
│    │  Search Input (debounced 500ms)                         │  │
│    │       │                                                  │  │
│    │       ▼                                                  │  │
│    │  Client-side Filtering                                   │  │
│    │  - By mentor name                                        │  │
│    │  - By college name                                       │  │
│    │       │                                                  │  │
│    │       ▼                                                  │  │
│    │  ProfileCard Grid                                        │  │
│    └─────────────────────────────────────────────────────────┘  │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

1. **Server:** Page component fetches all mentors
2. **Client:** SearchMentors receives mentor array
3. **User:** Types search query
4. **Client:** Debounced filter after 500ms
5. **Display:** ProfileCard for each matching mentor

## Search Features

- Real-time filtering
- Debounced input (500ms delay)
- Filter by name or college
- Case-insensitive matching
- Result count display

## Navigation

From this page, users can:
- View mentor profiles (`/mentor/[id]`)
- Like mentors (local state only)
- Access social links

## API Endpoint

```
GET /api/mentor/
Response: { data: Mentor[] }
```

## Error Handling

- Server fetch errors return empty array
- Empty results show "No mentors found" message
