import { defineConfig } from '@playwright/test'
import { existsSync } from 'node:fs'

/**
 * E2E config template. Adjust `baseURL` and the `webServer.command` to your project
 * (build + serve the production-like output).
 *
 * Browser preference: real Google Chrome → Brave → another installed Chrome-derived
 * browser → Playwright's bundled Chromium. Picks the first that exists; falls through to
 * the bundled Chromium. Override with the PW_EXECUTABLE_PATH env var.
 *
 * The candidate paths below are macOS defaults — add your platform's paths as needed
 * (Linux: /usr/bin/google-chrome, /usr/bin/brave-browser, /usr/bin/chromium, …).
 */
const CHROME_CANDIDATES = [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome',
  '/Applications/Brave Browser.app/Contents/MacOS/Brave Browser',
  '/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge',
  '/Applications/Vivaldi.app/Contents/MacOS/Vivaldi',
  '/Applications/Opera.app/Contents/MacOS/Opera',
  '/Applications/Chromium.app/Contents/MacOS/Chromium',
]
const executablePath = process.env.PW_EXECUTABLE_PATH ?? CHROME_CANDIDATES.find(existsSync)

const PORT = Number(process.env.PORT ?? 4321)
const baseURL = `http://localhost:${PORT}`

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 1 : 0,
  reporter: 'list',
  use: { baseURL, trace: 'on-first-retry' },
  projects: [
    {
      name: 'chromium',
      use: {
        viewport: { width: 1280, height: 720 },
        ...(executablePath ? { launchOptions: { executablePath } } : {}),
      },
    },
  ],
  webServer: {
    // Set E2E_WEBSERVER to your app's run command, or edit the default below. Works for any
    // backend — Playwright drives the browser over HTTP regardless of language:
    //   Node/Astro : 'npm run build && npm run preview'   (PORT 4321)
    //   Next       : 'npm run build && npm run start'      (PORT 3000)
    //   Rails      : 'bin/rails server -e test'            (PORT 3000)
    //   Phoenix    : 'mix phx.server'                       (PORT 4000)
    //   Django/FastAPI : 'python manage.py runserver' / 'uvicorn app:app'  (PORT 8000)
    //   Go         : 'go run ./...'                         (PORT 8080)
    //   Rust       : 'cargo run'                            (PORT 8080)
    // Non-JS projects still need Node + @playwright/test as a dev tool here (or use a native
    // binding instead — e.g. pytest-playwright for Python, Capybara for Rails, Wallaby for Elixir).
    command: process.env.E2E_WEBSERVER ?? 'npm run build && npm run preview',
    url: baseURL,
    reuseExistingServer: false,
    timeout: 180_000,
  },
})
