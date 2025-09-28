import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CreateAssetPage from './pages/CreateAssetPage';
import ProfilePage from './pages/ProfilePage';
import { BASE_PATH } from '../utils/basePath';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={BASE_PATH || '/'}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="auth" element={<AuthPage />} />
          <Route path="createAsset" element={<CreateAssetPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="createAsset/upload" element={<div>Upload Page Coming Soon</div>} />
          <Route path="createAsset/generate" element={<div>Generate Page Coming Soon</div>} />
          <Route path="cardshop" element={<div>Cardshop Page Coming Soon</div>} />
          <Route path="card/:id" element={<div>Card Detail Page Coming Soon</div>} />
          <Route path="game" element={<div>Game Page Coming Soon</div>} />
          <Route path="deckbuilder" element={<div>Deckbuilder Page Coming Soon</div>} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
