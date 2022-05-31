exports.isNumeric = function(string){
    let number = parseInt(string);  
    if(isNaN(number)) {
        return false
    }
    return true;

}