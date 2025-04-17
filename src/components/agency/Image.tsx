
import React from 'react';

interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: string;
}

const Image = ({ src, alt, fallback = '', className = '', ...props }: ImageProps) => {
  const [error, setError] = React.useState(false);

  const handleError = () => {
    setError(true);
  };

  return (
    <img
      src={error ? fallback : src}
      alt={alt}
      onError={handleError}
      className={className}
      {...props}
    />
  );
};

export default Image;
