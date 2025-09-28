import { Link } from 'react-router-dom';
import '../../styles/fonts.css';

export default function CreateAssetPage() {
  return (
    <div className="create-asset">
      <div className="content">
        <div className="step-counter">1/3</div>

        <div className="selection-grid">
          <Link to="/createAsset/upload" className="option-card">
            <div className="option-icon">🎨</div>
            <h2>Upload Art Asset</h2>
            <p>Upload your own artwork to create a 3D model</p>
          </Link>

          <Link to="/createAsset/generate" className="option-card">
            <div className="option-icon">🔄</div>
            <h2>Generate 3D Model</h2>
            <p>Generate a 3D model from existing artwork</p>
          </Link>
        </div>
      </div>

      <style jsx>{`
        .create-asset {
          min-height: calc(100vh - var(--header-height));
          color: white;
        }

        .content {
          max-width: 1200px;
          margin: 2rem auto;
          padding: 0 2rem;
        }

        .step-counter {
          font-size: 1.2rem;
          margin-bottom: 2rem;
        }

        .selection-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 2rem;
          margin-top: 2rem;
        }

        .option-card {
          background: #d9d9d9;
          border: 2px solid #000;
          padding: 2rem;
          text-decoration: none;
          color: #000;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          transition: transform 0.2s;
        }

        .option-card:hover {
          transform: translateY(-5px);
        }

        .option-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .option-card h2 {
          margin: 0 0 0.5rem 0;
          font-size: 1.5rem;
        }

        .option-card p {
          margin: 0;
          color: #666;
        }

        @media (max-width: 768px) {
          .selection-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}
