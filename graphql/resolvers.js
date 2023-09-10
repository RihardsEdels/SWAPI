const resolvers = {
    Query: {
        characters: async (_, { page = "1", value = "" }) => {
            try {
                const response = await fetch(`${process.env.URL_API}/?page=${page}&search=${value}`);
                const data = await response.json();
                console.log("🚀 ~ file: resolvers.js:7 ~ users: ~ data:", data);

                return {
                    total: data.count,
                    next: data.next,
                    previous: data.previous,
                    characters: data.results.map((u) => {
                        return {
                            name: u.name,
                            url: u.url
                        };
                    }),
                };
            } catch (error) {
                throw new Error("Something went wrong");
            }
        },
        searchCharacter: async (_, { value }) => {
            try {
                const response = await fetch(`${process.env.URL_API}/?search=${value}`);
                const data = await response.json();

                return data.results.map((u) => {
                    return {
                        name: u.name,
                    };
                });
            } catch (error) {
                throw new Error("Something went wrong");
            }
        },
    },
};

export default resolvers;
