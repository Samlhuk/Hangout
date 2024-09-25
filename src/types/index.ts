export interface Comment {
  id: string;
  userId: string;
  userName: string;
  content: string;
  createdAt: string; // ISO date string
}

export interface Organizer {
  id: string;
  name: string;
  thumbnailUrl: string;
  description: string;
}

export interface Event {
  id: string;
  title: string;
  description: string;
  date: string;
  time: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  organizer: string;
  organizerDetails: Organizer;
  attendees: string[];
  comments: Comment[];
  thumbnailUrl: string;
  categories: string[];
}

export interface UserInfo {
  id: string;
  name: string;
  email: string;
  thumbnailUrl?: string;
  // Add other user properties if needed
}
