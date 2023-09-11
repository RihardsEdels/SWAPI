import Input from "@/components/Input/Input";
import Listing from "@/components/Listing/Listing";
import { useQuery } from "@apollo/client";
import { mdiClose } from "@mdi/js";
import { useRouter } from "next/router";
import React, { ChangeEvent, useEffect, useState } from "react";

import classes from "./page.module.css";
import Button from "@/components/Button/Button";
import Loader from "@/components/Loader/Loader";
import { GET_CHARACTERS } from "@/graphql/queries/getCharacters";

export default function Home() {
  const router = useRouter();
  const { page, search } = router.query;
  const [keyword, setKeyword] = useState<string>(search as string);
  console.log("🚀 ~ file: index.tsx:17 ~ Home ~ keyword:", keyword);

  useEffect(() => {
    if (search) {
      setKeyword(search as string);
    }
  }, [search]);

  const { data, loading, refetch } = useQuery(GET_CHARACTERS, {
    variables: { page: page, value: search },
    context: {
      fetchOptions: {
        next: { revalidate: 60 },
      },
    },
  });

  const [results, setResults] = useState(data?.characters.characters || []);
  const [originalResults, setOriginalResults] = useState(
    data?.characters.characters || []
  );

  useEffect(() => {
    if (data) {
      setResults(data.characters.characters);
      setOriginalResults(data.characters.characters);
    }
  }, [data]);

  if (loading) return <Loader />;

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const element = e.target as HTMLButtonElement;
    setKeyword(element.value);
  };

  const hasNextPage =
    (parseInt(page as string) || 0) < Math.ceil(data?.characters.total / 10);
  const hasPreviousPage = parseInt(page as string) > 1;

  const pagination = (
    <div className="flex justify-between items-center">
      <button
        onClick={() =>
          hasPreviousPage &&
          router.push(
            `/?page=${parseInt(page as string) - 1}&search=${search || ""}`
          )
        }
        className={`${
          hasPreviousPage
            ? "bg-gray-dark text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        } w-10 h-10 mr-1 text-sm  transition-colors duration-300 hover:gray-dark hover:text-white focus:outline-none focus:gray-dark focus:text-white`}
        disabled={!hasPreviousPage}
      >
        Previous
      </button>
      <div className="flex flex-wrap gap-1 text-lg">
        {Array.from(
          { length: Math.ceil(data?.characters.total / 10) },
          (_, index) => (
            <button
              key={index}
              onClick={() =>
                router.push(`/?page=${index + 1}&search=${search || ""}`)
              }
              className={`${
                (index + 1).toString() === page
                  ? "bg-gray-dark text-white"
                  : "bg-gray-100 text-gray-600"
              } w-10 h-10 mr-1 text-sm  transition-colors duration-300 hover:bg-gray-300 hover:text-white focus:outline-none focus:bg-gray-300 focus:text-white`}
            >
              {index + 1}
            </button>
          )
        )}
      </div>
      <button
        onClick={() =>
          hasNextPage &&
          router.push(
            `/?page=${parseInt(page as string) + 1}&search=${search || ""}`
          )
        }
        className={`${
          hasNextPage
            ? "bg-gray-dark text-white"
            : "bg-gray-200 text-gray-400 cursor-not-allowed"
        } w-10 h-10 ml-1 text-sm  transition-colors duration-300 hover:gray-dark hover:text-white focus:outline-none focus:gray-dark focus:text-white`}
        disabled={!hasNextPage}
      >
        Next
      </button>
    </div>
  );

  return (
    <main className="container mx-auto px-5">
      <form className={classes.form}>
        <Input
          onChange={handleSearch}
          value={keyword}
          placeholder={"Search name or homeworld"}
          icon={keyword && mdiClose}
          name="search"
          action={() => setKeyword("")}
          classes={{ root: classes.inputRoot, inputRoot: classes.input }}
        />

        <Button type="submit">Search</Button>
      </form>
      <Listing listingData={data?.characters.characters} />

      <div className="flex flex-wrap gap-1 text-lg">{pagination}</div>
    </main>
  );
}
