const Loading = "LOADNING";
const Prompt = "PROMPT";
const DistanceFilter = "DISTANCE_FILTER";
const PropertySizeFilter = "PROPERTY_SIZE_FILTER";
const PropertyTypeFilter = "PROPERTY_TYPE_FILTER";
const PriceFilter = "PRICE_FILTER";
const SearchResult = "SEARCH_RESULT";
const FilterSelection = "FILTER_SELECTION";
const Owner = {
  User: "USER",
  System: "SYSTEM",
};

export const ChatOptions = [
  {
    id: 1,
    type: Loading,
    owner: Owner.System,
  },
  {
    id: 2,
    type: Prompt,
    owner: Owner.User,
    text: "",
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
      text: `In which radius would you like to search? `,
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
      text: `What is the room size?`,
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
      text: `Which property type are you looking for?`,
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
          value: "apartment",
        },
      ],
    },
  },
  {
    id: 7,
    type: PriceFilter,
    owner: Owner.SYSTEM,
    filterInfo: {
      text: `What is your monthly budget?`,
      options: [
        {
          id: 1,
          value: "Up to 500 €",
        },
        {
          id: 2,
          value: "Up to 1000 €",
        },
        {
          id: 3,
          value: "Up to 1500 €",
        },
        {
          id: 4,
          value: "Up to 2000 €",
        },
      ],
    },
  },
  {
    id: 8,
    type: FilterSelection,
    owner: Owner.SYSTEM,
    text: "",
  },
];
