document.addEventListener('DOMContentLoaded', function() {
   
    const button = document.querySelector('#Start');
    const input = document.querySelector('#nameinput');
    const content = document.querySelector('#content');
    
    // Check if we're on the game page, and redirect if 

    // If we're on the start page
    localStorage.setItem('currentPage', 'onstartPage');  // Set the initial page state.

    // Start button click
    button.addEventListener('click', function() {
        content.innerHTML = `
            <h1> Welcome Soldier ${input.value}, to this Journey</h1>
            <p>You are on this Path to defeat the wicked King but first, You have to get your weapons for the final battle.</p>
            <p>So, Are you Ready to take on the Challenge?</p>
            <ul>
                <input id="radio1" type="radio" name="choices" />
                <label for="radio1">I'm Ready! Let's GO!</label>
            </ul>
            <ul>
                <input id="radio2" type="radio" name="choices" />
                <label for="radio2">Nah!! I'm gonna chicken out! Bye-Bye</label>
            </ul>
            <button id="proceed">Proceed</button>
        `;

        // Proceed button click
        const proceedButton = document.querySelector('#proceed');
        proceedButton.addEventListener('click', function() {
            localStorage.setItem('currentPage', 'inGame');
        window.location.href= '../javascript/index.html'

})


})

   
    

})


