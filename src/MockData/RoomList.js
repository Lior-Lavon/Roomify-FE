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
    Title: "Room name",
    Address: "Address",
    Description: "some description",
    Images: [Image1, Image2, Image3],
    Price: 850,
    IsFavorite: false,
    Location: { lat: 52.370216, lng: 4.895168 },
  },
  {
    Id: 2,
    Title: "Room name",
    Address: "Address",
    Description: "some description",
    Images: [Image2, Image3, Image5],
    Price: 700,
    IsFavorite: false,
    Location: { lat: 52.372759, lng: 4.893604 },
  },
  {
    Id: 3,
    Title: "Room name",
    Address: "Address",
    Description: "some description",
    Images: [Image3, Image1, Image4],
    Price: 970,
    IsFavorite: false,
    Location: { lat: 52.36802, lng: 4.903561 },
  },
  {
    Id: 4,
    Title: "Room name",
    Address: "Address",
    Description: "some description",
    Images: [Image4, Image5, Image6],
    Price: 1470,
    IsFavorite: false,
    Location: { lat: 52.37403, lng: 4.88969 },
  },
  {
    Id: 5,
    Title: "Room name",
    Address: "Address",
    Description: "some description",
    Images: [Image5, Image6, Image7],
    Price: 1200,
    IsFavorite: false,
    Location: { lat: 52.365559, lng: 4.911457 },
  },
  {
    Id: 6,
    Title: "Room name",
    Address: "Address",
    Description: "some description",
    Images: [Image6, Image7, Image1],
    Price: 1350,
    IsFavorite: false,
    Location: { lat: 52.376179, lng: 4.900012 },
  },
  {
    Id: 7,
    Title: "Room name",
    Address: "Address",
    Description: "some description",
    Images: [Image7, Image2, Image4],
    Price: 900,
    IsFavorite: false,
    Location: { lat: 52.366822, lng: 4.897342 },
  },
];

export { Image1, Image2, Image3, Image4, Image5, Image6, Image7 };
