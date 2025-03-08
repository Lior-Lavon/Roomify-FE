const Loading = "LOADNING";
const Prompt = "PROMPT";
const DistanceFilter = "DISTANCE_FILTER";
const PropertySizeFilter = "PROPERTY_SIZE_FILTER";
const PropertyTypeFilter = "PROPERTY_TYPE_FILTER";
const SearchResult = "SEARCH_RESULT";
const Owner = {
  User: "USER",
  System: "SYSTEM",
};

export const ChatData = [
  {
    id: 1,
    type: Loading,
    owner: Owner.System,
  },
  {
    id: 2,
    type: Prompt,
    owner: Owner.User,
    text: "I am searching for a room in Amsterdam North, up to 800 euros per month, with immediate entry",
  },
  {
    id: 3,
    type: SearchResult,
  },
  {
    id: 4,
    type: DistanceFilter,
    owner: Owner.SYSTEM,
    filterInfo: {
      text: `Please select the distance from Amsterdam North:`,
      options: [
        {
          id: 1,
          value: 2,
          measure: "km",
        },
        {
          id: 2,
          value: 5,
          measure: "km",
        },
        {
          id: 3,
          value: 10,
          measure: "km",
        },
        {
          id: 4,
          value: 15,
          measure: "km",
        },
        {
          id: 5,
          value: 20,
          measure: "km",
        },
      ],
    },
  },
  {
    id: 5,
    type: PropertySizeFilter,
    owner: Owner.SYSTEM,
    filterInfo: {
      text: `Please select preferred room size:`,
      options: [
        {
          id: 1,
          value: 6,
        },
        {
          id: 2,
          value: 8,
        },
        {
          id: 3,
          value: 10,
        },
        {
          id: 4,
          value: 15,
        },
        {
          id: 5,
          value: 20,
        },
        {
          id: 6,
          value: 25,
        },
        {
          id: 7,
          value: 30,
        },
      ],
    },
  },
  {
    id: 6,
    type: PropertyTypeFilter,
    owner: Owner.SYSTEM,
    filterInfo: {
      text: `Please select property type:`,
      options: [
        {
          id: 1,
          value: "room",
        },
        {
          id: 2,
          value: "studio",
        },
        {
          id: 3,
          value: "student-housing",
        },
        {
          id: 4,
          value: "apartment",
        },
      ],
    },
  },
];
