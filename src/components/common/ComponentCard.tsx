import { PlusIcon } from "../../icons";
import { twMerge } from "tailwind-merge";

interface ComponentCardProps {
  title: string;
  children: React.ReactNode;
  className?: string; // Additional custom classes for styling
  desc?: string; // Description text
  addText?: string;
  handleAddRecord?: () => void
}

const ComponentCard: React.FC<ComponentCardProps> = ({
  title,
  children,
  className = "",
  desc = "",
  addText,
  handleAddRecord
}) => {
  return (
    <div
      className={`rounded-2xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-white/[0.03] ${className}`}
    >
      {/* Card Header */}
      <div className='flex flex-row items-center w-full justify-between px-6'>
        <div className="py-5">
          <h3 className="text-base font-medium text-gray-800 dark:text-white/90">
            {title}
          </h3>
          {desc && (
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              {desc}
            </p>
          )}
        </div>
        <div onClick={handleAddRecord} className='flex flex-row items-center gap-2 cursor-pointer hover:bg-gray-100 hover:dark:bg-gray-800 px-2 py-1 rounded-[5px]'>
          <p className='text-base font-medium text-gray-800 dark:text-white/90'>{addText}</p>
          <PlusIcon />
        </div>
      </div>
      {/* Card Body */}
      <div className="p-4 border-t border-gray-100 dark:border-gray-800 sm:p-6">
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  );
};

export default ComponentCard;
