import { useState } from "react";

const useMultipleInputs = ({ emailRegex }) => {
    const [mutipleInput, setMutipleInput] = useState({
        input: "",
        arr: []
    });

    const onSubmit = () => {
        if (mutipleInput.input.length > 1 && mutipleInput.input.match(emailRegex)) {
            setMutipleInput((p) => ({ ...p, arr: [...mutipleInput.arr, mutipleInput.input] }));
        }
        setMutipleInput((p) => ({ ...p, input: "" }));
    };

    const onDelete = (myId) => {
        const updates = mutipleInput.arr.filter((each, idx) => idx !== myId);
        setMutipleInput((p) => ({ ...p, arr: updates }));
    };

    const onChange = (e) => {
        setMutipleInput((p) => ({ ...p, input: e.target.value }));
    };

    return { onSubmit, onDelete, mutipleInput, onChange };
};

export default useMultipleInputs;
