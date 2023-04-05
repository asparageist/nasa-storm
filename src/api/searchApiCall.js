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
  
  static async getImageMetadata(imageUrl) {
    const proxyUrl = `http://localhost:8085/${imageUrl}`;
    const response = await fetch(proxyUrl);

    if(!response.ok) {
      throw new Error(`Failed to fetch data: ${response.status} ${response.statusText}`);
    }
    const data = await response.json();
    console.log(data);
    const metadata = {
      date: data.date_created,
      description: data.description
    };
    return metadata;
  }
}



