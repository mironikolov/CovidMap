import React, {useRef} from 'react';
import {Map, TileLayer} from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import '../../assets/stylesheets/components/map.scss';

export const Maps = (props) => {
    const mapRef = useRef();

    const mapStyle = {
        height: '100vh',
        width: '100wh'
    };

    console.log(props.geoJSON);
    
    function addGeoJsonLayers(e){
        var L = window.L;
        if (props.geoJSON && L) {
            const geoJsonLayers = new L.GeoJSON(props.geoJSON, {
                pointToLayer: (feature = {}, latlng) => {
                    const { properties = {} } = feature;
                    let updatedFormatted;
                    let casesString;
                
                    const {
                      country,
                      updated,
                      cases,
                      deaths,
                      recovered
                    } = properties
                
                    casesString = `${cases}`;
                
                    if ( cases > 1000 ) {
                      casesString = `${casesString.slice(0, -3)}k+`
                    }
                
                    if ( updated ) {
                      updatedFormatted = new Date(updated).toLocaleString();
                    }
                
                    const html = `
                      <span class="icon-marker">
                        <span class="icon-marker-tooltip">
                          <h2>${country}</h2>
                          <ul>
                            <li><strong>Confirmed:</strong> ${cases}</li>
                            <li><strong>Deaths:</strong> ${deaths}</li>
                            <li><strong>Recovered:</strong> ${recovered}</li>
                            <li><strong>Last Update:</strong> ${updatedFormatted}</li>
                          </ul>
                        </span>
                        ${ casesString }
                      </span>
                    `;
                
                    return L.marker( latlng, {
                      icon: L.divIcon({
                        className: 'icon',
                        html
                      }),
                      riseOnHover: true
                    });
                  }
            });
            geoJsonLayers.addTo(mapRef.current.leafletElement);
            //todo: images
        }
    }

    return (
        <Map {...props.mapSettings} ref={mapRef} style={mapStyle} onLoad={addGeoJsonLayers()}>
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
            />
        </Map>
    )
}