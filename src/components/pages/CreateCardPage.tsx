import CardForm from '../CardForm';
import CardPreview from '../CardPreview';
import '../../styles/fonts.css';
import '../../styles/create-card.css';

const defaultCardData = {
  name: '',
  chessPieceType: '',
  pokerCardSymbol: 'Clubs' as const,
  pokerCardType: 'Ace' as const,
  cardType: 'Dragon' as const,
  description: '',
  effect: '',
  image: '',
};

export default function CreateCardPage() {
  return (
    <div className="create-card-page">
      <div className="create-card-container">
        <div className="form-section">
          <CardForm cardPreviewId="cardPreview" />
        </div>
        <div className="preview-section" id="cardPreviewContainer">
          <CardPreview cardData={defaultCardData} />
        </div>
      </div>
    </div>
  );
}
