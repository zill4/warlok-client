import AuthForm from '../AuthForm';
import '../../styles/fonts.css';
import '../../styles/auth-page.css';

export default function AuthPage() {
  return (
    <div className="auth-page">
      <header className="auth-header">
        <a href="/" className="auth-logo">
          <img src="/assets/images/W.png" alt="Logo" className="auth-logo-icon" />
          山 W̵a̵r̵l̵o̵k̵
        </a>
      </header>

      <main className="auth-container">
        <div className="welcome-box">
          <h2 className="welcome-title">Welcome to WARLOK</h2>
          <p className="welcome-text">
            Create an account to start building your deck and playing against others.
          </p>
        </div>

        <div className="auth-form-container">
          <AuthForm />
        </div>
      </main>
    </div>
  );
}
