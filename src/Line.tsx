const WORD_LENGTH = 5;
export const Line = ({ guess, solution , isCurrentGuess}: { guess: string, solution: string, isCurrentGuess:boolean }) => {
    const tiles = [];
    const solutionLetterCounts: { [key: string]: number } = {};

  
    for (const letter of solution) {
        solutionLetterCounts[letter] = (solutionLetterCounts[letter] || 0) + 1;
    }
    for (let i = 0; i <   WORD_LENGTH; i++) {  
        if (guess[i] === solution[i] ) {
             solutionLetterCounts[guess[i]]--;     
        }
    }
    for (let i = 0; i < WORD_LENGTH; i++) {
        let cname='tile';
       
   
        const isCorrect = guess[i] === solution[i];
   
        if (isCorrect) {
       
            cname += ' green';
        }
        const restOfTheWord = [...solution.slice(0, i), ...solution.slice(i + 1)];
        const isPresentElsewhere = restOfTheWord.includes(guess[i]);
        if ( isPresentElsewhere && solutionLetterCounts[guess[i]] > 0) { 
            solutionLetterCounts[guess[i]]--
            cname += ' yellow';
        }
        if (guess[i] && !isCurrentGuess ) {
            tiles.push(
                <div className={cname} key={i}>       
                    <p className='letter'> {guess[i]}</p>  
                </div>)           
        } else {
            if (isCurrentGuess) { 
                tiles.push(
                <div className={`tile current`} key={i}>       
                    <p className='letter'> {guess[i]}</p>  
                </div>)  
            }else{
            tiles.push(
                <div className={`tile`} key={i}>       
                    <p className='letter'> {guess[i]}</p>  
                </div>)  
            }
        }
    }
   
  return (
      <div className='line'>
          {tiles}    
      </div>
  )
}
