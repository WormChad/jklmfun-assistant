// Define the URL of the text file
const url = 'https://raw.githubusercontent.com/WormChad/jklmfun-assistant/main/dict.txt';

// Declare the wordArray variable in a higher scope
let wordArray;

// Use the fetch API to get the content
fetch(url)
	.then(response => {
		if (!response.ok) {
			throw new Error('Network response was not ok');
		}
		return response.text();
	})
	.then(data => {
		// Split the content into an array of words (assuming each line is a word)
		wordArray = data.split('\n').map(word => word.toLowerCase()); // Convert to lowercase

		// Shuffle the wordArray
		wordArray = shuffleArray(wordArray);

		// Now you can use the shuffled wordArray here or outside this scope
		console.log(wordArray);
	})
	.catch(error => {
		console.error('There was a problem with the fetch operation:', error);
	});

// Function to shuffle an array using Fisher-Yates algorithm
function shuffleArray(array) {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]]; // Swap elements
	}
	return array;
}

// Select the target element you want to monitor for changes
const targetElement = document.querySelector(".syllable");

// Create a new mutation observer
const observer = new MutationObserver((mutationsList, observer) => {
	// Handle changes here
	console.log("Content changed:", targetElement.innerText);
	let foundWord = wordArray.find((word) => word.includes(targetElement.innerText.toLowerCase()))
	console.log(foundWord)
});

// Configure the observer to watch for changes in the element's child nodes (including text content)
const config = {
	childList: true,
	subtree: true
};

// Start observing the target element
observer.observe(targetElement, config);
