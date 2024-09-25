import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import { Event } from "../types";
import axios from "axios";
import { Link } from "react-router-dom";
import SkeletonLoader from "../components/SkeletonLoader";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Doughnut } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const DashboardPage: React.FC = () => {
  const { userInfo } = useSelector((state: RootState) => state.user);
  const [rsvpedEvents, setRsvpedEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    if (userInfo) {
      setTimeout(() => {
        axios
          .get<Event[]>("/api/events")
          .then((response) => {
            const events = response.data;
            const userEvents = events.filter((event) =>
              event.attendees.includes(userInfo.id)
            );
            setRsvpedEvents(userEvents);
          })
          .catch((error) => {
            console.error("Error fetching events:", error);
          })
          .finally(() => setLoading(false));
      }, 300);
    }
  }, [userInfo]);

  const eventsByMonthData = {
    labels: ["September", "October", "November", "December"],
    datasets: [
      {
        label: "Events Attended",
        data: [3, 2, 5, 3],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
      },
    ],
  };

  const eventTypesData = {
    labels: ["Music", "Art", "Tech", "Gaming"],
    datasets: [
      {
        label: "Event Types",
        data: [5, 2, 3, 3],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56", "E11D48"],
      },
    ],
  };

  return (
    <div className="max-w-5xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Welcome, {userInfo?.name}
      </h2>

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Events You've RSVPed To
      </h3>

      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {[...Array(2)].map((_, index) => (
            <SkeletonLoader key={index} />
          ))}
        </div>
      ) : rsvpedEvents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {rsvpedEvents.map((event) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg">
              {event.thumbnailUrl && (
                <img
                  src={event.thumbnailUrl}
                  alt={event.title}
                  className="w-full h-48 object-cover rounded-t-lg"
                />
              )}
              <div className="p-4">
                <h4 className="text-xl font-semibold">{event.title}</h4>
                <p className="text-gray-600">{event.date}</p>
                <Link
                  to={`/events/${event.id}`}
                  className="text-blue-600 hover:underline"
                >
                  View Event
                </Link>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <p>You have not RSVPed to any events yet.</p>
      )}

      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Your Event Statistics
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-xl font-semibold mb-4">
            Events Attended per Month
          </h4>
          <Bar data={eventsByMonthData} options={{ responsive: true }} />
        </div>
        <div className="bg-white shadow-md rounded-lg p-4">
          <h4 className="text-xl font-semibold mb-4">Event Types Attended</h4>
          <Doughnut data={eventTypesData} options={{ responsive: true }} />
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
