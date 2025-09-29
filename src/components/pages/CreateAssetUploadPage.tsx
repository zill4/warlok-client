import { useRef, useState } from 'preact/hooks';
import FormField from '../FormField';
import ImageUploader, { ImageUploaderHandle } from '../ImageUploader';
import CreatorSearch from '../CreatorSearch';
import CardPreview from '../CardPreview';
import StatusModal, { StatusModalHandle } from '../StatusModal';
import '../../styles/fonts.css';
import '../../styles/create-asset-upload.css';

export default function CreateAssetUploadPage() {
  const statusModalRef = useRef<StatusModalHandle | null>(null);
  const uploaderRef = useRef<ImageUploaderHandle | null>(null);
  const [imageSelected, setImageSelected] = useState(false);
  const [assetName, setAssetName] = useState('');

  const handleImageLoaded = () => {
    setImageSelected(true);
    statusModalRef.current?.enableClose(false);
  };

  const handleImageCleared = () => {
    setImageSelected(false);
    statusModalRef.current?.hide();
  };

  const handleSubmit = (event: Event) => {
    event.preventDefault();
    if (!uploaderRef.current?.getFile() || !assetName) {
      statusModalRef.current?.show('Error', 'Please add an image and name.', 0);
      statusModalRef.current?.enableClose(true);
      return;
    }

    statusModalRef.current?.show('Uploading', 'Preparing your image...', 10);
    setTimeout(() => {
      statusModalRef.current?.updateTitle('Processing');
      statusModalRef.current?.updateMessage('Generating 3D model...');
      statusModalRef.current?.updateProgress(60);

      setTimeout(() => {
        statusModalRef.current?.updateTitle('Success');
        statusModalRef.current?.updateMessage('Upload complete!');
        statusModalRef.current?.updateProgress(100);
        statusModalRef.current?.enableClose(true);
      }, 1500);
    }, 1000);
  };

  return (
    <div className="create-asset">
      <div className="content">
        <div className="step-counter">2/3</div>

        <form className="form-container" onSubmit={handleSubmit}>
          <div className="form-section">
            <div className="form-group">
              <FormField
                id="assetName"
                label="ASSET NAME"
                required
                value={assetName}
                onChange={(event) => setAssetName((event.target as HTMLInputElement).value)}
              />
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
              <ImageUploader
                ref={uploaderRef}
                onImageLoaded={handleImageLoaded}
                onImageCleared={handleImageCleared}
              />
            </div>
            <div className="preview-area">
              <CardPreview />
            </div>
          </div>

          <div className="action-buttons">
            <button type="button" className="cancel-btn" onClick={handleImageCleared}>
              Cancel
            </button>
            <button type="submit" className="submit-btn" disabled={!imageSelected || !assetName}>
              Create Asset
            </button>
          </div>
        </form>

        <StatusModal ref={statusModalRef} />
      </div>
    </div>
  );
}
