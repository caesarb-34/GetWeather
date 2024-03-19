
export interface LocationInfo {
    lat: string;
    lon: string;
    display_name: string;
}

export function checkLocationDataOrThrow(data: any): LocationInfo {
    const { lat, lon, display_name } = data;

    if (typeof lat !== 'string' || typeof lon !== 'string' || typeof display_name !== 'string') {
        throw new Error('Invalid location data');
    }

    return {
        lat,
        lon,
        display_name: `${String(display_name)}`,
    };
}
