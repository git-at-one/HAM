// /js/modules/greet.js (Fetches Internet Time & Keeps it Live)

let timeIntervalId = null; // Holds the reference to our interval timer.

/**
 * Fetches the current time from the WorldTimeAPI.
 * @returns {Promise<Date>} A promise that resolves with a Date object.
 */
async function getInternetTime() {
    try {
        const response = await fetch('https://worldtimeapi.org/api/ip');
        if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        const data = await response.json();
        return new Date(data.datetime);
    } catch (error) {
        console.warn(
            "Could not fetch internet time. Falling back to system time.",
            error
        );
        return new Date(); // Fallback to local system time on failure.
    }
}

/**
 * Determines the appropriate greeting based on the hour.
 * @param {number} hour - The current hour (0-23).
 * @returns {string} The greeting string.
 */
function getGreeting(hour) {
    if (hour < 12) return "Good Morning";
    if (hour < 18) return "Good Afternoon";
    return "Good Evening";
}

/**
 * Formats a Date object into a user-friendly time string like "10:30 PM".
 * @param {Date} dateObject - The date to format.
 * @returns {string} The formatted time string.
 */
function formatTime(dateObject) {
    return new Intl.DateTimeFormat(navigator.language, {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    }).format(dateObject);
}

/**
 * Main function to initialize the greeting and start the live-updating clock.
 * @param {string} greetingElementId - The ID of the greeting element.
 * @param {string} timeElementId - The ID of the time display element.
 * @param {string} userName - The name of the user.
 */
export async function initDynamicGreetingAndClock(greetingElementId, timeElementId, userName = "User") {
    const greetingElement = document.getElementById(greetingElementId);
    const timeElement = document.getElementById(timeElementId);

    if (!greetingElement || !timeElement) {
        console.error("A required UI element for greeting or time is missing.");
        return;
    }

    // --- 1. FETCH INITIAL ACCURATE TIME ---
    greetingElement.textContent = "Loading...";
    timeElement.textContent = "";
    
    // Get our starting time. This is the only network request we make.
    let accurateTime = await getInternetTime();

    // --- 2. SET THE GREETING (RUNS ONCE) ---
    const greetingText = getGreeting(accurateTime.getHours());
    greetingElement.textContent = `${greetingText}, ${userName}!`;

    // --- 3. START THE LIVE-UPDATING "SMART" CLOCK ---
    // Clear any previous interval to prevent duplicates.
    if (timeIntervalId) {
        clearInterval(timeIntervalId);
    }

    // This function will be called every second.
    const tick = () => {
        // Update the time display with the current value of our 'accurateTime' object.
        timeElement.textContent = `The current time is ${formatTime(accurateTime)}`;
        
        // Increment our time object by 1000 milliseconds (1 second).
        accurateTime.setSeconds(accurateTime.getSeconds() + 1);
    };

    // Run the 'tick' function immediately to show the time right away.
    tick();
    
    // Set up the interval to run the 'tick' function every second from now on.
    timeIntervalId = setInterval(tick, 1000);
}
