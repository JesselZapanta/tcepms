import React from 'react'
import LineGraph from './../../Partials/LineGraph';

function Graph({ auth, rawData, project }) {
    return (
        <>
            <LineGraph auth={auth} rawData={rawData} project={project} />
        </>
    );
}

export default Graph