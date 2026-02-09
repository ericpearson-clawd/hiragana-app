import PropTypes from 'prop-types';

/**
 * Skeleton loader component with shimmer animation
 * Used as placeholder while content is loading
 */
function SkeletonLoader({ 
  variant = 'text', 
  width = '100%', 
  height, 
  count = 1,
  className = '' 
}) {
  const getHeight = () => {
    if (height) return height;
    switch (variant) {
      case 'text': return '1em';
      case 'title': return '2em';
      case 'card': return '200px';
      case 'button': return '40px';
      case 'circle': return '48px';
      default: return '1em';
    }
  };

  const getStyles = () => {
    const base = {
      width,
      height: getHeight(),
      borderRadius: variant === 'circle' ? '50%' : '8px',
    };

    if (variant === 'circle') {
      base.width = getHeight();
    }

    return base;
  };

  return (
    <>
      {Array.from({ length: count }).map((_, index) => (
        <div 
          key={index}
          className={`skeleton ${className}`}
          style={getStyles()}
          aria-hidden="true"
        />
      ))}

      <style>{`
        .skeleton {
          background: linear-gradient(
            90deg,
            var(--skeleton-base, #e0e0e0) 0%,
            var(--skeleton-shine, #f0f0f0) 50%,
            var(--skeleton-base, #e0e0e0) 100%
          );
          background-size: 200% 100%;
          animation: shimmer 1.5s ease-in-out infinite;
          margin-bottom: 0.5rem;
        }

        [data-theme="dark"] .skeleton {
          --skeleton-base: #2a2a2a;
          --skeleton-shine: #3a3a3a;
        }

        @keyframes shimmer {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .skeleton {
            animation: none;
            opacity: 0.6;
          }
        }
      `}</style>
    </>
  );
}

SkeletonLoader.propTypes = {
  variant: PropTypes.oneOf(['text', 'title', 'card', 'button', 'circle']),
  width: PropTypes.string,
  height: PropTypes.string,
  count: PropTypes.number,
  className: PropTypes.string,
};

export default SkeletonLoader;
