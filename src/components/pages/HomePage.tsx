import { useAuth } from '../AuthProvider';
import ChessGame from '../ChessGame';
import '../../styles/fonts.css';

export default function HomePage() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="game-container">
      <ChessGame />
    </div>
  );
}
