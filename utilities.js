export const generateCourseId = (courseName, instructor) => {
    return `OFFERING-${courseName}-${instructor}`.toLocaleUpperCase();
}

export const removeControlCharacters = (inputString) => {
    // removing control characters from string
    const cleanedString = inputString.replace(/[\t\r\n\b\f\\\'\"\v\0\x00-\x1F\x7F-\x9F]/g, '');

    return cleanedString;
}

export const replaceAndTitleCase = (inputString) => {
    // Step 1: Remove "-" and "_"
    const cleanString = inputString.replace(/[-_]/g, ' ');

    // Step 2: Convert to Title case
    const titleCaseString = cleanString.replace(/\w\S*/g, (word) => {
        return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
    });

    return titleCaseString;
}

export const toKebabCase = (inputString) => {
    return inputString.replace(/\s+/g, '-') // Step 1: Replace spaces with hyphens
        .toLowerCase();        // Step 2: Convert to lowercase
}

export const extractNameFromEmail = (email) => {
    const parts = email.split('@');
    const namePart = parts[0];

    // Split the name part by dots, underscores, and dashes
    const nameComponents = namePart.split(/[._-]/);

    // Capitalize each name component and join them with a space
    const formattedName = nameComponents
        .map(name => name.charAt(0).toUpperCase() + name.slice(1))
        .join(' ');

    return formattedName;
}
