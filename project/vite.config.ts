import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react()],
    optimizeDeps: {
      exclude: ['lucide-react'],
    },
    server: {
      host: true,           // 👈 Exposes to 0.0.0.0 (external access)
      port: 5173,           // 👈 Explicitly sets port
      proxy: {
        '/api': env.VITE_BACKEND_URL, // 👈 Only '/api' proxy here
      }
    }
  };
});
