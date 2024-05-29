import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface FilterPopoverProps {
  label: string;
  onApply: () => void;
  children: React.ReactNode;
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({ label, onApply, children }) => {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        {label}
        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-600" aria-hidden="true" />
      </PopoverButton>
      <PopoverPanel className="absolute z-30 mt-2 bg-white border border-solid border-gray-300 rounded shadow-lg">
        {children}
        <div className="p-4">
        <PopoverButton as="button" onClick={onApply} className="w-full p-3 bg-blue-500 font-bold text-white rounded shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-blue-600">
          Apply
        </PopoverButton>
        </div>
      </PopoverPanel>
    </Popover>
  );
};
