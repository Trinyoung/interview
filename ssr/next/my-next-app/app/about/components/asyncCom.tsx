import React from 'react';

function fetchData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve('Data loaded!');
        }, 30000);
    });
}

const AsyncComponent2 = async () => {
    const data = await fetchData();
    return <div>{data}</div>;
};


export default AsyncComponent2