// tidegauges.js
import fetch from "node-fetch";
import fs from "fs";

async function fetchTideGauges() {
  const url =
    "https://incois.gov.in/geoserver/Insitu_TideGauges_Tsunami/ows?" +
    "service=WFS&version=1.0.0&request=GetFeature" +
    "&typeName=Insitu_TideGauges_Tsunami:Tideguages57" +
    "&outputFormat=application/json";

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.features) {
      const coords = data.features.map(f => ({
        station: f.properties["Station Na"],
        lat: f.geometry.coordinates[1],
        lng: f.geometry.coordinates[0]
      }));

      console.log("Tide Gauges Coordinates:", coords);

      // save into JSON file
      fs.writeFileSync("tide_gauges.json", JSON.stringify(coords, null, 2));
      console.log("✅ Saved tide_gauges.json");
    } else {
      console.error("❌ No features found");
    }
  } catch (err) {
    console.error("Error fetching Tide Gauges WFS:", err);
  }
}

fetchTideGauges();
