const Loading = "LOADNING";
const Prompt = "PROMPT";
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
    type: SearchResult,
  },
  {
    id: 5,
    type: SearchResult,
  },
  {
    id: 6,
    type: SearchResult,
  },
];
