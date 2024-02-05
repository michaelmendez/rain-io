import { FunctionComponent } from 'react';

interface InputProps {
  placeholder: string;
  type: any;
  children: any;
  onChange?: any;
}

const Input: FunctionComponent<InputProps> = ({
  placeholder,
  type,
  children,
  onChange = null,
}) => {
  return (
    <div className="relative text-gray-400 focus-within:text-gray-200 w-full mr-5">
      <span className="absolute inset-y-0 left-0 flex items-center pl-2">
        <div className="p-1 focus:outline-none focus:shadow-outline">
          {children}
        </div>
      </span>
      <input
        className="py-3 pl-10 text-sm border-gray-400 placeholder:text-gray-400 font-semibold bg-transparent border-2 focus:outline-none focus:placeholder:text-gray-200 focus:border-gray-200 w-full"
        type={type}
        placeholder={placeholder}
        onChange={onChange}
      />
    </div>
  );
};

export default Input;
