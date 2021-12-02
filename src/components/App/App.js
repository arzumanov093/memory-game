import { useEffect, useState } from 'react';
import { Card } from '../Card/Card';
import './App.css';

// const cardImages = [
//   {"src": "/img/arsenal.png", matched: false},
//   {"src": "/img/chelsea.png", matched: false},
//   {"src": "/img/everton.png", matched: false},
//   {"src": "/img/leicester.png", matched: false},
//   {"src": "/img/liverpool.png", matched: false},
//   {"src": "/img/mc.png", matched: false},
//   {"src": "/img/mu.png", matched: false},
//   {"src": "/img/spurs.png", matched: false}
// ];

const cardImages = [
  {"src": "https://leadersinsport.com/wp-content/uploads/2020/09/arsenal-logo-symbol-arsenal-stl-model-grb-stl-arsenal-21.png", matched: false},
  {"src": "http://2.bp.blogspot.com/-YrdKwVC7hKY/UIquaZydGsI/AAAAAAAAAWk/Ay5KCQSsUiM/s1600/Logo+Chelsea+FC.png", matched: false},
  {"src": "https://pixy.org/src/87/878799.png", matched: false},
  {"src": "https://toplogos.ru/images/logo-leicester-city-fc.png", matched: false},
  {"src": "https://w7.pngwing.com/pngs/151/663/png-transparent-liver-pool-football-club-logo-anfield-liverpool-f-c-everton-f-c-dream-league-soccer-2010-11-premier-league-liverpool-fc-thumbnail.png", matched: false},
  {"src": "https://w1.pngwing.com/pngs/203/356/png-transparent-premier-league-logo-manchester-manchester-city-fc-organization-line-area-circle-symbol.png", matched: false},
  {"src": "https://clipart-best.com/img/manchester_united/manchester_united-clip-art-5.png", matched: false},
  {"src": "https://w7.pngwing.com/pngs/863/950/png-transparent-tottenham-hotspur-f-c-fa-cup-ossie-s-dream-premier-league-football-premier-league.png", matched: false}
];

function App() {

  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [choiceOne, setChoiceOne] = useState(null);
  const [choiceTwo, setChoiceTwo] = useState(null);
  const [disabled, setDisabled] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({...card, id: Math.random()}))

    setChoiceOne(null);
    setChoiceTwo(null);
    setCards(shuffledCards);
    setTurns(0)
  }

  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if (choiceOne && choiceTwo) {
      setDisabled(true);

      if (choiceOne.src === choiceTwo.src) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if (card.src === choiceOne.src) {
              return {...card, matched: true}
            } else {
              return card
            }
          })
        })
        resetTurn()
      } else {
       setTimeout(() =>  resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  console.log(cards)

  const resetTurn = () => {
    setChoiceOne(null);
    setChoiceTwo(null);
    setTurns(prevTurns => prevTurns + 1);
    setDisabled(false);
  }

  useEffect(() => {
    shuffleCards()
  }, [])

  return (
    <div className="App">
      <button className='btn' onClick={shuffleCards}>новая игра</button>

      <div className='cards-wrapper'>
        {cards.map(card => (
          <Card 
            key={card.id} 
            card={card}
            handleChoice={handleChoice}
            flipped={card === choiceOne || card === choiceTwo || card.matched}
            disabled={disabled}
          />
        ))}
      </div>
      <p className='text'>Сделано ходов: {turns}</p>
    </div>
  );
}

export default App;

