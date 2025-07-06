export const prerender = true; 

//insights for Vercel
import { injectSpeedInsights } from '@vercel/speed-insights/sveltekit';
injectSpeedInsights();