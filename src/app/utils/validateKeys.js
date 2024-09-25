const validateKeys=(obj, keysArray) => {
    for (const key of keysArray) {
        if (!obj.hasOwnProperty(key)) {
            return {present:false,'message':`"${key}" is missing`};
        }
    }
    return  {present:true,'message':`All  are present`};
}

module.exports=validateKeys;