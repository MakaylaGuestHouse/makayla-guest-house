export const roomsData = [
  {
    id: "deluxe-suite-001",
    name: "Veloria Deluxe Suite",
    roomType: "Suite",
    description: "Experience the height of comfort in our Veloria Deluxe Suite, featuring floor-to-ceiling windows with panoramic views, custom furniture, and a spa-inspired ensuite bathroom.",
    images: ["/room10.jpg", "/room12.jpg", "/room13.jpg", "/room14.jpg"],
    pricePerNight: 320,
    roomSize: "42 m²",
    bedInfo: {
      totalBeds: 1,
      types: [{ type: "King", quantity: 1 }],
      sofaBed: false,
      extraBedAvailable: false
    },
    maxGuests: 3,
    maxAdults: 2,
    maxChildren: 1,
    hasBalcony: true,
    bathroomType: "Private Bathroom",
    isSmokingAllowed: false,
    hasClimateControl: true,
    housekeepingFrequency: "Daily",
    availability: true,
    rating: 4.9,
    tags: ["Popular", "Best Seller"],
    amenities: [
      "Free High-Speed Wi-Fi", "Smart TV with Streaming Services", "Air Conditioning & Heating",
      "Complimentary Breakfast", "In-Room Safe & Security Features", "Room Service",
      "Mini Bar", "Luxury Bath Products", "Daily Housekeeping", "24/7 Reception or Concierge Service"
    ]
  },
  {
    id: "standard-suite-002",
    name: "City View Standard",
    roomType: "Standard Suite",
    description: "Modern design with cozy comfort and city views. Ideal for solo travelers or couples.",
    images: ["/room12.jpg", "/room10.jpg", "/room14.jpg"],
    pricePerNight: 180,
    roomSize: "28 m²",
    bedInfo: {
      totalBeds: 1,
      types: [{ type: "Queen", quantity: 1 }],
      sofaBed: false,
      extraBedAvailable: true
    },
    maxGuests: 2,
    maxAdults: 2,
    maxChildren: 0,
    hasBalcony: false,
    bathroomType: "Private Bathroom",
    isSmokingAllowed: false,
    hasClimateControl: true,
    housekeepingFrequency: "Daily",
    availability: true,
    rating: 4.3,
    tags: [],
    amenities: [
      "Free High-Speed Wi-Fi", "Smart TV with Streaming Services", "Air Conditioning & Heating",
      "In-Room Safe & Security Features", "Room Service", "Daily Housekeeping"
    ]
  },
  {
    id: "exec-suite-003",
    name: "Executive Skyline Suite",
    roomType: "Executive Suite",
    description: "Spacious and stylish suite with a large living area and skyline views.",
    images: ["/room13.jpg", "/room10.jpg", "/room14.jpg"],
    pricePerNight: 390,
    roomSize: "50 m²",
    bedInfo: {
      totalBeds: 2,
      types: [{ type: "King", quantity: 1 }, { type: "Twin", quantity: 1 }],
      sofaBed: true,
      extraBedAvailable: true
    },
    maxGuests: 4,
    maxAdults: 3,
    maxChildren: 1,
    hasBalcony: true,
    bathroomType: "Private Bathroom",
    isSmokingAllowed: false,
    hasClimateControl: true,
    housekeepingFrequency: "Daily",
    availability: true,
    rating: 4.7,
    tags: ["Popular"],
    amenities: [
      "Free High-Speed Wi-Fi", "Smart TV with Streaming Services", "Complimentary Breakfast",
      "Mini Bar", "Luxury Bath Products", "Room Service", "Daily Housekeeping"
    ]
  },
  {
    id: "pres-suite-004",
    name: "Presidential Oceanfront",
    roomType: "Presidential Suite",
    description: "Unparalleled luxury with ocean views, private dining area, and premium services.",
    images: ["/room14.jpg", "/room13.jpg", "/room12.jpg"],
    pricePerNight: 750,
    roomSize: "80 m²",
    bedInfo: {
      totalBeds: 2,
      types: [{ type: "King", quantity: 2 }],
      sofaBed: true,
      extraBedAvailable: true
    },
    maxGuests: 6,
    maxAdults: 4,
    maxChildren: 2,
    hasBalcony: true,
    bathroomType: "Private Bathroom",
    isSmokingAllowed: false,
    hasClimateControl: true,
    housekeepingFrequency: "Twice Daily",
    availability: true,
    rating: 5.0,
    tags: ["Best Seller", "Luxury"],
    amenities: [
      "Free High-Speed Wi-Fi", "Smart TV with Streaming Services", "Air Conditioning & Heating",
      "Complimentary Breakfast", "Private Butler", "Mini Bar", "Luxury Bath Products",
      "Daily Housekeeping", "24/7 Concierge Service"
    ]
  },
  {
    id: "deluxe-suite-005",
    name: "Garden View Deluxe",
    roomType: "Deluxe Suite",
    description: "Tranquil garden view with elegant furnishings and serene ambiance.",
    images: ["/room12.jpg", "/room10.jpg"],
    pricePerNight: 280,
    roomSize: "38 m²",
    bedInfo: {
      totalBeds: 1,
      types: [{ type: "King", quantity: 1 }],
      sofaBed: false,
      extraBedAvailable: true
    },
    maxGuests: 3,
    maxAdults: 2,
    maxChildren: 1,
    hasBalcony: false,
    bathroomType: "Private Bathroom",
    isSmokingAllowed: false,
    hasClimateControl: true,
    housekeepingFrequency: "Daily",
    availability: true,
    rating: 4.6,
    tags: ["Popular"],
    amenities: [
      "Free High-Speed Wi-Fi", "Smart TV with Streaming Services", "Complimentary Breakfast",
      "Luxury Bath Products", "Daily Housekeeping"
    ]
  },
  // Add 10 more rooms similarly...
  {
    id: "standard-suite-006",
    name: "Coastal Comfort Suite",
    roomType: "Standard Suite",
    description: "Comfortable and modern, perfect for beach-loving couples.",
    images: ["/room14.jpg", "/room13.jpg"],
    pricePerNight: 200,
    roomSize: "30 m²",
    bedInfo: {
      totalBeds: 1,
      types: [{ type: "Queen", quantity: 1 }],
      sofaBed: false,
      extraBedAvailable: true
    },
    maxGuests: 2,
    maxAdults: 2,
    maxChildren: 0,
    hasBalcony: true,
    bathroomType: "Private Bathroom",
    isSmokingAllowed: false,
    hasClimateControl: true,
    housekeepingFrequency: "Daily",
    availability: true,
    rating: 4.4,
    tags: [],
    amenities: [
      "Free High-Speed Wi-Fi", "Air Conditioning & Heating", "Luxury Bath Products", "Room Service"
    ]
  },
  {
    id: "suite-007",
    name: "Mountain Escape Suite",
    roomType: "Suite",
    description: "Rustic charm meets modern luxury with panoramic mountain views.",
    images: ["/room13.jpg", "/room10.jpg"],
    pricePerNight: 340,
    roomSize: "45 m²",
    bedInfo: {
      totalBeds: 1,
      types: [{ type: "King", quantity: 1 }],
      sofaBed: true,
      extraBedAvailable: false
    },
    maxGuests: 3,
    maxAdults: 2,
    maxChildren: 1,
    hasBalcony: true,
    bathroomType: "Private Bathroom",
    isSmokingAllowed: false,
    hasClimateControl: true,
    housekeepingFrequency: "Daily",
    availability: true,
    rating: 4.8,
    tags: ["Popular"],
    amenities: [
      "Free High-Speed Wi-Fi", "Smart TV with Streaming Services", "Room Service", "Luxury Bath Products"
    ]
  },
  {
    id: "exec-suite-008",
    name: "Skyline Executive Suite",
    roomType: "Executive Suite",
    description: "Stylish, spacious, and perfect for business or luxury leisure stays.",
    images: ["/room10.jpg", "/room12.jpg"],
    pricePerNight: 410,
    roomSize: "52 m²",
    bedInfo: {
      totalBeds: 2,
      types: [{ type: "King", quantity: 1 }, { type: "Double", quantity: 1 }],
      sofaBed: true,
      extraBedAvailable: true
    },
    maxGuests: 4,
    maxAdults: 3,
    maxChildren: 1,
    hasBalcony: true,
    bathroomType: "Private Bathroom",
    isSmokingAllowed: false,
    hasClimateControl: true,
    housekeepingFrequency: "Daily",
    availability: true,
    rating: 4.9,
    tags: ["Best Seller"],
    amenities: [
      "Free High-Speed Wi-Fi", "Air Conditioning & Heating", "Complimentary Breakfast", "Mini Bar"
    ]
  },
  // Repeat structure for rooms 9 to 15, just change:
  // - id, name, price, roomSize, rating
  // - shuffle images: pick from the 4 available
  // - tags/amenities per room for variation

  // You can continue from here or ask me to generate the remaining 6 rooms to complete the set.
];
