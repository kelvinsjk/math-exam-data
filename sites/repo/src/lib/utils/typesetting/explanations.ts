export function binomialAssumptions(
	trial: string,
	success: string,
): [string, string] {
	return [
		`The probability that each ${trial} is ${success} is the same for each ${trial}`,
		`The event that a ${trial} is ${success} is independent of all other ${trial}s.`,
	];
}