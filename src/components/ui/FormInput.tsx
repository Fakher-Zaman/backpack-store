import { forwardRef } from 'react';
import { cn } from '@/lib/utils';
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react';

interface BaseInputProps {
    label?: string;
    error?: string;
    className?: string;
}

type InputProps = BaseInputProps & InputHTMLAttributes<HTMLInputElement>;
type TextareaProps = BaseInputProps & TextareaHTMLAttributes<HTMLTextAreaElement>;

const inputClassName = cn(
    'w-full rounded-lg border px-3 py-2 text-sm transition-colors',
    'border-gray-200 bg-white text-gray-900',
    'placeholder:text-gray-400 focus:border-brand-green focus:outline-none focus:ring-1 focus:ring-brand-green',
    'disabled:bg-gray-50 disabled:text-gray-400',
    'dark:border-brand-dark-border dark:bg-brand-dark-surface dark:text-gray-100',
    'dark:placeholder:text-gray-500 dark:disabled:bg-brand-dark-bg'
);

const labelClassName = cn(
    'mb-1 block text-sm font-medium',
    'text-gray-700 dark:text-gray-200'
);

export const FormInput = forwardRef<HTMLInputElement, InputProps>(
    ({ label, error, className, id, ...props }, ref) => {
        const inputId = id || `input-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div>
                {label && (
                    <label htmlFor={inputId} className={labelClassName}>
                        {label}
                    </label>
                )}
                <input
                    ref={ref}
                    id={inputId}
                    className={cn(inputClassName, className)}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

FormInput.displayName = 'FormInput';

export const FormTextarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
    ({ label, error, className, id, ...props }, ref) => {
        const textareaId = id || `textarea-${Math.random().toString(36).substr(2, 9)}`;

        return (
            <div>
                {label && (
                    <label htmlFor={textareaId} className={labelClassName}>
                        {label}
                    </label>
                )}
                <textarea
                    ref={ref}
                    id={textareaId}
                    className={cn(inputClassName, className)}
                    {...props}
                />
                {error && (
                    <p className="mt-1 text-xs text-red-600 dark:text-red-400">
                        {error}
                    </p>
                )}
            </div>
        );
    }
);

FormTextarea.displayName = 'FormTextarea';