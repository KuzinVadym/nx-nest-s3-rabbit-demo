'use client';

import type { FormEvent } from 'react';
import { useState, useRef } from 'react';

import { Input } from './Input';

type FormProps = {
    action: (formData: FormData) => void;
};

export const Form = ({ action }: FormProps) => {
    const [isSubmitted, setIsSubmitted] = useState(false);
    const formRef = useRef<HTMLFormElement>(null);

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        const { currentTarget } = event;

        setIsSubmitted(true);

        if (!currentTarget.checkValidity()) {
            event.preventDefault();
        }
    };
    return (
        <form
            className="flex flex-col justify-center gap-y-5"
            onSubmit={onSubmit}
            action={async (formData: FormData) => {
                await action(formData);

                formRef?.current?.reset();
                setIsSubmitted(false);
            }}
            ref={formRef}
            noValidate
        >
            <Input
                label="Name"
                name="name"
                required
                shouldValidate={isSubmitted}
            />
            <Input
                label="Description"
                name="description"
                mutliLine
                required
                shouldValidate={isSubmitted}
            />
            <button
                type="submit"
                className="self-start bg-blue-800 p-2 rounded text-sky-100"
            >
                Create
            </button>
        </form>
    );
};
