import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    base: '/', // ✅ use this for proper Vercel deployment
    plugins: [react()],
});