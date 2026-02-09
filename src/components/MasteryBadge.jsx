export default function MasteryBadge({ mastery }) {
  // Color-coded mastery: gray→amber→blue→purple→green for 0%→25%→50%→75%→90%+
  const getMasteryLevel = () => {
    if (mastery >= 90) return { color: '#10B981', label: 'Mastered', bg: '#D1FAE5' };
    if (mastery >= 75) return { color: '#A855F7', label: 'Advanced', bg: '#F3E8FF' };
    if (mastery >= 50) return { color: '#3B82F6', label: 'Proficient', bg: '#DBEAFE' };
    if (mastery >= 25) return { color: '#F59E0B', label: 'Learning', bg: '#FEF3C7' };
    return { color: '#9CA3AF', label: 'Beginner', bg: '#F3F4F6' };
  };

  const level = getMasteryLevel();

  return (
    <span className="mastery-badge" style={{ 
      color: level.color, 
      backgroundColor: level.bg,
      borderColor: level.color 
    }}>
      <span className="mastery-label">{level.label}</span>
      <span className="mastery-percent">{mastery}%</span>
      
      <style>{`
        .mastery-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.375rem;
          padding: 0.25rem 0.625rem;
          border-radius: 12px;
          font-size: 0.75rem;
          font-weight: 600;
          border: 1.5px solid;
          transition: all 0.3s ease;
        }
        
        .mastery-label {
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: 0.025em;
        }
        
        .mastery-percent {
          opacity: 0.8;
        }
        
        .mastery-badge:hover {
          transform: scale(1.05);
          box-shadow: 0 2px 8px rgba(0,0,0,0.1);
        }
      `}</style>
    </span>
  );
}
