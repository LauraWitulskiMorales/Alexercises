// Implement and export by default a function that should return trueif the number is lucky and falseif not. The number of iterations of the search process should be limited to 10.

export default function luckyNumber (n) {
    
    function sumOfNumbers (num) {
        let sum = 0;
        while (num > 0) {
            let digit = num % 10;
            sum += digit * digit;
            num = Math.floor(num / 10);
        }
        return sum;
    }
    let iterations = 0;
    while ( n !== 1 && iterations < 10) {
        n = sumOfNumbers(n);
        iterations++;
    }
    return n === 1;
}
