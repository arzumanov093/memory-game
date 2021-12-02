import './Card.css';

export const Card = ({card, handleChoice, flipped, disabled}) => {

    const handleClick = () => {
        if (!disabled) {
            handleChoice(card)
        }
        
    }

    return(
        <div className='card'>
            <div className={flipped ? "flipped" : ""}>
                <img 
                    className='front' 
                    src={card.src} 
                    alt='card front'
                />
                <img 
                    className='back' 
                    // src='/img/cover.png'
                    src='https://www.infosasa.com/wp-content/uploads/2015/12/premier_league_new_logo.jpg'
                    alt='card back'
                    onClick={handleClick}
                />
            </div>
        </div>
    )
}