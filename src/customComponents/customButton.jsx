export default function CustomButton({
  type,
  isLoading,
  content,
  classname,
  isDisabled,
  handleButtonClick,
}) {
  return (
    <button
      onClick={handleButtonClick}
      disabled={isDisabled}
      type={type == "submit" ? "submit" : "button"}
      className={`${classname} h-10 font-bold rounded-md text-sm`}
      style={{ cursor: isDisabled ? "not-allowed" : "pointer" }}
    >
      {isLoading ? (
        <div className="inline-block h-8 w-8 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
      ) : (
        content
      )}
    </button>
  );
}
