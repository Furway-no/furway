# Furway 2.0

## Key Features

- Big Things
- Loud Yips
- Fast
- Simple to extend
- Less work for kobolds to maintain

## How to Contribute

Contributions are welcome! However, **please open an issue first to discuss what you would like to change**. There is nothing worse than spending time on a PR that won't get accepted.

Besides that, please do your best to follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification. This will help us keep a consistent and readable commit history.

The standard format is: `<type>(<scope>): <description>`

Scope is completely optional and not commonly used here.

### Examples

- `feat(payload): add support for user authentication`
- `fix(block): resolve layout shift issue in header`
- `chore: update dependencies`
- `chore: updated documentation and the env example so you can quickly use it`
- `docs: update readme with installation instructions`

#### Commit Types

- `feat` – New features
- `fix` – Bug fixes
- `docs` – Documentation updates
- `style` – Code style changes (no logic changes)
- `refactor` – Code refactoring (no feature changes)
- `perf` – Performance improvements
- `test` – Adding or updating tests
- `chore` – Maintenance tasks (e.g., build process, dependencies, misc changes that don't fall under the other categories)
- `ci` – CI/CD configuration changes

It is not the end of the world if you forget to follow the convention in one or two commits for your PR, but it is highly recommended to follow it. I usually squash merges anyway, would remove or manually fix the commits if I missed it.

## Development

### How to Run Locally

**Prerequisites:**

- [pnpm](https://pnpm.io/installation)
- [Docker](https://docs.docker.com/get-docker/)
- [Docker Compose](https://docs.docker.com/compose/install/)

**Run a local Postgres instance:**

```bash
cd docker
docker-compose up
```

**Create a `.env` file for local development:**

```bash
cp .env.example .env
```

**Run the application:**

```bash
pnpm install
pnpm dev
```

**Open the application:**

http://localhost:3000
