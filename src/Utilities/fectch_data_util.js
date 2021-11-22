import axios from 'axios';

export const fetchAllPlanetsData = async (setDataState, setLoadingState) => {
    let allPlanetsData = [];
    try {
        let currAPIPath = "https://swapi.dev/api/planets/";
        let currPlanetsData = await axios.get(currAPIPath);
        while (currPlanetsData) {
            allPlanetsData = allPlanetsData.concat(currPlanetsData.data.results);
            const nextAPIPath = currPlanetsData.data.next;
            if (!nextAPIPath) break;
            currPlanetsData = await axios.get(nextAPIPath);
        }
        setLoadingState(false);
        setDataState(allPlanetsData);
    } catch (err) {
        console.log(err);
    }
};

export const fetchSinglePagePlanetsData = async (
    setDataState, setLoadingState, page=1
) => {
    try {
        // setLoadingState(true);
        const currData = await axios.get(
            `https://swapi.dev/api/planets/?page=${page}`
        );
        const planetData = currData.data.results;
        if (planetData) setLoadingState(false);
        setDataState(planetData);
    } catch (err) {
        console.log(err);
    }
};