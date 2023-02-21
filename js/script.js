

// the global flashcards  variable 
var flashCards = []


// wating the page to load

document.addEventListener('DOMContentLoaded', () => {

    // getting the form inputs from the DOM
    const subject = document.getElementById('subject');
    const nbr = document.getElementById('nbr');
    const btn = document.getElementById('btn');

    // getting the DOM elements that will be used in the flashcards
    const  next = document.getElementsByClassName("mdi mdi-arrow-right-top-bold")[0]
    const flip = document.getElementsByClassName("mdi mdi-rotate-3d-variant");
    const questionFace= document.getElementsByClassName("card_inner")[0];
    const tryAgain = document.getElementsByClassName('regenerate')[0]
    const flashCardsPage = document.getElementsByClassName('flashcards')[0];
    const home = document.getElementsByClassName("home")[0];
    const loading = document.getElementsByClassName("loading")[0];

    // the question number to track the flashcard position
    var questionNbr = -1;

    // getting the values of the form inputs
    const subjectValue = subject.value;
    const nbrValue = nbr.value;
    



    
    // adding the is-flipped class to the rotation icons
    flip[0].addEventListener('click' , () => {
        questionFace.classList.toggle('is-flipped');
    })
    flip[1].addEventListener('click' , () => {
        questionFace.classList.toggle('is-flipped');
    })


    // adding the event listener to the button to generate the flashcards
    btn.addEventListener('click', async () => {
        

        //triming the values before the validation
        const subjectValue = subject.value?.trim();
        const nbrValue = nbr.value?.trim();
        

        // validating the inputs
        if ( inputValidation(subjectValue,nbrValue) )
        {

            // if the the inputs are valide with request the backend server and display the flashcards

            // displaying the loading div
            home.style.display='none';
            loading.style.display = 'block';

            // making the request to the backend server to get the flashcards
            flashCards = await makeRequest(subjectValue,nbrValue);
        
            // hiding the loading div and displaying the flashcards
            loading.style.display = 'none';
            flashCardsPage.style.display='block';

            // displaying the first flashcard
            const question = document.getElementsByClassName("question")[0];
            const answer = document.getElementsByClassName("answer")[0];
            questionNbr = questionNbr + 1
            question.innerText = flashCards[questionNbr].Q;
            answer.innerText = flashCards[questionNbr].A

        }
    })


    // adding the event listener to the next button to display the next flashcard

    next.addEventListener('click' , () => {
        const question = document.getElementsByClassName("question")[0];
        const answer = document.getElementsByClassName("answer")[0];
        questionNbr = questionNbr +1;
        nextQuestion(question,answer,questionNbr,flashCards);
    })
   
    // loading the page when the bottom tryAgain is active
    tryAgain.addEventListener('click', () => {

        window.location.reload();

    })



})





// the functions used in the script



// the function to validate the inputs
function inputValidation(sub,nbr)
{
    if (sub === '' || nbr === '' || parseInt(nbr) > '10') 
    {
        alert('Please Enter A Subject and A Number Of Questions');
        return false;
    }
    else
    {
        return true;
    }

}


// the function to make the request to the backend server and return the flashcards array
async function makeRequest(subjectValue,nbrValue)
{
    console.log('making request');
    const response = await axios.post(`https://flashbrainapi-production.up.railway.app/api/flashcards`, null ,{ params:{subject:subjectValue , nbr:nbrValue}} )
    const data = await response.data;
    console.log(data);
    return data.flashCards;
}


// the function to display the next flashcard
function nextQuestion(questionNode,answerNode,questionNbr,flashcards)

{
    
    const questionContainer = questionNode.parentNode;
    const nextQuestion = questionNode.cloneNode(true);
    nextQuestion.style.display = 'none';
    nextQuestion.style.transform = 'translateX(1000px)';

    
    if (questionNbr < flashcards.length )
    {
        nextQuestion.innerText = flashcards[questionNbr].Q;
        answerNode.innerText = flashcards[questionNbr].A;
        questionContainer.appendChild(nextQuestion);
        nextQuestion.style.display = 'block';
        nextQuestion.style.transform = 'translateX(0px)';
        questionNode.style.transform = 'translateX(-1000px)';
        questionNode.remove();
    }

    if ( questionNbr == flashcards.length ) 
    {
        questionNode.innerText = 'End of your Flashcards';
        answerNode.innerText = 'End of your Flashcards';
        const suite = document.getElementsByClassName("mdi mdi-arrow-right-top-bold")[0]
        suite.style.display = 'none';
    }
}


/// the end ///


/// Sidi Ahmed Hodu  ////
