document.getElementById("app").innerHTML = `

`;

const isPrime = (num: number): boolean => {
	let sqrt: number = Math.sqrt(num); //all factors of a number are <= it's square root, so don't need to check divisibility higher
	if (num === 1) return false;
	for (let j: number = 2; j <= sqrt; j++) {
		if (num % j === 0) {
			return false;
		}
	}
	return true;
};

const findPrimeFactors = (num: number): number[] => {
	//not prime, replace with prime factors
	let primeFactors: number[] = [];
	//index [factor, number of repeats (power)]
	if (isPrime(num)) {
		//include case for prime numbers, number itself is the prime factor
		primeFactors.push(num);
		return primeFactors;
	}
	let sqrt: number = Math.sqrt(num); //all factors of a number are <= number's square root, this is the upper limit of possible factors
	for (let j: number = 2; j <= sqrt; j++) {
		if (num % j === 0) {
			//we have two factors, num / j and j
			//either both are prime, only num / j is prime, only j is prime, or neither are prime
			if (isPrime(num / j)) {
				//num / j is prime
				primeFactors.push(num / j); // add it to the list.
				num = j; // factor out num / j
				if (isPrime(j)) {
					// j is also prime
					primeFactors.push(j); // add j to the list
				} else {
					// j is not prime (num / j is)
					num = j; // factor out num / j
					j = 1; // start process over
					sqrt = Math.sqrt(num); // update upper limit of possible factors
				}
			} else if (isPrime(j)) {
				// num / j not prime, j is prime
				primeFactors.push(j); // add j to the list
				num = num / j; // factor out j
				j = 1; // start process over
				sqrt = Math.sqrt(num); // update upper limit of possible factors
			}
		}
	}
	primeFactors.sort((a, b) => a - b);
	return primeFactors;
};

let test: number[] = findPrimeFactors(12);
console.log(test);
