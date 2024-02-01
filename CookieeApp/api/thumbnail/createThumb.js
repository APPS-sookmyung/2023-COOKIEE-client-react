export const createThumb = async (userId, selectedDate, asset) => {
  const formData = new FormData();

  const uploadedImageData = {
    name: asset.fileName,
    type: "image/png",
    size: asset.fileSize,
    uri: asset.uri,
  };

  formData.append("thumbnail", uploadedImageData);
  formData.append("eventYear", selectedDate.year);
  formData.append("eventMonth", selectedDate.month);
  formData.append("eventDate", selectedDate.date);
  console.log(formData.getAll("thumbnail"));
  console.log(formData.getAll("eventYear"));
  console.log(formData.getAll("eventMonth"));
  console.log(formData.getAll("eventDate"));

  try {
    const res = await fetch(`https://cookiee.site/thumbnail/${userId}`, {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (res.status == 200) {
      console.log("썸네일 등록 통신 성공. LOG의 'ok'가 true인지 확인하세요.");
      console.log(JSON.stringify(res));
      return res.ok;
    }
  } catch (err) {
    console.log("썸네일 등록 통신 실패");
    console.log(JSON.stringify(err.response));
  }
};
