import FormField from '../FormField';
import ImageUploader from '../ImageUploader';
import CreatorSearch from '../CreatorSearch';
import CardPreview from '../CardPreview';
import CardComponent from '../CardComponent';
import '../../styles/fonts.css';
import '../../styles/create-asset-upload.css';

export default function CreateAssetUploadPage() {
  return (
    <div className="create-asset">
      <div className="content">
        <div className="step-counter">2/3</div>

        <div className="form-container">
          <div className="form-section">
            <div className="form-group">
              <FormField id="assetName" label="ASSET NAME" required />
              <FormField id="assetDescription" label="DESCRIPTION" type="textarea" optional />
              <FormField id="assetTags" label="TAGS" placeholder="Enter asset tags (comma separated)" optional />
              <CreatorSearch />

              <div className="form-row">
                <div className="form-col">
                  <FormField
                    id="royaltyRate"
                    label="ROYALTY RATE"
                    value="10%"
                    required
                    helperText="Maximum royalty rate: 30%"
                  />
                </div>
                <div className="form-col">
                  <FormField
                    id="assetPrice"
                    label="PRICE"
                    value="FREE"
                    required
                    helperText="Maximum price: $1.00"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="upload-section">
            <div className="small-upload">
              <ImageUploader />
            </div>
            <div className="preview-area">
              <CardPreview />
            </div>
          </div>

          <div className="action-buttons">
            <button className="cancel-btn">Cancel</button>
            <button className="submit-btn" disabled>
              Create Asset
            </button>
          </div>

          {/* StatusModal port pending */}
        </div>
      </div>
    </div>
  );
}
