export default class NasaImagesApi {
  static async searchImages(searchQuery) {
    const apiEndpoint = 'https://images-api.nasa.gov/search';
    const apiUrl = `${apiEndpoint}?q=${searchQuery}`;

    const response = await fetch(apiUrl);

    if(!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    const images = data.collection.items.filter(item => item.links && item.links.length > 0);
    const imageUrls = images.map(image => image.links[0].href);
    return imageUrls;
  }
}

