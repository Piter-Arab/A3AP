import Container from "@/components/Container";

export default function Home() {
  return (
    <div className="flex justify-center items-center h-screen">
      <Container>
        <div className="flex flex-col items-center gap-3">
          <p className="text-3xl">VPS-A8L</p>
          <form action="" className="flex flex-col">
            <label className="text-sm text-neutral-400" htmlFor="passwd">
              Password:
            </label>
            <input
              id="passwd"
              type="password"
              className="px-2 py-1 border-2 border-white/20 rounded-md"
            />
            <button
              type="submit"
              className="rounded-md bg-white/20 px-2 py-1 mt-3 hover:bg-white/30 transition-all cursor-pointer"
            >
              Log in
            </button>
          </form>
        </div>
      </Container>
    </div>
  );
}
