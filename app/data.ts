export async function getEpisode(show?: FormDataEntryValue | null) {
    let episode;

    if (show) {
        const showQuery = await fetch(
            `https://api.themoviedb.org/3/search/tv?query=${show}&include_adult=false&language=en-US&page=1`,
            {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                },
            }
        );

        const showRes = await showQuery.json();

        if (showRes.results.length > 0) {
            const showId = showRes.results[0].id;

            const seasonQuery = await fetch(
                `https://api.themoviedb.org/3/tv/${showId}?language=en-US`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                    },
                }
            );

            const seasonRes = await seasonQuery.json();
            const numberOfSeasons = seasonRes.number_of_seasons;
            const seasonRN =
                Math.floor(Math.random() * (numberOfSeasons - 1 + 1)) + 1;

            const episodeQuery = await fetch(
                `https://api.themoviedb.org/3/tv/${showId}/season/${seasonRN}?language=en-US`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${process.env.REACT_APP_API_KEY}`,
                    },
                }
            );

            const episodeRes = await episodeQuery.json();
            const numberOfEpisodes = episodeRes.episodes.length;
            const episodeRN =
                Math.floor(Math.random() * (numberOfEpisodes - 1 + 1)) + 1;
            const episodeInfo = episodeRes.episodes[episodeRN];

            episode = {
                season: episodeInfo.season_number,
                episode: episodeInfo.episode_number,
                rating: episodeInfo.vote_average,
                title: episodeInfo.name,
                description: episodeInfo.overview,
                poster: `https://image.tmdb.org/t/p/original${episodeInfo.still_path}`,
            };
        } else {
            episode = {};
        }
    }

    return episode;
}
