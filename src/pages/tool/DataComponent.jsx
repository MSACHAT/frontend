import React from 'react';

const DataComponent = ({ data }) => {
    return (
        <div style={{ display: 'flex', flexWrap: 'wrap' }}>
            {data.data.map((item, index) => (
                <div key={index} style={{ position: 'relative', width: '300px', height: '300px', overflow: 'hidden', margin: '10px' }}>
                    <img
                        src={item.image}
                        style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                            position: 'absolute',
                            top: '0',
                            left: '0',
                        }}
                        alt={`Image ${index}`}
                    />
                    <p style={{ position: 'absolute', bottom: '10px', left: '10px', color: 'white', zIndex: '1' }}>
                        Like: {item.like}
                    </p>
                </div>
            ))}
        </div>
    );
};

export default DataComponent;
