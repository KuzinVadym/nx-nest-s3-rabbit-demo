import { Form } from './components/Form';

export default async function Index() {
    const action = async (formData: FormData) => {
        'use server';

        const name = formData.get('name');
        const description = formData.get('description');

        // Call API here
    };

    return (
        <main className="bg-slate-100 px-8 py-5 min-w-[300px] max-w-[600px] w-full rounded-md border border-solid border-slate-200">
            <Form action={action} />
        </main>
    );
}
