import { useState, useEffect } from 'react';
import TripCard from './TripCard';
import AddTripForm from './AddTripForm';
import DayPlanner from './DayPlanner';

export interface Activity {
  id: string;
  time: string;
  title: string;
  description: string;
  location: string;
}

export interface DailyPlan {
  date: string;
  activities: Activity[];
}

export interface Trip {
  id: string;
  name: string;
  destination: string;
  startDate: string;
  endDate: string;
  dailyPlans: DailyPlan[];
}

const TravelPlannerApp = () => {
  const [trips, setTrips] = useState<Trip[]>([]);
  const [selectedTrip, setSelectedTrip] = useState<Trip | null>(null);
  const [showAddForm, setShowAddForm] = useState(false);

  // Load trips from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem('travel-planner-trips');
    if (stored) {
      try {
        setTrips(JSON.parse(stored));
      } catch (error) {
        console.error('Error loading trips:', error);
      }
    }
  }, []);

  // Save trips to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('travel-planner-trips', JSON.stringify(trips));
  }, [trips]);

  const addTrip = (trip: Omit<Trip, 'id' | 'dailyPlans'>) => {
    const newTrip: Trip = {
      ...trip,
      id: Date.now().toString(),
      dailyPlans: generateDailyPlans(trip.startDate, trip.endDate),
    };
    setTrips([...trips, newTrip]);
    setShowAddForm(false);
  };

  const deleteTrip = (tripId: string) => {
    setTrips(trips.filter(t => t.id !== tripId));
    if (selectedTrip?.id === tripId) {
      setSelectedTrip(null);
    }
  };

  const updateTrip = (updatedTrip: Trip) => {
    setTrips(trips.map(t => (t.id === updatedTrip.id ? updatedTrip : t)));
    setSelectedTrip(updatedTrip);
  };

  const generateDailyPlans = (startDate: string, endDate: string): DailyPlan[] => {
    const plans: DailyPlan[] = [];
    const start = new Date(startDate);
    const end = new Date(endDate);

    for (let date = new Date(start); date <= end; date.setDate(date.getDate() + 1)) {
      plans.push({
        date: date.toISOString().split('T')[0],
        activities: [],
      });
    }

    return plans;
  };

  return (
    <div className="space-y-6">
      {/* Action Buttons */}
      <div className="flex justify-between items-center">
        <button
          onClick={() => setShowAddForm(!showAddForm)}
          className="btn btn-lg bg-blue-600 hover:bg-blue-700 text-white"
        >
          {showAddForm ? 'Cancel' : '+ New Trip'}
        </button>

        {selectedTrip && (
          <button
            onClick={() => setSelectedTrip(null)}
            className="btn bg-gray-500 hover:bg-gray-600 text-white"
          >
            ← Back to All Trips
          </button>
        )}
      </div>

      {/* Add Trip Form */}
      {showAddForm && <AddTripForm onAdd={addTrip} onCancel={() => setShowAddForm(false)} />}

      {/* Main Content */}
      {selectedTrip ? (
        <DayPlanner trip={selectedTrip} onUpdate={updateTrip} />
      ) : (
        <div>
          {trips.length === 0 ? (
            <div className="text-center py-12 bg-white rounded-lg shadow">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"
                />
              </svg>
              <h3 className="mt-2 text-sm font-medium text-gray-900">No trips yet</h3>
              <p className="mt-1 text-sm text-gray-500">
                Get started by creating your first travel plan!
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {trips.map(trip => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                  onSelect={setSelectedTrip}
                  onDelete={deleteTrip}
                />
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default TravelPlannerApp;
