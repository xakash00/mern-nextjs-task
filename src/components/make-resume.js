import React, { useState } from 'react'
import { useFieldArray, Controller, useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { FloatingInput, FloatingTextArrea } from './floatingInput'
const MakeResume = (props) => {
    const { uploadResume } = props
    const [step, setStep] = useState(1)
    const { handleSubmit, watch, register, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            full_name: "",
            email: "",
            phone: "",
            address: "",
            linked_in: "",
            github_id: "",
            professional_summary: "",
            education_history: [
                { institute: "", year: "", gpa: "", major: "" }
            ],
            employment_history: [
                { company_name: "", duration: "", role: "", description: "" }
            ],
            skills: [],
            languages: [],
            projects: [
                { name: "", description: "" }
            ]
        }
    })

    const { fields: education_history_fields, append: education_history_append, remove: education_history_remove, } = useFieldArray({
        control,
        name: "education_history",
    });
    const { fields: employment_history_fields, append: employment_history_append, remove: employment_history_remove, } = useFieldArray({
        control,
        name: "employment_history",
    });
    const { fields: projects_fields, append: projects_append, remove: projects_remove, } = useFieldArray({
        control,
        name: "projects",
    });

    const onSubmit = (data) => {
        if (step < 5) {
            setStep(p => p + 1)
        } else {
            uploadResume(data)
        }
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col m-auto p-[16px] rounded-[8px]  justify-center items-center max-w-[900px] w-full'>
                    <div className={`w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]`}>
                        <FloatingInput label="Enter a Title" register={register("document_name")} />
                        <div className='flex items-center gap-[16px]'>
                            <FloatingInput label="Full Name" register={register("full_name")} />
                            <FloatingInput label="E-mail" register={register("email")} />
                        </div>
                        <div className='flex w-full items-center gap-[16px]'>
                            <FloatingInput label="Phone Number" register={register("phone")} />
                            <FloatingInput label="Your Linkedin" register={register("linked_in")} />
                        </div>
                        <FloatingInput label="Nationality" register={register("address")} />
                        <FloatingTextArrea label="Professional Summary" register={register("professional_summary")} />
                    </div>
                    <>
                        <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Add Education Details</div>
                        <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                            {
                                education_history_fields.map((item, index) => {
                                    return (
                                        <div key={index} className='flex w-full flex-col items-center '>
                                            <FloatingInput label="Institute Name" register={register(`education_history.${index}.institute`)} />
                                            <div className='flex items-center w-full gap-[16px]'>
                                                <FloatingInput label="Graduation Year" register={register(`education_history.${index}.year`)} />
                                                <FloatingInput label="GPA/Percentage" register={register(`education_history.${index}.gpa`)} />
                                                <FloatingInput label="Major" register={register(`education_history.${index}.major`)} />
                                            </div>
                                        </div>
                                    )
                                })
                            }
                            <div className='flex w-full item-center justify-between'>
                                <button type="button" onClick={() => education_history_append({ institute: "", year: "", gpa: "", major: "" })} className='w-full text-left'>+ Add More</button>
                                <button type="button" onClick={() => education_history_remove({ institute: "", year: "", gpa: "", major: "" })} className='w-full text-right'>Delete</button>
                            </div>
                        </div>
                    </>
                    <>
                        <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Add Employment Details</div>
                        <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                            {
                                employment_history_fields.map((item, index) => {
                                    return (
                                        <div key={index} className='flex w-full flex-col items-center '>
                                            <FloatingInput label="Company Name" register={register(`employment_history.${index}.company_name`)} />
                                            <div className='flex items-center w-full gap-[16px]'>
                                                <FloatingInput label="Duration" register={register(`employment_history.${index}.duration`)} />
                                                <FloatingInput label="Role" register={register(`employment_history.${index}.role`)} />
                                            </div>
                                            <FloatingTextArrea label="Description" register={register(`employment_history.${index}.description`)} />
                                        </div>
                                    )
                                })
                            }
                            <div className='flex w-full item-center justify-between'>
                                <button type="button" onClick={() => employment_history_append({ company_name: "", duration: "", role: "", description: "" })} className='w-full text-left'>+ Add More</button>
                                <button type="button" onClick={() => employment_history_remove({ company_name: "", duration: "", role: "", description: "" })} className='w-full text-right'>Delete</button>
                            </div>
                        </div>
                    </>
                    <>
                        <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Add Your Projects</div>
                        <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                            {
                                projects_fields.map((item, index) => {
                                    return (
                                        <div key={index} className='flex w-full flex-col items-center '>
                                            <FloatingInput label="Project Name" register={register(`projects.${index}.name`)} />
                                            <FloatingTextArrea label="Description" register={register(`projects.${index}.description`)} />
                                        </div>
                                    )
                                })
                            }
                            <div className='flex w-full item-center justify-between'>
                                <button type="button" onClick={() => projects_append({ name: "", description: "" })} className='w-full text-left'>+ Add More</button>
                                <button type="button" onClick={() => projects_remove({ name: "", description: "" })} className='w-full text-right'>Delete</button>
                            </div>
                        </div>
                    </>
                    <>
                        <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Skills</div>
                        <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                            <FloatingInput onChange={(e) => {
                                const arr = e.target.value.split(",")
                                setValue("languages", arr)

                            }} label="Add Skills" />
                        </div>
                    </>
                    <>
                        <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Languages</div>
                        <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                            <FloatingInput onChange={(e) => {
                                const arr = e.target.value.split(",")
                                setValue("languages", arr)

                            }} label="Languages" />

                        </div>

                    </>
                    <div className='flex absolute bottom-0 items-center w-full'>
                        <button className='w-full p-[16px] bg-white text-black mt-[16px]' type="submit">{"Submit"}</button>
                    </div>
                </div>
            </form >
        </div >
    )
}

export default MakeResume