


export default function CustomButton({ content, classname, isDisabled, handleButtonClick,  }) {
    return (
        <button onClick={handleButtonClick} disabled={isDisabled} type="button" className={`${classname} h-10 font-bold rounded-md text-sm`} style={{cursor: isDisabled ? 'not-allowed':'pointer'}}>
            {content}
        </button>
    )
}