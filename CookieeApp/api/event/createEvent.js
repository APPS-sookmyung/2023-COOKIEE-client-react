import axios from "axios";

export const createEvent = async (
  userId,

  eventWhat,
  eventWhere,
  withWho,

  eventYear,
  eventMonth,
  eventDate,

  images,
  thumbnail,
  categories
) => {
  try {
    console.log(
      userId,

      eventWhat,
      eventWhere,
      withWho,

      eventYear,
      eventMonth,
      eventDate,

      images,
      thumbnail,
      categories
    );
    const response = await axios.post(
      `https://cookiee.site/event/${userId}`,
      {
        userId: userId,
        eventWhat: eventWhat,
        eventWhere: eventWhere,
        withWho: withWho,

        eventYear: eventYear,
        eventMonth: eventMonth,
        eventDate: eventDate,

        images: images,
        thumbnail: thumbnail,
        categories: categories,
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
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
    console.error("Error creating event:", error);
    return null; // 에러 처리 또는 다른 방식으로 처리
  }
};
