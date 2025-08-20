export interface User {
  id: string;
  name: string;
  email: string;
}

export interface Itinerary {
  city: string;
  days: number;
  activities: string[];
}

export interface AuthResponse {
  token: string;
  user: User;
}