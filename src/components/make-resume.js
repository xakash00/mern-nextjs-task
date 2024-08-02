import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useFieldArray, Controller, useForm } from 'react-hook-form'
import CreatableSelect from 'react-select/creatable'
import { FloatingInput, FloatingTextArrea } from './floatingInput'
import { goBack, nextStep, updateFormData } from 'components/redux/slices/formReducer'
import { selectStyles } from 'components/helperFuncs'
const MakeResume = (props) => {
    const { uploadResume } = props;
    const dispatch = useDispatch();
    const { formData, step } = useSelector(store => store.form);
    const { handleSubmit, watch, register, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            document_name: "",
            full_name: "",
            email: "",
            phone: "",
            address: "",
            linked_in: "",
            github_id: "",
            professional_summary: "",
            // education_history: [
            //     { institute: "", year: "", gpa: "", major: "" }
            // ],
            // skills: [],
            // languages: [],
            // projects: [
            //     { name: "", description: "" }
            // ]
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
        dispatch(updateFormData(data))
        dispatch(nextStep())
    }
    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='flex flex-col m-auto p-[16px] rounded-[8px]  justify-center items-center max-w-[900px] w-full'>
                    <div className={`${step === 1 ? "block" : "hidden"} w-full p-[24px] relative bg-white border-[1px] border-boundary rounded-[8px]`}>
                        <FloatingInput error={true} label="Enter a Title" register={register("document_name")} name='document_name' />
                        <div className='flex items-center gap-[16px]'>
                            <FloatingInput label="Full Name" register={register("full_name")} name={"full_name"} />
                            <FloatingInput label="E-mail" register={register("email")} name="email" />
                        </div>
                        <div className='flex w-full items-center gap-[16px]'>
                            <FloatingInput label="Phone Number" register={register("phone")} name="phone" />
                            <FloatingInput label="Your Linkedin" register={register("linked_in")} name="linked_in" />
                        </div>
                        <FloatingInput label="Nationality" register={register("address")} name="address" />
                        <FloatingTextArrea label="Professional Summary" register={register("professional_summary")} name="professional_summary" />
                        <div className='flex absolute bottom-0 items-center w-full'>
                            <button className='w-full p-[16px] bg-white text-black mt-[16px]' type="submit">{"Next"}</button>
                        </div>
                    </div>

                    {/* <>
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
                    </> */}
                    {/* <>
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

                    </> */}

                </div>
            </form >
            <div className={`${step === 2 ? "block" : "hidden"} w-full`}>
                <EmploymentDetails />
            </div>
            <div className={`${step === 3 ? "block" : "hidden"} w-full`}>
                <EducationDetails />
            </div>
            <div className={`${step === 4 ? "block" : "hidden"} w-full`}>
                <Projects />
            </div>
            <div className={`${step === 5 ? "block" : "hidden"} w-full`}>
                <LanguageAndSkills />
            </div>
        </div >
    )
}

export default MakeResume



const EmploymentDetails = () => {
    const dispatch = useDispatch();
    const { formData } = useSelector(store => store.form);
    const { handleSubmit, watch, register, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            employment_history: [
                { company_name: "", duration: "", role: "", description: "" }
            ],
        }
    })
    const { fields: employment_history_fields, append: employment_history_append, remove: employment_history_remove, } = useFieldArray({
        control,
        name: "employment_history",
    });

    const onSubmit = (data) => {
        dispatch(updateFormData({ ...formData, ...data }))
        dispatch(nextStep())
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Add Employment Details</div>
            <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                {
                    employment_history_fields.map((item, index) => {
                        return (
                            <div key={index} className={`flex w-full flex-col items-center ${index !== 0 ? "pt-[40px]" : "pt-[0px]"}`}>
                                {employment_history_fields?.length > 1 && <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left pb-[10px]'>#{index + 1}</div>}
                                <FloatingInput label="Company Name" register={register(`employment_history.${index}.company_name`)} name={`employment_history.${index}.company_name`} />
                                <div className='flex items-center w-full gap-[16px]'>
                                    <FloatingInput label="Duration" register={register(`employment_history.${index}.duration`)} name={`employment_history.${index}.duration`} />
                                    <FloatingInput label="Role" register={register(`employment_history.${index}.role`)} name={`employment_history.${index}.role`} />
                                </div>
                                <FloatingTextArrea label="Description" register={register(`employment_history.${index}.description`)} name={`employment_history.${index}.description`} />
                            </div>
                        )
                    })
                }
                <div className='flex w-full item-center justify-between pt-[16px]'>
                    <button type="button" onClick={() => employment_history_append({ company_name: "", duration: "", role: "", description: "" })} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px]  bg-primary text-white  text-left'>+ Add More</button>
                    <button type="button" onClick={() => employment_history_remove({ company_name: "", duration: "", role: "", description: "" })} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px] bg-primary  text-white text-right'>Delete</button>
                </div>
            </div>
            <div className='flex sticky bottom-0 items-center '>
                <button className='w-full p-[16px] bg-[white] text-black mt-[16px]' type="button" onClick={() => { dispatch(goBack()) }} >{"Back"}</button>
                <button className='w-full p-[16px] bg-[white] text-black mt-[16px]' type="submit">{"Next"}</button>
            </div>
        </form>
    )
}


