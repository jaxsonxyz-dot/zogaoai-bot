
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { applyDevicePerformanceClass } from './utils/devicePerformance'
import { initAnalytics } from './utils/analytics'

applyDevicePerformanceClass();
initAnalytics();

createRoot(document.getElementById("root")!).render(<App />);
