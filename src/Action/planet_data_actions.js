export const getPlanetName = (planetList) => {
    const planetNameList = planetList.map(ele => {
        return ele.name;
    });
    
    return planetNameList;
}

export const getPlanetAttributeData = (planetList, attribute) => {
    const planetAttributeData = planetList.map(ele => {
        if (ele[attribute] !== "unknown") {
            return ele[attribute];
        }

        return 0;
    });

    return planetAttributeData
}

export const getTableData = (planetList, attributes) => {
    attributes = attributes.map(item => {
        const arr = item.split(" ");
        const newAttribute = arr.map(word => {
            return word.toLowerCase();
        })

        return newAttribute.join("_");
    });
    
    const planetDataSet = [];
    planetList.forEach(ele => {
        const planetData = [];
        attributes.forEach(att => {
            let value = ele[att];
            if (!isNaN(parseInt(value))) {
                planetData.push(
                    new Intl.NumberFormat().format(parseInt(value))
                );
            } else {
                planetData.push(value);
            }
        })

        planetDataSet.push(planetData);
    });

    return planetDataSet
}