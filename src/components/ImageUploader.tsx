import { useEffect, useImperativeHandle, useRef, useState } from 'preact/hooks';
import { forwardRef } from 'preact/compat';
import '../styles/image-uploader.css';

export type ImageUploaderHandle = {
  getFile: () => File | null;
  clearFile: () => void;
};

export type ImageUploaderProps = {
  label?: string;
  required?: boolean;
  id?: string;
  onImageLoaded?: (file: File, dataUrl: string) => void;
  onImageCleared?: () => void;
};

const ImageUploader = forwardRef<ImageUploaderHandle, ImageUploaderProps>(
  ({
    label = 'UPLOAD IMAGE',
    required = true,
    id = 'fileInput',
    onImageLoaded,
    onImageCleared,
  }, ref) => {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const uploadContentRef = useRef<HTMLDivElement | null>(null);
    const filePreviewRef = useRef<HTMLDivElement | null>(null);
    const smallPreviewRef = useRef<HTMLImageElement | null>(null);
    const fileNameRef = useRef<HTMLSpanElement | null>(null);
    const errorRef = useRef<HTMLDivElement | null>(null);

    const [dragging, setDragging] = useState(false);

    useImperativeHandle(ref, () => ({
      getFile: () => fileInputRef.current?.files?.[0] ?? null,
      clearFile: () => resetPreview(),
    }));

    useEffect(() => {
      const handlePaste = (event: ClipboardEvent) => {
        const items = event.clipboardData?.items;
        if (!items) return;

        for (const item of items) {
          if (item.type.startsWith('image/')) {
            const file = item.getAsFile();
            if (file) {
              handleFile(file);
              break;
            }
          }
        }
      };

      document.addEventListener('paste', handlePaste);
      return () => document.removeEventListener('paste', handlePaste);
    }, []);

    const resetPreview = () => {
      if (fileInputRef.current) fileInputRef.current.value = '';
      if (uploadContentRef.current) uploadContentRef.current.style.display = 'flex';
      if (filePreviewRef.current) filePreviewRef.current.style.display = 'none';
      if (smallPreviewRef.current) smallPreviewRef.current.src = '';
      if (fileNameRef.current) fileNameRef.current.textContent = '';
      if (errorRef.current) errorRef.current.textContent = '';
      onImageCleared?.();
      document.dispatchEvent(new CustomEvent('image-cleared'));
    };

    const handleFile = (file: File) => {
      if (!file.type.startsWith('image/')) {
        if (errorRef.current) errorRef.current.textContent = 'Please upload an image file';
        return;
      }

      if (errorRef.current) errorRef.current.textContent = '';

      const reader = new FileReader();
      reader.onload = (event) => {
        const imageUrl = event.target?.result as string;
        if (smallPreviewRef.current) smallPreviewRef.current.src = imageUrl;
        if (fileNameRef.current)
          fileNameRef.current.textContent =
            file.name.length > 20 ? `${file.name.substring(0, 17)}...` : file.name;
        if (uploadContentRef.current) uploadContentRef.current.style.display = 'none';
        if (filePreviewRef.current) filePreviewRef.current.style.display = 'flex';

        onImageLoaded?.(file, imageUrl);
        document.dispatchEvent(new CustomEvent('image-loaded', { detail: { file, imageUrl } }));
      };
      reader.readAsDataURL(file);
    };

    const onInputChange = (event: Event) => {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (file) handleFile(file);
    };

    const onDropFile = (event: DragEvent) => {
      event.preventDefault();
      setDragging(false);
      const file = event.dataTransfer?.files?.[0];
      if (file) handleFile(file);
    };

    const openDialog = () => {
      if (filePreviewRef.current?.style.display === 'flex') return;
      fileInputRef.current?.click();
    };

    return (
      <div className="image-uploader">
        {label && (
          <label htmlFor={id}>
            {label} {required && <span className="required">*</span>}
          </label>
        )}
        <div
          className={`upload-box ${dragging ? 'dragover' : ''}`}
          id="uploadBox"
          onClick={openDialog}
          onDragOver={(event) => {
            event.preventDefault();
            setDragging(true);
          }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDropFile}
        >
          <input
            ref={fileInputRef}
            type="file"
            id={id}
            accept="image/*"
            className="file-input"
            required={required}
            onChange={onInputChange}
          />
          <div ref={uploadContentRef} className="upload-content">
            <span className="plus">+</span>
            <p className="upload-text">Drag and Drop, Paste, or<br />Upload Image directly.</p>
          </div>
          <div ref={filePreviewRef} className="file-preview">
            <img ref={smallPreviewRef} className="small-preview-image" alt="Preview" />
            <div className="file-info">
              <span ref={fileNameRef} className="file-name" />
              <button
                type="button"
                className="delete-btn"
                onClick={(event) => {
                  event.stopPropagation();
                  resetPreview();
                }}
                aria-label="Remove file"
              >
                ×
              </button>
            </div>
          </div>
        </div>
        <div ref={errorRef} className="error-message" />
      </div>
    );
  }
);

export default ImageUploader;
