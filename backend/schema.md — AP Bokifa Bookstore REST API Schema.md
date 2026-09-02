# AP Bokifa — Bookstore REST API Schema

## 1. Overview

This document defines the RESTful API architecture and data models for the AP Bokifa bookstore platform.

### Core Entities

- **Authors** — Stores author information and their published books.
- **Books** — Stores book/catalog information, pricing, ISBN, publication details, and author relationship.
- **Blogs** — Stores articles/posts published by authors.

The API follows standard REST conventions and is designed around three primary resources:

```text
/authors
/books
/blogs
```

---

# 2. Entity Relationship Diagram (ERD) Description

## 2.1 Relationships

### Author → Books

**One-to-Many relationship**

```text
Author
  │
  │ 1
  │
  ├──────────< Books
              N
```

One author can have multiple books.

Each book belongs to one author through `author_id`.

```text
authors.id
     │
     │
     └──────── books.author_id
```

### Author → Blogs

**One-to-Many relationship**

```text
Author
  │
  │ 1
  │
  └──────────< Blogs
               N
```

One author can publish multiple blog posts.

Each blog belongs to one author through `author_id`.

### Complete Relationship

```text
                    ┌─────────────────┐
                    │     AUTHORS     │
                    │─────────────────│
                    │ id              │
                    │ name            │
                    │ bio             │
                    │ email           │
                    │ profile_image    │
                    └────────┬────────┘
                             │
                   ┌─────────┴─────────┐
                   │                   │
                  1│                  1│
                   │                   │
                  N│                  N│
          ┌────────▼───────┐   ┌──────▼────────┐
          │     BOOKS      │   │     BLOGS     │
          │────────────────│   │───────────────│
          │ id             │   │ id            │
          │ title          │   │ title         │
          │ isbn           │   │ content       │
          │ price          │   │ author_id     │
          │ author_id      │   │ status        │
          │ description    │   │ published_at  │
          │ publication_date│  │ created_at    │
          └────────────────┘   │ updated_at    │
                               └───────────────┘
```

---

# 3. API Base Structure

Base URL:

```text
/api/v1
```

Resource endpoints:

```text
/api/v1/authors
/api/v1/books
/api/v1/blogs
```

Standard HTTP methods:

| Method | Purpose |
|---|---|
| GET | Retrieve resource(s) |
| POST | Create a resource |
| PUT | Replace/update a resource |
| DELETE | Delete a resource |

---

# 4. Author API

## 4.1 GET /authors

Retrieve all authors.

### Request

```http
GET /api/v1/authors
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "George Orwell",
      "bio": "British novelist and essayist.",
      "email": "author@example.com",
      "profile_image": "https://example.com/orwell.jpg",
      "created_at": "2026-08-25T10:00:00Z",
      "updated_at": "2026-08-25T10:00:00Z"
    }
  ]
}
```

---

## 4.2 GET /authors/:id

Retrieve a single author.

### Request

```http
GET /api/v1/authors/1
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "George Orwell",
    "bio": "British novelist and essayist.",
    "email": "author@example.com",
    "profile_image": "https://example.com/orwell.jpg",
    "books": [
      {
        "id": 101,
        "title": "1984",
        "isbn": "9780451524935"
      }
    ],
    "created_at": "2026-08-25T10:00:00Z",
    "updated_at": "2026-08-25T10:00:00Z"
  }
}
```

---

## 4.3 POST /authors

Create a new author.

### Request

```http
POST /api/v1/authors
```

### Request Body

```json
{
  "name": "George Orwell",
  "bio": "British novelist and essayist.",
  "email": "author@example.com",
  "profile_image": "https://example.com/orwell.jpg"
}
```

### Response

```json
{
  "success": true,
  "message": "Author created successfully",
  "data": {
    "id": 1,
    "name": "George Orwell",
    "bio": "British novelist and essayist.",
    "email": "author@example.com",
    "profile_image": "https://example.com/orwell.jpg"
  }
}
```

---

## 4.4 PUT /authors/:id

Update an existing author.

### Request

```http
PUT /api/v1/authors/1
```

### Request Body

```json
{
  "name": "George Orwell",
  "bio": "English novelist, essayist, journalist and critic.",
  "email": "orwell@example.com",
  "profile_image": "https://example.com/orwell-new.jpg"
}
```

### Response

