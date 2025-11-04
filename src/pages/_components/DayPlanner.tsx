import { useState } from 'react';
import type { Trip, Activity } from './TravelPlannerApp';

interface DayPlannerProps {
  trip: Trip;
  onUpdate: (trip: Trip) => void;
}

const DayPlanner = ({ trip, onUpdate }: DayPlannerProps) => {
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [isAddingActivity, setIsAddingActivity] = useState(false);
  const [editingActivity, setEditingActivity] = useState<string | null>(null);
  const [activityForm, setActivityForm] = useState<Omit<Activity, 'id'>>({
    time: '',
    title: '',
    description: '',
    location: '',
  });

  const selectedDay = trip.dailyPlans[selectedDayIndex];

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      year: 'numeric',
    });
  };

  const getDayLabel = (index: number) => {
    return `Day ${index + 1}`;
  };

  const handleAddActivity = () => {
    if (!activityForm.title.trim()) {
      alert('Activity title is required');
      return;
    }

    const newActivity: Activity = {
      ...activityForm,
      id: Date.now().toString(),
    };

    const updatedTrip = { ...trip };
    updatedTrip.dailyPlans[selectedDayIndex].activities.push(newActivity);
    updatedTrip.dailyPlans[selectedDayIndex].activities.sort((a, b) => a.time.localeCompare(b.time));

    onUpdate(updatedTrip);
    setActivityForm({ time: '', title: '', description: '', location: '' });
    setIsAddingActivity(false);
  };

  const handleUpdateActivity = () => {
    if (!activityForm.title.trim() || !editingActivity) {
      return;
    }

    const updatedTrip = { ...trip };
    const activityIndex = updatedTrip.dailyPlans[selectedDayIndex].activities.findIndex(
      a => a.id === editingActivity
    );

    if (activityIndex !== -1) {
      updatedTrip.dailyPlans[selectedDayIndex].activities[activityIndex] = {
        ...activityForm,
        id: editingActivity,
      };
      updatedTrip.dailyPlans[selectedDayIndex].activities.sort((a, b) => a.time.localeCompare(b.time));
    }

    onUpdate(updatedTrip);
    setActivityForm({ time: '', title: '', description: '', location: '' });
    setEditingActivity(null);
  };

  const handleDeleteActivity = (activityId: string) => {
    const updatedTrip = { ...trip };
    updatedTrip.dailyPlans[selectedDayIndex].activities = updatedTrip.dailyPlans[
      selectedDayIndex
    ].activities.filter(a => a.id !== activityId);

    onUpdate(updatedTrip);
  };

  const startEditing = (activity: Activity) => {
    setActivityForm({
      time: activity.time,
      title: activity.title,
      description: activity.description,
      location: activity.location,
    });
    setEditingActivity(activity.id);
    setIsAddingActivity(false);
  };

  const cancelForm = () => {
    setActivityForm({ time: '', title: '', description: '', location: '' });
    setIsAddingActivity(false);
    setEditingActivity(null);
  };

  return (
    <div className="bg-white rounded-lg shadow-lg overflow-hidden">
      {/* Trip Header */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-700 p-6 text-white">
        <h2 className="text-3xl font-bold mb-2">{trip.name}</h2>
        <p className="text-blue-100 flex items-center text-lg">
          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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

      {/* Day Selector */}
      <div className="border-b bg-gray-50 overflow-x-auto">
        <div className="flex min-w-max">
          {trip.dailyPlans.map((day, index) => (
            <button
              key={day.date}
              onClick={() => {
                setSelectedDayIndex(index);
                cancelForm();
              }}
              className={`px-6 py-4 text-sm font-medium transition-colors whitespace-nowrap ${
                index === selectedDayIndex
                  ? 'bg-white text-blue-600 border-b-2 border-blue-600'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              }`}
            >
              <div>{getDayLabel(index)}</div>
              <div className="text-xs opacity-75 mt-1">
                {new Date(day.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
              </div>
              {day.activities.length > 0 && (
                <div className="text-xs mt-1 text-blue-600 font-semibold">
                  {day.activities.length} {day.activities.length === 1 ? 'activity' : 'activities'}
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <div className="mb-6">
          <h3 className="text-2xl font-bold text-gray-800 mb-1">
            {getDayLabel(selectedDayIndex)}
          </h3>
          <p className="text-gray-600">{formatDate(selectedDay.date)}</p>
        </div>

        {/* Add Activity Button */}
        {!isAddingActivity && !editingActivity && (
          <button
            onClick={() => setIsAddingActivity(true)}
            className="w-full btn bg-green-600 hover:bg-green-700 text-white mb-6"
          >
            + Add Activity
          </button>
        )}

        {/* Activity Form */}
        {(isAddingActivity || editingActivity) && (
          <div className="bg-blue-50 p-4 rounded-lg mb-6 border-2 border-blue-200">
            <h4 className="font-semibold text-lg mb-4 text-gray-800">
              {editingActivity ? 'Edit Activity' : 'New Activity'}
            </h4>
            <div className="space-y-3">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                <input
                  type="time"
                  value={activityForm.time}
                  onChange={e => setActivityForm({ ...activityForm, time: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Activity Title *
                </label>
                <input
                  type="text"
                  value={activityForm.title}
                  onChange={e => setActivityForm({ ...activityForm, title: e.target.value })}
                  placeholder="e.g., Visit Eiffel Tower"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Location</label>
                <input
                  type="text"
                  value={activityForm.location}
                  onChange={e => setActivityForm({ ...activityForm, location: e.target.value })}
                  placeholder="e.g., Champ de Mars, Paris"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  value={activityForm.description}
                  onChange={e => setActivityForm({ ...activityForm, description: e.target.value })}
                  placeholder="Add notes, details, or reminders..."
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div className="flex gap-2">
                <button
                  onClick={editingActivity ? handleUpdateActivity : handleAddActivity}
                  className="flex-1 btn bg-blue-600 hover:bg-blue-700 text-white"
                >
                  {editingActivity ? 'Update' : 'Add'} Activity
                </button>
                <button
                  onClick={cancelForm}
                  className="btn bg-gray-300 hover:bg-gray-400 text-gray-800"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Activities List */}
        {selectedDay.activities.length === 0 ? (
          <div className="text-center py-12 text-gray-500">
            <svg
              className="mx-auto h-12 w-12 text-gray-400 mb-3"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            <p>No activities planned for this day yet.</p>
            <p className="text-sm mt-1">Click "Add Activity" to start planning!</p>
          </div>
        ) : (
          <div className="space-y-4">
            {selectedDay.activities.map(activity => (
              <div
                key={activity.id}
                className="bg-gradient-to-r from-gray-50 to-blue-50 border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      {activity.time && (
                        <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-600 text-white">
                          <svg
                            className="w-3 h-3 mr-1"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                          </svg>
                          {activity.time}
                        </span>
                      )}
                      <h4 className="text-lg font-semibold text-gray-800">{activity.title}</h4>
                    </div>

                    {activity.location && (
                      <p className="text-sm text-gray-600 flex items-center mt-1">
                        <svg
                          className="w-4 h-4 mr-1 text-red-500"
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
                        {activity.location}
                      </p>
                    )}

                    {activity.description && (
                      <p className="text-sm text-gray-700 mt-2">{activity.description}</p>
                    )}
                  </div>

                  <div className="flex gap-2 ml-4">
                    <button
                      onClick={() => startEditing(activity)}
                      className="p-2 text-blue-600 hover:bg-blue-100 rounded-lg transition-colors"
                      title="Edit"
                    >
                      <svg
                        className="w-5 h-5"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                        />
                      </svg>
                    </button>
                    <button
                      onClick={() => {
                        if (confirm(`Delete "${activity.title}"?`)) {
                          handleDeleteActivity(activity.id);
                        }
                      }}
                      className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-colors"
                      title="Delete"
                    >
                      <svg
                        className="w-5 h-5"
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
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default DayPlanner;
