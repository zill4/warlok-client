import { createRoot } from 'react-dom/client';
import App from './components/App';
import './styles/fonts.css';
import './styles/layout.css'; // Import spatial styles globally
import { BASE_PATH } from './utils/basePath';

const rootElement = document.getElementById('root');

if (rootElement) {
	const root = createRoot(rootElement);
	root.render(<App />);
} else {
	console.error('Root element not found for app mounting');
}

