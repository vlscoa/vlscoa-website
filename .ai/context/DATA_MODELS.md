# Data Models

> Schemas, database models, and key data structures.
> Update manually or regenerate with `/codebase-overview`.

## Database

*Database type (PostgreSQL, MongoDB, etc.) and ORM (Prisma, Drizzle, etc.)*

## Models

### User

| Field | Type | Constraints | Notes |
|-------|------|-------------|-------|
| *id* | *UUID* | *PK* | *Auto-generated* |
| *email* | *string* | *unique, not null* | |

## Key Types / Interfaces

```typescript
// Key shared types used across the codebase
interface Example {
  id: string;
}
```
