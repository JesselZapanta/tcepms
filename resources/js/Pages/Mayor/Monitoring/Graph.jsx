import React from 'react'
import LineGraph from './../../Partials/LineGraph';

function Graph({ auth, rawData, project,badge }) {
    console.log(rawData);
    return (
        <>
            {/* <pre>{JSON.stringify(rawData, null, 2)}</pre> */}
            <LineGraph
                auth={auth}
                rawData={rawData}
                project={project}
                badge={badge}
            />
        </>
    );
}

export default Graph