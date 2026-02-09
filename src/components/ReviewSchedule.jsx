import React from 'react';
import { getReviewSchedule, formatTimeUntil } from '../utils/spacedRepetition';

export default function ReviewSchedule({ characters }) {
  const schedule = getReviewSchedule(characters);
  
  // Get next review time if any
  const nextReviewTime = Object.values(characters)
    .filter(data => data.nextReview && data.nextReview > Date.now())
    .map(data => data.nextReview)
    .sort((a, b) => a - b)[0];
  
  return (
    <div className="review-schedule">
      <h3 className="review-schedule-title">📅 Review Schedule</h3>
      
      {schedule.available > 0 && (
        <div className="schedule-item available">
          <span className="schedule-count">{schedule.available}</span>
          <span className="schedule-label">Available now</span>
        </div>
      )}
      
      {schedule.next1Hour > 0 && (
        <div className="schedule-item">
          <span className="schedule-count">{schedule.next1Hour}</span>
          <span className="schedule-label">Next hour</span>
        </div>
      )}
      
      {schedule.next4Hours > 0 && (
        <div className="schedule-item">
          <span className="schedule-count">{schedule.next4Hours}</span>
          <span className="schedule-label">Next 4 hours</span>
        </div>
      )}
      
      {schedule.next24Hours > 0 && (
        <div className="schedule-item">
          <span className="schedule-count">{schedule.next24Hours}</span>
          <span className="schedule-label">Tomorrow</span>
        </div>
      )}
      
      {schedule.nextWeek > 0 && (
        <div className="schedule-item">
          <span className="schedule-count">{schedule.nextWeek}</span>
          <span className="schedule-label">This week</span>
        </div>
      )}
      
      {schedule.later > 0 && (
        <div className="schedule-item">
          <span className="schedule-count">{schedule.later}</span>
          <span className="schedule-label">Later</span>
        </div>
      )}
      
      {nextReviewTime && schedule.available === 0 && (
        <div className="next-review-info">
          <span className="next-review-label">Next review:</span>
          <span className="next-review-time">{formatTimeUntil(nextReviewTime)}</span>
        </div>
      )}
      
      {Object.keys(characters).length === 0 && (
        <p className="no-reviews">Start learning to see your review schedule!</p>
      )}
    </div>
  );
}
