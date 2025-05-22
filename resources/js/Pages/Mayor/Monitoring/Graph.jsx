import React from 'react'
import LineGraph from './../../Partials/LineGraph';

function Graph({ auth, rawData, project }) {
    console.log(rawData);
    return (
        <>
            {/* <pre>{JSON.stringify(rawData, null, 2)}</pre> */}
            <LineGraph auth={auth} rawData={rawData} project={project} />
        </>
    );
}

export default Graph