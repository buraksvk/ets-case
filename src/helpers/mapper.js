function mapper(array){

    var str = "[";
    for (let i = 0; i < array.length; i++) {
        str = str + '{"hotel":"' + array[i].hotel + '",' + '"rating":"' + array[i].rating + '",' + '"time":"' + array[i].time + '"}'
        if (i == array.length - 1) {
            str = str + "]"
        } else {
            str = str + ","
        }
    }

    return str
}
export default mapper