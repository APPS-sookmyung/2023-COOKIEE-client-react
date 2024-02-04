export const deleteCate = async (userId, categoryId) => {
  try {
    const response = await fetch(`/category/${userId}/${categoryId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      console.error('Error deleting category:', errorData);
      throw new Error('Failed to delete category');
    }

    const responseData = await response.json();
    return responseData;
  } catch (error) {
    console.log(categoryId);
    console.error('Error deleting category:', error);
    throw error;
  }
};

export default deleteCate;
