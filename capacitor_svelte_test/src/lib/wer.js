export const wordErrorRate = (hypothesis, reference) => {
	// Tokenize the strings into words
	const hypothesisWords = hypothesis.trim().split(/\s+/);
	const referenceWords = reference.trim().split(/\s+/);

	// Initialize matrix for dynamic programming
	const dp = [];
	for (let i = 0; i <= hypothesisWords.length; i++) {
		dp[i] = [i];
	}
	for (let j = 1; j <= referenceWords.length; j++) {
		dp[0][j] = j;
	}

	// Calculate edit distance using dynamic programming (Levenshtein distance)
	for (let i = 1; i <= hypothesisWords.length; i++) {
		for (let j = 1; j <= referenceWords.length; j++) {
			if (hypothesisWords[i - 1] === referenceWords[j - 1]) {
				dp[i][j] = dp[i - 1][j - 1];
			} else {
				dp[i][j] = Math.min(
					dp[i - 1][j] + 1, // deletion
					dp[i][j - 1] + 1, // insertion
					dp[i - 1][j - 1] + 1 // substitution
				);
			}
		}
	}

	// WER is the minimum number of edits normalized by the number of reference words
	const wer = dp[hypothesisWords.length][referenceWords.length] / referenceWords.length;
	return wer;
};
