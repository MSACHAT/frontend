const { v5: uuidv5 } = require('uuid');
const namespace = '6ba7b810-9dad-11d1-80b4-00c04fd430c8'; // 固定的UUID命名空间
function GenerateUuid(password){
    const uuid = uuidv5(password, namespace);
    console.log('Generated UUID:', uuid);
}