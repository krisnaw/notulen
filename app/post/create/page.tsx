'use client';
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {Button} from "@/components/ui/button";
import {SubmitHandler, useForm, useFormState} from "react-hook-form"
import {z} from "zod";
import {zodResolver} from "@hookform/resolvers/zod";
import {useFormStatus} from "react-dom"
import {useState} from "react";

type FormInputs = {
    title: string;
    content: string;
}

type InputType = z.input<typeof schema>;
type OutputType = z.output<typeof schema>;

const schema = z.object({
    title: z.string().min(1),
    content: z.string().min(1)
})

export default function Page() {

    const [loading, setLoading] = useState<boolean>(false)

    const {
        register,
        handleSubmit,
        setError,
        formState: {errors, isLoading}
    } = useForm<InputType, any, OutputType>({
        resolver: zodResolver(schema),
        defaultValues: {
            title: "",
            content: ""
        }
    });


    const onSubmit: SubmitHandler<OutputType> = async (data: FormInputs) => {

        setLoading(true)

        try {
            const responses = fetch("/api/article/", {
                method: "POST",
                body: JSON.stringify(data)
            })

        } catch (err) {
            console.log(err);
        }

        setLoading(false)
    }

    const {pending} = useFormStatus()

    return (
        <div>
            <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">
                Create new article
            </h4>
            <div className="mt-4">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 gap-4">
                        <div>
                            <Input autoFocus
                                   {...register('title')}
                                   name="title" type="text" placeholder="Title"/>

                            <p className="text-sm text-muted-foreground mt-2">
                                {errors.title && <p>{errors.title.message}</p>}
                            </p>
                        </div>

                        <div>
                            <Textarea
                                {...register('content')}
                                name="content" placeholder="Description"/>
                            <p className="text-sm text-muted-foreground mt-2">
                                {errors.content && <p>{errors.content.message}</p>}
                            </p>
                        </div>

                        <div>
                            <Button type="submit" disabled={loading}>
                                {loading ? "Creating..." : "Save"}
                            </Button>
                        </div>
                    </div>
                </form>
            </div>


        </div>
    )
}