exports.isNumeric = function(string){
    try {  
        parseInt(string);  
        return true;
      } catch(e){ 
          return false;
      } 
}