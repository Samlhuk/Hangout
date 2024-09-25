import React, { useEffect, useState } from "react";
import axios from "axios";
import { Event } from "../types";
import { Link } from "react-router-dom";
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import SkeletonLoader from "../components/SkeletonLoader";

const EventsPage: React.FC = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [categoryFilter, setCategoryFilter] = useState<string>("");
  const [locationFilter, setLocationFilter] = useState<string>("");
  const [dateFilter, setDateFilter] = useState<string>("");

  useEffect(() => {
    setTimeout(() => {
      axios
        .get<Event[]>("/api/events")
        .then((response) => {
          const validEvents = response.data.filter(
            (event): event is Event => event !== undefined
          );
          setEvents(validEvents);
        })
        .catch((error) => {
          console.error("Error fetching events:", error);
        })
        .finally(() => setLoading(false));
    }, 300);
  }, []);

  const filteredEvents = events.filter((event) => {
    const matchesSearchTerm = event.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesCategory =
      categoryFilter === "" || event.categories.includes(categoryFilter);

    const matchesLocation =
      locationFilter === "" ||
      event.location.address
        .toLowerCase()
        .includes(locationFilter.toLowerCase());

    const matchesDate = dateFilter === "" || event.date === dateFilter;

    return (
      matchesSearchTerm && matchesCategory && matchesLocation && matchesDate
    );
  });

  const categories = Array.from(
    new Set(events.flatMap((event) => event.categories))
  );

  return (
    <div className="max-w-7xl mx-auto p-8">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Upcoming Events</h2>

      <div className="bg-white p-6 shadow-md rounded-lg mb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="relative">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 pt-3 pb-2 w-full focus:ring-primary focus:border-primary"
            >
              <option value="">All Categories</option>
              {categories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className="relative">
            <input
              type="text"
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-primary focus:border-primary"
            />
          </div>

          <div className="relative">
            <input
              type="date"
              value={dateFilter}
              onChange={(e) => setDateFilter(e.target.value)}
              className="border border-gray-300 rounded-lg px-4 py-2 w-full focus:ring-primary focus:border-primary"
            />
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {loading
          ? [...Array(6)].map((_, index) => <SkeletonLoader key={index} />)
          : filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-xl transition-shadow duration-300 transform hover:scale-105"
              >
                {event.thumbnailUrl && (
                  <img
                    src={event.thumbnailUrl}
                    alt={event.title}
                    className="w-full h-48 object-cover"
                  />
                )}
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800 mb-2">
                    {event.title}
                  </h3>
                  <p className="text-gray-600 mb-2">{event.description}</p>
                  <p className="text-gray-500 mb-2">
                    {event.date} at {event.time}
                  </p>
                  <p className="text-gray-500 mb-4">
                    <span className="inline-flex items-center">
                      <svg
                        className="w-5 h-5 mr-2 text-primary"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M16 9V3H8v6m5 9H9m10-3H5"
                        />
                      </svg>
                      Categories: {event.categories.join(", ")}
                    </span>
                  </p>
                  <Link
                    to={`/events/${event.id}`}
                    className="text-primary hover:text-secondary font-bold transition-all duration-200 inline-flex items-center"
                  >
                    View Details
                    <ChevronRightIcon className="w-5 h-5 ml-1" />
                  </Link>
                </div>
              </div>
            ))}
        {!loading && filteredEvents.length === 0 && (
          <p className="text-gray-600">
            No events found matching your criteria.
          </p>
        )}
      </div>
    </div>
  );
};

export default EventsPage;
