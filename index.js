/**
 Challenge: Add a button that, when clicked, gets a new deck of cards from the deckofcards API
 
 URL: https://apis.scrimba.com/deckofcards/api/deck/new/shuffle/
 
 Log the whole response to the console
 */

 let deckId = ""
 let computerScore = 0
 let yourScore = 0

 document.querySelector(".deck-btn").addEventListener("click", drawOneCard)
 document.querySelector(".deck-two-btn").addEventListener("click", drawTwoCards)

 async function drawOneCard() {
     const res = await fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
     const data = await res.json()
 
    console.log(data)
    deckId = data.deck_id
    document.querySelector(".remaining-number").textContent = data.remaining
    document.querySelector(".deck-two-btn").disabled = false
    document.querySelector(".cards-remaining").innerHTML = `
    <h3>Cards remaining:</h3>
    <h4 class="remaining-number">${data.remaining} </h4>
    `
    computerScore = 0
    yourScore = 0
    document.querySelector(".winnning-mesage").textContent = "Game of War"
    document.querySelector(".score-board-computer").textContent = "Computer: 0"
    document.querySelector(".score-board-you").textContent = "You: 0"

 }

 /* function drawOneCard() {
     fetch("https://deckofcardsapi.com/api/deck/new/shuffle/")
         .then(res => res.json())
         .then(data => {

                console.log(data)
                deckId = data.deck_id
                document.querySelector(".remaining-number").textContent = data.remaining
                document.querySelector(".deck-two-btn").disabled = false
                document.querySelector(".cards-remaining").innerHTML = `
                <h3>Cards remaining:</h3>
                <h4 class="remaining-number">${data.remaining} </h4>
                `
                computerScore = 0
                yourScore = 0
                document.querySelector(".winnning-mesage").textContent = "Game of War"
                document.querySelector(".score-board-computer").textContent = "Computer: 0"
                document.querySelector(".score-board-you").textContent = "You: 0"
            })
 }*/
 
 async function drawTwoCards() {
    let winningMsgEl = document.querySelector(".winnning-mesage")
    const res = await fetch (`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
    const p = await res.json()  
    if(p.success) {
        console.log(p.success, p.remaining)
        const card1=p.cards[0]
        const card2=p.cards[1]
        document.querySelector(".card-image").innerHTML =`
        <div class="deck-slot"> <img src=${card1.image} class="card"></div>
        <div class="deck-slot"> <img src=${card2.image} class="card"></div>
        `
        winningMsgEl.innerHTML = winnerOfTwo(card1.value, card2.value)
        document.querySelector(".remaining-number").textContent = p.remaining
        if (p.remaining === 0) {
            if (computerScore > yourScore) {
                winningMsgEl.innerHTML = `<span class="winner final-winner">Computer</span> wins!`
            } else if (computerScore < yourScore) {
                winningMsgEl.innerHTML = `<span class="winner final-winner">You</span> win!`
            } else {
                winningMsgEl.innerHTML = `<span class="winner final-winner">War</span>`
            }
        }
    }
    else {
        console.log("hjer")
        document.querySelector(".cards-remaining").innerHTML = '<h4 class="remaining-number">Draw new Card to continue...</h4>'
        console.log("innerHTMl" + document.querySelector(".cards-remaining").innerHTMl)
        document.querySelector(".deck-two-btn").disabled = true
        computerScore = 0
        yourScore = 0
    }    
    
    }
        
           


 /* function drawTwoCards() {
     let winningMsgEl = document.querySelector(".winnning-mesage")
     fetch (`https://deckofcardsapi.com/api/deck/${deckId}/draw/?count=2`)
        .then(res => res.json())
        .then(p => {
            if(p.success) {
                console.log(p.success, p.remaining)
                const card1=p.cards[0]
                const card2=p.cards[1]
                document.querySelector(".card-image").innerHTML =`
                <div class="deck-slot"> <img src=${card1.image} class="card"></div>
                <div class="deck-slot"> <img src=${card2.image} class="card"></div>
                `
                winningMsgEl.innerHTML = winnerOfTwo(card1.value, card2.value)
                document.querySelector(".remaining-number").textContent = p.remaining
                if (p.remaining === 0) {
                    if (computerScore > yourScore) {
                        winningMsgEl.innerHTML = `<span class="winner final-winner">Computer</span> wins!`
                    } else if (computerScore < yourScore) {
                        winningMsgEl.innerHTML = `<span class="winner final-winner">You</span> win!`
                    } else {
                        winningMsgEl.innerHTML = `<span class="winner final-winner">War</span>`
                    }
                }
            }
            else {
                console.log("hjer")
                document.querySelector(".cards-remaining").innerHTML = '<h4 class="remaining-number">Draw new Card to continue...</h4>'
                console.log("innerHTMl" + document.querySelector(".cards-remaining").innerHTMl)
                document.querySelector(".deck-two-btn").disabled = true
                computerScore = 0
                yourScore = 0
            }    
            
            }
        
           
        )
 }*/
 function winnerOfTwo(card1, card2) {
        const score=["2", "3", "4", "5", "6", "7", "8", "9", "10", "JACK", "QUEEN", "KING", "ACE"]
        const card1Index = score.findIndex(x => x==card1)
        const card2Index =  score.findIndex(x => x==card2)
        
        let winningMsg = ""
        if (card1Index > card2Index) {
            winningMsg = `<span class="winner">Computer</span> wins!`
            computerScore ++
            document.querySelector(".score-board-computer").innerHTML = `
            <h3 class = "score-board score-board-computer">
            Computer: <span class="blink-text">${computerScore}</span></h3>
            `
        }
        else if ( card1Index < card2Index) {
            winningMsg = `<span class="winner">You</span> win!`
            yourScore ++
            document.querySelector(".score-board-you").innerHTML = `
            <h3 class = "score-board score-board-you">
            You: <span class="blink-text">${yourScore}</span></h3>
            `
        } else {
            winningMsg = `<span class="tie">War</span>`
        }
        return winningMsg
 } 