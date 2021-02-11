exports.parseSequelizeResults = function(results){
    const data = [];
    for (let i=0; i< results.length;i++){
        data.push(parseSequelizeResult(results[i]));
    }
    return data;
}
exports.parseSequelizeResult = function parseSequelizeResult(result) {
    const objResults = Object.fromEntries(Object.entries(result));
    return Object.assign({}, result.dataValues)
}

parseSequelizeResult = function parseSequelizeResult(result) {
    const objResults = Object.fromEntries(Object.entries(result));
    return Object.assign({}, result.dataValues)
}

exports.dropDomain = function(email){
    return email.split('@')[0]
}