// InputField Component
function InputField({
  label,
  type = "text",
  value = "",
  placeholder = "",
  isDisabled = false,
}) {
  return (
    <div>
      <label className="text-sm text-gray-500 block mb-1">{label}</label>
      <input
        type={type}
        defaultValue={value}
        placeholder={placeholder}
        disabled={isDisabled}
        className="w-full px-4 py-3 text-sm rounded-full bg-gray-100 focus:outline-none"
      />
    </div>
  );
}

export default InputField;
