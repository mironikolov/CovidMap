import React, {useState, useEffect} from 'react';
import {Maps} from './map';

const CENTER = [42.43278, 25.64194];
const DEFAULT_ZOOM = 7;

export const MapContainer = () => {
    const [geoJSON, setGeoJSON] = useState();

    useEffect(() => {
        mapEffect();
    }, []);

    async function mapEffect(){
        let data;

        try {
            data = await (await fetch('https://disease.sh/v3/covid-19/countries')).json();
        } catch (e) {
            console.log(`Failed to fetch countries: ${e.message}`, e);
            return;
        }
    
        setGeoJSON({
            type: 'FeatureCollection',
            features: data.map((country = {}) => {
                const { countryInfo = {} } = country;
                const { lat, long: lng } = countryInfo;
                return {
                    type: 'Feature',
                    properties: {
                        ...country,
                    },
                    geometry: {
                        type: 'Point',
                        coordinates: [ lng, lat ]
                    }
                }
            })
        })
    }
    
    const mapSettings = {
        center: CENTER,
        defaultBaseMap: 'OpenStreetMap',
        zoom: DEFAULT_ZOOM
    };

    return (
        <Maps mapSettings = {mapSettings} geoJSON={geoJSON}/>
    );
}
