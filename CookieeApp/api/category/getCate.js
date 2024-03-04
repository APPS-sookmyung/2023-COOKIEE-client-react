import axios from "axios";

export const getCate = async (userId) => {
  try {
    const response = await axios.get(
      `https://cookiee.site/category/${userId}`,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMiIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MDk1MTM4NzcsImV4cCI6MTcxMjEwNTg3N30.ZHC6ZPw6WsTfMR7at4FLkLAjNDU0vOMgfWL1lI3DsOs",
        },
      }
    );

    if (response.status !== 200) {
      throw new Error("Network response was not ok");
    }

    return response.data.result; // 업데이트된 데이터 반환 또는 처리
  } catch (error) {
    console.error("Error updating category data:", error);
    return null; // 에러 처리 또는 다른 방식으로 처리
  }
};

export default getCate;
