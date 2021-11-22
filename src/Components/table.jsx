import React, { useState, useEffect } from 'react';

import { fetchSinglePagePlanetsData } from '../Utilities/fectch_data_util.js';
import { Loader } from './loader.jsx';
import { 
    getTableData
} from '../Action/planet_data_actions.js';

import Pagination from './pagination.jsx';

const Table = () => {
    const [planetsByPage, setPlanetsByPage] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchSinglePagePlanetsData(setPlanetsByPage, setLoading, 1);
    }, [])

    const handlePageChanged = (page) => {
        fetchSinglePagePlanetsData(setPlanetsByPage, setLoading, page);
    }

    const headerNames = [
        "Name",
        "Population",
        "Rotation Period",
        "Orbital Period",
        "Diameter",
        "Climate",
        "Surface Water"
    ]

    const headElements = headerNames.map((item, idx) => {
        return <th key={idx}>{item}</th>
    })

    const tableData = getTableData(planetsByPage, headerNames)
    
    const bodyElements = tableData.map((item, idx) => {
        return <tr key={idx}>{item.map((item, idx) => {
            return <td key={idx}>{item}</td>
        })}</tr>
    })

    return (
        <div className="table-wrapper">
            {loading ? (
                <Loader />
            ): (
                <div className="table-container">
                    <div className="pagination-container">
                        <Pagination
                            totalRecords={60}
                            pageLimit={10}
                            pageNeighbors={0}
                            onPageChanged={handlePageChanged}
                        />
                    </div>
                    <table className="table">
                        <thead>
                            <tr>{headElements}</tr>
                        </thead>
                        <tbody>
                            {bodyElements}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    )
}

export default Table