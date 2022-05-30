exports.isNumeric = function(string){
    try {  
        Integer.parseInt(string);  
        return true;
      } catch(e){ 
          return false;
      } 
}