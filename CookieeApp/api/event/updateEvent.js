import axios from "axios";

export const updateEvent = async (userId, eventId, eventDataToUpdate) => {
  try {
    const response = await axios.put(
      `https://cookiee.site/event/${userId}/${eventId}`,
      eventDataToUpdate
    );

    if (response.status !== 1000) {
      throw new Error("Network response was not ok");
    }

    const updatedEventData = response.data;
    console.log(updatedEventData); // 업데이트된 데이터 처리

    return updatedEventData; // 업데이트된 데이터 반환 또는 처리
  } catch (error) {
    console.error("Error updating event data:", error);
    return null; // 에러 처리 또는 다른 방식으로 처리
  }
};

/*
// 다른 파일에서 updateEvent 메소드를 가져와 사용하는 예시
import { updateEvent } from './api/eventApi'; // 파일의 상대 경로에 맞게 수정해야 함

// 예시: 다른 파일에서 updateEvent 메소드 사용
const userId = 123; // 유저 ID로 교체
const eventId = 456; // 이벤트 ID로 교체
const updatedEventData = {
  // 업데이트할 데이터를 객체 형태로 전달
  // 예시: title, description, date 등
};

updateEvent(userId, eventId, updatedEventData)
  .then((updatedData) => {
    // 업데이트된 데이터 처리
    console.log('Event updated:', updatedData);
    // 필요한 작업 수행
  })
  .catch((error) => {
    // 에러 처리
    console.error('Error updating event:', error);
    // 필요한 에러 처리 수행
  });

*/
