# Contributing

Contributions, issues, and feature requests are welcome! Feel free to open an
[issue](https://github.com/Aaravsingh1507/devtrack-ai/issues) or submit a pull
request.

## Getting started

```bash
git clone https://github.com/Aaravsingh1507/devtrack-ai.git
cd devtrack-ai
npm install
cp .env.example .env   # fill in your keys
npx prisma generate && npx prisma db push
npm run dev
```

## A note on how this was built

Everything here was written and reviewed via static analysis and linting.
`npx prisma generate` needs to download an engine binary from
`binaries.prisma.sh`, which wasn't reachable from the sandbox this was built
in — so a full `next build` type-check couldn't be run in that environment.
It will work normally on your machine with regular internet access. First
thing to run after `npm install` is `npx prisma generate && npm run build`
to confirm a clean compile before you start developing.

## Code style

- **TypeScript** — strict mode, avoid `any` where possible.
- **ESLint** — `npm run lint` should pass cleanly before you open a PR.
- **Commits** — use short, descriptive commit messages.

## Pull requests

1. Fork the repo and create your branch from `master`.
2. Make your changes and ensure `npm run build` passes.
3. Open a pull request with a clear description of what you changed and why.
