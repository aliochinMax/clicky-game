import React, { useState } from 'react';
import Card from './Card'; // Assuming you have a Card component, adjust the path as needed
import Modal from 'react-bootstrap/Modal'; // Import Bootstrap Modal component
import Button from 'react-bootstrap/Button'; // Import Bootstrap Button component

const CardGallery = ({ characters, onScoreChange }) => {
  // Access the characters array from the JSON object
  const charactersArray = characters && characters.characters ? characters.characters : [];

  // State to keep track of the shuffled characters
  const [shuffledCharacters, setShuffledCharacters] = useState([...charactersArray]);

  // State to track clicked cards
  const [clickedCards, setClickedCards] = useState([]);



  // State for modal visibility
  const [showModal, setShowModal] = useState(false);

  // Function to shuffle the characters array
  const shuffleCharacters = () => {
    const shuffled = [...charactersArray];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    setShuffledCharacters(shuffled);
  };

  // Click handler for the individual card
  const handleCardClick = (character) => {
    if (clickedCards.includes(character.id)) {
      // Card has already been clicked, reset the score and shuffle characters
      onScoreChange("End");
      shuffleCharacters();
      setClickedCards([]);
      setShowModal(true);
    } else {
      // Card has not been clicked, increment the score and update clickedCards
      onScoreChange(1);
      shuffleCharacters();
      setClickedCards((prevClickedCards) => [...prevClickedCards, character.id]);
    }
  };

  // Function to close the modal
  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <div className="container">
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {shuffledCharacters.map((character) => (
          <div key={character.id} className="col">
            <div onClick={() => handleCardClick(character)}>
              <Card {...character} />
            </div>
          </div>
        ))}
      </div>

      {/* Modal to display "Oops clicked already" message */}
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Oops!</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>You've already clicked a card. Game reset!</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={handleCloseModal}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>

    
    </div>
  );
};

export default CardGallery;