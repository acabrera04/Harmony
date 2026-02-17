import { APP_NAME } from "@/lib/constants";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center">
      <main className="text-center">
        <h1 className="text-4xl font-bold">{APP_NAME}</h1>
        <p className="mt-4 text-gray-600">
          Search-engine-indexable chat platform
        </p>
      </main>
    </div>
  );
}