```json
{
  "success": true,
  "message": "Author updated successfully",
  "data": {
    "id": 1,
    "name": "George Orwell",
    "bio": "English novelist, essayist, journalist and critic.",
    "email": "orwell@example.com",
    "profile_image": "https://example.com/orwell-new.jpg"
  }
}
```

---

## 4.5 DELETE /authors/:id

Delete an author.

### Request

```http
DELETE /api/v1/authors/1
```

### Response

```json
{
  "success": true,
  "message": "Author deleted successfully"
}
```

### Relationship Constraint

An author should not be deleted while associated books or blogs still reference that author unless the API explicitly defines a cascade/deletion policy.

---

# 5. Book API

## 5.1 GET /books

Retrieve all books.

### Request

```http
GET /api/v1/books
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 101,
      "title": "1984",
      "isbn": "9780451524935",
      "price": 499.00,
      "author_id": 1,
      "description": "A dystopian novel about surveillance and totalitarianism.",
      "publication_date": "1949-06-08",
      "cover_image": "https://example.com/1984.jpg",
      "created_at": "2026-08-25T10:00:00Z",
      "updated_at": "2026-08-25T10:00:00Z"
    }
  ]
}
```

---

## 5.2 GET /books/:id

Retrieve a single book.

### Request

```http
GET /api/v1/books/101
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 101,
    "title": "1984",
    "isbn": "9780451524935",
    "price": 499.00,
    "author_id": 1,
    "description": "A dystopian novel about surveillance and totalitarianism.",
    "publication_date": "1949-06-08",
    "cover_image": "https://example.com/1984.jpg",
    "author": {
      "id": 1,
      "name": "George Orwell"
    },
    "created_at": "2026-08-25T10:00:00Z",
    "updated_at": "2026-08-25T10:00:00Z"
  }
}
```

---

## 5.3 POST /books

Create a new book.

### Request

```http
POST /api/v1/books
```

### Request Body

```json
{
  "title": "1984",
  "isbn": "9780451524935",
  "price": 499.00,
  "author_id": 1,
  "description": "A dystopian novel about surveillance and totalitarianism.",
  "publication_date": "1949-06-08",
  "cover_image": "https://example.com/1984.jpg"
}
```

### Response

```json
{
  "success": true,
  "message": "Book created successfully",
  "data": {
    "id": 101,
    "title": "1984",
    "isbn": "9780451524935",
    "price": 499.00,
    "author_id": 1,
    "description": "A dystopian novel about surveillance and totalitarianism.",
    "publication_date": "1949-06-08",
    "cover_image": "https://example.com/1984.jpg"
  }
}
```

---

## 5.4 PUT /books/:id

Update an existing book.

### Request

```http
PUT /api/v1/books/101
```

### Request Body

```json
{
  "title": "1984",
  "isbn": "9780451524935",
  "price": 549.00,
  "author_id": 1,
  "description": "Updated description of the classic dystopian novel.",
  "publication_date": "1949-06-08",
  "cover_image": "https://example.com/1984-new.jpg"
}
```

### Response

```json
{
  "success": true,
  "message": "Book updated successfully",
  "data": {
    "id": 101,
    "title": "1984",
    "isbn": "9780451524935",
    "price": 549.00,
    "author_id": 1,
    "description": "Updated description of the classic dystopian novel.",
    "publication_date": "1949-06-08",
    "cover_image": "https://example.com/1984-new.jpg"
  }
}
```

---

## 5.5 DELETE /books/:id

Delete a book.

### Request

```http
DELETE /api/v1/books/101
```

### Response

```json
{
  "success": true,
  "message": "Book deleted successfully"
}
```

---

# 6. Blog API

## 6.1 GET /blogs

Retrieve all blog posts.

### Request

```http
GET /api/v1/blogs
```

### Response

```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "title": "The Importance of Reading",
      "content": "Reading helps improve knowledge and imagination.",
      "author_id": 1,
      "status": "published",
      "featured_image": "https://example.com/reading.jpg",
      "created_at": "2026-08-25T10:00:00Z",
      "updated_at": "2026-08-25T11:00:00Z",
      "published_at": "2026-08-25T10:30:00Z"
    }
  ]
}
```

---

## 6.2 GET /blogs/:id

Retrieve a single blog post.

### Request

```http
GET /api/v1/blogs/1
```

### Response

