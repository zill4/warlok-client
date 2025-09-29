import { Link } from 'react-router-dom';
import CardList from '../CardList';
import '../../styles/fonts.css';
import '../../styles/card-list.css';
import '../../styles/profile-page.css';
import { withBasePath } from '../../utils/basePath';

const models = [
  {
    id: '1',
    name: 'METALGREYMON',
    creator: 'Zi114',
    image: withBasePath('assets/images/card_back.jpg'),
  },
  {
    id: '2',
    name: 'METALGREYMON',
    creator: 'Zi114',
    image: withBasePath('assets/images/card_back.jpg'),
  },
  {
    id: '3',
    name: 'METALGREYMON',
    creator: 'Zi114',
    image: withBasePath('assets/images/card_back.jpg'),
  },
  {
    id: '4',
    name: 'METALGREYMON',
    creator: 'Zi114',
    image: withBasePath('assets/images/card_back.jpg'),
  },
];

export default function ProfilePage() {
  return (
    <div className="profile-page">
      <div className="profile-container">
        <div className="profile-header">
          <div className="profile-info">
            <Link to={withBasePath('')}>
              <img
                src="https://pbs.twimg.com/profile_images/1882571472712974336/LBgD5N5R_400x400.jpg"
                alt="Profile"
                className="avatar"
              />
            </Link>
            <div className="username">Zi114</div>
            <div className="edit-profile">✎</div>
            <div className="logout">Logout</div>
          </div>
        </div>

        <div className="navigation">
          <Link to={withBasePath('game')} className="nav-button active">
            GAMES
          </Link>
          <Link to={withBasePath('cardshop')} className="nav-button">
            CARDS
          </Link>
          <Link to={withBasePath('deckbuilder')} className="nav-button">
            DECKS
          </Link>
          <button className="nav-button">STATS</button>
        </div>

        <div className="content-section">
          <div className="section-header">
            <h2>MY CARDS</h2>
            <div className="create-card-container">
              <Link to={withBasePath('createAsset')} className="card">
                <div className="card-header">CREATE ASSET</div>
                <div 
                  className="card-content"
                  style={{ backgroundImage: `url(${withBasePath('/assets/images/card_back.jpg')})` }}
                >
                  <div className="plus-icon">+</div>
                </div>
              </Link>
            </div>
          </div>

          <CardList cards={models} />
        </div>
      </div>
    </div>
  );
}
