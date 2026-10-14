import { NextResponse } from "next/server";
import { z } from "zod";
import { generateLocalWorld } from "@/lib/worlds/localGenerator";

const RequestSchema=z.object({prompt:z.string().trim().min(12).max(800),idempotencyKey:z.string().uuid()});

export async function POST(request:Request){
  try{
    const input=RequestSchema.parse(await request.json());
    const world=generateLocalWorld(input.prompt);
    return NextResponse.json({world,idempotencyKey:input.idempotencyKey,engine:"local-procedural"});
  }catch(error){
    if(error instanceof z.ZodError)return NextResponse.json({error:"Please enter a description between 12 and 800 characters.",code:"INVALID_PROMPT",issues:error.issues},{status:400});
    console.error("world-generation",error);
    return NextResponse.json({error:"World generation failed. Please retry.",code:"GENERATION_FAILED"},{status:500});
  }
}
