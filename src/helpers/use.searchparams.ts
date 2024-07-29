import { useEffect, useState } from "react";

export interface ISearchParams {
    id?: string;
    [key: string]: string | undefined;
};

export const __APP_URI = new URL(window.location.href);

/**
 * React functional component to get the URL parameters
 * @returns [searchParams, setSearchParams]
 */
const UseSearchParams = <T extends ISearchParams>(): [T, React.Dispatch<React.SetStateAction<T>>] => {
    const [searchParams, setSearchParams] = useState<T>({} as T);


    useEffect(() => {
        const search_params: URLSearchParams = __APP_URI.searchParams;
        const found_entries: IterableIterator<[string, string]> = search_params.entries();
        const __results__: ISearchParams = {};

        for (const [entry_key, entry_value] of found_entries) {
            __results__[entry_key] = entry_value;
        }

        setSearchParams(__results__ as T);
    }, []);

    return [searchParams, setSearchParams];
};

export default UseSearchParams;