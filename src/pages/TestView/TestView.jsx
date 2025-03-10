import React, { useState } from "react";

import { RoomList } from "../../MockData/RoomList";
import { RoomCardSlider } from "../../components";

const TestView = () => {
  const [counter, setCounter] = useState(0);

  const showPropertyInfo = () => {
    setCounter(counter + 1);
  };
  const onCardVisible = (id) => {
    console.log("onCardVisible :", id);
  };

  return (
    <div>
      <RoomCardSlider
        room_list={RoomList}
        dot_count={5}
        showPropertyInfo={showPropertyInfo}
        onCardVisible={onCardVisible}
      />
      <p>counter is : {counter}</p>
    </div>
  );
};

export default TestView;
