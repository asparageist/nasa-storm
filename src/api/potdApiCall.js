export default class pictureOTD {
  static async getPicture() {
    try {
      const response = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${process.env.API_KEY}`);
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
