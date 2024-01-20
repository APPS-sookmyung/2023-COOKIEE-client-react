import axios from "axios";

export const createThumb = async (thumbnail) => {
  try {
    const response = await axios.post(
      `http://localhost:8080/thumbnail/${userId}`,
      null,
      {
        params: {
          thumbnail: thumbnail,
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not successful");
    }

    const createdEventData = response.data;
    console.log(createdEventData); // 생성된 데이터 처리

    return createdEventData; // 생성된 데이터 반환 또는 처리
  } catch (error) {
    console.error("Error creating thumbnail:", error);
    return null; // 에러 처리 또는 다른 방식으로 처리
  }
};
