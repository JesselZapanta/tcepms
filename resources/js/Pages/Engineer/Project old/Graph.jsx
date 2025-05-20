import React from 'react'
import LineGraph from '../../Partials/LineGraph';

function Graph({ auth, rawData }) {
    return (
        <>
            <LineGraph auth={auth} rawData={rawData} />
        </>
    );
}

export default Graph