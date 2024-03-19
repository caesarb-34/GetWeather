import { getLocationInfo } from '/Users/caesber/Documents/repos/weatherapp/weatherapp/src/getLocation.ts';
import { LocationInfo } from "../location";
import { fetchLocationData } from "../location";

// Describe the test suite
// This is a test suite for the getLocationInfo function
// The getLocationInfo function is responsible for fetching location data


jest.mock("../location", () => ({
  fetchLocationData: jest.fn(),
}));

describe("getLocationInfo", () => {
  it("should return a location object that matches LocationInfo", async () => {
    const mockLocationData: LocationInfo = {
      display_name: "Portland",
      lat: "41.7",
      lon: "-74.0060",
    };

    (fetchLocationData as jest.Mock).mockResolvedValue(mockLocationData);

    const location = "Portland";
    const result = await getLocationInfo(location);
    console.log(result);
    expect(result).toEqual(mockLocationData);
  });
});