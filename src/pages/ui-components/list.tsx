import Link from "next/link";

export default function List() {
    return (
    <>
        <h1>UI Components</h1>
        <h2><Link href='/'>Back to home</Link></h2>
        <button className="btn btn-primary">Click Me</button>
        <button className="btn btn-secondary">Click Me</button>
        <div className="card card-bordered">
            <div className="card-body">
                <div className="card-title">Card</div>
            </div>
            <div className="card-actions justify-end">
                <button className="btn btn-primary">Buy Now</button>
            </div>
        </div>
        <span className="loading loading-dots loading-lg"></span>
        <span className="loading loading-ring loading-lg"></span>
    </>)
}