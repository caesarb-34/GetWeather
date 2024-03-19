import axios from 'axios';
// import type { AxiosStatic } from 'axios';}


// an interface is a way to define a type in TypeScript
// an interface makes an object 
export interface LocationInfo {
    lat: string;
    lon: string;
    display_name: string;
}

// make a request to the geocode API

export async function fetchLocationData(
    apiUrl: string,
    locationName: string,
): Promise<LocationInfo> {
// const GEOCODE_API_URL = "https://geocode.maps.co/search?q=LOCATIONNAME";    
// options for the request    

    const options = {
        method: 'GET',
        url: apiUrl,
        params: {
            q: locationName ?? 'Denver',
            api_key: import.meta.env.VITE_GEOCODE_API_KEY,
        }
    };
    
    // response returns an array of objects with location data that is specified such as lat, lon, and display_name
    const response = await axios.request<LocationInfo[]>(options);
    

    // if the status is 200, then return the first object in the array
    if (response.status === 200) {
        if (response.data.length > 0) {
            return response.data[0];
        } else {
            throw new Error(`Unable to find location information for ${locationName}`);  
        }
        } else {
            throw new Error('Failed to fetch location data');


    }
}