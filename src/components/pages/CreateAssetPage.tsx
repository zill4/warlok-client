import { Link } from 'react-router-dom';
import '../../styles/fonts.css';
import '../../styles/create-asset.css';
import { withBasePath } from '../../utils/basePath';

export default function CreateAssetPage() {
  return (
    <div className="create-asset">
      <div className="content">
        <div className="step-counter">1/3</div>

        <div className="selection-grid">
          <Link to={withBasePath('createAsset/upload')} className="option-card">
            <div className="option-icon">🎨</div>
            <h2>Upload Art Asset</h2>
            <p>Upload your own artwork to create a 3D model</p>
          </Link>

          <Link to={withBasePath('createAsset/generate')} className="option-card">
            <div className="option-icon">🔄</div>
            <h2>Generate 3D Model</h2>
            <p>Generate a 3D model from existing artwork</p>
          </Link>
        </div>
      </div>
    </div>
  );
}
