import React from 'react'
import LineGraph from './../../Partials/LineGraph';

function Graph({ auth, rawData, project, badge }) {
    return (
        <>
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