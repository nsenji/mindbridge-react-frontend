


export default function CustomButton({ content, classname }) {
    return (
        <button type="button" className={`${classname} h-10 font-bold rounded-md text-sm`}>
            {content}
        </button>
    )
}