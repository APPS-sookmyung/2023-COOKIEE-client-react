export const putCate = async (userId, categoryId, categoryData) => {
  try {
    const response = await fetch(`https://cookiee.site/category/${userId}/${categoryId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(categoryData),
    });

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const result = await response.json();
    return result;
  } catch (error) {
    console.error("Error updating category data:", error);
    return null;
  }
};

export default putCate;
