import { Transition } from "@headlessui/react";
import * as DialogPrimitive from "@radix-ui/react-dialog";

import { clsx } from "clsx";
import React, { Fragment, useState } from "react";
import ProductForm from "./product-form";

const CreateProductModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <DialogPrimitive.Root open={isOpen} onOpenChange={setIsOpen}>
      <DialogPrimitive.Trigger asChild>
        <button
          type="button"
          className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
        >
          Create Product
        </button>
      </DialogPrimitive.Trigger>
      <DialogPrimitive.Portal forceMount>
        <Transition.Root show={isOpen}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <DialogPrimitive.Overlay
              forceMount
              className="fixed inset-0 z-20 bg-black/50"
            />
          </Transition.Child>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0 scale-95"
            enterTo="opacity-100 scale-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100 scale-100"
            leaveTo="opacity-0 scale-95"
          >
            <DialogPrimitive.Content
              forceMount
              className={clsx(
                "fixed z-50",
                "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
                "left-[50%] top-[50%] -translate-x-[50%] -translate-y-[50%]",
                "bg-white dark:bg-gray-800",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
            >
              <DialogPrimitive.Title className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Create Product
              </DialogPrimitive.Title>
              <DialogPrimitive.Description className="mt-2 text-sm font-normal text-gray-700 dark:text-gray-400">
                <ProductForm />
              </DialogPrimitive.Description>

              <div className="mt-4 flex justify-end">
                <DialogPrimitive.Close
                  className={clsx(
                    "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                    "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600",
                    "border border-transparent",
                    "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
                  )}
                >
                  close
                </DialogPrimitive.Close>
              </div>
            </DialogPrimitive.Content>
          </Transition.Child>
        </Transition.Root>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
};

export { CreateProductModal };
