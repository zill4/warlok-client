import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import { Suspense } from 'preact/compat';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CreateAssetPage from './pages/CreateAssetPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './Layout';
import { BASE_PATH } from '../utils/basePath';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter basename={BASE_PATH || '/'}>
        <Layout title="Home">
          <Suspense fallback={<div>Loading...</div>}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="auth" element={<Layout title="Auth"><AuthPage /></Layout>} />
              <Route path="createAsset" element={<Layout title="Create Asset"><CreateAssetPage /></Layout>} />
              <Route path="profile" element={<Layout title="Profile"><ProfilePage /></Layout>} />
              <Route path="createAsset/upload" element={<Layout title="Upload Asset"><div>Upload Page Coming Soon</div></Layout>} />
              <Route path="createAsset/generate" element={<Layout title="Generate Asset"><div>Generate Page Coming Soon</div></Layout>} />
              <Route path="cardshop" element={<Layout title="Card Shop"><div>Cardshop Page Coming Soon</div></Layout>} />
              <Route path="card/:id" element={<Layout title="Card Detail"><div>Card Detail Page Coming Soon</div></Layout>} />
              <Route path="game" element={<Layout title="Game"><div>Game Page Coming Soon</div></Layout>} />
              <Route path="deckbuilder" element={<Layout title="Deckbuilder"><div>Deckbuilder Page Coming Soon</div></Layout>} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AuthProvider>
  );
}
