# Git Conventions

This project follows strict conventions for both commits and branch names to maintain a clean history and automated release processes.

## Branch Naming

Branch names must follow the format `<type>/<description>`, using the same types defined in Conventional Commits.

**Allowed Types:**

- `feat/`: A new feature
- `fix/`: A bug fix
- `docs/`: Documentation only changes
- `style/`: Changes that do not affect the meaning of the code (white-space, formatting, missing semi-colons, etc)
- `refactor/`: A code change that neither fixes a bug nor adds a feature
- `perf/`: A code change that improves performance
- `test/`: Adding missing tests or correcting existing tests
- `chore/`: Changes to the build process or auxiliary tools and libraries

**Example:**
`feat/add-new-button`
`fix/broken-modal`
`refactor/component-demos`

## Commit Messages

Commits must strictly follow the [Conventional Commits v1.0.0 Specification](https://www.conventionalcommits.org/en/v1.0.0/#specification).

**Format:**

```
<type>[optional scope]: <description>

[optional body]

[optional footer(s)]
```

**Examples:**

- `feat: add robust modal dialog component`
- `fix(core): resolve race condition in toast timeout`
- `docs: update button usage examples`
- `chore: update dependencies`

**Breaking Changes:**
If a commit introduces a breaking change, it must append a `!` after the type/scope, or include `BREAKING CHANGE:` in the footer.

- `feat!: change default primary color`
- `refactor(solid)!: drop support for solid-js v1.6`
