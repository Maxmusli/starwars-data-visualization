import React, { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';

import { fetchAllPlanetsData } from '../Utilities/fectch_data_util.js';
import { Loader } from './loader.jsx';
import {
    getPlanetName, getPlanetAttributeData 
} from '../Action/planet_data_actions.js';

const BarChart = () => {
    const [planets, setPlanets] = useState([]);
    const [attributeData, setAttributeData] = useState([]);
    const [attributeLabel, setAttributeLabel] = useState("Population");
    const [loading, setLoading] = useState(true);
    
    useEffect(() => {
        fetchAllPlanetsData(setPlanets, setLoading);
    }, [])
    
    const planetNames = getPlanetName(planets);
    const planetPopulations = getPlanetAttributeData(planets, 'population');

    const handleChangeAttribute = attribute => {
        const planetAttributes = getPlanetAttributeData(planets, attribute);

        const chartLabel = attribute.split('_').map( ele => {
            return ele[0].toUpperCase() + ele.slice(1);
        })
        
        setAttributeLabel(chartLabel.join(' '));
        setAttributeData(planetAttributes);
    }

    const attributes = [
        { attribute: "Population", label: "population" },
        { attribute: "Rotation Period", label: "rotation_period" },
        { attribute: "Orbital Period", label: "orbital_period" },
        { attribute: "Diameter", label: "diameter" },
        { attribute: "Surface Water", label: "surface_water" },
    ]

    const actionElements = attributes.map((object, idx) => {
        return (
            <button
                key={idx}
                className={
                    `${attributeLabel === object.attribute ? "active" : ""}`
                }
                onClick={() => handleChangeAttribute(object.label)}
            >
                {object.attribute}
            </button>
        )
    })

    let displayData;
    attributeData.length ? 
        displayData = attributeData: 
        displayData = planetPopulations;
    
    return (
        <div className="bar-chart-wrapper">
            <div className="action-container">
                {actionElements}
            </div>
            <div className="chart-container">
                {loading ? (
                    <Loader />
                ) : (
                    <Bar
                        height={800}
                        width={600}
                        data={{
                            labels: planetNames,
                            datasets: [{
                                label: attributeLabel,
                                data: displayData,
                                backgroundColor: '#399DD3',
                                borderColor: '#399DD3',
                                borderWidth: 1,
                            }]
                        }}
                        options={{
                            indexAxis: 'y',
                            responsive: true,
                            plugins: {
                                title: {
                                    display: true,
                                    text: 'Star Wars Planet Bar Chart'
                                }
                            },
                            scales: {
                                y: {
                                    display: true,
                                },
                                x: {
                                    display: true,
                                    type: 'logarithmic',
                                }
                            }
                        }}
                    />
                )}
            </div>
        </div>
    )
}

export default BarChart;