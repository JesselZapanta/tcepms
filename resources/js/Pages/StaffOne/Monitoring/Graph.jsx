import LineGraph from '@/Pages/Partials/LineGraph';
import React from 'react'


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