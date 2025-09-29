// src/components/CardPreview.tsx
import { useEffect, useRef } from 'react';
import type { CardData } from '../types/shared';
import { withBasePath } from '../utils/basePath';
import '../styles/card-preview.css';

type CardPreviewProps = {
  cardData?: CardData;
  showFooter?: boolean;
};

const defaultCardData: CardData = {
  name: 'NEW CARD',
  chessPieceType: '',
  pokerCardSymbol: 'Clubs',
  pokerCardType: 'Ace',
  cardType: 'Dragon',
  description: '',
  effect: '',
  image: '',
};

export default function CardPreview({ cardData = defaultCardData, showFooter = true }: CardPreviewProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (event: Event) => {
      const detail = (event as CustomEvent<CardData>).detail;
      if (!cardRef.current || !detail) return;

      const nameEl = cardRef.current.querySelector<HTMLElement>('[data-card=name]');
      const effectEl = cardRef.current.querySelector<HTMLElement>('[data-card=effect]');
      const descriptionEl = cardRef.current.querySelector<HTMLElement>('[data-card=description]');
      const imageEl = cardRef.current.querySelector<HTMLImageElement>('img[data-card=image]');

      if (nameEl) nameEl.textContent = detail.name || 'NEW CARD';
      if (effectEl) effectEl.textContent = detail.effect || 'Effect text will appear here';
      if (descriptionEl) descriptionEl.textContent = detail.description || 'Description goes here';
      if (imageEl && detail.image) imageEl.src = detail.image;
    };

    document.addEventListener('previewupdate', handler as EventListener);
    return () => document.removeEventListener('previewupdate', handler as EventListener);
  }, []);

  return (
    <div className="card-preview" ref={cardRef} id="cardPreview">
      <div className="card">
        <div className="card-header" data-card="name">
          {cardData.name || 'NEW CARD'}
        </div>
        <div className="card-image-container">
          <div className="image-wrapper">
            <img
              data-card="image"
              src={cardData.image || withBasePath('/assets/images/card_back.jpg')}
              alt={cardData.name || 'Card Preview'}
              className="card-image"
            />
          </div>
        </div>
        {showFooter && (
          <div className="card-footer">
            <div className="creator-info">
              <img
                src="https://pbs.twimg.com/profile_images/1882571472712974336/LBgD5N5R_400x400.jpg"
                alt="Creator"
                className="creator-avatar"
              />
              <span>Zi114</span>
            </div>
            <div className="card-effect" data-card="effect">
              Effect text will appear here
            </div>
          </div>
        )}
      </div>
    </div>
  );
}