import Content from "./Content";
export default function Home() {
    return (
        <>
            <main className="w-full min-h-screen p-4 md:w-10/12 mx-auto">
                <Content />
            </main>
            <footer className="w-full h-48 bg-gray-800 p-8 text-white">
                <h1 className="font-bold text-3xl">KD Scene</h1>
                <p className="text-sm text-gray-400">
                    Find the Korean Drama just with Screenshot
                </p>
            </footer>
        </>
    );
}
