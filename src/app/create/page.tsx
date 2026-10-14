import { CreateWorldForm } from "@/components/worlds/CreateWorldForm";
import { Suspense } from "react";
async function PromptForm({searchParams}:{searchParams:Promise<{prompt?:string}>}){const {prompt=""}=await searchParams;return <CreateWorldForm initialPrompt={prompt}/>}
export default function CreatePage({searchParams}:{searchParams:Promise<{prompt?:string}>}){return <Suspense fallback={<main className="page-shell"><p className="page-kicker">WORLD FORGE / LOADING</p></main>}><PromptForm searchParams={searchParams}/></Suspense>}
