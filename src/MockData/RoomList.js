import Image1 from "../assets/room1.jpeg";
import Image2 from "../assets/room2.jpeg";
import Image3 from "../assets/room3.jpeg";
import Image4 from "../assets/room4.jpeg";
import Image5 from "../assets/room5.jpeg";
import Image6 from "../assets/room6.jpeg";
import Image7 from "../assets/room7.jpeg";

export const RoomList = [
  {
    Id: 1,
    Title: "Cozy Studio in City Center",
    Address: "Damrak 1, 1012 LG Amsterdam",
    Description:
      "A compact, fully furnished studio located in the heart of Amsterdam. Ideal for singles or students, just minutes away from shops, cafes, and public transport. Includes private kitchenette and en-suite bathroom.",
    Images: [Image1, Image2, Image3],
    Price: 850,
    IsFavorite: false,
    Location: { lat: 52.370216, lng: 4.895168 },
  },
  {
    Id: 2,
    Title: "Bright Room with Canal View",
    Address: "Prinsengracht 267, 1016 GV Amsterdam",
    Description:
      "Spacious and sunlit room overlooking the beautiful Prinsengracht canal. Comes with a comfortable bed, desk, and ample closet space. Shared kitchen and bathroom in a quiet, well-maintained apartment.",
    Images: [Image2, Image3, Image5],
    Price: 700,
    IsFavorite: false,
    Location: { lat: 52.372759, lng: 4.893604 },
  },
  {
    Id: 3,
    Title: "Modern Room in Shared Apartment",
    Address: "Keizersgracht 123, 1015 CJ Amsterdam",
    Description:
      "Modern room in a stylish shared flat just steps from shops, trams, and restaurants. Room includes a double bed, workspace, and shared access to fully equipped kitchen, large living room, and laundry.",
    Images: [Image3, Image1, Image4],
    Price: 970,
    IsFavorite: false,
    Location: { lat: 52.36802, lng: 4.903561 },
  },
  {
    Id: 4,
    Title: "Spacious Room near Central Station",
    Address: "Haarlemmerstraat 85, 1013 EM Amsterdam",
    Description:
      "A large, airy room perfect for professionals or couples, located within walking distance of Amsterdam Centraal. High ceilings, large windows, and shared modern amenities in a friendly building.",
    Images: [Image4, Image5, Image6],
    Price: 1470,
    IsFavorite: false,
    Location: { lat: 52.37403, lng: 4.88969 },
  },
  {
    Id: 5,
    Title: "Quiet Room Close to Vondelpark",
    Address: "Overtoom 200, 1054 HZ Amsterdam",
    Description:
      "Enjoy the peaceful atmosphere of this cozy room just a short walk from Vondelpark. Features a comfy bed, study area, and access to a shared kitchen and bathroom. Ideal for nature lovers and students.",
    Images: [Image5, Image6, Image7],
    Price: 1200,
    IsFavorite: false,
    Location: { lat: 52.365559, lng: 4.911457 },
  },
  {
    Id: 6,
    Title: "Sunny Attic Room with Balcony",
    Address: "Weteringschans 28, 1017 SG Amsterdam",
    Description:
      "Charming attic room with skylights and private balcony. Fully furnished with a cozy vibe. Shared bathroom and kitchen with other tenants in a quiet, centrally located building. Great for solo renters.",
    Images: [Image6, Image7, Image1],
    Price: 1350,
    IsFavorite: false,
    Location: { lat: 52.376179, lng: 4.900012 },
  },
  {
    Id: 7,
    Title: "Affordable Room in Lively Area",
    Address: "Spuistraat 210, 1012 VT Amsterdam",
    Description:
      "Affordable, no-frills room in one of the liveliest parts of Amsterdam. Close to nightlife, restaurants, and transit. Ideal for students or budget travelers. Shared bathroom and kitchen available.",
    Images: [Image7, Image2, Image4],
    Price: 900,
    IsFavorite: false,
    Location: { lat: 52.366822, lng: 4.897342 },
  },
  {
    Id: 8,
    Title: "Large Room for Student or Professional",
    Address: "Vondelstraat 18, 1054 GE Amsterdam",
    Description:
      "Spacious and bright room suitable for students or young professionals. Furnished with essentials and located in a friendly, international house. Close to university campuses and city attractions.",
    Images: [Image7, Image2, Image4],
    Price: 900,
    IsFavorite: false,
    Location: { lat: 53.366822, lng: 4.897542 },
  },
  {
    Id: 9,
    Title: "Furnished Room with Private Sink",
    Address: "Sarphatistraat 95, 1018 GA Amsterdam",
    Description:
      "Comfortable room with a private washbasin and shared kitchen and bathroom facilities. Located in a secure building with easy access to trams, supermarkets, and green spaces. Ideal for long-term stays.",
    Images: [Image7, Image2, Image4],
    Price: 900,
    IsFavorite: false,
    Location: { lat: 51.366822, lng: 4.997342 },
  },
  {
    Id: 10,
    Title: "Budget-Friendly Room with Shared Kitchen",
    Address: "Nieuwezijds Voorburgwal 150, 1012 SJ Amsterdam",
    Description:
      "Simple and budget-friendly room located in central Amsterdam. Includes a single bed, wardrobe, and desk. Shared access to kitchen and bathroom. Perfect for a student or remote worker on a budget.",
    Images: [Image7, Image2, Image4],
    Price: 900,
    IsFavorite: false,
    Location: { lat: 51.886822, lng: 4.917342 },
  },
  {
    Id: 11,
    Title: "Compact Room Ideal for Student",
    Address: "Ferdinand Bolstraat 5, 1072 LA Amsterdam",
    Description:
      "A compact but functional room with a study corner and bed. Great for students seeking affordable housing in the city. Shared amenities, including kitchen and bathroom, in a welcoming shared flat.",
    Images: [Image7, Image2, Image4],
    Price: 900,
    IsFavorite: false,
    Location: { lat: 51.966822, lng: 4.999342 },
  },
];

export { Image1, Image2, Image3, Image4, Image5, Image6, Image7 };
