import type { ComponentChildren } from 'preact';
import '../styles/card-component.css';

type CardComponentProps = {
  title: string;
  image: string;
  creator?: string;
  footerText?: string;
  showViewOptions?: boolean;
  centerFooter?: boolean;
  is3DModel?: boolean;
  children?: ComponentChildren;
};

export default function CardComponent({
  title,
  image,
  creator = 'Zi114',
  footerText,
  showViewOptions = false,
  centerFooter = false,
  is3DModel = false,
  children,
}: CardComponentProps) {
  return (
    <div className="card-component">
      <div className="card-header">{title}</div>
      <div className="card-image-container">
        <div className="image-wrapper">
          <img src={image} alt={title} className="card-image" />
        </div>
      </div>
      <div className={`card-footer ${centerFooter ? 'center' : ''}`}>
        {!centerFooter && (
          <div className="creator-info">
            <img
              src="https://pbs.twimg.com/profile_images/1882571472712974336/LBgD5N5R_400x400.jpg"
              alt="Creator"
              className="creator-avatar"
            />
            <span>{creator}</span>
          </div>
        )}

        {footerText && <span>{footerText}</span>}

        {showViewOptions && is3DModel && (
          <div className="view-options">
            <button className="view-button">2D</button>
            <button className="view-button active">3D</button>
          </div>
        )}
      </div>
      {children}
    </div>
  );
}
