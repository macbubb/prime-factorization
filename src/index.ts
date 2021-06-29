const isPrime = (num: number): boolean => {
	let sqrt: number = Math.sqrt(num); //all factors of a number are <= it's square root, so don't need to check divisibility higher
	if (num <= 3) return num > 1;
	if (num % 2 === 0 || num % 3 === 0) {
		return false;
	}
	let k: number = 1;
	while (6 * k - 1 <= sqrt) {
		if (num % (6 * k + 1) === 0 || num % (6 * k - 1) === 0) {
			return false;
		}
		k++;
	}
	return true;
};

const findPrimeFactors = (num: number): number[] => {
	//not prime, replace with prime factors
	let primeFactors: number[] = [];
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

function handleClick(): void {
	let num: number = Number(document.getElementById("number").value);
	let answer: number[] = findPrimeFactors(num);
	let prettyAnswer: string = "";
	for (let j = 0; j < answer.length; j++) {
		prettyAnswer += String(answer[j]);
		if (j < answer.length - 1) {
			prettyAnswer += ", ";
		}
	}
	document.getElementById("answer").innerHTML = `<h2>${prettyAnswer}</h2>`;
}

const submitButton = document.getElementById("button");
submitButton.addEventListener("click", handleClick, false);
