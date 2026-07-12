# API Contracts

> API endpoints, request/response shapes, and authentication requirements.
> Update manually or regenerate with `/codebase-overview`.

## Base URL

`https://api.example.com/v1`

## Authentication

*Describe auth mechanism (JWT, API key, OAuth, etc.)*

## Endpoints

### `GET /resource`

**Purpose**: *Description*

**Request**:
- Headers: `Authorization: Bearer <token>`
- Query params: `?page=1&limit=20`

**Response** (`200`):
```json
{ "data": [], "total": 0 }
```

**Errors**: `401 Unauthorized`, `404 Not Found`
