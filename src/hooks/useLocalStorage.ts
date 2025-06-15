import { useEffect, useState } from "react";

type ReturnType<T = string> = [T | null, (v: T) => void, () => void];

export const useLocalStorage = <T = string>(key: string, IsObject: boolean = false): ReturnType<T> => {
	const [value, setValue] = useState<T | null>(() => {
		if (!key) return null;

		const lsValue = localStorage.getItem(key);

		if (lsValue) {
			return IsObject ? JSON.parse(lsValue) : (lsValue as unknown as T);
		}

		return null;
	});

	useEffect(() => {
		if (key) {
			const lsValue = localStorage.getItem(key);

			if (lsValue) {
				setValue(IsObject ? JSON.parse(lsValue) : lsValue);
			}
		}
	}, [IsObject, key]);

	const changeLsValue = (val: T) => {
		if (IsObject) {
			localStorage.setItem(key, JSON.stringify(val));
		} else {
			localStorage.setItem(key, val as string);
		}
		setValue(val);
	};

	const clearLsValue = () => {
		localStorage.removeItem(key);
		setValue(null);
	};

	return [value, changeLsValue, clearLsValue];
};
