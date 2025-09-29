import AuthForm from '../AuthForm';
import '../../styles/fonts.css';
import '../../styles/auth-page.css';

export default function AuthPage() {
  return (
    <div className="auth-page">

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
