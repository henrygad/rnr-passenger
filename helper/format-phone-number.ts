/**
 * Ensures the phone number has a country code.
 * Defaults to +234 (Nigeria) if no plus sign is found.
 */
export const formatPhoneNumber = (phone: string): string => {
    const cleaned = phone.trim();
    if (cleaned.startsWith('+')) {
        return cleaned;
    }
    // Remove leading zero if the user typed 080... instead of 80...
    const formatted = cleaned.startsWith('0') ? cleaned.substring(1) : cleaned;
    return `+234${formatted}`;
};

