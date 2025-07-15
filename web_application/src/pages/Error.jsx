import Navbar from "../components/Navbar";

export default function Error() {
  return (
    <>
        <Navbar />
        <div className="flex flex-col items-center justify-center h-[calc(100vh-3.5rem)]">
            <h5 className="text-8xl font-bold text-error">ChatIO</h5>
            <h5 className="text-xl font-semibold text-error">Error</h5>
            
        </div>
    </>
  )
}
