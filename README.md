# google-forms-lite-clone

## Technologies Used

### Front-End (`client`)

#### Stack

- **React 19** – for building the UI
- **React Router 7** – for client-side routing between pages
- **Redux Toolkit** – for managing global application state
- **RTK Query** – for efficient GraphQL data fetching and caching
- **TypeScript** – for static typing and better developer experience
- **Vite** – fast development and production bundler
- **SCSS Modules** – for modular and scoped styling
- **@hello-pangea/dnd** – for drag-and-drop functionality in the form builder
- **clsx** – for conditional class name manipulation
- **ESLint** – for code quality and linting

### Back-End (`server`)

#### Stack

- **Express** – Node.js web framework for handling HTTP requests
- **GraphQL + express-graphql** – for defining and handling the API layer
- **@graphql-tools/schema** – for constructing the GraphQL schema
- **uuid** – for generating unique IDs for forms, responses, etc.
- **TypeScript** – for static typing and safer server logic
- **ts-node-dev** – for running the server in development with hot reload

#### Data Storage

All data (forms, questions, responses) is stored in-memory using JavaScript Maps.  
**Note:** Data is not persisted between server restarts.

## Getting Started

Follow these steps to run the project locally:

### 1. Clone the repository

```bash
git clone https://github.com/VladTk/google-forms-lite-clone.git
cd google-forms-lite-clone
```

### 2. Install dependencies

```bash
npm install
```

### 3. Run the development server

```bash
npm run dev
```

The client app will be available at: http://localhost:5173/
The GraphQL server will be running at: http://localhost:4000/graphql
