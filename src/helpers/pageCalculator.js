function pageCalculator(item) {
    let array = [];
    for (let i = 0; i < parseInt(item / 5); i++) {
        array.push(i + 1)
    }
    if (item % 5 > 0) {
        array.push(array.length + 1)
        return array
    }
    else {
        return array
    }
}
export default pageCalculator