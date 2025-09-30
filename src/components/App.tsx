import { Suspense } from 'react';
import type { ReactNode } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './AuthProvider';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import CreateAssetPage from './pages/CreateAssetPage';
import CreateCardPage from './pages/CreateCardPage';
import ProfilePage from './pages/ProfilePage';
import Layout from './Layout';
import { BASE_PATH } from '../utils/basePath';
import CreateAssetUploadPage from './pages/CreateAssetUploadPage';
import CreateAssetGeneratePage from './pages/CreateAssetGeneratePage';

import './index.css';

type LayoutRouteProps = {
  title: string;
  element: ReactNode;
};

function LayoutRoute({ title, element }: LayoutRouteProps) {
  return <Layout title={title}>{element}</Layout>;
}

export default function App() {
  // // Simple test for WebSpatial in AVP mode
  // if ((process.env.XR_ENV as any) === 'avp') {
  //   return (
  //     <div enable-xr >
  //       <h1 enable-xr>🎯 WebSpatial Test</h1>
  //       <p enable-xr>If you can see this, WebSpatial rendering is working!</p>
  //       <p enable-xr>Environment: {process.env.XR_ENV}</p>
  //       {/* <HomePage /> */}
  //     </div>
  //   );
  // }

  return (
    <AuthProvider>
      <BrowserRouter basename={BASE_PATH || '/'}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<LayoutRoute title="Home" element={<HomePage />} />} />
            <Route path="auth" element={<LayoutRoute title="Auth" element={<AuthPage />} />} />
            <Route path="createAsset" element={<LayoutRoute title="Create Asset" element={<CreateAssetPage />} />} />
            <Route path="create-card" element={<LayoutRoute title="Create Card" element={<CreateCardPage />} />} />
            <Route path="profile" element={<LayoutRoute title="Profile" element={<ProfilePage />} />} />
            <Route path="createAsset/upload" element={<LayoutRoute title="Upload Asset" element={<CreateAssetUploadPage />} />} />
            <Route path="createAsset/generate" element={<LayoutRoute title="Generate Asset" element={<CreateAssetGeneratePage />} />} />
            <Route path="cardshop" element={<LayoutRoute title="Card Shop" element={<div>Cardshop Page Coming Soon</div>} />} />
            <Route path="card/:id" element={<LayoutRoute title="Card Detail" element={<div>Card Detail Page Coming Soon</div>} />} />
            <Route path="game" element={<LayoutRoute title="Game" element={<div>Game Page Coming Soon</div>} />} />
            <Route path="deckbuilder" element={<LayoutRoute title="Deckbuilder" element={<div>Deckbuilder Page Coming Soon</div>} />} />
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </AuthProvider>
  );
}