import { useState, useCallback } from 'react';

const CHUNK_SIZE = 6; // 5-7 items per chunk (using 6 for good balance)

export function useChunkedPractice(items) {
  const [currentChunkIndex, setCurrentChunkIndex] = useState(0);
  
  const chunks = [];
  for (let i = 0; i < items.length; i += CHUNK_SIZE) {
    chunks.push(items.slice(i, i + CHUNK_SIZE));
  }
  
  const totalChunks = chunks.length;
  const currentChunk = chunks[currentChunkIndex] || [];
  const hasNextChunk = currentChunkIndex < totalChunks - 1;
  const hasPrevChunk = currentChunkIndex > 0;
  
  const nextChunk = useCallback(() => {
    if (hasNextChunk) {
      setCurrentChunkIndex(prev => prev + 1);
    }
  }, [hasNextChunk]);
  
  const prevChunk = useCallback(() => {
    if (hasPrevChunk) {
      setCurrentChunkIndex(prev => prev - 1);
    }
  }, [hasPrevChunk]);
  
  const resetChunks = useCallback(() => {
    setCurrentChunkIndex(0);
  }, []);
  
  return {
    currentChunk,
    currentChunkIndex,
    totalChunks,
    hasNextChunk,
    hasPrevChunk,
    nextChunk,
    prevChunk,
    resetChunks,
  };
}

export function ChunkIndicator({ currentChunkIndex, totalChunks }) {
  return (
    <div className="chunk-indicator">
      <div className="chunk-label">Set {currentChunkIndex + 1} of {totalChunks}</div>
      <div className="chunk-dots">
        {Array.from({ length: totalChunks }).map((_, idx) => (
          <div 
            key={idx} 
            className={`chunk-dot ${idx === currentChunkIndex ? 'active' : ''} ${idx < currentChunkIndex ? 'completed' : ''}`}
          />
        ))}
      </div>
      
      <style>{`
        .chunk-indicator {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 0.5rem;
          padding: 0.75rem;
          background: var(--bg-secondary);
          border-radius: var(--radius-md);
          border: 1px solid var(--border);
        }
        
        .chunk-label {
          font-size: 0.875rem;
          font-weight: 600;
          color: var(--text-secondary);
        }
        
        .chunk-dots {
          display: flex;
          gap: 0.375rem;
          flex-wrap: wrap;
          justify-content: center;
          max-width: 300px;
        }
        
        .chunk-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: var(--bg-tertiary);
          border: 1.5px solid var(--border);
          transition: all 0.3s ease;
        }
        
        .chunk-dot.active {
          background: var(--primary);
          border-color: var(--primary);
          transform: scale(1.4);
          box-shadow: 0 0 8px var(--primary);
        }
        
        .chunk-dot.completed {
          background: var(--success);
          border-color: var(--success);
        }
      `}</style>
    </div>
  );
}

export function ChunkNavigation({ hasNextChunk, hasPrevChunk, onNext, onPrev, showNextButton = true }) {
  return (
    <div className="chunk-navigation">
      {hasPrevChunk && (
        <button className="btn btn-secondary" onClick={onPrev}>
          ← Previous Set
        </button>
      )}
      {showNextButton && hasNextChunk && (
        <button className="btn btn-primary" onClick={onNext}>
          Next Set →
        </button>
      )}
      
      <style>{`
        .chunk-navigation {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-top: 1rem;
        }
        
        @media (max-width: 640px) {
          .chunk-navigation {
            flex-direction: column;
          }
        }
      `}</style>
    </div>
  );
}
