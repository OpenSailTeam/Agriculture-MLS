import React from 'react';
import { Popover, PopoverButton, PopoverPanel } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';

interface FilterPopoverProps {
  label: string;
  hasChanges: boolean;
  children: React.ReactNode;
}

export const FilterPopover: React.FC<FilterPopoverProps> = ({ label, hasChanges, children }) => {
  return (
    <Popover className="relative">
      <PopoverButton className="inline-flex w-full h-full justify-center items-center gap-x-1.5 rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-600 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
        {label}
        {hasChanges && <span className="w-2 h-2 rounded-full bg-blue-500 inline-block ml-2"></span>}
        <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-600" aria-hidden="true" />
      </PopoverButton>
      <PopoverPanel className="min-w-[280px] absolute z-30 mt-2 bg-white border border-solid border-gray-300 rounded shadow-lg">
        {children}
        <div className="p-4">
          <PopoverButton as="button" className="w-full text-white end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 font-semibold rounded-lg text-md px-6 py-3">
            View results
          </PopoverButton>
        </div>
      </PopoverPanel>
    </Popover>
  );
};
