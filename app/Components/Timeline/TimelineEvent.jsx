import React from "react";
import { FaRocket, FaTrophy, FaHandRock, FaCalendarAlt, FaBookOpen, FaUsersCog } from "react-icons/fa";

// Timeline event component
const TimelineEvent = ({ icon, title, description, isLast }) => {
  return (
    <div className={`timeline-event flex items-center mb-6 ${isLast ? '' : 'border-b-2 border-gray-200 pb-4'}`}>
      <div className="icon-container bg-yellow-500 text-white rounded-full p-4 mr-4 transition-transform duration-500 transform hover:scale-110">
        {icon}
      </div>
      <div className="event-content">
        <h4 className="text-xl font-semibold text-gray-800">{title}</h4>
        <p className="text-sm text-gray-600 mt-2">{description}</p>
      </div>
    </div>
  );
};

// Main Timeline component
const Timeline = () => {
  return (
    <div className="timeline-container p-6 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">Project Timeline</h2>
      <div className="timeline-events space-y-6">
        {/* First Event */}
        <TimelineEvent
          icon={<FaRocket className="w-6 h-6" />}
          title="Rocket Icon"
          description="The project took off with initial planning and setup, just like a rocket launch!"
        />
        {/* Second Event */}
        <TimelineEvent
          icon={<FaTrophy className="w-6 h-6" />}
          title="Won the Challenge"
          description="Achieved the first milestone and celebrated with a team-wide event."
        />
        {/* Third Event */}
        <TimelineEvent
          icon={<FaHandRock className="w-6 h-6" />}
          title="Collaborated with Teams"
          description="Started collaborating with different teams to bring in new ideas and strategies."
        />
        {/* Fourth Event */}
        <TimelineEvent
          icon={<FaUsersCog className="w-6 h-6" />}
          title="SCIC Project Kickoff"
          description="Launched the SCIC project that would contribute significantly to the success of the company."
        />
        {/* Last Event */}
        <TimelineEvent
          icon={<FaCalendarAlt className="w-6 h-6" />}
          title="Final Milestone"
          description="Successfully reached the final milestone of the project, preparing for future expansion."
          isLast={true}
        />
      </div>
    </div>
  );
};

export default Timeline;
