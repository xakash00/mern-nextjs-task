'use client';

import { useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useFieldArray, Controller, useForm } from 'react-hook-form';
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CreatableSelect from 'react-select/creatable';
import 'froala-editor/css/froala_style.min.css';
import 'froala-editor/js/plugins.pkgd.min.js';
import 'froala-editor/css/froala_editor.pkgd.min.css';
import FroalaEditorComponent from 'react-froala-wysiwyg';
import { FloatingInput, FloatingSelect, FloatingTextArrea } from './floatingInput';
import { goBack, nextStep, updateFormData } from 'components/redux/slices/formReducer';
import { phoneRegExp, selectStyles } from 'components/helperFuncs';
import { DeleteIcon, PlusIcon } from 'components/ui-elements/svgs';
import { ResumeThree } from './resume-templates/resumes';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const MakeResume = (props) => {
    const { uploadResume } = props;
    const dispatch = useDispatch();
    const { step } = useSelector(store => store.form);
    const validationSchema = Yup.object().shape({
        document_name: Yup.string().required("This field is required !"),
        full_name: Yup.string().required("This field is required !"),
        email: Yup.string().required("This field is required !"),
        current_role: Yup.string().required("This field is required !"),
        phone: Yup.string().matches(phoneRegExp, 'Phone number is not valid').required("This field is required !"),
        address: Yup.string().required("This field is required !"),
        linked_in: Yup.string(),
        github_id: Yup.string(),
        professional_summary: Yup.string().max(800, 'Must be less than 800 characters!').required("This field is required !"),
    })

    const { handleSubmit, watch, register, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            document_name: "",
            full_name: "",
            current_role: "",
            email: "",
            phone: "",
            address: "",
            linked_in: "",
            github_id: "",
            professional_summary: "",
        }, resolver: yupResolver(validationSchema)
    })


    const onSubmit = (data) => {
        dispatch(updateFormData(data))
        dispatch(nextStep())
    }
    return (
        <div>
            <div className={`${step === 1 ? "block" : "hidden"} w-full relative`}>
                <form className="flex flex-col justify-between items-center h-[100%]" onSubmit={handleSubmit(onSubmit)}>
                    <div className='flex flex-col m-auto rounded-[8px]  justify-center items-center max-w-[900px] w-full'>
                        <div className='w-full'>
                            <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Add Personal Details</div>
                            <div className='bg-white border-[1px] border-boundary p-[24px] rounded-[8px]'>
                                <FloatingInput error={errors.document_name} label="Enter a Title" register={register("document_name")} name='document_name' />
                                <FloatingInput label="Full Name" error={errors.full_name} register={register("full_name")} name={"full_name"} />
                                <div className='flex items-center gap-[16px]'>
                                    <FloatingInput error={errors.current_role} label="Your current Role" register={register("current_role")} name='current_role' />
                                    <FloatingInput label="E-mail" error={errors.email} register={register("email")} name="email" />
                                </div>
                                <div className='flex w-full items-center gap-[16px]'>
                                    <FloatingInput error={errors.phone} label="Phone Number" register={register("phone")} name="phone" />
                                    <FloatingInput error={errors.address} label="City" register={register("address")} name="address" />
                                </div>
                                <div className='flex w-full items-center gap-[16px]'>
                                    <FloatingInput error={errors.linked_in} label="Your Linkedin" register={register("linked_in")} name="linked_in" />
                                    <FloatingInput error={errors.github_id} label="Your Github" register={register("github_id")} name="github_id" />
                                </div>
                                {/* <FloatingTextArrea count={watch("professional_summary").length} max={800} error={errors.professional_summary} label="Professional Summary" register={register("professional_summary")} name="professional_summary" /> */}
                                <Controller
                                    name="professional_summary"
                                    rules={{ required: true }}
                                    control={control}
                                    defaultValue=""
                                    render={({ field }) => (
                                        <ReactQuill className='quill' value={field.value} onChange={field.onChange} />)}
                                />
                            </div>
                        </div>
                        <div className='fixed bottom-0 w-full'>
                            <div className='flex  w-full items-center'>
                                <button className='w-full bg-primary text-white font-semibold tracking-wider  text-[18px]  p-[16px]' type="submit">{"Next"}</button>
                            </div>
                        </div>
                    </div>
                </form >
            </div>
            <div className={`${step === 2 ? "block pb-[80px]" : "hidden"} w-full`}>
                <EmploymentDetails {...{ dispatch }} />
            </div>
            <div className={`${step === 3 ? "block pb-[80px]" : "hidden"} w-full`}>
                <EducationDetails {...{ dispatch }} />
            </div>
            <div className={`${step === 4 ? "block pb-[80px]" : "hidden"} w-full`}>
                <Projects {...{ dispatch }} />
            </div>
            <div className={`${step === 5 ? "block" : "hidden"} w-full`}>
                <LanguageAndSkills {...{ dispatch }} />
            </div>
            <div className={`${step === 6 ? "block" : "hidden"} w-full`}>
                <FinalOutput {...{ uploadResume, dispatch }} />
            </div>
        </div >
    )
}

