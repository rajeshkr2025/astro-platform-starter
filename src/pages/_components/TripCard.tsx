import type { Trip } from './TravelPlannerApp';

interface TripCardProps {
  trip: Trip;
  onSelect: (trip: Trip) => void;
  onDelete: (tripId: string) => void;
}

const TripCard = ({ trip, onSelect, onDelete }: TripCardProps) => {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
  };

  const getDuration = () => {
    const start = new Date(trip.startDate);
    const end = new Date(trip.endDate);
    const days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
    return `${days} ${days === 1 ? 'day' : 'days'}`;
  };

  const getTotalActivities = () => {
    return trip.dailyPlans.reduce((total, plan) => total + plan.activities.length, 0);
  };

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300 overflow-hidden">
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4">
        <h3 className="text-xl font-bold text-white truncate">{trip.name}</h3>
        <p className="text-blue-100 flex items-center mt-1">
          <svg
            className="w-4 h-4 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
            />
          </svg>
          {trip.destination}
        </p>
      </div>

      <div className="p-4 space-y-3">
        <div className="flex items-center text-gray-600">
          <svg
            className="w-5 h-5 mr-2 text-blue-500"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
          <span className="text-sm">
            {formatDate(trip.startDate)} - {formatDate(trip.endDate)}
          </span>
        </div>

        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-600">
            <span className="font-semibold text-gray-800">{getDuration()}</span> trip
          </span>
          <span className="text-gray-600">
            <span className="font-semibold text-gray-800">{getTotalActivities()}</span> activities
          </span>
        </div>

        <div className="flex gap-2 pt-3 border-t">
          <button
            onClick={() => onSelect(trip)}
            className="flex-1 btn bg-blue-600 hover:bg-blue-700 text-white text-sm"
          >
            View Plan
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              if (confirm(`Delete "${trip.name}"?`)) {
                onDelete(trip.id);
              }
            }}
            className="btn bg-red-500 hover:bg-red-600 text-white text-sm px-4"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
              />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripCard;
