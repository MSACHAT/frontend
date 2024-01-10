import React from 'react';
import { Icon } from '@douyinfe/semi-ui';

export default function HomeAddNormalIcon(){
    function CustomIcon() {
        return <svg width="46" height="34" viewBox="0 0 46 34" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g id="ic_home_add_normal">
                <rect id="Rectangle 527" width="45.3462" height="34" rx="10" fill="#FF4802"/>
                <path id="Union" fillRule="evenodd" clipRule="evenodd" d="M21.8334 23.6564C21.8334 24.3985 22.435 25 23.177 25C23.9191 25 24.5206 24.3985 24.5206 23.6564V18.3333H29.9052C30.6416 18.3333 31.2386 17.7364 31.2386 17C31.2386 16.2636 30.6416 15.6667 29.9052 15.6667H24.5206V10.3436C24.5206 9.60155 23.9191 9 23.177 9C22.435 9 21.8334 9.60155 21.8334 10.3436V15.6667H16.4488C15.7124 15.6667 15.1155 16.2636 15.1155 17C15.1155 17.7364 15.7124 18.3333 16.4488 18.3333H21.8334V23.6564Z" fill="white"/>
            </g>
        </svg>;

    }
    return (

            <Icon svg={<CustomIcon />} />


    );
};