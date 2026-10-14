# ORBIT AI

**A WORLD BORN FROM A SENTENCE**

ORBIT AI is a full-stack foundation for generating, evolving, and registering persistent fictional worlds. The UI is built from HTML, CSS, React, and a live React Three Fiber scene; the supplied concept image is not used as a page background.

## Quick start

1. Copy `.env.example` to `.env.local` and provide the services you intend to use.
2. Start PostgreSQL and Redis: `docker compose up -d`.
3. Generate the Prisma client and migrate: `npm run db:generate` then `npm run db:migrate`.
4. Start the app: `npm run dev`.
5. Run the persistent queue worker separately: `npm run worker`.

Open `http://localhost:3000`.

## Routes

- `/` — high-fidelity cinematic homepage with interactive procedural 3D planet
- `/create` — real OpenAI Structured Outputs world blueprint generator
- `/explore` — public discovery surface (official presets are explicitly labeled)
- `/worlds` — wallet-gated personal archive state
- `/leaderboard` — truthful empty state until verified activity exists
- `/docs` — product, ownership, evolution, technology, and limitation documentation
- `/api/worlds/generate` — moderated, schema-validated OpenAI generation endpoint

## Implemented

- Responsive visual system matching the reference composition and palette
- Real WebGL planet interaction with adaptive DPR, reusable geometry, orbit controls, and reduced-motion support
- OpenAI Responses API with Structured Outputs, Zod validation, moderation, timeout, retry, prompt limits, and no fake success fallback
- PostgreSQL/Prisma domain schema with worlds, optimistic versions, idempotent evolution requests, likes, auth nonces, and chain receipts
- Deterministic evolution rule engine with clamped deltas and unit test
- wagmi wallet connection, disconnect, address copy, and Robinhood Chain testnet switching
- Official Robinhood Chain testnet config (chain ID 46630, ETH, official RPC and explorer)
- ERC-721 registry contract with unique world IDs, versioned state hashes, authorization, and events
- BullMQ persistent-worker entry point and Docker Compose development services

## Still requires configuration or production hardening

- Real generation requires `OPENAI_API_KEY`; the application intentionally returns HTTP 503 without it.
- Persistence requires PostgreSQL and a Prisma migration. The present generation endpoint validates and returns a blueprint but does not claim it was saved.
- Queue execution requires Redis plus the separate worker process. Vercel must not host that long-lived process.
- WalletConnect requires a project ID. Injected MetaMask/Rabby and Coinbase connectors work without inventing state.
- IPFS-compatible metadata storage is represented by environment slots; wire a chosen provider before onchain registration.
- No contract address is supplied because the contract has not been deployed. Deploy only with a funded testnet key, then set `NEXT_PUBLIC_ORBIT_REGISTRY_ADDRESS`.
- Production SIWE session issuance, distributed rate limiting, transactional save/evolve APIs, indexing, cover generation, and full browser E2E tests remain follow-up work.

## Test and build

```bash
npm run test
npm run lint
npm run build
npm run contract:compile
```

## Robinhood Chain deployment

The checked-in defaults use Robinhood Chain Testnet:

- Chain ID: `46630`
- Gas token: `ETH`
- RPC: `https://rpc.testnet.chain.robinhood.com`
- Explorer: `https://explorer.testnet.chain.robinhood.com`

Add a disposable funded testnet private key to `DEPLOYER_PRIVATE_KEY`, then run:

```bash
npm run contract:deploy
```

Never commit a private key. After deployment, confirm the receipt in the explorer and place the verified address in `NEXT_PUBLIC_ORBIT_REGISTRY_ADDRESS`. An ORBIT world NFT describes a virtual record only; it is not real land, a real nation, an investment, or a promise of return.

## Deployment

Deploy the Next.js service to a Node.js host or Vercel, PostgreSQL to a managed database, Redis to a managed Redis service, and `npm run worker` to a separate persistent Node process. Run migrations before serving traffic. Keep all non-`NEXT_PUBLIC_` values server-only.
