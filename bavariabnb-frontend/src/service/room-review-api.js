import axios from "axios";
const API_URL =
  "https://kbvlb5mo97.execute-api.eu-central-1.amazonaws.com/prod/rooms";

const REVIEW_URL =
  "https://dv0xse42q7.execute-api.eu-central-1.amazonaws.com/prod/reviews";

export class RoomReviewApi {
  async getRooms() {
    const { data } = await axios.get(API_URL);
    if (data) {
      const merged = await Promise.all(
        data.map(async (room) => {
          const { data: agg } = await axios.get(
            `${REVIEW_URL}/${room.id}/aggregate`
          );
          return {
            ...room,
            ...agg,
          };
        })
      );
      return merged;
    }
    return [];
  }

  async getRoomById(id) {
    const { data } = await axios.get(`${API_URL}/${id}`);
    return data;
  }

  async getReviewsById(id) {
    const { data } = await axios.get(`${REVIEW_URL}/${id}`);
    return data;
  }
}
