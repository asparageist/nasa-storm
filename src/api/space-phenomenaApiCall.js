export default class spacePhenomena {
  static async getSpace(startDate, endDate) {
    const apiUrl = `https://api.nasa.gov/DONKI/FLR?$start_data=${startDate}&$end_date=${endDate}&api_key=4ADwxZNokSkt1WizfXdTviec0QftcKjDygaew9yX`;
    const response = await fetch(apiUrl);
  
    if (!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
  
    const data = await response.json();
    return data;
  }
}