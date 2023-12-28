import {Toast} from '@douyinfe/semi-ui';
export function handleError(errorMessage){
    let opts = {
        content: errorMessage,
        duration: 3,
    };
    Toast.error(opts);
}