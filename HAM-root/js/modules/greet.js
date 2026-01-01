// /js/modules/greet.js (Now fetches time from the internet)

/**
 * Fetches the current time from the WorldTimeAPI.
 * @returns {Promise<Date|null>} A promise that resolves with a Date object or null if the fetch fails.
 */
async function getInternetTime() {
    try {
        // This API returns a JSON object with the current UTC datetime
        const response = await fetch('https://worldtimeapi.org/api/ip');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        // The 'datetime' property is a full ISO 8601 string, which the Date constructor can parse
        return new Date(data.datetime);
    } catch (error) {
        console.error("Failed to fetch internet time:", error);
        // Fallback to system time if the API fails
        return new Date();
    }
}

/**
 * Determines the appropriate greeting based on the hour.
 * @param {number} hour - The current hour (0-23).
 * @returns {string} The greeting string.
 */
function getGreeting(hour) {
    if (hour < 12) {
        return "Good morning";
    } else if (hour < 18) {
        return "Good afternoon";
    } else {
        return "Good evening";
    }
}

/**
 * Formats the time into a user-friendly string like "10:30 PM".
 * @param {Date} dateObject - The date to format.
 * @returns {string} The formatted time string.
 */
function formatTime(dateObject) {
    // Use Intl.DateTimeFormat for robust, locale-aware time formatting.
    return new Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(dateObject);
}

/**
 * Main function to fetch time, update the greeting, and display the current time.
 * @param {string} greetingElementId - The ID of the greeting element.
 * @param {string} timeElementId - The ID of the time display element.
 * @param {string} userName - The name of the user.
 */
export async function setDynamicGreetingAndTime(greetingElementId, timeElementId, userName = "User") {
    const greetingElement = document.getElementById(greetingElementId);
    const timeElement = document.getElementById(timeElementId);

    if (!greetingElement || !timeElement) {
        console.error("A required UI element for greeting or time is missing.");
        return;
    }

    // Show loading state
    greetingElement.textContent = "Loading...";
    timeElement.textContent = "";

    const now = await getInternetTime();

    if (now) {
        const greetingText = getGreeting(now.getHours());
        const timeText = formatTime(now);

        greetingElement.textContent = `${greetingText}, ${userName}!`;
        timeElement.textContent = `The current time is ${timeText}`;
    } else {
        // Handle the case where the API and fallback both failed
        greetingElement.textContent = `Hello, ${userName}!`;
        timeElement.textContent = "Could not load current time.";
    }
}
