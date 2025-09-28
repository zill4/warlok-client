import { Link } from 'react-router-dom';
import { useAuth } from '../AuthProvider';
import CardList from '../CardList';
import '../../styles/fonts.css';
import '../../styles/card-list.css';
import { withBasePath } from '../../utils/basePath';

export default function ProfilePage() {
  const { user, logout } = useAuth();

  const handleLogout = () => {
    logout();
  };

  // Sample model data
  const models = [
    {
      id: '1',
      name: 'METALGREYMON',
      creator: 'Zi114',
      image: withBasePath('assets/images/card_back.jpg')
    },
    {
      id: '2',
      name: 'METALGREYMON',
      creator: 'Zi114',
      image: withBasePath('assets/images/card_back.jpg')
    },
    {
      id: '3',
      name: 'METALGREYMON',
      creator: 'Zi114',
      image: withBasePath('assets/images/card_back.jpg')
    },
    {
      id: '4',
      name: 'METALGREYMON',
      creator: 'Zi114',
      image: withBasePath('assets/images/card_back.jpg')
    }
  ];

  return (
    <div className="profile-container">
      <div className="profile-header">
        <div className="profile-info">
          <Link to="/">
            <img
              src="https://pbs.twimg.com/profile_images/1882571472712974336/LBgD5N5R_400x400.jpg"
              alt="Profile"
              className="avatar"
            />
          </Link>
          <div className="username">{user?.username || 'User'}</div>
          <div className="edit-profile">✎</div>
          <div className="logout" onClick={handleLogout} style={{ cursor: 'pointer' }}>
            Logout
          </div>
        </div>
      </div>

      <div className="navigation">
        <Link to="/game" className="nav-button active">GAMES</Link>
        <Link to="/cardshop" className="nav-button">CARDS</Link>
        <Link to="/deckbuilder" className="nav-button">DECKS</Link>
        <button className="nav-button">STATS</button>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2>MY CARDS</h2>
          <div className="create-card-container">
            <Link to="/createAsset" className="card">
              <div className="card-header">CREATE ASSET</div>
              <div className="card-content">
                <div className="plus-icon">+</div>
              </div>
            </Link>
          </div>
        </div>

        <CardList cards={models} />
      </div>

      <style jsx>{`
        .profile-container {
          min-height: 100vh;
          background: #000;
          color: #d9d9d9;
          font-family: 'Space Mono', monospace;
        }

        .profile-header {
          padding: 2rem;
          background: rgba(0, 0, 0, 0.9);
          border-bottom: 1px solid #333;
          display: flex;
          justify-content: center;
        }

        .profile-info {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .avatar {
          width: 100px;
          height: 100px;
          border-radius: 50%;
          border: 2px solid #d9d9d9;
        }

        .username {
          font-size: 1.5rem;
          font-weight: bold;
        }

        .edit-profile {
          color: #666;
          cursor: pointer;
        }

        .logout {
          color: #f44336;
          cursor: pointer;
        }

        .navigation {
          display: flex;
          justify-content: center;
          gap: 1rem;
          padding: 1rem;
          border-bottom: 1px solid #333;
        }

        .nav-button {
          background: none;
          border: none;
          color: #666;
          font-family: 'Space Mono', monospace;
          font-size: 1rem;
          padding: 0.5rem 1rem;
          cursor: pointer;
          transition: color 0.2s;
        }

        .nav-button.active {
          color: #d9d9d9;
          border-bottom: 2px solid #d9d9d9;
        }

        .nav-button:hover {
          color: #d9d9d9;
        }

        .content-section {
          padding: 2rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 2rem;
        }

        .section-header h2 {
          font-size: 1.5rem;
          margin: 0;
        }

        .create-card-container {
          display: flex;
          align-items: center;
        }

        .card {
          background: #d9d9d9;
          border: 2px solid #000;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          color: #000;
          height: 200px;
          width: 150px;
          text-decoration: none;
        }

        .card-header {
          background: #d9d9d9;
          padding: 0.5rem;
          font-weight: bold;
          border-bottom: 2px solid #000;
        }

        .card-content {
          background-image: url("/assets/images/card_back.jpg");
          background-size: cover;
          background-position: center;
          display: flex;
          align-items: center;
          justify-content: center;
          flex: 1;
        }

        .plus-icon {
          color: white;
          font-size: 48px;
          font-weight: lighter;
        }

        .card:hover {
          cursor: pointer;
          opacity: 0.9;
        }
      `}</style>
    </div>
  );
}
