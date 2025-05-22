import LineGraph from '@/Pages/Partials/LineGraph';
import React from 'react'


function Graph({ auth, rawData, project }) {
    return (
        <>
            <LineGraph auth={auth} rawData={rawData} project={project} />
        </>
    );
}

export default Graph