function diagnose(data) {
	// Authenticate API errors
	if (data.error) {
		return data.errorDescription;
	}

	// Object API errors
	if (data.Error) {
		return `${data.Error.ErrorCode} ${data.Error.DeveloperMessage}`;
	}

	return null;
}

module.exports = diagnose;