const EducationDetails = () => {
    const dispatch = useDispatch();
    const { formData } = useSelector(store => store.form);
    const { handleSubmit, watch, register, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            education_history: [
                { institute: "", year: "", gpa: "", major: "" }
            ],
        }
    })
    const { fields: education_history_fields, append: education_history_append, remove: education_history_remove, } = useFieldArray({
        control,
        name: "education_history",
    });

    const onSubmit = (data) => {
        dispatch(updateFormData({ ...formData, ...data }))
        dispatch(nextStep())
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}><div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Add Education Details</div>
            <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                {
                    education_history_fields.map((item, index) => {
                        return (
                            <div key={index} className={`flex w-full flex-col items-center ${index !== 0 ? "pt-[40px]" : "pt-[0px]"}`}>
                                {education_history_fields?.length > 1 && <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left pb-[10px]'>#{index + 1}</div>}
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
                    <button type="button" onClick={() => education_history_append({ institute: "", year: "", gpa: "", major: "" })} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px]  bg-primary text-white  text-left'>+ Add More</button>
                    <button type="button" onClick={() => education_history_remove({ institute: "", year: "", gpa: "", major: "" })} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px]  bg-primary text-white  text-right'>Delete</button>
                </div>
            </div>
            <div className='flex sticky bottom-0 items-center '>
                <button className='w-full p-[16px] bg-[white] text-black mt-[16px]' type="button" onClick={() => { dispatch(goBack()) }} >{"Back"}</button>
                <button className='w-full p-[16px] bg-[white] text-black mt-[16px]' type="submit">{"Next"}</button>
            </div>
        </form>
    )
}

const Projects = () => {
    const dispatch = useDispatch();
    const { formData } = useSelector(store => store.form);
    const { handleSubmit, watch, register, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            projects: [
                { name: "", description: "" }
            ]
        }
    })
    const { fields: projects_fields, append: projects_append, remove: projects_remove, } = useFieldArray({
        control,
        name: "projects",
    });

    const onSubmit = (data) => {
        dispatch(updateFormData({ ...formData, ...data }));
        dispatch(nextStep())
    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Add Your Projects</div>
            <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                {
                    projects_fields.map((item, index) => {
                        return (
                            <div key={index} className={`flex w-full flex-col items-center ${index !== 0 ? "pt-[40px]" : "pt-[0px]"}`}>
                                {projects_fields?.length > 1 && <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left pb-[10px]'>#{index + 1}</div>}
                                <FloatingInput label="Project Name" register={register(`projects.${index}.name`)} />
                                <FloatingTextArrea label="Description" register={register(`projects.${index}.description`)} />
                            </div>
                        )
                    })
                }
                <div className='flex w-full item-center justify-between pt-[16px]'>
                    <button type="button" onClick={() => projects_append({ name: "", description: "" })} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px]  bg-primary text-white  text-left'>+ Add More</button>
                    <button type="button" onClick={() => projects_remove({ name: "", description: "" })} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px]  bg-primary text-white  text-left'>Delete</button>
                </div>
            </div>
            <div className='flex sticky bottom-0 items-center '>
                <button className='w-full p-[16px] bg-[white] text-black mt-[16px]' type="button" onClick={() => { dispatch(goBack()) }} >{"Back"}</button>
                <button className='w-full p-[16px] bg-[white] text-black mt-[16px]' type="submit">{"Next"}</button>
            </div>
        </form>
    )
}


const LanguageAndSkills = () => {
    const dispatch = useDispatch();
    const { formData } = useSelector(store => store.form);
    const { handleSubmit, watch, register, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            skills: [],
            languages: [],
        }
    })

    const onSubmit = (data) => {
        const skills = data.skills.map((item) => {
            return item.value
        })
        const languages = data.languages.map((item) => {
            return item.value
        })
        dispatch(updateFormData({ ...formData, ...{ skills }, ...{ languages } }));

    }
    return (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Controller
                name="skills"
                render={({ field }) => (
                    <CreatableSelect
                        {...field}
                        options={[{ label: "", value: "" }]}
                        styles={selectStyles}
                        isMulti
                        isClearable={true}
                    // menuIsOpen={false}
                    />
                )}
                control={control}
                rules={{ required: true }}
            />
            <Controller
                name="languages"
                render={({ field }) => (
                    <CreatableSelect
                        {...field}
                        options={[{ label: "", value: "" }]}
                        styles={selectStyles}
                        isMulti
                        isClearable={true}
                    // menuIsOpen={false}
                    />
                )}
                control={control}
                rules={{ required: true }}
            />
            <div className='flex sticky bottom-0 items-center '>
                <button className='w-full p-[16px] bg-[white] text-black mt-[16px]' type="button" onClick={() => { dispatch(goBack()) }} >{"Back"}</button>
                <button className='w-full p-[16px] bg-[white] text-black mt-[16px]' type="submit">{"Next"}</button>
            </div>
        </form>
    )
}