# Contributing to Supabase Auth App

Thank you for considering contributing to the Supabase Auth App! We welcome contributions from the community. Please follow the guidelines below to help us maintain a high-quality project.

## Code of Conduct

We take our open source community seriously and hold ourselves and other contributors to high standards of communication. By participating and contributing to this project, you agree to uphold our [Code of Conduct](CODE_OF_CONDUCT.md).

## Getting Started

### 1. Fork the Repository

Start by forking the repository on GitHub. This will create a copy of the project under your GitHub account.

### 2. Clone Your Fork

Clone your forked repository to your local machine:
```bash
git clone https://github.com/YourUsername/supabase-auth-app.git
cd supabase-auth-app
```

### 3. Set Up Development Environment

Install dependencies:
```bash
pnpm install
```

Create a .env file based on .env.example:
```bash
cp .env.example .env
```

### 4. Create a New Branch

Before making any changes, create a new branch for your feature or bug fix:
```bash
git checkout -b feature/your-feature-name
# or
git checkout -b bugfix/your-bugfix-name
```

## Development Workflow

### 1. Make Your Changes

- Follow the existing code style and conventions
- Write clear, descriptive commit messages
- Add tests if applicable
- Update documentation as needed

### 2. Test Your Changes

```bash
# Run tests
pnpm test

# Run linter
pnpm lint

# Run development server
pnpm dev
```

### 3. Commit Your Changes

```bash
git add .
git commit -m "feat: add new feature" # Follow conventional commits
```

### 4. Push to Your Fork

```bash
git push origin feature/your-feature-name
```

### 5. Submit a Pull Request

- Fill in the pull request template
- Link any relevant issues
- Provide a clear description of your changes
- Request review from maintainers

## Pull Request Guidelines

- Keep PRs focused on a single change
- Update relevant documentation
- Add tests for new features
- Follow the project's code style
- Ensure all tests pass
- Keep commits atomic and well-described

## Need Help?

If you have questions:
1. Check the documentation
2. Open an issue
3. Ask in pull request comments
4. Contact the maintainers

## License

By contributing, you agree that your contributions will be licensed under the project's license.

Thank you for contributing to Supabase Auth App!