export default MakeResume



const EmploymentDetails = (props) => {
    const ref = useRef()
    const { dispatch } = props;
    const { formData } = useSelector(store => store.form);

    const integerValidation = (value) => {
        if (!Number.isInteger(value) || String(value).includes('.')) {
            return false;
        }
        return true;
    }

    const formSchema = {
        company_name: Yup.string().required("This field is requried"),
        duration: Yup.number("Must be a number type")
            .typeError('Duration must be a number') // Validates for numerical value
            .positive("Must be a positive value") // Validates against negative values
            .required("Please enter a duration. The field cannot be left blank."), // Sets it as a compulsory field,
        role: Yup.string().required("This field is requir   ed."),
        description: Yup.string().max(800, 'Must be less than 800 characters!').required("This field is required !"),
    };

    const validationSchema = Yup.object().shape({
        employment_history: Yup.array().of(Yup.object().shape(formSchema)).required("Must have fields"),
    })
    const { handleSubmit, watch, register, control, reset, setValue, formState: { errors } } = useForm({
        defaultValues: {
            employment_history: [
                { company_name: "", duration: "", role: "", description: "" }
            ],
        }, resolver: yupResolver(validationSchema)
    });


    const { fields: employment_history_fields, append: employment_history_append, remove: employment_history_remove, } = useFieldArray({
        control,
        name: "employment_history",
    });

    const onSubmit = (data) => {
        dispatch(updateFormData({ ...formData, ...data }))
        dispatch(nextStep())
    }
    return (
        <form className='flex flex-col justify-between items-center h-[100%]' onSubmit={handleSubmit(onSubmit)}>
            <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Add Employment Details</div>
            <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                {
                    employment_history_fields.map((item, index) => {
                        return (
                            <div key={item.id} className={`flex w-full flex-col items-center ${index !== 0 ? "pt-[40px]" : "pt-[0px]"}`}>
                                {employment_history_fields?.length > 1 && <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left pb-[10px]'>#{index + 1}</div>}
                                <FloatingInput error={errors?.employment_history?.[index]?.company_name} label="Company Name" register={register(`employment_history.${index}.company_name`)} name={`employment_history.${index}.company_name`} />
                                <div className='flex items-center w-full gap-[16px]'>
                                    <FloatingInput error={errors?.employment_history?.[index]?.duration} label="Duration" register={register(`employment_history.${index}.duration`)} name={`employment_history.${index}.duration`} />
                                    <FloatingInput error={errors?.employment_history?.[index]?.role} label="Role" register={register(`employment_history.${index}.role`)} name={`employment_history.${index}.role`} />
                                </div>
                                <FloatingTextArrea count={watch(`employment_history.${index}.description`).length} max={800} error={errors?.employment_history?.[index]?.description} label="Description" register={register(`employment_history.${index}.description`)} name={`employment_history.${index}.description`} />
                                <div className='flex w-full items-center justify-between pt-[16px]'>
                                    <button type="button" onClick={() => {
                                        employment_history_append({ company_name: "", duration: "", role: "", description: "" });
                                        setTimeout(() => {
                                            ref.current?.scrollIntoView(
                                                { behavior: 'smooth', block: 'start' }
                                            )
                                        }, 200);
                                    }} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px] bg-primary text-white text-left flex items-center gap-[8px]'><div className='w-[15px] h-[15px]'><PlusIcon /></div> Add more</button>
                                    <button type="button" onClick={() => employment_history_remove(index)} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px] bg-primary flex items-center gap-[8px] text-white text-right'><div className='w-[15px] h-[15px]'><DeleteIcon /></div>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }

                <div ref={ref}></div>
            </div>
            <div className='fixed bottom-0 w-full'>
                <div className='flex  w-full items-center'>
                    <button className='w-full p-[16px] bg-primary text-white font-semibold tracking-wider text-[18px]' type="button" onClick={() => { dispatch(goBack()) }} >{"Back"}</button>
                    <button className='w-full p-[16px] bg-primary text-white font-semibold tracking-wider text-[18px]' type="submit">{"Next"}</button>
                </div>
            </div>
        </form >
    )
}


const EducationDetails = (props) => {
    const ref = useRef()
    const { dispatch } = props;
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
        <form className='flex flex-col justify-between items-center h-[100%]' onSubmit={handleSubmit(onSubmit)}><div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Add Education Details</div>
            <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                {
                    education_history_fields.map((item, index) => {
                        return (
                            <div key={item.id} className={`flex w-full flex-col items-center ${index !== 0 ? "pt-[40px]" : "pt-[0px]"}`}>
                                {education_history_fields?.length > 1 && <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left pb-[10px]'>#{index + 1}</div>}
                                <FloatingInput label="Institute Name" name={`education_history.${index}.institute`} register={register(`education_history.${index}.institute`)} />
                                <div className='flex items-center w-full gap-[16px]'>
                                    <FloatingSelect control={control} label="Graduation Year" name={`education_history.${index}.year`} register={register(`education_history.${index}.year`)} />
                                    <FloatingInput label="GPA/Percentage" name={`education_history.${index}.gpa`} register={register(`education_history.${index}.gpa`)} />
                                    <FloatingInput label="Major" name={`education_history.${index}.major`} register={register(`education_history.${index}.major`)} />
                                </div>
                                <div className='flex w-full item-center justify-between'>
                                    <button type="button" onClick={() => {
                                        education_history_append({ institute: "", year: "", gpa: "", major: "" });
                                        setTimeout(() => {
                                            ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                        }, 200);
                                    }} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px]  bg-primary text-white  text-left'>+ Add More</button>
                                    <button type="button" onClick={() => education_history_remove(index)} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px] bg-primary text-white text-right'>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
                <div ref={ref}></div>
            </div>
            <div className='fixed bottom-0 w-full'>
                <div className='flex  w-full items-center'>
                    <button className='w-full p-[16px] bg-primary text-white font-semibold tracking-wider text-[18px] ' type="button" onClick={() => { dispatch(goBack()) }} >{"Back"}</button>
                    <button className='w-full p-[16px] bg-primary text-white font-semibold tracking-wider text-[18px] ' type="submit">{"Next"}</button>
                </div></div>
        </form>
    )
}

const Projects = (props) => {
    const ref = useRef()
    const { dispatch } = props;
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
        dispatch(nextStep());
        console.log("sdkmsldkm")
    }
    return (
        <form className='flex flex-col justify-between items-center h-[100%]' onSubmit={handleSubmit(onSubmit)}>
            <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left py-[20px]'>Add Your Projects</div>
            <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
                {
                    projects_fields.map((item, index) => {
                        return (
                            <div key={item.id} className={`flex w-full flex-col items-center ${index !== 0 ? "pt-[40px]" : "pt-[0px]"}`}>
                                {projects_fields?.length > 1 && <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left pb-[10px]'>#{index + 1}</div>}
                                <FloatingInput label="Project Name" register={register(`projects.${index}.name`)} name={`projects.${index}.name`} />
                                <FloatingTextArrea label="Description" register={register(`projects.${index}.description`)} name={`projects.${index}.description`} />
                                <div className='flex w-full item-center justify-between pt-[16px]'>
                                    <button type="button" onClick={() => {
                                        projects_append({ name: "", description: "" });
                                        setTimeout(() => {
                                            ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
                                        }, 200);
                                    }} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px]  bg-primary text-white  text-left'>+ Add More</button>
                                    <button type="button" onClick={() => { projects_remove(index) }} className='border-[1px] border-primary px-[16px] py-[8px] text-[13px] font-medium rounded-[8px]  bg-primary text-white  text-left'>Delete</button>
                                </div>
                            </div>
                        )
                    })
                }
                <div ref={ref}></div>
            </div>
            <div className='fixed bottom-0 w-full'>
                <div className='flex  w-full items-center'>
                    <button className='w-full p-[16px] bg-primary text-white font-semibold tracking-wider text-[18px] ' type="button" onClick={() => { dispatch(goBack()) }} >{"Back"}</button>
                    <button className='w-full p-[16px] bg-primary text-white font-semibold tracking-wider text-[18px] ' type="submit">{"Next"}</button>
                </div></div>
        </form>
    )
}


const LanguageAndSkills = (props) => {
    const { dispatch } = props;
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

        dispatch(updateFormData({ ...formData, ...{ skills }, ...{ languages } }))
        // uploadResume(formData)
        dispatch(nextStep())
    }
    return (
        <form className='flex flex-col justify-between items-center h-[100%]' onSubmit={handleSubmit(onSubmit)}>
            <div className='w-full flex flex-col gap-[24px] h-[100%]'>
                <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left pt-[20px]'> Skills</div>
                <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
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
                </div>
                <div className='text-black text-[20px] font-semibold leading-[28px] w-full text-left '>Languages</div>
                <div className='w-full p-[24px] bg-white border-[1px] border-boundary rounded-[8px]'>
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
                </div>
            </div>
            <div className='fixed bottom-0 w-full'>
                <div className='flex  w-full items-center'>
                    <button className='w-full p-[16px] bg-primary text-white font-semibold tracking-wider text-[18px] ' type="button" onClick={() => { dispatch(goBack()) }} >{"Back"}</button>
                    <button className='w-full p-[16px] bg-primary text-white font-semibold tracking-wider text-[18px] ' type="submit">{"Next"}</button>
                </div>
            </div>
        </form>
    )
}

const FinalOutput = (props) => {
    const { formData } = useSelector(store => store.form);

    const { dispatch } = props
    return (
        <>
            <div>
                {/* <ResumeThree {...{ data }} /> */}
                <div className='fixed bottom-0 w-full'>
                    <div className='flex  w-full items-center'>
                        <button className='w-full p-[16px] bg-primary text-white font-semibold tracking-wider text-[18px] ' type="button" onClick={() => { dispatch(goBack()) }} >{"Back"}</button>
                        <button className='w-full p-[16px] bg-primary text-white font-semibold tracking-wider text-[18px] ' type="submit">{"Next"}</button>
                    </div>
                </div>
            </div>

        </>
    )
}



const data = {
    "document_name": "Resume 1",
    "full_name": "Akash Singh",
    "current_role": "web dev",
    "email": "akash@gmail.com",
    "phone": "8511044136",
    "address": "this address",
    "linked_in": "wdw",
    "github_id": "adsasdsa",
    "portfolio": "akash.com",
    "professional_summary": "lorem ipsum",
    "employment_history": [
        {
            "description": "loremipsum",
            "role": "web",
            "duration": 2,
            "company_name": "ff"
        },
        {
            "description": "loremipsum",
            "role": "frontend",
            "duration": 3,
            "company_name": "three"
        }
    ],
    "education_history": [
        {
            "institute": "",
            "year": "2018",
            "gpa": "",
            "major": ""
        },
        {
            "institute": "",
            "year": "2018",
            "gpa": "",
            "major": ""
        },
        {
            "institute": "ggsks",
            "year": "2014",
            "gpa": "68",
            "major": "pcm"
        }
    ],
    "projects": [
        {
            "name": "todo",
            "description": "lorem ipsum"
        },
        {
            "name": "website",
            "description": "lorem ipsum"
        }
    ],
    "skills": [
        "react",
        "node"
    ],
    "languages": [
        "english",
        "hindi"
    ]
}