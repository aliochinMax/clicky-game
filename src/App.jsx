import { useState } from 'react'
import CardGallery from './components/cardGallery'
import cardInfo from './data/cardinfo.json';

const App = () => {
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);

  const handleScoreChange = (change) => {
    if(score+change>highScore){
      setHighScore(score+change);
    }
    if(change !="End"){
      setScore(score + change);
    }
    else{
      setScore(0);
    }
  };

  return (
    <div>
      <h1>Heartstopper Characters Gallery</h1>
      <div className="mt-3">
        <h5>Score: {score}</h5>
        <h5>HighScore: {highScore}</h5>
      </div>
      <CardGallery characters={cardInfo} onScoreChange={handleScoreChange} />
    </div>
  );
};
export default App
