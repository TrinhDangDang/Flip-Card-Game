// return cards
    //   .sort(() => Math.random() - 0.5) 


      //by default, the sort() method sorts the elements of an array in place and returns the sorted array.
      // if no comparison function is provided, the elements are converted to strings and sorted in ascending order based on their UTF-16 code unit values. this could lead to unexpected behavior because numbers are treated as strings
      // The sort() method uses an internal sorting algorithm ( like QuickSort, MergeSort, or others) to determine the order
      //a -b sorting in ascending order
      //b - a , soring in descending order
      //sorting an array in a random order by passing the nameless function ()=> Math.random() - 0.5


      // .map((value, index) => ({
      //   id: index,
      //   value,
      //   flipped: true,
      //   matched: false,
      // }));



      //.map callback function can accept up to three parameters: value: the current element being processed, index: the index of the current element, and array: the array that .map() was called upon



import { useState, useEffect } from "react";
import {v4 as uuidv4} from "uuid";

function App() {
  
  const transportation = ['🚗', '🚓', '🚕', '🛺', '🚙', '🛻', '🚌', '🚐', '🚎', '🚑', '🚒', '🚚', '🚛', '🚜', '🚘', '🚔', '🚖', '🚍', '🦽', '🦼', '🛹', '🛼', '🚲', '🛴', '🛵', '🏍️', '🏎️', '🚄', '🚅', '🚈', '🚝', '🚞', '🚃', '🚋', '🚆', '🚉', '🚊', '🚇', '🚟', '🚠', '🚡', '🚂', '🛩️', '🪂', '✈️', '🛫', '💺', '🚁', '🚀', '🛸', '🛰️', '⛵', '🚤', '🛥️', '⛴️', '🛳️', '🚢',]
  const foodAndDrinks = ['🍕', '🍔', '🍟', '🍿', '🌭', '🍿', '🧂', '🥓', '🥚', '🍳', '🧇', '🥞', '🧈', '🥐', '🥨','🥯', '🥖', '🫓', '🧀', '🥗', '🥙', '🥪', '🌮', '🌯', '🫔', '🥫', '🍖', '🍗', '🥩', '🍠', '🥟', '🥠', '🥡', '🍱', '🍘', '🍙', '🍚', '🍛', '🍜', '🦪', '🍣', '🍤', '🍥', '🥮', '🍢', '🧆', '🥘', '🍲', '🫕', '🍝', '🥧', '🍦', '🍧', '🍨', '🍩', '🍪', '🎂', '🍰', '🧁', '🍫', '🍬', '🍭', '🍡', '🍮', '🍯', '🍊', '🍋', '🍋‍🟩', '🍌', '🍍', '🥭', '🍎', '🍏', '🍉', '🍓', '🍒', '🍑', '🫐', '🍅', '🥕', '🫛', '🧃', '☕', '🫖', '🍵', '🍼', '🥛', '🍶']
  const animals = ['🐵', '🐶', '🐺', '🐱', '🦁', '🐯', '🦒', '🦊', '🦝', '🐮', '🐷', '🐗', '🐭', '🐹', '🐰', '🐻', '🐻‍❄️', '🐨', '🐼', '🐸', '🦓', '🐴', '🫎', '🫏', '🦄', '🐔', '🐲', '🐽', '🐒', '🦍', '🦧', '🦮', '🐕‍🦺', '🐩','🐕', '🐈', '🐈‍⬛', '🐅', '🐆', '🐎', '🦌', '🦬', '🦏', '🦛', '🐂', '🐃', '🐄', '🐖', '🐏', '🐑', '🐐', '🐪', '🐫', '🦙', '🦘', '🦥', '🦨', '🦡', '🐘', '🦣', '🐁', '🐀', '🦔', '🐇', '🐿️', '🦫', '🐉', '🐢', '🦈', '🐬', '🦭', '🐳', '🦑', '🐓', '🦆', '🦃', '🦉', '🐦‍🔥', '🦤', '🐧']
  const random = [...transportation, ...foodAndDrinks, ...animals]

  const createCardSet = (emojiArray, level) => {
    const emojiSelected = new Set();

    // Keep adding random emojis to the Set until we reach the desired `level`
    while (emojiSelected.size < level) {
    const randomIndex = Math.floor(Math.random() * emojiArray.length);
    emojiSelected.add(emojiArray[randomIndex]);
    }
    
    const cards = [...emojiSelected, ...emojiSelected];
    for (let i = cards.length - 1; i > 0; i--) {
      // Pick a random index from 0 to i
      const j = Math.floor(Math.random() * (i + 1));
      // Swap elements at indices i and j
      [cards[i], cards[j]] = [cards[j], cards[i]];
    }
    return cards.map((value) => ({
      id: uuidv4(),
      value,
      flipped: true,
      matched: false
    }));
  };



  const [buttonShow, setButtonShow] = useState(true);
  const [gameStart, setGameStart] = useState(false);
  const [flippedCards, setFlippedCards] = useState([]);
  const [disabled, setDisabled] = useState(true);
  const [moves, setMoves] = useState(0);
  const [nonMatch, setNonMatch] = useState(false);
  const [gameOver, setGameOver] = useState(false)
  const [theme, setTheme] = useState(transportation)
  const [level, setLevel] = useState(10)
  const [cards, setCards] = useState(createCardSet(theme, level));
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedLevel, setSelectedLevel] = useState(null);

  
  useEffect(() => {
    setCards(createCardSet(theme, level));
  }, [theme, level]);


  const startGame = () => {
    setButtonShow(!buttonShow)
    setGameStart(true);
    setFlippedCards([]);
    setMoves(0);

    // Show all cards for 3 seconds, then flip back and enable clicking
    setTimeout(() => {
      setCards((prevCards) =>
        prevCards.map((card) => ({ ...card, flipped: false }))
      );
      setDisabled(false); // Enable clicking after initial flip
    }, 3000); // Wait 3 seconds before flipping back
  }

  const handleCardClick = (card) => {
    if (disabled || card.flipped || card.matched) return;

    const newCards = cards.map((c) =>
      c.id === card.id ? { ...c, flipped: true } : c
    );
    setCards(newCards);

    const newFlippedCards = [...flippedCards, card];

    if (newFlippedCards.length === 2) {
      setDisabled(true);
      setTimeout(() => checkForMatch(newCards, newFlippedCards), 1000);
    }
    setFlippedCards(newFlippedCards);
    
  };

  const checkForMatch = (newCards, flippedCards) => {
    const [firstCard, secondCard] = flippedCards;

    if (firstCard.value === secondCard.value) {
      const updatedCards = newCards.map((card) =>
        card.value === firstCard.value ? { ...card, matched: true } : card
      );
      setCards(updatedCards);
    } else {
      setNonMatch(true);
      setTimeout(() => {
        const resetCards = newCards.map((card) =>
          card.flipped && !card.matched ? { ...card, flipped: false } : card
        );
      setCards(resetCards);
      setNonMatch(false);
      }, 1000);
    }
   
    setFlippedCards([]);
    setMoves((prev) => prev + 1);
    setTimeout(() => setDisabled(false), 800)
    //wait 1 second before allowing user to click other cards after 2 cards just flipped 
  };


  useEffect(()=> {
    //the every() method executes a function for each array element, every() method returns true if the function returns true for all elements, and returns false if the function return false for one element.
    if (gameStart && cards.every(card => card.matched)) {
      setTimeout(() => {
        setGameOver(true)
        setGameStart(false)
      }, 1000)
    } //every() method returns true if all cards in the cards array property is set to matched.
  }, [cards, gameStart, moves])
  //useEffect dependencies is an array of values that the effect depends on, if one of these values changes between renders, React will re-run the effect.

  const replayGame = () => {
    setButtonShow(true);
    setGameOver(false);
    setGameStart(false);
    setMoves(0);
  };




  return (
    <div className="App">
      {buttonShow && 
      <section className="themeAndDifficulty">
        <div className="flipCardContainer">
        <div className="flipCardAnimation">
          <div className="flipCardInner">
            <div className="flipCardFront"></div>
            <div className="flipCardBack">💖</div>
          </div>
        </div>
        <div className="flipCardAnimation">
          <div className="flipCardInner">
            <div className="flipCardFront"></div>
            <div className="flipCardBack">💖</div>
          </div>
        </div>
        </div>
        <h1>flip the cards to find matching pairs</h1>
        <p>Select Theme     {selectedTheme}</p>
        <div className="themeButtons">
          <button onClick={() => {setTheme(transportation); setSelectedTheme('vehicle');}} className={selectedTheme === "vehicle"? "active": ""}>vehicle 🚲</button>
          <button onClick={() => {setTheme(foodAndDrinks); setSelectedTheme("foodAndDrinks")}} className={selectedTheme === "foodAndDrinks"? "active": ""}>food & drinks 🍜</button>
          <button onClick={() => {setTheme(animals); setSelectedTheme("animals")}} className={selectedTheme=== "animals" ? "active" : ""}>animals 😽</button>
          <button onClick={() => {setTheme(random); setSelectedTheme("random")}} className={selectedTheme=== "random" ? "active" : ""}>random 🙈</button>
        </div>
        <p>Select level of difficulty     {selectedLevel}</p>
        <div className="levelButtons">
          <button onClick={() => {setLevel(2); setSelectedLevel("easy peasy")}} className={selectedLevel=== "easy peasy" ? "active": ""}>easy peasy 🫛</button>
          <button onClick={() => {setLevel(8); setSelectedLevel("so normal")}} className= {selectedLevel === "so normal"? "active": ""}>so normal 😌💁🏼‍♂️</button>
          <button onClick={() => {setLevel(50); setSelectedLevel("insanity")}} className={selectedLevel === "insanity"? "active": ""}>insanity 🥲</button>
        </div>
        <button className="startButton" onClick={startGame}>Start Game</button>
      </section>}
      { gameStart && 
      <div className="flip-card-container" style={{gridTemplateColumns: `repeat(${Math.sqrt(level*2)}, 1fr)`}}>
            {cards.map((card) => (
              <div
                className={`flip-card ${card.flipped ? 'flipped' : ''}`}
                key={card.id}
                onClick={() => handleCardClick(card)}
              >
                <div className="flip-card-inner">
                  <div className="flip-card-front"></div>
                  <div className={`flip-card-back ${nonMatch && !card.matched ? 'non-match' : ''}`}>
                    <h3>{card.value}</h3>
                  </div>
                </div>
              </div>
            ))}
          </div>
          }
        { 
        }
        {gameOver && 
        <div className="replay fade-in">
        <div className="winningMessage">🥳 You won the game in {moves} moves 🙌🏼</div>
        <div><button className="replayButton" onClick={replayGame}>Replay</button></div>
        </div>
        }
    </div>
  );
}

export default App;
