import { Link } from 'react-router-dom';
import AuthForm from '../AuthForm';
import '../../styles/fonts.css';
import { withBasePath } from '../../utils/basePath';

export default function AuthPage() {
  return (
    <div className="auth-page">
      <header className="header">
        <Link to="/" className="logo">
          <img src={withBasePath('assets/images/W.png')} alt="Logo" className="logo-icon" />
          山 W̵a̵r̵l̵o̵k̵
        </Link>
      </header>

      <main className="container">
        <div className="welcome-box">
          <h2 className="welcome-title">Welcome to WARLOK</h2>
          <p className="welcome-text">
            Create an account to start building your deck and playing against others.
          </p>
        </div>

        <div className="auth-container">
          <AuthForm />
        </div>
      </main>

      <style jsx>{`
        .auth-page {
          min-height: 100vh;
          background: #000;
          color: #d9d9d9;
          font-family: 'Space Mono', monospace;
        }

        .header {
          padding: 1.5rem;
          background: rgba(0, 0, 0, 0.9);
          border-bottom: 1px solid #333;
        }

        .logo {
          font-family: 'Bebas Neue', sans-serif;
          -webkit-font-smoothing: antialiased;
          font-size: 2rem;
          color: #d9d9d9;
          text-decoration: none;
          display: flex;
          align-items: center;
          gap: 8px;
        }

        .logo-icon {
          width: 24px;
          height: 24px;
        }

        .container {
          display: flex;
          flex-direction: row;
          justify-content: space-between;
          padding: 2rem;
          margin: 0 auto;
          max-width: 1200px;
        }

        .welcome-box {
          flex: 1;
          padding: 2rem;
        }

        .welcome-title {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          font-family: 'Bebas Neue', sans-serif;
        }

        .welcome-text {
          font-size: 1.1rem;
          line-height: 1.6;
          color: #888;
        }

        .auth-container {
          flex: 1;
          display: flex;
          justify-content: center;
          align-items: center;
        }

        @media (max-width: 768px) {
          .container {
            flex-direction: column;
          }

          .welcome-box {
            padding: 1rem;
            text-align: center;
          }
        }
      `}</style>
    </div>
  );
}
