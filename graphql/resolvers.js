const resolvers = {
    Query: {
        characters: async (_, { page = "1", value = "" }) => {
            try {
                const response = await fetch(`${process.env.URL_API}/?page=${page}&search=${value}`);
                const data = await response.json();

                return {
                    total: data.count,
                    next: data.next,
                    previous: data.previous,
                    characters: data.results.map(async (c) => {
                        const homeworld = await (await fetch(c.homeworld)).json();
                        const species = c.species.length && await (await fetch(c.species[0])).json();

                        return {
                            id: c.url.slice(-2, -1),
                            name: c.name,
                            birthYear: c.birth_year,
                            hairColor: c.hair_color,
                            height: c.height,
                            gender: c.gender,
                            homeworld: {
                                name: homeworld.name
                            },
                            created: c.created,
                            species: {
                                name: species?.name || "unknown"
                            }
                        };
                    }),
                };
            } catch (error) {
                throw new Error("Something went wrong", error);
            }
        },
        character: async (_, { id }) => {

            try {
                const response = await fetch(`${process.env.URL_API}/${id}/`);
                const data = await response.json()

                const homeworld = await (await fetch(data.homeworld)).json();
                const species = data.species.length && await (await fetch(data.species[0])).json();

                return {
                    name: data.name,
                    birthYear: data.birthYear,
                    hairColor: data.hairColor,
                    height: data.height,
                    gender: data.gender,
                    homeworld: {
                        name: homeworld.name
                    },
                    species: {
                        name: species?.name || "unknown"
                    }

                }

            } catch (error) {
                throw new Error("Something went wrong", error);
            }



        }
    },
};

export default resolvers;
