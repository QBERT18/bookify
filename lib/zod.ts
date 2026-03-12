import * as z from "zod";

export const formSchema = z.object({
    title: z.string().min(1, "Title is required"),
    author: z.string().min(1, "Author name is required"),
    pdf: z.instanceof(File, { message: "PDF file is required" }),
    coverImage: z.instanceof(File).optional(),
    voice: z.string().min(1, "Please select a voice"),
});

export type FormValues = z.infer<typeof formSchema>;
