const {getApiInfo} = require('./getApiInfo');
const {getDbInfo} = require('./getDBInfo');

const getAllInfo = async () =>{
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo();
    const infoTotal = apiInfo.concat(dbInfo).sort((a, b) => {
        return a.name < b.name ? -1 : 1;
    });
    return infoTotal;
}


module.exports = {
    getAllInfo,
    
}