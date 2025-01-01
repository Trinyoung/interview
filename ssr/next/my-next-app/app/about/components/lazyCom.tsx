import React from 'react';

function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Data loaded!');
        }, 200000);
    });
}

const AsyncComponent = async () => {
    const data = await fetchData();
    return <div>{data}</div>;
};


export default AsyncComponent