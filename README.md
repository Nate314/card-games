# card-games
Card Games on the web: https://nate314.github.io/card-games/

## Run locally

With Docker, through the [compose-launcher](https://github.com/Nate314/compose-launcher) submodule, which picks a free port and writes `.env`:

```shell
./run.sh        # Git Bash, macOS, Linux
./run.ps1       # PowerShell
```

It prints the URL (`http://localhost:8080/card-games/` unless 8080 is busy). Any arguments are passed on to `docker compose`, for example `./run.sh down`. Without the launcher, `docker compose up --build` uses port 8080.

## Development

The app is in `client/` (Vite, React, TypeScript).

| Command | What it does |
| --- | --- |
| `npm run dev` | Dev server at `http://localhost:5173/card-games/` |
| `npm run build` | Type-check and build into `../docs`, the folder GitHub Pages serves |
| `npm test` | Unit tests (Vitest, Testing Library) |

The tests also run in Docker with no local Node install (in Git Bash on Windows, prefix the command with `MSYS_NO_PATHCONV=1`):

```shell
docker run --rm -v "$PWD/client:/src:ro" node:26-alpine sh -c "cp -r /src /app && cd /app && npm ci && npm test"
```
