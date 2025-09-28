import CardForm from '../CardForm';
import CardPreview from '../CardPreview';
import '../../styles/fonts.css';
import '../../styles/create-card.css';

export default function CreateCardPage() {
  return (
    <div className="create-card-page">
      <div className="create-card-container">
        <div className="form-section">
          <CardForm cardPreviewId="cardPreview" />
        </div>
        <div className="preview-section" id="cardPreviewContainer">
          <CardPreview cardData={{
            name: '',
            chessPieceType: '',
            pokerCardSymbol: 'Clubs',
            pokerCardType: 'Ace',
            cardType: 'Dragon',
            description: '',
            effect: '',
            image: ''
          }} />
        </div>
      </div>
    </div>
  );
}
