import axios from "axios";

export const createEvent = async (userId, eventData, year, month, date) => {
  try {
    const response = await axios.post(
      `https://api.example.com/event/${userId}`,
      eventData,
      {
        params: {
          year: year,
          month: month,
          date: date,
        },
      }
    );

    if (response.status !== 1000) {
      throw new Error("Network response was not successful");
    }

    const createdEventData = response.data;
    console.log(createdEventData); // 생성된 데이터 처리

    return createdEventData; // 생성된 데이터 반환 또는 처리
  } catch (error) {
    console.error("Error creating event:", error);
    return null; // 에러 처리 또는 다른 방식으로 처리
  }
};