```json
{
  "success": true,
  "data": {
    "id": 1,
    "title": "The Importance of Reading",
    "content": "Reading helps improve knowledge and imagination.",
    "author_id": 1,
    "status": "published",
    "featured_image": "https://example.com/reading.jpg",
    "author": {
      "id": 1,
      "name": "George Orwell"
    },
    "created_at": "2026-08-25T10:00:00Z",
    "updated_at": "2026-08-25T11:00:00Z",
    "published_at": "2026-08-25T10:30:00Z"
  }
}
```

---

## 6.3 POST /blogs

Create a new blog post.

### Request

```http
POST /api/v1/blogs
```

### Request Body

```json
{
  "title": "The Importance of Reading",
  "content": "Reading helps improve knowledge and imagination.",
  "author_id": 1,
  "status": "draft",
  "featured_image": "https://example.com/reading.jpg"
}
```

### Response

```json
{
  "success": true,
  "message": "Blog created successfully",
  "data": {
    "id": 1,
    "title": "The Importance of Reading",
    "content": "Reading helps improve knowledge and imagination.",
    "author_id": 1,
    "status": "draft",
    "featured_image": "https://example.com/reading.jpg",
    "created_at": "2026-08-25T10:00:00Z",
    "updated_at": "2026-08-25T10:00:00Z",
    "published_at": null
  }
}
```

---

## 6.4 PUT /blogs/:id

Update an existing blog.

### Request

```http
PUT /api/v1/blogs/1
```

### Request Body

```json
{
  "title": "Why Reading Matters",
  "content": "Updated blog content.",
  "author_id": 1,
  "status": "published",
  "featured_image": "https://example.com/reading-updated.jpg"
}
```

### Response

```json
{
  "success": true,
  "message": "Blog updated successfully",
  "data": {
    "id": 1,
    "title": "Why Reading Matters",
    "content": "Updated blog content.",
    "author_id": 1,
    "status": "published",
    "featured_image": "https://example.com/reading-updated.jpg",
    "updated_at": "2026-08-25T11:00:00Z",
    "published_at": "2026-08-25T11:00:00Z"
  }
}
```

---

## 6.5 DELETE /blogs/:id

Delete a blog post.

### Request

```http
DELETE /api/v1/blogs/1
```

### Response

```json
{
  "success": true,
  "message": "Blog deleted successfully"
}
```

---

# 7. Data Models

## 7.1 Author

```json
{
  "id": "integer",
  "name": "string",
  "bio": "string",
  "email": "string",
  "profile_image": "string | null",
  "created_at": "datetime",
  "updated_at": "datetime",
  "books": [
    {
      "id": "integer",
      "title": "string",
      "isbn": "string"
    }
  ]
}
```

### Field Definitions

| Field | Type | Required | Description |
|---|---|---:|---|
| id | Integer | Yes | Unique author identifier |
| name | String | Yes | Author's full name |
| bio | Text | Yes | Author biography |
| email | String | No | Author contact email |
| profile_image | String | No | Author profile image URL |
| created_at | DateTime | Yes | Record creation timestamp |
| updated_at | DateTime | Yes | Last modification timestamp |
| books | Array | No | References to books written by author |

---

# 7.2 Book

```json
{
  "id": "integer",
  "title": "string",
  "isbn": "string",
  "price": "decimal",
  "author_id": "integer",
  "description": "string",
  "publication_date": "date",
  "cover_image": "string | null",
  "created_at": "datetime",
  "updated_at": "datetime"
}
```

### Field Definitions

| Field | Type | Required | Description |
|---|---|---:|---|
| id | Integer | Yes | Unique book identifier |
| title | String | Yes | Book title |
| isbn | String | Yes | International Standard Book Number |
| price | Decimal | Yes | Selling price |
| author_id | Integer | Yes | Foreign key referencing `authors.id` |
| description | Text | Yes | Book description |
| publication_date | Date | Yes | Original publication date |
| cover_image | String | No | Book cover image URL |
| created_at | DateTime | Yes | Record creation timestamp |
| updated_at | DateTime | Yes | Last modification timestamp |

---

# 7.3 Blog

```json
{
  "id": "integer",
  "title": "string",
  "content": "string",
  "author_id": "integer",
  "status": "draft | published",
  "featured_image": "string | null",
  "created_at": "datetime",
  "updated_at": "datetime",
  "published_at": "datetime | null"
}
```

