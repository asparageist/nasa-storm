export default class earthPictureData {
  static async getEarthPictureData(year, month, day) {
    try {
      const response = await fetch(`https://api.nasa.gov/EPIC/api/natural/date/${year}-${month}-${day}?api_key=${process.env.API_KEY}`);
      const data = await response.json();

      if (data.result === "error") {
        const errorMessage = `${data.error.code}`;
        throw new Error(errorMessage);
      }

      return data;
    } catch(error) {
      throw new Error(error.message);
    }
  }
}
