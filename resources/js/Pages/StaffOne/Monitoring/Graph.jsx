import LineGraph from '@/Pages/Partials/LineGraph';
import React from 'react'


function Graph({ auth, rawData }) {
    return (
        <>
            <LineGraph auth={auth} rawData={rawData} />
        </>
    );
}

export default Graph