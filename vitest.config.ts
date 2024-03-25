import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config";

// todo msw: https://github.com/vitest-dev/vitest/blob/main/examples/react-testing-lib-msw/src/mocks/server.ts
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/__tests__/setup.ts',
    // you might want to disable it, if you don't have tests that rely on CSS
    // since parsing CSS is slow
    css: true,
    coverage: {
      // todo check coverage
      include: ['**/*.test.ts'],

    }
  },
})
