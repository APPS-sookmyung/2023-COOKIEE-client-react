export const updateThumb = async (userId, thumbId, imageData) => {
  const formData = new FormData();

  const uploadedImageData = {
    name: imageData.fileName,
    type: "image/png",
    size: imageData.fileSize,
    uri: imageData.uri,
  };

  formData.append("thumbnail", uploadedImageData);
  console.log(formData.getAll("thumbnail"));

  try {
    const res = await fetch(
      `https://cookiee.site/thumbnail/update/${userId}/${thumbId}`,
      {
        method: "PUT",
        body: formData,
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiIzMiIsInJvbGUiOiJST0xFX1VTRVIiLCJpYXQiOjE3MDk1MTM4NzcsImV4cCI6MTcxMjEwNTg3N30.ZHC6ZPw6WsTfMR7at4FLkLAjNDU0vOMgfWL1lI3DsOs",
        },
      }
    );

    if (res.status == 200) {
      console.log("썸네일 수정 통신 성공. LOG의 'ok'가 true인지 확인하세요.");
      console.log(JSON.stringify(res));
      return res.ok;
    }
  } catch (err) {
    console.log("썸네일 수정 통신 실패");
    console.log(JSON.stringify(err.response));
  }
};
