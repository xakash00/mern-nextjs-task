import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";

export default function useApiDispatch({ dispatchOnMount = true, dispatchAction, dispatchParams, onError = () => {}, onSuccess = () => {}, onFinish = () => {} }) {
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const dispatchParamsRef = useRef(dispatchParams);
    dispatchParamsRef.current = dispatchParams;

    const callback = useCallback(
        async (params) => {
            setLoading(true);
            dispatch(dispatchAction(params ?? dispatchParamsRef.current))
                .then(onSuccess)
                .catch(onError)
                .finally(() => {
                    setLoading(false);
                    onFinish?.();
                });
        },
        [dispatchAction, onSuccess, onError, onFinish, dispatch]
    );

    useEffect(() => {
        if (dispatchOnMount) {
            callback();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return [loading, callback, setLoading];
}
