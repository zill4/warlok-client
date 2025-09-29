import { useEffect, useMemo, useState } from 'react';
import '../styles/creator-search.css';

type UserPreview = {
  id: number | string;
  username: string;
  avatar: string;
};

type CreatorSearchProps = {
  label?: string;
  id?: string;
  required?: boolean;
  onChange?: (user: UserPreview, isCurrentUser: boolean) => void;
};

type SelectedCreator = {
  username: string;
  avatar: string;
  isCurrentUser: boolean;
};

const DEFAULT_AVATAR = 'https://pbs.twimg.com/profile_images/1882571472712974336/LBgD5N5R_400x400.jpg';

export default function CreatorSearch({
  label = 'CREATOR',
  id = 'creatorSearch',
  required = true,
  onChange,
}: CreatorSearchProps) {
  const [query, setQuery] = useState('');
  const [resultsVisible, setResultsVisible] = useState(false);
  const [selected, setSelected] = useState<SelectedCreator>(() => {
    const currentUser = getCurrentUser();
    return {
      username: currentUser.username,
      avatar: currentUser.avatar,
      isCurrentUser: true,
    };
  });

  const mockUsers = useMemo<UserPreview[]>(
    () => [
      { id: 1, username: 'Zi114', avatar: DEFAULT_AVATAR },
      { id: 2, username: 'JohnDoe', avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
      { id: 3, username: 'JaneSmith', avatar: 'https://randomuser.me/api/portraits/women/1.jpg' },
      { id: 4, username: 'ArtistX', avatar: 'https://randomuser.me/api/portraits/men/2.jpg' },
      { id: 5, username: 'CreatorY', avatar: 'https://randomuser.me/api/portraits/women/2.jpg' },
    ],
    []
  );

  useEffect(() => {
    const handler = (event: MouseEvent) => {
      if (!(event.target instanceof HTMLElement)) return;
      if (!event.target.closest('.creator-search-component')) {
        setResultsVisible(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  useEffect(() => {
    onChange?.({
      id: selected.isCurrentUser ? 'self' : selected.username,
      username: selected.username,
      avatar: selected.avatar,
    }, selected.isCurrentUser);

    document.dispatchEvent(new CustomEvent('creator-changed', {
      detail: {
        username: selected.username,
        avatar: selected.avatar,
        isCurrentUser: selected.isCurrentUser,
      },
    }));
  }, [selected]);

  const filteredUsers = useMemo(() => {
    if (!query) return [];
    return mockUsers.filter((user) => user.username.toLowerCase().includes(query.toLowerCase()));
  }, [mockUsers, query]);

  const selectCreator = (user: UserPreview) => {
    const currentUser = getCurrentUser();
    const isCurrent =
      user.id === currentUser.id ||
      (user.username === currentUser.username && user.username !== 'You');

    setSelected({
      username: user.username,
      avatar: user.avatar,
      isCurrentUser: isCurrent,
    });

    setQuery('');
    setResultsVisible(false);
  };

  const resetToCurrentUser = () => {
    const currentUser = getCurrentUser();
    setSelected({
      username: currentUser.username,
      avatar: currentUser.avatar,
      isCurrentUser: true,
    });
    setQuery('');
    setResultsVisible(false);
  };

  return (
    <div className="creator-search-component">
      <label htmlFor={id}>
        {label} {required && <span className="required">*</span>}
      </label>

      <div className="creator-search-container">
        <input
          type="text"
          id={id}
          value={query}
          placeholder="Search for creator"
          className="input-field"
          onInput={(event) => {
            const value = (event.target as HTMLInputElement).value;
            setQuery(value);
            setResultsVisible(Boolean(value));
          }}
          onFocus={() => setResultsVisible(Boolean(query))}
        />

        <div className={`creator-search-results ${resultsVisible ? 'active' : ''}`}>
          {filteredUsers.length === 0 ? (
            <div className="creator-result">No users found</div>
          ) : (
            filteredUsers.map((user) => (
              <button
                key={user.id}
                type="button"
                className="creator-result"
                onClick={() => selectCreator(user)}
              >
                <img src={user.avatar} alt={user.username} className="creator-avatar" />
                <span>{user.username}</span>
              </button>
            ))
          )}
        </div>

        <div className="selected-creator">
          <div className="creator-info">
            <img src={selected.avatar} alt={selected.username} className="creator-avatar" />
            <span>{selected.username}</span>
          </div>
          <button type="button" className="reset-btn" onClick={resetToCurrentUser}>
            ×
          </button>
        </div>
      </div>
      <div className="error-message" aria-live="polite" />
    </div>
  );
}

function getCurrentUser(): UserPreview {
  try {
    const username = localStorage.getItem('username');
    const userId = localStorage.getItem('userid');

    if (username) {
      return {
        id: userId || 'self',
        username,
        avatar: DEFAULT_AVATAR,
      };
    }

    return { id: 'self', username: 'You', avatar: DEFAULT_AVATAR };
  } catch (error) {
    console.error('Error parsing user from localStorage:', error);
    return { id: 'self', username: 'You', avatar: DEFAULT_AVATAR };
  }
}
