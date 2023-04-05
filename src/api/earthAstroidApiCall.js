export default class astroidData {
  static async getAstroidData(year, month, day) {
    try {
      const response = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${year}-${month}-${day}&end_date=2015-09-08&api_key=${process.env.API_KEY}`);
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
