export function RenderQuizModal (props: QuizModalProps) {
  const { content, isCorrect, userAnswer, checkAnswer } = props;

  return(
    <div className='flex flex-col items-center'>
      {content}
      {!isCorrect ? <input className='mt-2 pl-2 bg-gray-100 rounded border font-normal' ref={userAnswer}/> : null}
      <button
        onClick={checkAnswer}
        className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
      >
        {!isCorrect ? 'Check': 'Okay'} 
      </button>
    </div>

    
  )
}

export function RenderClickModal (props: ClickModalProps) {
  const { content, showNextItem } = props;

    return(
      <div className='flex flex-col items-center'>
        {content}
        <button
          onClick={showNextItem}
          className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
        >
          Okay
        </button>
      </div>
    )
}

export function RenderPrerequisiteModal (props: PrerequisiteModalProps) {
  const { content, checkPrerequisite } = props;
  
    return(
      <div className='flex flex-col items-center'>
        {content}
        <button
          onClick={checkPrerequisite}
          className='bg-blue-500 text-white mt-4 px-2 py-1 rounded'
        >
          Okay
        </button>
      </div>
    )
}