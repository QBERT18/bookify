"use client"

import React, { useState } from 'react'
import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Upload, X, FileText, Image as ImageIcon, Loader2 } from "lucide-react"

import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { formSchema, type FormValues } from "@/lib/zod"

const voices = {
    male: [
        { id: "dave", name: "Dave", description: "Deep, authoritative and professional" },
        { id: "daniel", name: "Daniel", description: "Friendly, engaging and energetic" },
        { id: "chris", name: "Chris", description: "Warm, calm and reassuring" },
    ],
    female: [
        { id: "rachel", name: "Rachel", description: "Clear, sophisticated and steady" },
        { id: "sarah", name: "Sarah", description: "Soft, gentle and expressive" },
    ]
}

const UploadForm = () => {
    const [isSubmitting, setIsSubmitting] = useState(false)
    
    const form = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
            author: "",
            voice: "",
        },
    })

    const {
        handleSubmit,
        control,
        watch,
        setValue,
    } = form

    const pdfFile = watch("pdf")
    const coverFile = watch("coverImage")

    const onSubmit = async (values: FormValues) => {
        setIsSubmitting(true)
        console.log(values)
        // Simulate API call
        await new Promise((resolve) => setTimeout(resolve, 3000))
        setIsSubmitting(false)
    }

    return (
        <div className="new-book-wrapper">
            {isSubmitting && (
                <div className="loading-wrapper">
                    <div className="loading-shadow-wrapper auth-shadow">
                        <div className="loading-shadow">
                            <Loader2 className="loading-animation w-16 h-16 text-[#663820]" />
                            <div className="text-center space-y-2">
                                <h2 className="loading-title">Processing Your Book</h2>
                                <p className="subtitle !mt-0">Please wait while we prepare your literary experience</p>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            
            <Form {...form}>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                    
                    {/* PDF Upload */}
                    <FormField
                        control={control}
                        name="pdf"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        {field.value ? (
                                            <div className="upload-dropzone upload-dropzone-uploaded">
                                                <FileText className="upload-dropzone-icon" />
                                                <p className="upload-dropzone-text">{field.value.name}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => setValue("pdf", undefined as any, { shouldValidate: true })}
                                                    className="upload-dropzone-remove absolute top-4 right-4"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div 
                                                className="upload-dropzone border-2 border-dashed border-[#8B7355]/30"
                                                onClick={() => document.getElementById('pdf-input')?.click()}
                                            >
                                                <Upload className="upload-dropzone-icon" />
                                                <p className="upload-dropzone-text">Click to upload PDF</p>
                                                <p className="upload-dropzone-hint">PDF file (max 50MB)</p>
                                                <input
                                                    id="pdf-input"
                                                    type="file"
                                                    accept=".pdf"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0]
                                                        if (file) field.onChange(file)
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Cover Image Upload */}
                    <FormField
                        control={control}
                        name="coverImage"
                        render={({ field }) => (
                            <FormItem>
                                <FormControl>
                                    <div className="relative">
                                        {field.value ? (
                                            <div className="upload-dropzone upload-dropzone-uploaded">
                                                <ImageIcon className="upload-dropzone-icon" />
                                                <p className="upload-dropzone-text">{field.value.name}</p>
                                                <button
                                                    type="button"
                                                    onClick={() => setValue("coverImage", undefined, { shouldValidate: true })}
                                                    className="upload-dropzone-remove absolute top-4 right-4"
                                                >
                                                    <X className="w-5 h-5" />
                                                </button>
                                            </div>
                                        ) : (
                                            <div 
                                                className="upload-dropzone border-2 border-dashed border-[#8B7355]/30"
                                                onClick={() => document.getElementById('cover-input')?.click()}
                                            >
                                                <ImageIcon className="upload-dropzone-icon" />
                                                <p className="upload-dropzone-text">Click to upload cover image</p>
                                                <p className="upload-dropzone-hint">Leave empty to auto-generate from PDF</p>
                                                <input
                                                    id="cover-input"
                                                    type="file"
                                                    accept="image/*"
                                                    className="hidden"
                                                    onChange={(e) => {
                                                        const file = e.target.files?.[0]
                                                        if (file) field.onChange(file)
                                                    }}
                                                />
                                            </div>
                                        )}
                                    </div>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Title Input */}
                    <FormField
                        control={control}
                        name="title"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="form-label">Title</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="ex: Rich Dad Poor Dad" 
                                        className="form-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Author Input */}
                    <FormField
                        control={control}
                        name="author"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="form-label">Author Name</FormLabel>
                                <FormControl>
                                    <Input 
                                        placeholder="ex: Robert Kiyosaki" 
                                        className="form-input"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {/* Voice Selector */}
                    <FormField
                        control={control}
                        name="voice"
                        render={({ field }) => (
                            <FormItem className="space-y-4">
                                <FormLabel className="form-label">Choose Assistant Voice</FormLabel>
                                <FormControl>
                                    <RadioGroup
                                        onValueChange={field.onChange}
                                        value={field.value}
                                        className="space-y-6"
                                    >
                                        <div className="space-y-4">
                                            <p className="text-sm font-semibold text-[#8B7355] uppercase tracking-wider">Male Voices</p>
                                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                                {voices.male.map((voice) => (
                                                    <div key={voice.id} className="relative">
                                                        <RadioGroupItem value={voice.id} id={voice.id} className="sr-only" />
                                                        <Label 
                                                            htmlFor={voice.id}
                                                            className={cn(
                                                                "voice-selector-option flex-col items-start text-left h-full",
                                                                field.value === voice.id ? "voice-selector-option-selected" : "voice-selector-option-default"
                                                            )}
                                                        >
                                                            <span className="font-bold text-lg">{voice.name}</span>
                                                            <span className="text-xs text-[#777] leading-tight">{voice.description}</span>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        <div className="space-y-4">
                                            <p className="text-sm font-semibold text-[#8B7355] uppercase tracking-wider">Female Voices</p>
                                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                                {voices.female.map((voice) => (
                                                    <div key={voice.id} className="relative">
                                                        <RadioGroupItem value={voice.id} id={voice.id} className="sr-only" />
                                                        <Label 
                                                            htmlFor={voice.id}
                                                            className={cn(
                                                                "voice-selector-option flex-col items-start text-left h-full",
                                                                field.value === voice.id ? "voice-selector-option-selected" : "voice-selector-option-default"
                                                            )}
                                                        >
                                                            <span className="font-bold text-lg">{voice.name}</span>
                                                            <span className="text-xs text-[#777] leading-tight">{voice.description}</span>
                                                        </Label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                    </RadioGroup>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit" className="form-btn" disabled={isSubmitting}>
                        {isSubmitting ? "Processing..." : "Begin Synthesis"}
                    </Button>
                </form>
            </Form>
        </div>
    )
}

export default UploadForm
