import { useEffect, useState } from "react";
import { Form, useNavigate } from "react-router";
import type { Route } from "./+types/home";
import { getEpisode } from "~/data";

export function meta({}: Route.MetaArgs) {
    return [
        { title: "episode unknown" },
        // { name: "description", content: "Welcome to React Router!" },
    ];
}

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const show = url.searchParams.get("show");
    const episode = show ? await getEpisode(show) : null;
    return { episode, show };
}

export default function Home({ loaderData }: Route.ComponentProps) {
    const { episode, show } = loaderData;
    const navigate = useNavigate();
    const [showSearchInput, setShowSearchInput] = useState(false);

    const toggleSearch = () => {
        setShowSearchInput(true);
    };

    const cancelSearch = () => {
        setShowSearchInput(false);
    };

    useEffect(() => {
        const showSearch = document.getElementById("show");
        if (showSearch instanceof HTMLInputElement) {
            showSearch.value = show || "";
        }
    }, [show]);

    return (
        <main className="flex justify-center">
            {episode === null ? (
                <section className="z-10 flex h-screen w-screen flex-col items-center justify-center gap-3">
                    <div className="flex items-baseline">
                        <h5 className="text-2xl font-semibold">episod</h5>
                        <img
                            src="logo.png"
                            className="inline h-[30px] pl-[2px] pr-[1px]"
                        />
                        <span className="text-2xl font-semibold">unknown</span>
                    </div>
                    <p className="w-96 px-6 text-center text-sm sm:px-0">
                        Use the magnifying glass to search for a show and have a
                        random episode displayed.
                    </p>
                </section>
            ) : (
                <section className="grid">
                    <div className="z-10 col-start-1 row-start-1 mt-20 flex h-96 justify-center sm:mt-0 sm:h-screen sm:items-center">
                        <div className="grid w-96 grid-cols-5 gap-y-10 p-6">
                            <div className="col-span-3 flex gap-3">
                                <img
                                    src="arrows-clockwise.svg"
                                    className="mt-1 h-[24px] w-[24px] cursor-pointer"
                                    onClick={() => navigate(0)}
                                />
                                <div className="flex items-baseline">
                                    <h5 className="font-medium">episod</h5>
                                    <img
                                        src="logo.png"
                                        className="inline h-[21px] pl-[2px] pr-[1px]"
                                    />
                                    <span className="font-medium">unknown</span>
                                </div>
                            </div>
                            <div className="col-start-1 row-start-2">
                                <h5 className="text-[color:var(--accent)]">
                                    season
                                </h5>
                                <div className="border-foreground flex h-10 w-16 items-center justify-center border">
                                    {episode?.season}
                                </div>
                            </div>

                            <div className="col-start-3 row-start-2">
                                <h5 className="text-[color:var(--accent)]">
                                    episode
                                </h5>
                                <div className="border-foreground flex h-10 w-16 items-center justify-center border">
                                    {episode?.episode}
                                </div>
                            </div>

                            <div className="col-start-5 row-start-2">
                                <h5 className="text-[color:var(--accent)]">
                                    rating
                                </h5>
                                <div className="border-foreground flex h-10 w-16 items-center justify-center border">
                                    {Number(episode?.rating).toFixed(2)}
                                </div>
                            </div>

                            <div className="col-span-5 row-start-3">
                                <h5 className="text-[color:var(--accent)]">
                                    title
                                </h5>
                                <h1 className="text-3xl">{episode?.title}</h1>
                            </div>

                            <div className="col-span-5">
                                <h5 className="text-[color:var(--accent)]">
                                    synopsis
                                </h5>
                                {episode?.description}
                            </div>
                        </div>
                    </div>
                    <div
                        style={
                            {
                                "--image-url": `url(${episode?.poster})`,
                            } as React.CSSProperties
                        }
                        className={`col-start-1 row-start-1 h-screen w-screen bg-[image:var(--image-url)] bg-cover bg-center bg-no-repeat opacity-5 grayscale`}
                    ></div>
                </section>
            )}

            <div className="absolute right-7 top-5 z-10 flex items-center gap-3">
                <Form
                    id="episode-search"
                    role="search"
                >
                    <div className="flex items-center bg-white">
                        <input
                            className={`h-8 ${showSearchInput ? "w-72 pl-3" : "w-0"} rounded-none text-sm text-background transition-all`}
                            id="show"
                            name="show"
                            placeholder="search for a show here"
                            type="search"
                        />
                    </div>
                </Form>

                {showSearchInput ? (
                    <img
                        className={`mr-1 h-3 w-3 cursor-pointer`}
                        onClick={cancelSearch}
                        src="x-fill.svg"
                    />
                ) : (
                    <img
                        className={`h-5 w-5 cursor-pointer`}
                        onClick={toggleSearch}
                        src="magnifying-glass.png"
                    />
                )}
            </div>
        </main>
    );
}
