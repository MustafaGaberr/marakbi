export interface BoatDataItem {
  id: number;
  name: string;
  price_per_hour: number;
  max_seats: number;
  max_seats_stay: number;
  images: string[];
  cities: string[];
  location: string;
  rating: number;
  reviewsCount: number;
  status?: string;
}

export const boatFleetData: BoatDataItem[] = [
  {
    id: 1,
    name: "Luxury Yacht",
    price_per_hour: 500,
    max_seats: 8,
    max_seats_stay: 4,
    images: ["/images/Rectangle 3463853.png"],
    cities: ["Aswan"],
    location: "Aswan - Egypt",
    rating: 4.8,
    reviewsCount: 24,
    status: "Available",
  },
  {
    id: 2,
    name: "Traditional Felucca",
    price_per_hour: 200,
    max_seats: 6,
    max_seats_stay: 2,
    images: ["/images/Rectangle 3463855.png"],
    cities: ["Aswan"],
    location: "Aswan - Egypt",
    rating: 4.5,
    reviewsCount: 18,
    status: "Available",
  },
  {
    id: 3,
    name: "Speed Boat",
    price_per_hour: 300,
    max_seats: 4,
    max_seats_stay: 2,
    images: ["/images/Rectangle 3463856.png"],
    cities: ["Aswan"],
    location: "Aswan - Egypt",
    rating: 4.7,
    reviewsCount: 31,
    status: "Available",
  },
  {
    id: 4,
    name: "Fishing Boat",
    price_per_hour: 150,
    max_seats: 4,
    max_seats_stay: 2,
    images: ["/images/Rectangle 3463853.png"],
    cities: ["Luxor"],
    location: "Luxor - Egypt",
    rating: 4.2,
    reviewsCount: 12,
    status: "Available",
  },
  {
    id: 5,
    name: "Party Boat",
    price_per_hour: 400,
    max_seats: 12,
    max_seats_stay: 6,
    images: ["/images/Rectangle 3463855.png"],
    cities: ["Cairo"],
    location: "Cairo - Egypt",
    rating: 4.9,
    reviewsCount: 45,
    status: "Available",
  },
  {
    id: 6,
    name: "Family Boat",
    price_per_hour: 250,
    max_seats: 6,
    max_seats_stay: 3,
    images: ["/images/Rectangle 3463856.png"],
    cities: ["Alexandria"],
    location: "Alexandria - Egypt",
    rating: 4.6,
    reviewsCount: 28,
    status: "Available",
  },
];


