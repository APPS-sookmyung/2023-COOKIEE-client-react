import axios from "axios";

export const deleteThumb = async (userId, thumbnailId) => {
  // try {
  //   console.log(userId, thumbnailId);
  //   const response = await axios.delete(
  //     `https://cookiee.site//thumbnail/del/${userId}/${thumbnailId}}`
  //   );

  //   if (response.status !== 200) {
  //     throw new Error("Network response was not ok");
  //   }

  //   return response.data.result; // 업데이트된 데이터 반환 또는 처리
  // } catch (error) {
  //   console.error("Error delete thumbnail data:", error);
  //   return null; // 에러 처리 또는 다른 방식으로 처리
  // }

  fetch(`https://cookiee.site/thumbnail/del/${userId}/${thumbnailId}`, {
    method: "DELETE",
  })
    .then((res) => {
      console.log("썸네일 삭제 통신 성공. LOG의 'ok'가 true인지 확인하세요.");
      console.log(JSON.stringify(res));
      return res.ok;
    })
    .catch((err) => {
      console.log("썸네일 삭제 통신 실패");
      console.log(JSON.stringify(err.response));
    });
};
