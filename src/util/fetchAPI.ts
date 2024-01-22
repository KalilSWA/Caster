export const fetchData = async (sessionId: string, authToken: string) => {
  try {
    const response = await fetch(
      `http://localhost:10010/v1/api/games/live/${sessionId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: authToken,
        },
      }
    );

    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("error", error);
    throw error;
  }
};
