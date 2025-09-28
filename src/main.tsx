import { render } from 'preact';
import App from './components/App';
import './styles/fonts.css';
import { BASE_PATH } from './utils/basePath';

const root = document.getElementById('root');

if (root) {
	render(<App />, root);
} else {
	console.error('Root element not found for app mounting');
}

