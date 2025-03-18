import { AnswerChip, RoomCardSlider } from "..";
import ChatLoader from "../ChatLoader/ChatLoader";

import ChatMessage from "../ChatMessage/ChatMessage";
import FilterView from "../FilterView/FilterView";
import { memo, useEffect, useRef, useState } from "react";

const Chat = memo(
  ({
    chat_flow,
    room_list,
    chat_info,
    removeFilter,
    filterSelection,
    showPropertyInfo,
    onCardVisible,
    shareAdvert,
  }) => {
    const divRef = useRef();
    const [filters, setFilters] = useState([]);

    const randId = () => {
      // Generate a random number between 0 and 100 (inclusive)
      return Math.floor(Math.random() * 10000);
    };

    const getFilterArr = (chat_info) => {
      let retArr = [];
      let i = 5000;
      if (chat_info.PropertyType != "") {
        retArr.push({
          id: i,
          question: "PROPERTY_TYPE_FILTER",
          answer: chat_info.PropertyType,
        });
      }
      i++;
      if (chat_info.Radius > 0) {
        retArr.push({
          id: i,
          question: "DISTANCE_FILTER",
          answer: chat_info.Radius,
        });
      }
      i++;
      if (chat_info.MinSize > 0) {
        retArr.push({
          id: i,
          question: "PROPERTY_SIZE_FILTER",
          answer: chat_info.MinSize,
        });
      }
      i++;
      if (chat_info.MaxPrice > 0) {
        retArr.push({
          id: i,
          question: "PRICE_FILTER",
          answer: chat_info.MaxPrice,
        });
      }
      return retArr;
    };

    const scrollToBottom = () => {
      if (divRef.current) {
        // divRef.current.scrollIntoView({ behavior: "smooth" });
        setTimeout(() => {
          divRef.current.scrollTo({
            top: divRef.current.scrollHeight,
            behavior: "smooth", // Smooth scroll behavior
          });
        }, 100);
      }
    };

    useEffect(() => {
      setFilters(getFilterArr(chat_info));
      scrollToBottom();
    }, [chat_flow, chat_info]);

    return (
      <div
        className="w-full h-full overflow-y-auto overflow-x-hidden"
        ref={divRef}
      >
        {chat_flow.map((chatItem) => {
          if (chatItem.type == "LOADNING") {
            return <ChatLoader key={chatItem.id} />;
          } else if (chatItem.type == "PROMPT") {
            return <ChatMessage key={chatItem.id} chatItem={chatItem} />;
          } else if (chatItem.type == "SEARCH_RESULT") {
            return (
              <RoomCardSlider
                key={randId()}
                room_list={room_list}
                dot_count={4}
                chatItem={chatItem}
                onCardVisible={onCardVisible}
                shareAdvert={shareAdvert}
                showPropertyInfo={showPropertyInfo}
              />
            );
          } else if (
            chatItem.type == "DISTANCE_FILTER" ||
            chatItem.type == "PRICE_FILTER" ||
            chatItem.type == "PROPERTY_SIZE_FILTER" ||
            chatItem.type == "PROPERTY_TYPE_FILTER"
          ) {
            return (
              <FilterView
                key={chatItem.id}
                info={chatItem}
                userSelection={filterSelection}
              />
            );
          } else if (chatItem.type == "FILTER_SELECTION") {
            //  show only the user selection

            return (
              <div
                className="w-[96%] flex gap-1 mb-4 mx-1 mr-10 flex-col "
                key={chatItem.id}
              >
                {filters.length > 0 && (
                  <p className="text-[.65rem] pl-1 text-black">Filters:</p>
                )}

                <div className="w-full flex gap-2 pl-1">
                  {filters.map((filter) => {
                    return (
                      <AnswerChip
                        filter={filter}
                        removeFilter={removeFilter}
                        key={filter.question}
                      />
                    );
                  })}
                </div>
              </div>
            );
          }
        })}
      </div>
    );
  }
);

export default memo(Chat);
