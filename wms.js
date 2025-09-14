    
        // Initialize the map
        var map = L.map('map', { 
            zoomControl: false,
            minZoom: 5,
            maxZoom: 10,
            
        }).setView([13.5, 78.0], initialZoom);

        // Set maximum latitude and bounds
        const maxLatitude = 30;
        const bounds = L.latLngBounds(
            L.latLng(-90, -180),
            L.latLng(maxLatitude, 180)
        );
        map.setMaxBounds(bounds);
        map.on('drag', function () {
            map.panInsideBounds(bounds, { animate: false });
        });

        L.control.zoom({ position: 'topleft' }).addTo(map);

        // Add base layers
        const usgsTopographic = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
            maxZoom: 16,
            zIndex: 1000
        }).addTo(map);

        const cartoDark = L.tileLayer('https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png', {
            maxZoom: 19,
            attribution: '� OpenStreetMap contributors, � CARTO',
            //zIndex: 903
        });

       /*var osmBrightGray =  L.tileLayer(
  "https://basemap.nationalmap.gov/arcgis/rest/services/USGSTopo/MapServer/tile/{z}/{y}/{x}",
  {
    attribution:
      "Tiles courtesy of the <a href='https://usgs.gov/'>U.S. Geological Survey</a>",
    maxZoom: 20,
  }
);*/

      
// 🔥 Add this below your map init
var maskingLayer; // holds the WMS mask layer

function addMaskLayer() {
  if (!maskingLayer) {
    maskingLayer = L.tileLayer.wms("/geoserver/Mask_IndianBoudary/wms", {
      layers: 'Mask_IndianBoudary:ne_110m_land', // 🔁 Replace with your actual layer name
      format: 'image/png',
      transparent: true,
      attribution: "GeoServer"
    }).addTo(map);
  }
}

function removeMaskLayer() {
  if (maskingLayer) {
    map.removeLayer(maskingLayer);
    maskingLayer = null;
  }
}

// 🌍 Make these functions accessible from index.jsp
window.addMaskLayer = addMaskLayer;
window.removeMaskLayer = removeMaskLayer;
          
          L.control.layers({
            "USGS Topographic": usgsTopographic,
            "Carto Dark": cartoDark,
           // "OSM BrightGray":osmBrightGray,
            
        }).addTo(map);
        // Toggle panel functionality
        document.getElementById('toggleLayers').addEventListener('click', togglePanel);
        document.getElementById('toggleButton').addEventListener('click', togglePanel);

        function togglePanel() {
            var panel = document.getElementById('checkbox-panel');
            var mapContainer = document.getElementById('map');
            var icon = document.getElementById('toggleButton').querySelector('i');

            if (panel.style.display === 'none' || panel.style.display === '') {
                panel.style.display = 'block';
                mapContainer.style.width = 'calc(100% - 250px)';
                icon.classList.remove('fa-chevron-right');
                icon.classList.add('fa-chevron-left');
            } else {
                panel.style.display = 'none';
                mapContainer.style.width = '100%';
                icon.classList.remove('fa-chevron-left');
                icon.classList.add('fa-chevron-right');
            }
            setTimeout(function () { map.invalidateSize(); }, 100);
        }

        // Other event listeners for toggling checkboxes
        document.getElementById("toggleLayersButton").addEventListener("click", function () {
            var checkboxes = document.getElementById("buoyCheckboxes");
            if (checkboxes.style.display === "none") {
                checkboxes.style.display = "block";
                this.textContent = "-";
            } else {
                checkboxes.style.display = "none";
                this.textContent = "+";
            }
        });

    

        // Initially hide checkboxes
        document.getElementById("buoyCheckboxes").style.display = "none";
        
   

          document.getElementById('homeButton').addEventListener('click', function() {
            map.setView([13.5, 78.0],initialZoom);
        });


    
 

        
        export default map;