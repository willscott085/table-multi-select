# Table Multi-Select

This repository is a React-based project that allows users to perform multi-select operations within a table. The project is built with modern web development tools including Vite, TypeScript, and Tailwind CSS, and is designed for easy development, testing, and deployment.

## Tech Stack

- **React**: UI library for building interactive components
- **TypeScript**: Superset of JavaScript for static typing and improved developer experience
- **Vite**: Fast build tool for modern JavaScript frameworks
- **Tailwind CSS**: Utility-first CSS framework for styling
- **ESLint**: Linting tool to enforce code quality and style
- **Vitest**: Testing framework for running unit and integration tests

## Installation

This project uses **pnpm** as its package manager. Please ensure pnpm is installed before proceeding.

```bash
npm install -g pnpm
```

Then, clone the repository and install the dependencies:

```bash
git clone https://github.com/willscott085/table-multi-select.git
cd table-multi-select
pnpm install
```

## Usage

### Running the Development Server

To start a local development server, run:

```bash
pnpm dev
```

This command will start the Vite server, allowing you to access the app at `http://localhost:5173`.

### Building the Project

To build the project for production, run:

```bash
pnpm build
```

This will create an optimized production build in the `dist` directory.

### Previewing the Production Build

After building the project, you can preview the production build by running:

```bash
pnpm preview
```

This command will start a local server to serve the production build for testing.

## Testing

This project uses **Vitest** for testing. To run all tests, use the following command:

```bash
pnpm test
```

## Linting

To maintain code quality, **ESLint** is configured for this project. Run the following command to lint your code:

```bash
pnpm lint
```

## Additional Notes

Ensure that `pnpm` version 9.8.0 or higher is installed to avoid any compatibility issues with the lock file.
