import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import { Event, Comment, UserInfo } from "../types";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
});

const EventDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<Event | null>(null);
  const [attendees, setAttendees] = useState<UserInfo[]>([]);
  const { userInfo } = useSelector((state: RootState) => state.user);

  useEffect(() => {
    axios
      .get<Event>(`/api/events/${id}`)
      .then((response) => {
        setEvent(response.data);
      })
      .catch((error) => {
        console.error("Error fetching event details:", error);
      });
  }, [id]);

  useEffect(() => {
    if (event) {
      axios
        .get<UserInfo[]>("/api/users")
        .then((response) => {
          const users = response.data;
          const eventAttendees = users.filter((user) =>
            event.attendees.includes(user.id)
          );
          setAttendees(eventAttendees);
        })
        .catch((error) => {
          console.error("Error fetching attendees:", error);
        });
    }
  }, [event]);

  const handleRSVP = () => {
    if (event && userInfo) {
      // Check if user is already an attendee
      if (!event.attendees.includes(userInfo.id)) {
        const updatedEvent = {
          ...event,
          attendees: [...event.attendees, userInfo.id],
        };
        setEvent(updatedEvent);

        // Update attendees list
        setAttendees([...attendees, userInfo]);
      }
    }
  };

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const contentElement = e.currentTarget.elements.namedItem(
      "comment"
    ) as HTMLTextAreaElement;
    if (contentElement && contentElement.value && event && userInfo) {
      const newComment: Comment = {
        id: `c${Date.now()}`,
        userId: userInfo.id,
        userName: userInfo.name,
        content: contentElement.value,
        createdAt: new Date().toISOString(),
      };
      const updatedEvent = {
        ...event,
        comments: [...event.comments, newComment],
      };
      setEvent(updatedEvent);
      contentElement.value = "";
    }
  };

  if (!event) return <p>Loading event details...</p>;

  const hasUserRSVPed = userInfo
    ? event.attendees.includes(userInfo.id)
    : false;

  return (
    <div className="max-w-3xl mx-auto p-8">
      {event.thumbnailUrl && (
        <img
          src={event.thumbnailUrl}
          alt={event.title}
          className="w-full h-64 object-cover rounded-md mb-6"
        />
      )}
      <h2 className="text-3xl font-bold text-gray-800 mb-4">{event.title}</h2>
      <p className="text-gray-700 mb-4">{event.description}</p>
      <p className="text-gray-600 mb-2">
        <strong>Date:</strong> {event.date}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Time:</strong> {event.time}
      </p>
      <p className="text-gray-600 mb-2">
        <strong>Location:</strong> {event.location.address}
      </p>
      <p className="text-gray-600 mb-6">
        <strong>Categories:</strong> {event.categories.join(", ")}
      </p>

      <div className="flex items-center mb-6">
        {event.organizerDetails.thumbnailUrl && (
          <img
            src={event.organizerDetails.thumbnailUrl}
            alt={event.organizerDetails.name}
            className="w-16 h-16 object-cover rounded-full mr-4"
          />
        )}
        <div>
          <h4 className="text-lg font-semibold text-gray-800">
            Organized by {event.organizerDetails.name}
          </h4>
          <p className="text-gray-600">{event.organizerDetails.description}</p>
        </div>
      </div>
      <h3 className="text-2xl font-semibold text-gray-800 mb-4">
        Location Map
      </h3>
      <MapContainer
        center={[event.location.lat, event.location.lng]}
        zoom={13}
        style={{ height: "400px", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap contributors"
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={[event.location.lat, event.location.lng]}>
          <Popup>{event.title}</Popup>
        </Marker>
      </MapContainer>
      {userInfo && (
        <button
          onClick={handleRSVP}
          disabled={hasUserRSVPed}
          className={`mt-4 px-6 py-3 text-white font-bold rounded-lg shadow-lg inline-flex items-center ${
            hasUserRSVPed
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-primary hover:bg-secondary transition-all duration-300"
          }`}
        >
          {hasUserRSVPed ? "You have RSVPed" : "RSVP to this event"}
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 12h14M12 5l7 7-7 7"
            />
          </svg>
        </button>
      )}

      <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Attendees
      </h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {attendees.map((attendee) => (
          <div key={attendee.id} className="flex items-center">
            {attendee.thumbnailUrl && (
              <img
                src={attendee.thumbnailUrl}
                alt={attendee.name}
                className="w-10 h-10 object-cover rounded-full mr-2"
              />
            )}
            <p className="text-gray-800">{attendee.name}</p>
          </div>
        ))}
        {attendees.length === 0 && (
          <p className="text-gray-600">No attendees yet.</p>
        )}
      </div>

      <h3 className="text-2xl font-semibold text-gray-800 mt-8 mb-4">
        Comments
      </h3>
      <div className="mb-6">
        {event.comments.map((comment) => (
          <div key={comment.id} className="mb-4 border-b pb-2">
            <p className="text-gray-800">
              <strong>{comment.userName}</strong> -{" "}
              <span className="text-gray-600 text-sm">
                {new Date(comment.createdAt).toLocaleString()}
              </span>
            </p>
            <p className="text-gray-700">{comment.content}</p>
          </div>
        ))}
        {event.comments.length === 0 && (
          <p className="text-gray-600">No comments yet.</p>
        )}
      </div>
      {userInfo && (
        <form onSubmit={handleCommentSubmit}>
          <textarea
            name="comment"
            rows={3}
            required
            className="border p-2 w-full mb-2"
            placeholder="Write a comment..."
          ></textarea>
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Post Comment
          </button>
        </form>
      )}
    </div>
  );
};

export default EventDetailPage;
