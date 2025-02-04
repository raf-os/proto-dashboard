'use client';

import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import clsx from "clsx";

export default function ConversationFilter() {
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const { replace } = useRouter();
    const [ showFilters, setShowFilters ] = useState(false);

    const toggleShowFilters = () => {
        setShowFilters(!showFilters);
    }

    const applyFilter = (term: string) => {
        const params = new URLSearchParams(searchParams);
        params.set('origin', term);
        replace(`${pathname}?${params.toString()}`);
    }

    return (
        <div
            className={clsx(
                "section-table flex-col gap-4 relative overflow-hidden",
                showFilters && "h-auto",
                !showFilters && "h-14",
            )}
        >
            <button
                className="relative w-full text-left"
                onClick={toggleShowFilters}
            >
                <h1 className="font-bold text-xl">Filtros</h1>

                <span className="absolute right-0 top-0">
                    {!showFilters && (<ChevronDownIcon className="size-8" />)}
                    {showFilters && (<ChevronUpIcon className="size-8" />)}
                </span>
            </button>

            <form>
                <div className={clsx(
                    !showFilters && "hidden",
                )}>
                    <label>Telefone: </label>

                    <select
                        name="origin-number"
                        id="origin-number"
                        className="px-2 rounded-md"
                        onChange={(e) => {
                            applyFilter(e.target.value);
                        }}
                    >
                        <option value="1">Telefone 1</option>
                        <option value="2">Telefone 2</option>
                    </select>
                </div>
            </form>
        </div>
    )
}