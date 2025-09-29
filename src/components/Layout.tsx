// import { PropsWithChildren } from 'preact/compat';
// import { useEffect } from 'preact/hooks';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/fonts.css';
import '../styles/layout.css';
import { withBasePath } from '../utils/basePath';
import { useAuth } from './AuthProvider';
import { PropsWithChildren } from 'react';
import { useEffect } from 'react';

interface LayoutProps {
  title: string;
}

const USER_AVATAR = 'https://pbs.twimg.com/profile_images/1882571472712974336/LBgD5N5R_400x400.jpg';

function setDocumentMeta(title: string, faviconHref: string) {
  document.title = title;
  let link = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
  if (!link) {
    link = document.createElement('link');
    link.rel = 'icon';
    document.head.appendChild(link);
  }
  link.type = 'image/png';
  link.href = faviconHref;
}

export default function Layout({ title, children }: PropsWithChildren<LayoutProps>) {
  const { user, isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    setDocumentMeta(`${title} - WARLOK`, withBasePath('assets/images/W.png'));
  }, [title, location.pathname, location.search]);

  const handleLogout = () => {
    logout();
    navigate(withBasePath(''));
  };

  return (
    <div className="layout-root" enable-xr>
      <header className="header" enable-xr>
        <Link to={withBasePath('')} className="logo">
          山 W̵a̵r̵l̵o̵k̵
        </Link>

        <div className="auth-buttons">
          {isAuthenticated ? (
            <div className="profile-menu">
              <button
                type="button"
                className="profile-button"
                onClick={() => navigate(withBasePath('profile'))}
              >
                <img
                  src={user?.profile?.avatar ?? USER_AVATAR}
                  alt="Profile"
                  className="avatar"
                />
              </button>
              <button type="button" className="auth-button secondary" onClick={handleLogout}>
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link to={withBasePath('auth?signup=true')} className="auth-button">
                Sign_Up
              </Link>
              <span className="divider">/</span>
              <Link to={withBasePath('auth?login=true')} className="auth-button">
                Login
              </Link>
            </>
          )}
        </div>
      </header>

      <main className="layout-main" enable-xr>{children}</main>
    </div>
  );
}

