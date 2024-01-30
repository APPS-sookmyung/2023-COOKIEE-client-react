import axios from "axios";

export const getEventList = async (userId, year, month, date) => {
  try {
    const response = await axios.get(
      `https://cookiee.site/event/view/${userId}`,
      { params: { eventYear: year, eventMonth: month, eventDate: date } }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    console.log(response);
    return response.data.result; // 업데이트된 데이터 반환 또는 처리
  } catch (error) {
    console.error("Error getEventList:", error);
    return null; // 에러 처리 또는 다른 방식으로 처리
  }
};
