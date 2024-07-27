const questions = [
    { question: "HTML stands for?", options: ["Hyper Text Markup Language", "Home Tool Markup Language", "Hyperlinks and Text Markup Language", "None of these"], answer: 0 },
    { question: "Choose the correct HTML element to define important text", options: ["important", "b", "imp", "strong"], answer: 3 },
    { question: "Choose the correct HTML element for the largest heading:", options: ["<h1>", "<heading>", "<h6>", "<head>"], answer: 0 },
    { question: "What is the correct HTML element for inserting a line break?", options: ["<break>", "<lb>", "<br>", "<b>"], answer: 2 },
    { question: "What is the correct HTML for adding a hyperlink?", options: ["<a link=\"google.com\"> Google </a>", "<a href=\"google.com\"> Google</a>", "<a url=\"google.com\"> Google</a>", "<a> http=\"google.com\"</a>"], answer: 1 },
    { question: "What is the correct HTML for adding a number only input field?", options: ["<input type=\"num\">","<input type=\"number\">","<input type=\"text\">","<input type=\"digit\">"], answer: 1 },
    { question: "What is the correct HTML for adding a text area?", options: ["<input type=\"textarea\">","<input type=\"text\">","<input type=\"textbox\">","<input type=\"characters\">"], answer: 0 },
    { question: "What is the correct HTML for adding an image?", options: ["<img alt=\"image.gif\"/img>","<img image=\"image.gif\"/img>","<img> src=\"image.gif\"</img>","<img src=\"image.gif\"/img>"], answer: 3 },
    { question: "Which HTML element defines the title of a document?", options: ["head","meta","title","body"], answer: 2 },
    { question: "Which HTML attribute specifies an alternate text for an image, if the image cannot be displayed?", options: ["head","alt","title","image not found"], answer: 1 },
    { question: "What is the correct HTML element for playing video files?", options: ["<movie>","<video player>","<video>","<media>"], answer: 2 },
    { question: "Which attribute in input tag isused to display a text showing a dummy text what to enter in that image ?", options: ["placeholder","alt","type","none"], answer: 0 },
    { question: "Which HTML tag is used to bold text", options: ["<bold>","<b>","<boldtext>","em"], answer: 1 },
    { question: "Which HTML tag is used to add youtube video on web page", options: ["<youtube>","<iframe>","<video>","src"], answer: 1 },
    { question: "Which structure is used to take user inputs ?", options: ["type","inp","from","form"], answer: 3 },
    { question: "Which HTML tag is used to underline text ?", options: ["<u>","<underline>","<mark>","<un>"], answer: 0 },
    { question: "<video> is a text formatting tag ?", options: ["yes","no"], answer: 0 },
    { question: "Which HTML tag is used to add a lable ?", options: ["libel","lbl","label","lb"], answer: 2 },
    { question: "What attribute is used to set maximum number of characters in input field ?", options: ["max","type","maxlength","maxchar"], answer: 2 },
    { question: "Which attribute in text area is used to set default rows ?", options: ["defrows","maxrows","cols","rows"], answer: 3 },
    
    // Add more questions as needed...
];

let marks = 0;
let timeLeft = 30 * 60; // 30 minutes in seconds

// Initialize quiz
function initQuiz() {
    const quizContainer = document.getElementById("quiz-container");
    questions.forEach((q, index) => {
        const questionDiv = document.createElement("div");
        questionDiv.className = "question";

        const questionText = document.createElement("p");
        questionText.textContent = `Question ${index + 1}: ${q.question}`;
        questionDiv.appendChild(questionText);

        const optionsList = document.createElement("ul");
        optionsList.className = "options";
        q.options.forEach((option, i) => {
            const optionItem = document.createElement("li");
            const optionInput = document.createElement("input");
            optionInput.type = "radio";
            optionInput.name = `question${index}`;
            optionInput.value = i;
            optionInput.id = `q${index}o${i}`;

            const optionLabel = document.createElement("label");
            optionLabel.setAttribute("for", optionInput.id);
            optionLabel.textContent = option;

            optionItem.appendChild(optionInput);
            optionItem.appendChild(optionLabel);
            optionsList.appendChild(optionItem);
        });

        questionDiv.appendChild(optionsList);
        quizContainer.appendChild(questionDiv);
    });
}

// Start timer
function startTimer() {
    const timerElement = document.getElementById("timer");
    const interval = setInterval(() => {
        if (timeLeft <= 0) {
            clearInterval(interval);
            submitQuiz();
        } else {
            timeLeft--;
            const minutes = Math.floor(timeLeft / 60);
            const seconds = timeLeft % 60;
            timerElement.textContent = `Time Remaining: ${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
        }
    }, 1000);
}

// Submit quiz
function submitQuiz() {
    questions.forEach((q, index) => {
        const selectedOption = document.querySelector(`input[name="question${index}"]:checked`);
        const correctOptionIndex = q.answer;
        const options = document.getElementsByName(`question${index}`);

        if (selectedOption) {
            const selectedAnswerIndex = parseInt(selectedOption.value);
            if (selectedAnswerIndex === correctOptionIndex) {
                marks++;
                selectedOption.parentElement.classList.add("correct");
            } else {
                selectedOption.parentElement.classList.add("incorrect");
            }
        }

        options[correctOptionIndex].parentElement.classList.add("correct");
    });

    var marksLabel=document.getElementById("marks");
    marksLabel.textContent = `Marks: ${marks}/${questions.length}`;
    
   // alert(`Quiz submitted! You scored ${marks} out of ${questions.length}.`);
  
    document.getElementById("submitButton").style.display="none";

    downloadResults(); // Call the function to download results and close page
    
    // Close the page after download (optional)  
    setTimeout(() => {
        window.close();
      }, 1500);
    }

// Initialize quiz and start timer on page load
window.onload = () => {
    initQuiz();
    startTimer();
};