### Field Definitions

| Field | Type | Required | Description |
|---|---|---:|---|
| id | Integer | Yes | Unique blog identifier |
| title | String | Yes | Blog title |
| content | Text | Yes | Blog article content |
| author_id | Integer | Yes | Foreign key referencing `authors.id` |
| status | Enum | Yes | Draft or published |
| featured_image | String | No | Blog featured image URL |
| created_at | DateTime | Yes | Record creation timestamp |
| updated_at | DateTime | Yes | Last modification timestamp |
| published_at | DateTime | No | Publication timestamp |

---

# 8. Validation Rules

## 8.1 Author Validation

- `name` is required.
- `name` must be a string.
- `name` should have a reasonable maximum length.
- `bio` is required and should be stored as text.
- `email`, when provided, must have a valid email format.
- `profile_image`, when provided, must contain a valid image URL/reference.
- `id` must be unique.
- `created_at` and `updated_at` must contain valid datetime values.

---

## 8.2 Book Validation

- `title` is required.
- `title` must be a string.
- `isbn` is required.
- `isbn` must be unique.
- `isbn` should conform to a valid ISBN-10 or ISBN-13 format.
- `price` is required.
- `price` must be a non-negative decimal value.
- `author_id` is required.
- `author_id` must reference an existing author.
- `description` is required and should be stored as text.
- `publication_date` must be a valid date.
- `cover_image`, when provided, must contain a valid image URL/reference.
- `id` must be unique.

---

## 8.3 Blog Validation

- `title` is required.
- `title` must be a string.
- `content` is required.
- `content` should be stored as text.
- `author_id` is required.
- `author_id` must reference an existing author.
- `status` is required.
- `status` must be either `draft` or `published`.
- `featured_image`, when provided, must contain a valid image URL/reference.
- `published_at` should be present when `status` is `published`.
- `published_at` may be null for draft posts.
- `created_at` and `updated_at` must contain valid datetime values.

---

# 9. Foreign Key Rules

The following foreign-key relationships should exist:

```text
books.author_id
        ↓
authors.id
```

```text
blogs.author_id
        ↓
authors.id
```

Therefore:

```text
authors 1 ─────── N books
authors 1 ─────── N blogs
```

`author_id` must never reference an author that does not exist.

---

# 10. REST Endpoint Summary

| Resource | Method | Endpoint | Purpose |
|---|---|---|---|
| Authors | GET | `/api/v1/authors` | Get all authors |
| Authors | GET | `/api/v1/authors/:id` | Get one author |
| Authors | POST | `/api/v1/authors` | Create author |
| Authors | PUT | `/api/v1/authors/:id` | Update author |
| Authors | DELETE | `/api/v1/authors/:id` | Delete author |
| Books | GET | `/api/v1/books` | Get all books |
| Books | GET | `/api/v1/books/:id` | Get one book |
| Books | POST | `/api/v1/books` | Create book |
| Books | PUT | `/api/v1/books/:id` | Update book |
| Books | DELETE | `/api/v1/books/:id` | Delete book |
| Blogs | GET | `/api/v1/blogs` | Get all blogs |
| Blogs | GET | `/api/v1/blogs/:id` | Get one blog |
| Blogs | POST | `/api/v1/blogs` | Create blog |
| Blogs | PUT | `/api/v1/blogs/:id` | Update blog |
| Blogs | DELETE | `/api/v1/blogs/:id` | Delete blog |

---

# 11. Recommended Resource Structure

```text
/api/v1
│
├── /authors
│   ├── GET
│   ├── POST
│   └── /:id
│       ├── GET
│       ├── PUT
│       └── DELETE
│
├── /books
│   ├── GET
│   ├── POST
│   └── /:id
│       ├── GET
│       ├── PUT
│       └── DELETE
│
└── /blogs
    ├── GET
    ├── POST
    └── /:id
        ├── GET
        ├── PUT
        └── DELETE
```

## Design Decision

The initial relationship model uses **one-to-many** between Authors and Books because the requested `Book` model contains a single `author_id`.

This means:

```text
One Author → Many Books
One Author → Many Blogs
```

If the business later needs books with multiple co-authors, the relationship should be changed to a **many-to-many** model using a separate `book_authors` relationship table rather than storing multiple author IDs inside the `books` table.

This keeps the initial schema normalized and compatible with a relational MySQL database.